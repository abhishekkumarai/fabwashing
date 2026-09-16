from datetime import timedelta

from django.db.models import Count, Sum
from django.utils import timezone
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from . import models as m
from . import serializers as s


class AuditedModelViewSet(viewsets.ModelViewSet):
    """ModelViewSet that appends an AuditLog row on create/update/delete."""

    audit_entity = None

    def _log(self, action, instance):
        entity = self.audit_entity or instance.__class__.__name__
        m.AuditLog.objects.create(
            action=action,
            entity=entity,
            record_id=str(getattr(instance, "id", "")),
            payload={"repr": str(instance)},
        )

    def perform_create(self, serializer):
        instance = serializer.save()
        self._log(m.AuditLog.CREATE, instance)

    def perform_update(self, serializer):
        instance = serializer.save()
        self._log(m.AuditLog.UPDATE, instance)

    def perform_destroy(self, instance):
        self._log(m.AuditLog.DELETE, instance)
        instance.delete()


# ------------------------------------------------------------ CRUD viewsets
class BranchViewSet(AuditedModelViewSet):
    queryset = m.Branch.objects.all()
    serializer_class = s.BranchSerializer
    search_fields = ["code", "name", "city"]


class OrganisationViewSet(AuditedModelViewSet):
    queryset = m.Organisation.objects.all()
    serializer_class = s.OrganisationSerializer


class SettingViewSet(AuditedModelViewSet):
    queryset = m.Setting.objects.all()
    serializer_class = s.SettingSerializer


class AuditLogViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = m.AuditLog.objects.all()
    serializer_class = s.AuditLogSerializer
    filterset_fields = ["action", "entity", "actor_name"]
    search_fields = ["entity", "actor_name", "record_id"]


class ServiceCategoryViewSet(AuditedModelViewSet):
    queryset = m.ServiceCategory.objects.all()
    serializer_class = s.ServiceCategorySerializer
    search_fields = ["name"]


class ServiceViewSet(AuditedModelViewSet):
    queryset = m.Service.objects.select_related("category").all()
    serializer_class = s.ServiceSerializer
    filterset_fields = ["category", "pricing_mode", "active"]
    search_fields = ["name", "category__name"]


class CustomerViewSet(AuditedModelViewSet):
    queryset = m.Customer.objects.all().order_by("-created_at")
    serializer_class = s.CustomerSerializer
    filterset_fields = ["status"]
    search_fields = ["name", "phone", "email"]


class OrderViewSet(AuditedModelViewSet):
    queryset = m.Order.objects.select_related("customer", "branch").prefetch_related("lines").all()
    serializer_class = s.OrderSerializer
    filterset_fields = ["stage", "payment_status", "branch"]
    search_fields = ["invoice_no", "customer__name", "customer__phone"]


class OrderLineViewSet(AuditedModelViewSet):
    queryset = m.OrderLine.objects.all()
    serializer_class = s.OrderLineSerializer


class InventoryItemViewSet(AuditedModelViewSet):
    queryset = m.InventoryItem.objects.select_related("branch").all()
    serializer_class = s.InventoryItemSerializer
    filterset_fields = ["branch"]
    search_fields = ["sku", "name"]


class StockLedgerEntryViewSet(AuditedModelViewSet):
    queryset = m.StockLedgerEntry.objects.all()
    serializer_class = s.StockLedgerEntrySerializer


class StaffViewSet(AuditedModelViewSet):
    queryset = m.Staff.objects.select_related("branch").all()
    serializer_class = s.StaffSerializer
    filterset_fields = ["branch", "is_super_admin", "locked"]
    search_fields = ["name", "role"]


class AttendanceViewSet(AuditedModelViewSet):
    queryset = m.Attendance.objects.all()
    serializer_class = s.AttendanceSerializer


class ChallanViewSet(AuditedModelViewSet):
    queryset = m.Challan.objects.all()
    serializer_class = s.ChallanSerializer
    filterset_fields = ["status", "direction", "from_branch", "to_branch"]
    search_fields = ["number", "notes"]


class BatchViewSet(AuditedModelViewSet):
    queryset = m.Batch.objects.all()
    serializer_class = s.BatchSerializer
    filterset_fields = ["status", "branch"]
    search_fields = ["code", "machine"]


class ScanEventViewSet(AuditedModelViewSet):
    queryset = m.ScanEvent.objects.all()
    serializer_class = s.ScanEventSerializer


class JobViewSet(AuditedModelViewSet):
    queryset = m.Job.objects.select_related("customer", "rider").all()
    serializer_class = s.JobSerializer
    filterset_fields = ["type", "status", "rider"]
    search_fields = ["customer__name", "customer__phone", "area"]


class ExpenseViewSet(AuditedModelViewSet):
    queryset = m.Expense.objects.select_related("branch").all()
    serializer_class = s.ExpenseSerializer
    filterset_fields = ["branch", "category", "itc_eligible"]


class LoyaltyAccountViewSet(AuditedModelViewSet):
    queryset = m.LoyaltyAccount.objects.select_related("customer").all()
    serializer_class = s.LoyaltyAccountSerializer


class LoyaltyTxnViewSet(AuditedModelViewSet):
    queryset = m.LoyaltyTxn.objects.all()
    serializer_class = s.LoyaltyTxnSerializer


class ReferralViewSet(AuditedModelViewSet):
    queryset = m.Referral.objects.all()
    serializer_class = s.ReferralSerializer
    filterset_fields = ["status"]


class SettlementViewSet(AuditedModelViewSet):
    queryset = m.Settlement.objects.select_related("branch").all()
    serializer_class = s.SettlementSerializer
    filterset_fields = ["period", "status", "branch"]


class CashCloseViewSet(AuditedModelViewSet):
    queryset = m.CashClose.objects.select_related("branch").all()
    serializer_class = s.CashCloseSerializer
    filterset_fields = ["branch", "status"]


# ------------------------------------------------------------ auth (bypass)
@api_view(["POST"])
@permission_classes([AllowAny])
def auth_login(request):
    """Bypass login: accepts anything, returns a fake token + demo user."""
    return Response(
        {
            "token": "dev-bypass",
            "user": {
                "name": "Org Super Admin",
                "phone": "9999999999",
                "role": "super_admin",
            },
        }
    )


@api_view(["POST"])
@permission_classes([AllowAny])
def auth_logout(request):
    return Response({"ok": True})


# ------------------------------------------------------------ summaries
def _money(qs, field="total"):
    return qs.aggregate(v=Sum(field))["v"] or 0


@api_view(["GET"])
def dashboard_summary(request):
    orders = m.Order.objects.all()
    today = timezone.now().date()
    todays = orders.filter(created_at__date=today)
    since = timezone.now() - timedelta(days=30)
    series = []
    for i in range(29, -1, -1):
        d = (timezone.now() - timedelta(days=i)).date()
        day_orders = orders.filter(created_at__date=d)
        series.append({"date": d.strftime("%m-%d"), "revenue": float(_money(day_orders))})
    return Response(
        {
            "today_revenue": float(_money(todays)),
            "orders_today": todays.count(),
            "customers": m.Customer.objects.count(),
            "repeat_rate": 0.0,
            "revenue_series": series,
            "revenue_30d": float(_money(orders.filter(created_at__gte=since))),
            "orders_30d": orders.filter(created_at__gte=since).count(),
            "branches": [
                {
                    "code": b.code,
                    "name": b.name,
                    "revenue": float(_money(b.orders.all())),
                    "orders": b.orders.count(),
                }
                for b in m.Branch.objects.all()
            ],
        }
    )


@api_view(["GET"])
def orders_summary(request):
    orders = m.Order.objects.all()
    stage_counts = {s: orders.filter(stage=s).count() for s in m.Order.STAGES}
    today = timezone.now().date()
    return Response(
        {
            "today": orders.filter(created_at__date=today).count(),
            "today_revenue": float(_money(orders.filter(created_at__date=today))),
            "new": orders.filter(stage="booking").count(),
            "workshop": orders.filter(stage__in=["in", "qc", "sorted"]).count(),
            "ready": orders.filter(stage="packed").count(),
            "outstanding": float(_money(orders.exclude(payment_status="paid"))),
            "overdue": 0,
            "stages": stage_counts,
        }
    )


@api_view(["GET"])
def customers_summary(request):
    c = m.Customer.objects.all()
    total_ltv = sum((_money(cust.orders.all()) for cust in c), start=0)
    return Response(
        {
            "total": c.count(),
            "new_this_month": c.filter(created_at__month=timezone.now().month).count(),
            "active": c.filter(status="active").count(),
            "at_risk": c.filter(status="at_risk").count(),
            "vip": c.filter(status="vip").count(),
            "birthday": 0,
            "portfolio_ltv": float(total_ltv),
        }
    )


@api_view(["GET"])
def reports_summary(request):
    orders = m.Order.objects.all()
    payments = m.Payment.objects.filter(status="succeeded")
    n = orders.count()
    revenue = float(_money(orders))
    return Response(
        {
            "revenue": revenue,
            "orders": n,
            "avg_order": round(revenue / n, 2) if n else 0,
            "collected": float(_money(payments, "amount")),
            "tat_median": None,
            "repeat": 0,
        }
    )


@api_view(["GET"])
def operations_summary(request):
    orders = m.Order.objects.all()
    return Response(
        {
            "revenue_mtd": float(_money(orders.filter(created_at__month=timezone.now().month))),
            "active_pipeline": orders.exclude(stage__in=["delivered", "closed"]).count(),
            "open_challans": m.Challan.objects.exclude(status__in=["received", "cancelled"]).count(),
            "critical_alerts": 0,
        }
    )


@api_view(["GET"])
def generic_counts(request):
    """Lightweight counts used by several module KPI headers."""
    return Response(
        {
            "workshop": {s: m.Batch.objects.filter(status=s).count() for s, _ in m.Batch.STATUS},
            "transfers": {s: m.Challan.objects.filter(status=s).count() for s, _ in m.Challan.STATUS},
            "jobs": {s: m.Job.objects.filter(status=s).count() for s, _ in m.Job.STATUS},
            "loyalty_accounts": m.LoyaltyAccount.objects.count(),
            "expenses_total": float(_money(m.Expense.objects.all(), "amount")),
        }
    )
