from django.urls import include, path
from rest_framework.routers import DefaultRouter

from . import views as v

router = DefaultRouter()
router.register("branches", v.BranchViewSet)
router.register("organisations", v.OrganisationViewSet)
router.register("settings", v.SettingViewSet)
router.register("audit", v.AuditLogViewSet)
router.register("service-categories", v.ServiceCategoryViewSet)
router.register("services", v.ServiceViewSet)
router.register("customers", v.CustomerViewSet)
router.register("orders", v.OrderViewSet)
router.register("order-lines", v.OrderLineViewSet)
router.register("inventory-items", v.InventoryItemViewSet)
router.register("stock-entries", v.StockLedgerEntryViewSet)
router.register("staff", v.StaffViewSet)
router.register("attendance", v.AttendanceViewSet)
router.register("challans", v.ChallanViewSet)
router.register("batches", v.BatchViewSet)
router.register("scan-events", v.ScanEventViewSet)
router.register("jobs", v.JobViewSet)
router.register("expenses", v.ExpenseViewSet)
router.register("loyalty-accounts", v.LoyaltyAccountViewSet)
router.register("loyalty-txns", v.LoyaltyTxnViewSet)
router.register("referrals", v.ReferralViewSet)
router.register("settlements", v.SettlementViewSet)
router.register("cash-closes", v.CashCloseViewSet)

urlpatterns = [
    path("auth/login", v.auth_login),
    path("auth/logout", v.auth_logout),
    path("dashboard/summary", v.dashboard_summary),
    path("orders/summary", v.orders_summary),
    path("customers/summary", v.customers_summary),
    path("reports/summary", v.reports_summary),
    path("operations/summary", v.operations_summary),
    path("counts", v.generic_counts),
    path("", include(router.urls)),
]
