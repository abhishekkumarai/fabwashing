// Minimal EN / HI (Hinglish) dictionary. Untranslated keys fall back to EN.
export type Lang = "en" | "hi";

export const dict: Record<string, { en: string; hi: string }> = {
  "app.subtitle": { en: "Multi-branch · Franchise", hi: "Multi-branch · Franchise" },
  "nav.dashboard": { en: "Dashboard", hi: "Dashboard" },
  "nav.operations": { en: "Operations", hi: "Operations" },
  "nav.pos": { en: "New Order (POS)", hi: "Naya Order (POS)" },
  "nav.orders": { en: "Orders", hi: "Orders" },
  "nav.transfers": { en: "Bags & challans", hi: "Bags & challans" },
  "nav.pickup": { en: "Customer pickup / delivery", hi: "Pickup / delivery" },
  "nav.track": { en: "Track order", hi: "Order track karein" },
  "nav.plant": { en: "Plant intake", hi: "Plant intake" },
  "nav.challans": { en: "Challans", hi: "Challans" },
  "nav.workshop": { en: "Workshop", hi: "Workshop" },
  "nav.scan": { en: "Scan / QC", hi: "Scan / QC" },
  "nav.ordersPlant": { en: "Orders in plant", hi: "Plant ke orders" },
  "nav.runs": { en: "My Runs", hi: "Meri Runs" },
  "nav.customers": { en: "Customers", hi: "Customers" },
  "nav.loyalty": { en: "Loyalty", hi: "Loyalty" },
  "nav.messages": { en: "Messages", hi: "Messages" },
  "nav.catalog": { en: "Catalog", hi: "Catalog" },
  "nav.inventory": { en: "Inventory", hi: "Inventory" },
  "nav.expenses": { en: "Expenses", hi: "Expenses" },
  "nav.staff": { en: "Staff", hi: "Staff" },
  "nav.reports": { en: "Reports", hi: "Reports" },
  "nav.franchise": { en: "Franchise", hi: "Franchise" },
  "nav.cashClose": { en: "Cash close", hi: "Cash close" },
  "nav.clockIn": { en: "Clock in / out", hi: "Clock in / out" },
  "nav.audit": { en: "Audit log", hi: "Audit log" },
  "nav.settings": { en: "Settings", hi: "Settings" },
  "top.branch": { en: "Branch:", hi: "Branch:" },
  "top.allBranches": { en: "All branches", hi: "Sabhi branches" },
  "top.signOut": { en: "Sign out", hi: "Sign out" },
  "login.subtitle": { en: "Phone OTP or staff email & password", hi: "Phone OTP ya staff email & password" },
  "login.signIn": { en: "Sign in", hi: "Sign in" },
  "common.export": { en: "Export", hi: "Export" },
  "common.newOrder": { en: "New order", hi: "Naya order" },
};

export function translate(key: string, lang: Lang): string {
  const entry = dict[key];
  if (!entry) return key;
  return entry[lang] || entry.en;
}
