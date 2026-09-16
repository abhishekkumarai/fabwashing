"""Seed the demo tenant (see PRD.md §5). Idempotent: safe to run repeatedly."""
from django.core.management.base import BaseCommand

from api import models as m


class Command(BaseCommand):
    help = "Seed demo data for the WashNLaundry LaundryPro clone."

    def handle(self, *args, **options):
        org, _ = m.Organisation.objects.get_or_create(
            name="Demo Laundry Patna",
            defaults={"legal_name": "Demo Laundry Patna Pvt Ltd", "state": "Bihar"},
        )

        branches = [
            ("PAT01", "Patna-01 Boring Road", m.Branch.LIVE_STORE),
            ("PAT-PL", "Patna Central Plant", m.Branch.PLANT),
            ("PAT02", "Patna-02 Rajendranagar", m.Branch.STORE),
        ]
        for code, name, btype in branches:
            m.Branch.objects.get_or_create(
                code=code,
                defaults={"name": name, "type": btype, "city": "Patna", "state": "Bihar"},
            )

        cust, cust_created = m.Customer.objects.get_or_create(
            phone="9835555329",
            defaults={"name": "Aditya singh", "status": m.Customer.NEW},
        )

        cat, cat_created = m.ServiceCategory.objects.get_or_create(
            name="Dry cleaning", defaults={"icon": "shirt"}
        )

        m.Staff.objects.get_or_create(
            name="Org Super Admin",
            defaults={"role": "Super Admin", "is_super_admin": True},
        )

        m.Setting.objects.get_or_create(
            key="loyalty_rules",
            defaults={
                "value": {
                    "earn": "1 pt / ₹100",
                    "redeem": "1 pt = ₹0.5",
                    "referral": "+50 pts both sides",
                }
            },
        )

        # Seed audit events (only if audit is empty, to match the original's 2 events).
        if not m.AuditLog.objects.exists():
            m.AuditLog.objects.create(
                action=m.AuditLog.CREATE, entity="ServiceCategory",
                record_id=str(cat.id), actor_name="Rajesh Kumar",
                payload={"name": "Dry cleaning"},
            )
            m.AuditLog.objects.create(
                action=m.AuditLog.CREATE, entity="Customer",
                record_id=str(cust.id), actor_name="Rajesh Kumar",
                payload={"name": "Aditya singh"},
            )

        self.stdout.write(self.style.SUCCESS(
            f"Seeded: {m.Branch.objects.count()} branches, "
            f"{m.Customer.objects.count()} customer(s), "
            f"{m.ServiceCategory.objects.count()} category(ies), "
            f"{m.AuditLog.objects.count()} audit event(s)."
        ))
