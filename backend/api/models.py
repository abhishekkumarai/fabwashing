"""Data model for the WashNLaundry LaundryPro clone (see PRD.md §7).

Consolidated into a single `api` app for simplicity. Money = Decimal(12,2).
"""
from django.db import models


class TimeStamped(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


# ---------------------------------------------------------------- core
class Organisation(TimeStamped):
    name = models.CharField(max_length=200, default="Demo Laundry Patna")
    legal_name = models.CharField(max_length=200, blank=True)
    state = models.CharField(max_length=100, default="Bihar")
    gstin = models.CharField(max_length=20, blank=True)
    gst_enabled = models.BooleanField(default=True)
    currency = models.CharField(max_length=8, default="INR")

    def __str__(self):
        return self.name


class Branch(TimeStamped):
    STORE = "store"
    LIVE_STORE = "live_store"
    PLANT = "plant"
    TYPE_CHOICES = [(STORE, "Store"), (LIVE_STORE, "Live store"), (PLANT, "Plant")]

    code = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=200)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default=STORE)
    city = models.CharField(max_length=100, default="Patna")
    state = models.CharField(max_length=100, default="Bihar")
    address = models.CharField(max_length=300, blank=True)
    commission_pct = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    royalty_pct = models.DecimalField(max_digits=5, decimal_places=2, default=0)

    def __str__(self):
        return f"{self.code} · {self.name}"


class Setting(TimeStamped):
    key = models.CharField(max_length=120, unique=True)
    value = models.JSONField(default=dict, blank=True)


class AuditLog(models.Model):
    CREATE, UPDATE, DELETE = "CREATE", "UPDATE", "DELETE"
    ACTION_CHOICES = [(CREATE, "Create"), (UPDATE, "Update"), (DELETE, "Delete")]

    action = models.CharField(max_length=10, choices=ACTION_CHOICES)
    entity = models.CharField(max_length=80)
    record_id = models.CharField(max_length=80, blank=True)
    actor_name = models.CharField(max_length=120, default="Rajesh Kumar")
    payload = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]


# ---------------------------------------------------------------- catalog
class ServiceCategory(TimeStamped):
    name = models.CharField(max_length=120)
    icon = models.CharField(max_length=60, blank=True)

    def __str__(self):
        return self.name


class Service(TimeStamped):
    PER_KG, PER_PIECE, FLAT, PER_SQFT = "per_kg", "per_piece", "flat", "per_sqft"
    MODE_CHOICES = [
        (PER_KG, "Per KG"),
        (PER_PIECE, "Per Piece"),
        (FLAT, "Flat"),
        (PER_SQFT, "Per SqFt"),
    ]
    category = models.ForeignKey(
        ServiceCategory, on_delete=models.CASCADE, related_name="services"
    )
    name = models.CharField(max_length=160)
    pricing_mode = models.CharField(max_length=20, choices=MODE_CHOICES, default=PER_PIECE)
    rate = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    tat_hours = models.PositiveIntegerField(default=48)
    gst_pct = models.DecimalField(max_digits=5, decimal_places=2, default=18)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


# ---------------------------------------------------------------- customers
class Customer(TimeStamped):
    NEW, ACTIVE, VIP, AT_RISK, INACTIVE = "new", "active", "vip", "at_risk", "inactive"
    STATUS_CHOICES = [
        (NEW, "New"),
        (ACTIVE, "Active"),
        (VIP, "VIP"),
        (AT_RISK, "At risk"),
        (INACTIVE, "Inactive"),
    ]
    name = models.CharField(max_length=160)
    phone = models.CharField(max_length=20, blank=True)
    email = models.EmailField(blank=True)
    address = models.CharField(max_length=300, blank=True)
    tags = models.JSONField(default=list, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=NEW)
    birthday = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.name


# ---------------------------------------------------------------- orders
class Order(TimeStamped):
    STAGES = [
        "booking", "pickup", "picked", "received", "sorted", "in",
        "qc", "packed", "out", "delivered", "closed",
    ]
    STAGE_CHOICES = [(s, s.title()) for s in STAGES]
    PAYMENT_CHOICES = [("unpaid", "Unpaid"), ("partial", "Partial"), ("paid", "Paid")]

    invoice_no = models.CharField(max_length=40, unique=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name="orders")
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name="orders")
    stage = models.CharField(max_length=20, choices=STAGE_CHOICES, default="booking")
    payment_status = models.CharField(max_length=10, choices=PAYMENT_CHOICES, default="unpaid")
    subtotal = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    cgst = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    sgst = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    total = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    due_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.invoice_no

    def recompute(self):
        subtotal = sum((l.amount for l in self.lines.all()), start=0)
        gst = (subtotal * 18) / 100
        self.subtotal = subtotal
        self.cgst = gst / 2
        self.sgst = gst / 2
        self.total = subtotal + gst


class OrderLine(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="lines")
    service = models.ForeignKey(Service, on_delete=models.SET_NULL, null=True)
    service_name = models.CharField(max_length=160, blank=True)
    qty = models.DecimalField(max_digits=10, decimal_places=2, default=1)
    unit_rate = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    def save(self, *args, **kwargs):
        self.amount = self.qty * self.unit_rate
        super().save(*args, **kwargs)


class OrderStageEvent(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="stage_events")
    stage = models.CharField(max_length=20)
    note = models.CharField(max_length=240, blank=True)
    at = models.DateTimeField(auto_now_add=True)


class Payment(models.Model):
    MODE_CHOICES = [("cash", "Cash"), ("card", "Card"), ("upi", "UPI"), ("online", "Online")]
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="payments")
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, null=True)
    mode = models.CharField(max_length=10, choices=MODE_CHOICES, default="cash")
    amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    status = models.CharField(max_length=12, default="succeeded")
    at = models.DateTimeField(auto_now_add=True)


# ---------------------------------------------------------------- inventory
class InventoryItem(TimeStamped):
    sku = models.CharField(max_length=60)
    name = models.CharField(max_length=160)
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name="inventory")
    unit_cost = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    balance = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    reorder_level = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    @property
    def value(self):
        return self.unit_cost * self.balance


class StockLedgerEntry(models.Model):
    item = models.ForeignKey(InventoryItem, on_delete=models.CASCADE, related_name="entries")
    delta = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    balance = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    reason = models.CharField(max_length=160, blank=True)
    at = models.DateTimeField(auto_now_add=True)


# ---------------------------------------------------------------- staff
class Staff(TimeStamped):
    name = models.CharField(max_length=160)
    role = models.CharField(max_length=80, default="Staff")
    branch = models.ForeignKey(Branch, on_delete=models.SET_NULL, null=True, blank=True, related_name="staff")
    pin = models.CharField(max_length=8, blank=True)
    is_super_admin = models.BooleanField(default=False)
    locked = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class Attendance(models.Model):
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE, related_name="attendance")
    clock_in_at = models.DateTimeField(null=True, blank=True)
    clock_out_at = models.DateTimeField(null=True, blank=True)


# ---------------------------------------------------------------- plant / wash
class Challan(TimeStamped):
    DIRECTIONS = [("store_to_plant", "Store → Plant"), ("plant_to_store", "Plant → Store")]
    STATUS = [
        ("requested", "Requested"), ("in_transit", "In transit"),
        ("received", "Received"), ("missing", "Missing"),
        ("qc_issue", "QC issue"), ("cancelled", "Cancelled"),
    ]
    number = models.CharField(max_length=40, unique=True)
    from_branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name="challans_out")
    to_branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name="challans_in")
    direction = models.CharField(max_length=20, choices=DIRECTIONS, default="store_to_plant")
    status = models.CharField(max_length=16, choices=STATUS, default="requested")
    items_count = models.PositiveIntegerField(default=0)
    notes = models.CharField(max_length=240, blank=True)

    class Meta:
        ordering = ["-created_at"]


class Batch(TimeStamped):
    STATUS = [
        ("created", "Created"), ("assigned", "Assigned"), ("running", "Running"),
        ("awaiting_qc", "Awaiting QC"), ("qc_done", "QC done"), ("complete", "Complete"),
    ]
    code = models.CharField(max_length=40, unique=True)
    machine = models.CharField(max_length=80, blank=True)
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name="batches")
    status = models.CharField(max_length=16, choices=STATUS, default="created")
    garments = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["-created_at"]


class ScanEvent(models.Model):
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True, blank=True)
    stage = models.CharField(max_length=20, default="sorted")
    mode = models.CharField(max_length=10, default="manual")  # qr | ocr | manual
    tag = models.CharField(max_length=80, blank=True)
    at = models.DateTimeField(auto_now_add=True)


# ---------------------------------------------------------------- logistics
class Job(TimeStamped):
    TYPES = [("pickup", "Pickup"), ("delivery", "Delivery")]
    STATUS = [
        ("scheduled", "Scheduled"), ("assigned", "Assigned"), ("en_route", "En route"),
        ("arrived", "Arrived"), ("completed", "Completed"), ("failed", "Failed"),
    ]
    type = models.CharField(max_length=10, choices=TYPES, default="pickup")
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name="jobs")
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True, blank=True)
    area = models.CharField(max_length=120, blank=True)
    rider = models.ForeignKey(Staff, on_delete=models.SET_NULL, null=True, blank=True, related_name="jobs")
    status = models.CharField(max_length=12, choices=STATUS, default="scheduled")
    cod_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    scheduled_for = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ["-created_at"]


# ---------------------------------------------------------------- expenses
class Expense(TimeStamped):
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name="expenses")
    category = models.CharField(max_length=120, default="General")
    amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    note = models.CharField(max_length=240, blank=True)
    itc_eligible = models.BooleanField(default=False)
    date = models.DateField()

    class Meta:
        ordering = ["-date"]


# ---------------------------------------------------------------- loyalty
class LoyaltyAccount(TimeStamped):
    customer = models.OneToOneField(Customer, on_delete=models.CASCADE, related_name="loyalty")
    balance = models.IntegerField(default=0)
    lifetime_earned = models.IntegerField(default=0)
    lifetime_redeemed = models.IntegerField(default=0)


class LoyaltyTxn(models.Model):
    account = models.ForeignKey(LoyaltyAccount, on_delete=models.CASCADE, related_name="txns")
    delta = models.IntegerField(default=0)
    reason = models.CharField(max_length=160, blank=True)
    at = models.DateTimeField(auto_now_add=True)


class Referral(TimeStamped):
    STATUS = [("pending", "Pending"), ("rewarded", "Rewarded"), ("blocked", "Blocked")]
    referrer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name="referrals_made")
    referee = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name="referrals_got")
    status = models.CharField(max_length=10, choices=STATUS, default="pending")


# ---------------------------------------------------------------- franchise
class Settlement(TimeStamped):
    STATUS = [("open", "Open"), ("collected", "Collected")]
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name="settlements")
    period = models.CharField(max_length=7)  # YYYY-MM
    commission = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    royalty = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    ad_fund = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    plant_fees = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    total_due = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    collected = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    status = models.CharField(max_length=12, choices=STATUS, default="open")


# ---------------------------------------------------------------- cash
class CashClose(TimeStamped):
    STATUS = [("open", "Open"), ("closed", "Closed")]
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name="cash_closes")
    date = models.DateField()
    expected = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    counted = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    variance = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    status = models.CharField(max_length=8, choices=STATUS, default="open")
    reason = models.CharField(max_length=240, blank=True)

    class Meta:
        ordering = ["-date"]
