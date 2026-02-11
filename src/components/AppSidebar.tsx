import { useState } from "react";
import {
  Home,
  FileText,
  Clock,
  User,
  Archive,
  ChevronDown,
  ChevronRight,
  FileSignature,
  Users,
  Briefcase,
  Plus,
  MoreHorizontal,
} from "lucide-react";

interface MenuItem {
  label: string;
  icon: React.ElementType;
  count?: number;
  active?: boolean;
}

const mainMenu: MenuItem[] = [
  { label: "Inicio", icon: Home },
  { label: "Todos los documentos", icon: FileText, count: 451, active: true },
  { label: "Pendientes", icon: Clock },
  { label: "Mis documentos", icon: User },
  { label: "Archivados", icon: Archive },
];

const viewItems = [
  { label: "Contratos", icon: FileSignature },
  { label: "Clientes", icon: Users },
  { label: "Trámites", icon: Briefcase },
];

export default function AppSidebar() {
  const [activeItem, setActiveItem] = useState("Todos los documentos");
  const [viewsOpen, setViewsOpen] = useState(true);

  return (
    <aside className="w-[240px] min-w-[240px] h-screen border-r border-border flex flex-col"
      style={{ backgroundColor: "hsl(var(--sidebar-bg))" }}
    >
      {/* Logo */}
      <div className="px-5 py-5">
        <h1 className="text-xl font-bold tracking-tight text-foreground">
          abogato <span className="text-primary">ai</span>
        </h1>
      </div>

      {/* Main menu */}
      <nav className="flex-1 overflow-y-auto px-3">
        <div className="mb-1">
          <span className="px-2 text-[11px] font-semibold uppercase tracking-wider"
            style={{ color: "hsl(var(--sidebar-section))" }}
          >
            Documentos
          </span>
        </div>

        <ul className="space-y-0.5">
          {mainMenu.map((item) => {
            const isActive = activeItem === item.label;
            return (
              <li key={item.label}>
                <button
                  onClick={() => setActiveItem(item.label)}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[13.5px] font-medium transition-colors ${
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.count && (
                    <span className="text-xs text-muted-foreground">{item.count}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Views */}
        <div className="mt-6 mb-1 flex items-center justify-between px-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider"
            style={{ color: "hsl(var(--sidebar-section))" }}
          >
            Vistas
          </span>
          <button className="p-0.5 rounded hover:bg-secondary text-muted-foreground">
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>

        <button
          onClick={() => setViewsOpen(!viewsOpen)}
          className="w-full flex items-center gap-2 px-2.5 py-1.5 text-[13px] text-muted-foreground hover:bg-secondary rounded-md transition-colors"
        >
          {viewsOpen ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
          <span>Personalizadas</span>
        </button>

        {viewsOpen && (
          <ul className="ml-2 space-y-0.5 animate-fade-in">
            {viewItems.map((item) => (
              <li key={item.label}>
                <button className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[13px] text-muted-foreground hover:bg-secondary transition-colors">
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
            <li>
              <button className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[13px] text-primary hover:bg-secondary transition-colors">
                <MoreHorizontal className="h-4 w-4" />
                <span>Ver más…</span>
              </button>
            </li>
          </ul>
        )}
      </nav>
    </aside>
  );
}
