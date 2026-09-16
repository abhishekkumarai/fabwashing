from django.contrib import admin

from . import models as m

for model in [
    m.Organisation, m.Branch, m.Setting, m.AuditLog, m.ServiceCategory, m.Service,
    m.Customer, m.Order, m.OrderLine, m.Payment, m.InventoryItem, m.Staff,
    m.Challan, m.Batch, m.Job, m.Expense, m.LoyaltyAccount, m.Settlement, m.CashClose,
]:
    try:
        admin.site.register(model)
    except admin.sites.AlreadyRegistered:
        pass
