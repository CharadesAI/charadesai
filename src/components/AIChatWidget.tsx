import { useState } from "react";
import { MessageCircle, X, Send, Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const initialMessages: Message[] = [
  {
    role: "assistant",
    content: "Hi! I'm the CharadesAI assistant. How can I help you today?",
  },
];

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I'd be happy to help! Our API offers real-time lip-reading with sub-50ms latency.",
        "Great question! You can get started with our free tier - 1,000 API calls per month.",
        "Our SDKs support JavaScript, Python, and PHP. Check out our documentation for quick-start guides!",
        "CharadesAI supports 40+ languages for lip-reading recognition.",
      ];
      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];
      const assistantMessage: Message = {
        role: "assistant",
        content: randomResponse,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full",
          "bg-gradient-ai text-primary-foreground",
          "flex items-center justify-center",
          "shadow-xl shadow-primary/25",
          "hover:scale-110 transition-transform duration-300",
          "animate-pulse-glow"
        )}
      >
        {isOpen ? (
          <X className='w-6 h-6' />
        ) : (
          <MessageCircle className='w-6 h-6' />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className='fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] animate-scale-up'>
          <div className='rounded-2xl overflow-hidden bg-card border border-border shadow-2xl'>
            {/* Header */}
            <div className='p-4 bg-gradient-ai flex items-center gap-3'>
              <div className='w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center'>
                <Bot className='w-5 h-5 text-primary-foreground' />
              </div>
              <div>
                <h3 className='font-semibold text-primary-foreground'>
                  CharadesAI Assistant
                </h3>
                <p className='text-xs text-primary-foreground/80 flex items-center gap-1'>
                  <span className='w-2 h-2 rounded-full bg-neon-emerald animate-pulse' />
                  Online
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className='h-80 overflow-y-auto p-4 space-y-4 bg-background'>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] px-4 py-2 rounded-2xl text-sm",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-secondary text-secondary-foreground rounded-bl-sm"
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className='flex justify-start'>
                  <div className='bg-secondary px-4 py-2 rounded-2xl rounded-bl-sm'>
                    <div className='flex gap-1'>
                      <span className='w-2 h-2 rounded-full bg-muted-foreground animate-bounce' />
                      <span className='w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.1s]' />
                      <span className='w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.2s]' />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className='p-4 border-t border-border bg-card'>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className='flex gap-2'
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder='Type your message...'
                  className='flex-1'
                />
                <Button type='submit' size='icon' variant='hero'>
                  <Send className='w-4 h-4' />
                </Button>
              </form>
              <p className='text-xs text-muted-foreground text-center mt-2 flex items-center justify-center gap-1'>
                <Sparkles className='w-3 h-3' />
                Powered by CharadesAI
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
