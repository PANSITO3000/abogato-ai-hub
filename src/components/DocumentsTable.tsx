import { Search, LayoutList, LayoutGrid, MoreVertical, Pencil, Upload, CheckCircle2, Clock, FileCheck2 } from "lucide-react";

type DocStatus = "DRAFT" | "UPLOADED" | "TO APPROVE" | "APPROVED" | "FULLY SIGNED";

interface Document {
  name: string;
  type: string;
  lastModified: string;
  folder?: string;
  status: DocStatus;
  owner: string;
}

const documents: Document[] = [
  { name: "LTH", type: "Sarah NDA demo", lastModified: "20 Ago", status: "DRAFT", owner: "MR" },
  { name: "LTH", type: "NDA (Platform trail…)", lastModified: "20 Ago", status: "DRAFT", owner: "JL" },
  { name: "Acme Limited - Mutual NDA.docx", type: "NDA (Platform trail…)", lastModified: "20 Ago", status: "UPLOADED", owner: "AP" },
  { name: "Elkipo", type: "MSA (demo purposes)", lastModified: "20 Ago", status: "TO APPROVE", owner: "SG" },
  { name: "Acme Inc Vendor Contract (1)", type: "Solicitud de proveedor", lastModified: "18 Ago", status: "UPLOADED", owner: "MR" },
  { name: "ACME", type: "Solicitud de proveedor", lastModified: "14 Ago", status: "DRAFT", owner: "JL" },
  { name: "Vendor contract word.docx", type: "Solicitud de proveedor", lastModified: "13 Ago", status: "UPLOADED", owner: "AP" },
  { name: "IT SERVICES AGREEMENT", type: "Solicitud de proveedor", lastModified: "12 Ago", status: "DRAFT", owner: "SG" },
  { name: "Vendor", type: "Solicitud de proveedor", lastModified: "12 Ago", status: "DRAFT", owner: "MR" },
  { name: "ACME Inc", type: "Solicitud de proveedor", lastModified: "12 Ago", status: "DRAFT", owner: "JL" },
  { name: "Other I", type: "Solicitud de proveedor", lastModified: "12 Ago", status: "FULLY SIGNED", owner: "AP" },
  { name: "Order party name", type: "Order Form - Enterprise", lastModified: "12 Ago", status: "DRAFT", owner: "SG" },
  { name: "Acme Ltd NDA.docx", type: "Other", lastModified: "7 Ago", status: "UPLOADED", owner: "MR" },
  { name: "Other party name", type: "Order Form - Enterprise", lastModified: "5 Ago", status: "FULLY SIGNED", owner: "JL" },
];

const statusConfig: Record<DocStatus, { icon: React.ElementType; bgClass: string; textClass: string }> = {
  DRAFT: { icon: Pencil, bgClass: "bg-status-draft-bg", textClass: "text-status-draft" },
  UPLOADED: { icon: Upload, bgClass: "bg-status-uploaded-bg", textClass: "text-status-uploaded" },
  "TO APPROVE": { icon: Clock, bgClass: "bg-status-pending-bg", textClass: "text-status-pending" },
  APPROVED: { icon: CheckCircle2, bgClass: "bg-status-approved-bg", textClass: "text-status-approved" },
  "FULLY SIGNED": { icon: FileCheck2, bgClass: "bg-status-signed-bg", textClass: "text-status-signed" },
};

const avatarColors = ["bg-primary", "bg-accent", "bg-muted"];

export default function DocumentsTable() {
  return (
    <div className="flex-1 flex flex-col min-w-0 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-border">
        <h2 className="text-xl font-semibold text-foreground">Todos los documentos</h2>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-md hover:bg-secondary text-muted-foreground transition-colors">
            <Search className="h-4.5 w-4.5" />
          </button>
          <button className="p-2 rounded-md bg-secondary text-foreground transition-colors">
            <LayoutList className="h-4.5 w-4.5" />
          </button>
          <button className="p-2 rounded-md hover:bg-secondary text-muted-foreground transition-colors">
            <LayoutGrid className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-6 py-3 text-[12px] font-medium text-muted-foreground uppercase tracking-wide">Nombre del documento ↕</th>
              <th className="text-left px-4 py-3 text-[12px] font-medium text-muted-foreground uppercase tracking-wide">Tipo</th>
              <th className="text-left px-4 py-3 text-[12px] font-medium text-muted-foreground uppercase tracking-wide">Última mod.</th>
              <th className="text-left px-4 py-3 text-[12px] font-medium text-muted-foreground uppercase tracking-wide">Carpeta</th>
              <th className="text-left px-4 py-3 text-[12px] font-medium text-muted-foreground uppercase tracking-wide">Estado</th>
              <th className="w-10 px-2"></th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc, i) => {
              const st = statusConfig[doc.status];
              const Icon = st.icon;
              return (
                <tr
                  key={i}
                  className="border-b border-border hover:bg-secondary/50 transition-colors cursor-pointer group"
                >
                  <td className="px-6 py-3 text-[13.5px] font-medium text-foreground max-w-[280px] truncate">
                    {doc.name}
                  </td>
                  <td className="px-4 py-3 text-[13px] text-muted-foreground max-w-[180px] truncate">
                    {doc.type}
                  </td>
                  <td className="px-4 py-3 text-[13px] text-muted-foreground whitespace-nowrap">
                    {doc.lastModified}
                  </td>
                  <td className="px-4 py-3 text-[13px] text-muted-foreground">
                    {doc.folder || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-medium ${st.bgClass} ${st.textClass}`}>
                      <Icon className="h-3 w-3" />
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-2 py-3">
                    <div className="flex items-center gap-2">
                      <div className={`h-6 w-6 rounded-full ${avatarColors[i % 3]} flex items-center justify-center text-[10px] font-semibold text-primary-foreground`}>
                        {doc.owner}
                      </div>
                      <button className="p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-secondary text-muted-foreground transition-all">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
