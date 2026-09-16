from rest_framework import serializers

from . import models as m


class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.Branch
        fields = "__all__"


class OrganisationSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.Organisation
        fields = "__all__"


class SettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.Setting
        fields = "__all__"


class AuditLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.AuditLog
        fields = "__all__"


class ServiceCategorySerializer(serializers.ModelSerializer):
    services_count = serializers.IntegerField(source="services.count", read_only=True)

    class Meta:
        model = m.ServiceCategory
        fields = ["id", "name", "icon", "services_count", "created_at"]


class ServiceSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.name", read_only=True)

    class Meta:
        model = m.Service
        fields = "__all__"


class CustomerSerializer(serializers.ModelSerializer):
    orders_count = serializers.IntegerField(source="orders.count", read_only=True)
    ltv = serializers.SerializerMethodField()

    class Meta:
        model = m.Customer
        fields = [
            "id", "name", "phone", "email", "address", "tags", "status",
            "birthday", "orders_count", "ltv", "created_at",
        ]

    def get_ltv(self, obj):
        return sum((o.total for o in obj.orders.all()), start=0)


class OrderLineSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.OrderLine
        fields = ["id", "order", "service", "service_name", "qty", "unit_rate", "amount"]
        read_only_fields = ["amount"]


class NestedOrderLineSerializer(serializers.ModelSerializer):
    """Lines written inline with an order — `order` is set by the parent."""

    class Meta:
        model = m.OrderLine
        fields = ["id", "service", "service_name", "qty", "unit_rate", "amount"]
        read_only_fields = ["amount"]


class OrderSerializer(serializers.ModelSerializer):
    lines = NestedOrderLineSerializer(many=True, required=False)
    customer_name = serializers.CharField(source="customer.name", read_only=True)
    branch_code = serializers.CharField(source="branch.code", read_only=True)

    class Meta:
        model = m.Order
        fields = [
            "id", "invoice_no", "customer", "customer_name", "branch", "branch_code",
            "stage", "payment_status", "subtotal", "cgst", "sgst", "total",
            "due_at", "lines", "created_at",
        ]
        read_only_fields = ["subtotal", "cgst", "sgst", "total"]
        extra_kwargs = {"invoice_no": {"required": False}}

    def create(self, validated_data):
        lines = validated_data.pop("lines", [])
        if not validated_data.get("invoice_no"):
            validated_data["invoice_no"] = self._next_invoice()
        order = m.Order.objects.create(**validated_data)
        for line in lines:
            m.OrderLine.objects.create(order=order, **line)
        order.recompute()
        order.save()
        return order

    def _next_invoice(self):
        n = m.Order.objects.count() + 1
        return f"INV-{n:05d}"


class InventoryItemSerializer(serializers.ModelSerializer):
    branch_code = serializers.CharField(source="branch.code", read_only=True)
    value = serializers.ReadOnlyField()

    class Meta:
        model = m.InventoryItem
        fields = "__all__"


class StockLedgerEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = m.StockLedgerEntry
        fields = "__all__"


class StaffSerializer(serializers.ModelSerializer):
    branch_code = serializers.CharField(source="branch.code", read_only=True)

    class Meta:
        model = m.Staff
        fields = "__all__"


class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.Attendance
        fields = "__all__"


class ChallanSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.Challan
        fields = "__all__"


class BatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.Batch
        fields = "__all__"


class ScanEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.ScanEvent
        fields = "__all__"


class JobSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(source="customer.name", read_only=True)

    class Meta:
        model = m.Job
        fields = "__all__"


class ExpenseSerializer(serializers.ModelSerializer):
    branch_code = serializers.CharField(source="branch.code", read_only=True)

    class Meta:
        model = m.Expense
        fields = "__all__"


class LoyaltyAccountSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(source="customer.name", read_only=True)

    class Meta:
        model = m.LoyaltyAccount
        fields = "__all__"


class LoyaltyTxnSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.LoyaltyTxn
        fields = "__all__"


class ReferralSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.Referral
        fields = "__all__"


class SettlementSerializer(serializers.ModelSerializer):
    branch_code = serializers.CharField(source="branch.code", read_only=True)

    class Meta:
        model = m.Settlement
        fields = "__all__"


class CashCloseSerializer(serializers.ModelSerializer):
    branch_code = serializers.CharField(source="branch.code", read_only=True)

    class Meta:
        model = m.CashClose
        fields = "__all__"
