import { useState } from "react";
import {
  Home,
  UserPlus,
  Contact,
  Building2,
  Handshake,
  ListTodo,
  CalendarDays,
  Phone,
  BarChart3,
  PieChart,
  Package,
  FileText,
  ShoppingCart,
  ClipboardList,
  Receipt,
  Megaphone,
  Truck,
  DollarSign,
  Briefcase,
  Lightbulb,
  FolderOpen,
  TrendingUp,
  Share2,
  Layers,
  ChevronDown,
  ChevronRight,
  Plus,
  Settings,
  HelpCircle,
  Mail,
  Globe,
  Workflow,
  Zap,
  Target,
  Clock,
  Users,
  BookOpen,
} from "lucide-react";

interface MenuItem {
  label: string;
  icon: React.ElementType;
  count?: number;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
  defaultOpen?: boolean;
}

const sections: MenuSection[] = [
  {
    title: "Principal",
    defaultOpen: true,
    items: [
      { label: "Inicio", icon: Home },
      { label: "Feeds", icon: Share2 },
    ],
  },
  {
    title: "Ventas",
    defaultOpen: true,
    items: [
      { label: "Leads", icon: UserPlus, count: 128 },
      { label: "Contactos", icon: Contact, count: 340 },
      { label: "Cuentas", icon: Building2, count: 95 },
      { label: "Negocios", icon: Handshake, count: 47 },
      { label: "Pronósticos", icon: TrendingUp },
    ],
  },
  {
    title: "Actividades",
    defaultOpen: true,
    items: [
      { label: "Tareas", icon: ListTodo, count: 23 },
      { label: "Reuniones", icon: CalendarDays, count: 8 },
      { label: "Llamadas", icon: Phone, count: 12 },
    ],
  },
  {
    title: "Marketing",
    defaultOpen: false,
    items: [
      { label: "Campañas", icon: Megaphone },
      { label: "Email Marketing", icon: Mail },
      { label: "Social", icon: Globe },
    ],
  },
  {
    title: "Inventario",
    defaultOpen: false,
    items: [
      { label: "Productos", icon: Package },
      { label: "Cotizaciones", icon: FileText },
      { label: "Órdenes de venta", icon: ShoppingCart },
      { label: "Órdenes de compra", icon: ClipboardList },
      { label: "Facturas", icon: Receipt },
      { label: "Proveedores", icon: Truck },
      { label: "Listas de precios", icon: DollarSign },
    ],
  },
  {
    title: "Soporte",
    defaultOpen: false,
    items: [
      { label: "Casos", icon: Briefcase },
      { label: "Soluciones", icon: Lightbulb },
    ],
  },
  {
    title: "Analítica",
    defaultOpen: false,
    items: [
      { label: "Reportes", icon: BarChart3 },
      { label: "Analíticas", icon: PieChart },
      { label: "Paneles", icon: Layers },
    ],
  },
  {
    title: "Herramientas",
    defaultOpen: false,
    items: [
      { label: "Documentos", icon: FolderOpen },
      { label: "Workflows", icon: Workflow },
      { label: "Automatización", icon: Zap },
      { label: "Objetivos", icon: Target },
      { label: "SLA", icon: Clock },
      { label: "Territorios", icon: Users },
      { label: "Base de conocimiento", icon: BookOpen },
    ],
  },
];

export default function AppSidebar() {
  const [activeItem, setActiveItem] = useState("Inicio");
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    Object.fromEntries(sections.map((s) => [s.title, s.defaultOpen ?? false]))
  );

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <aside
      className="w-[240px] min-w-[240px] h-screen border-r border-border flex flex-col"
      style={{ backgroundColor: "hsl(var(--sidebar-bg))" }}
    >
      {/* Logo */}
      <div className="px-5 py-5 border-b border-border">
        <h1 className="text-xl font-bold tracking-tight text-foreground">
          abogato <span className="text-primary">ai</span>
        </h1>
      </div>

      {/* Scrollable nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-3">
        {sections.map((section) => (
          <div key={section.title} className="mb-1">
            <button
              onClick={() => toggleSection(section.title)}
              className="w-full flex items-center justify-between px-2 py-2 group"
            >
              <span
                className="text-[11px] font-semibold uppercase tracking-wider"
                style={{ color: "hsl(var(--sidebar-section))" }}
              >
                {section.title}
              </span>
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground">
                  {openSections[section.title] ? (
                    <ChevronDown className="h-3 w-3" />
                  ) : (
                    <ChevronRight className="h-3 w-3" />
                  )}
                </span>
              </div>
            </button>

            {openSections[section.title] && (
              <ul className="space-y-0.5 mb-2 animate-fade-in">
                {section.items.map((item) => {
                  const isActive = activeItem === item.label;
                  return (
                    <li key={item.label}>
                      <button
                        onClick={() => setActiveItem(item.label)}
                        className={`w-full flex items-center gap-2.5 px-2.5 py-[7px] rounded-md text-[13px] font-medium transition-colors ${
                          isActive
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground hover:bg-secondary"
                        }`}
                      >
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        <span className="flex-1 text-left truncate">{item.label}</span>
                        {item.count && (
                          <span className="text-[11px] text-muted-foreground tabular-nums">
                            {item.count}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}
      </nav>

      {/* Bottom actions */}
      <div className="border-t border-border px-3 py-3 space-y-0.5">
        <button className="w-full flex items-center gap-2.5 px-2.5 py-[7px] rounded-md text-[13px] text-muted-foreground hover:bg-secondary transition-colors">
          <Settings className="h-4 w-4" />
          <span>Configuración</span>
        </button>
        <button className="w-full flex items-center gap-2.5 px-2.5 py-[7px] rounded-md text-[13px] text-muted-foreground hover:bg-secondary transition-colors">
          <HelpCircle className="h-4 w-4" />
          <span>Ayuda</span>
        </button>
      </div>
    </aside>
  );
}
