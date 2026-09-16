import {
  Home, Activity, ShoppingCart, List, ArrowLeftRight, Truck, History,
  Factory, LayoutDashboard, ScanLine, Bike, Users, Gift, MessageCircle,
  Layers, Box, Receipt, UserCog, BarChart3, Building2, Wallet, Clock,
  Shield, Settings, LucideIcon,
} from "lucide-react";

export type NavItem = { key: string; href: string; icon: LucideIcon; badge?: string };
export type NavGroup = { title?: string; items: NavItem[] };

export const NAV: NavGroup[] = [
  {
    items: [
      { key: "nav.dashboard", href: "/dashboard", icon: Home },
      { key: "nav.operations", href: "/operations", icon: Activity },
    ],
  },
  {
    title: "STORE COUNTER",
    items: [
      { key: "nav.pos", href: "/pos", icon: ShoppingCart },
      { key: "nav.orders", href: "/orders", icon: List },
      { key: "nav.transfers", href: "/transfers", icon: ArrowLeftRight },
      { key: "nav.pickup", href: "/pickup-delivery", icon: Truck },
      { key: "nav.track", href: "/timeline", icon: History },
    ],
  },
  {
    title: "PLANT · WASH HUB",
    items: [
      { key: "nav.plant", href: "/plant", icon: Factory },
      { key: "nav.challans", href: "/transfers", icon: ArrowLeftRight },
      { key: "nav.workshop", href: "/workshop", icon: LayoutDashboard },
      { key: "nav.scan", href: "/scan", icon: ScanLine },
      { key: "nav.ordersPlant", href: "/orders", icon: List },
      { key: "nav.track", href: "/timeline", icon: History },
    ],
  },
  {
    title: "FIELD",
    items: [{ key: "nav.runs", href: "/rider", icon: Bike }],
  },
  {
    title: "CUSTOMERS",
    items: [
      { key: "nav.customers", href: "/customers", icon: Users },
      { key: "nav.loyalty", href: "/loyalty", icon: Gift },
      { key: "nav.messages", href: "/messages", icon: MessageCircle, badge: "soon" },
    ],
  },
  {
    title: "BUSINESS",
    items: [
      { key: "nav.catalog", href: "/catalog", icon: Layers },
      { key: "nav.inventory", href: "/inventory", icon: Box },
      { key: "nav.expenses", href: "/expenses", icon: Receipt },
      { key: "nav.staff", href: "/staff", icon: UserCog },
      { key: "nav.reports", href: "/reports", icon: BarChart3 },
      { key: "nav.franchise", href: "/franchise", icon: Building2 },
      { key: "nav.cashClose", href: "/cash-close", icon: Wallet },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      { key: "nav.clockIn", href: "/clock-in", icon: Clock },
      { key: "nav.audit", href: "/audit", icon: Shield },
      { key: "nav.settings", href: "/settings", icon: Settings },
    ],
  },
];
