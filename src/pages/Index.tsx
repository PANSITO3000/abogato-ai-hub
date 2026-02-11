import AppSidebar from "@/components/AppSidebar";
import DocumentsTable from "@/components/DocumentsTable";
import ChatPanel from "@/components/ChatPanel";

const Index = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <AppSidebar />
      <DocumentsTable />
      <ChatPanel />
    </div>
  );
};

export default Index;
