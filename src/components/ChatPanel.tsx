import { useState } from "react";
import { Search, Sparkles, ChevronRight, Send, MessageSquare } from "lucide-react";
import robotAvatar from "@/assets/robot-avatar.png";

interface ActionCard {
  emoji: string;
  label: string;
}

const actions: ActionCard[] = [
  { emoji: "✏️", label: "Redactar un nuevo contrato" },
  { emoji: "📄", label: "Resumir un documento" },
  { emoji: "📘", label: "Explicar un término legal" },
  { emoji: "📝", label: "Revisar y editar un contrato" },
];

const suggestions = [
  "Resumir el NDA con Empresa XYZ",
  "Explicar la cláusula de indemnización",
  "Revisar el contrato de proveedor y sugerir mejoras",
];

export default function ChatPanel() {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<{ role: string; text: string }[]>([]);
  const showWelcome = chatMessages.length === 0;

  const handleSend = () => {
    if (!message.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      { role: "user", text: message },
    ]);
    const userMsg = message;
    setMessage("");
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", text: `Gracias por tu consulta sobre "${userMsg}". Estoy analizando la información para darte la mejor respuesta posible. ¿Necesitas algo más?` },
      ]);
    }, 1200);
  };

  const handleSuggestion = (text: string) => {
    setMessage(text);
  };

  return (
    <div className="w-[360px] min-w-[360px] border-l border-border flex flex-col bg-background">
      {/* Header */}
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold text-foreground">Home Chat</h3>
          <Sparkles className="h-4 w-4 text-primary" />
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Pregunta algo…"
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border text-[13px] placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition-shadow"
            style={{ backgroundColor: "hsl(var(--chat-input-bg))" }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 pb-4">
        {showWelcome ? (
          <div className="animate-fade-in">
            {/* Welcome */}
            <div className="mt-4 mb-5">
              <h4 className="text-lg font-semibold text-foreground">¡Bienvenido! 🤖</h4>
              <p className="text-[13.5px] text-muted-foreground mt-1">¿Qué te gustaría hacer hoy?</p>
            </div>

            {/* Action cards */}
            <div className="space-y-2 mb-6">
              {actions.map((action) => (
                <button
                  key={action.label}
                  onClick={() => handleSuggestion(action.label)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-border hover:border-primary/30 hover:bg-accent/50 transition-all group"
                >
                  <span className="text-lg">{action.emoji}</span>
                  <span className="flex-1 text-left text-[13.5px] font-medium text-foreground">{action.label}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </button>
              ))}
            </div>

            {/* Suggested questions */}
            <div>
              <p className="text-[12px] font-medium text-muted-foreground uppercase tracking-wide mb-2.5">Preguntas sugeridas</p>
              <div className="space-y-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSuggestion(s)}
                    className="w-full flex items-start gap-2.5 px-3 py-2.5 rounded-lg hover:bg-accent/50 transition-colors text-left"
                  >
                    <MessageSquare className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-[13px] text-muted-foreground leading-snug">{s}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 mt-3 animate-fade-in">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                {msg.role === "assistant" && (
                  <img src={robotAvatar} alt="AI" className="h-7 w-7 rounded-full flex-shrink-0 mt-0.5" />
                )}
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-xl text-[13.5px] leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-secondary text-foreground rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-border">
        <div className="flex items-center gap-2">
          <img src={robotAvatar} alt="AI" className="h-8 w-8 rounded-full flex-shrink-0" />
          <div className="flex-1 relative">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Enviar un mensaje…"
              className="w-full px-4 py-2.5 rounded-lg border border-border text-[13px] placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 pr-10 transition-shadow"
              style={{ backgroundColor: "hsl(var(--chat-input-bg))" }}
            />
            <button
              onClick={handleSend}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-primary hover:text-primary/80 transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
