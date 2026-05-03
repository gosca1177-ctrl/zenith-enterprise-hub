import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Send, X, Bot, Sparkles, BrainCircuit } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  role: "user" | "bot";
  text: string;
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hello! I am Zenith AI. How can I assist you with your digital assets, properties, or workflow today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: "bot", text: data.response || data.message || "I'm having trouble connecting right now." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "bot", text: "I'm having trouble connecting to my neural network. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        className="fixed bottom-6 right-6 size-12 rounded-full shadow-2xl z-[100] group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="size-6" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} className="relative">
              <Bot className="size-6" />
              <Sparkles className="size-3 absolute -top-1 -right-1 text-amber-300 animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-20 right-6 w-[380px] z-[100]"
          >
            <Card className="shadow-2xl border-none overflow-hidden bg-background/95 backdrop-blur-xl">
              <CardHeader className="bg-primary p-4 text-primary-foreground flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <BrainCircuit className="size-5" />
                  <CardTitle className="text-lg">Zenith AI</CardTitle>
                </div>
                <Badge variant="secondary" className="text-[9px] uppercase tracking-tighter bg-muted/50 border-none text-muted-foreground font-bold">Live Engine</Badge>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[400px] p-4" ref={scrollRef}>
                  <div className="space-y-4">
                    {messages.map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-2xl p-3 text-sm ${
                          msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-none' : 'bg-muted rounded-tl-none'
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-muted rounded-2xl rounded-tl-none p-3 text-sm flex gap-1">
                          <span className="size-1 bg-foreground/30 rounded-full animate-bounce" />
                          <span className="size-1 bg-foreground/30 rounded-full animate-bounce [animation-delay:0.2s]" />
                          <span className="size-1 bg-foreground/30 rounded-full animate-bounce [animation-delay:0.4s]" />
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="p-4 border-t">
                <form className="flex w-full gap-2" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
                  <Input
                    placeholder="Ask Zenith AI..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="rounded-full bg-muted/50 border-none focus-visible:ring-1"
                  />
                  <Button size="icon" type="submit" className="rounded-full shrink-0" disabled={isLoading}>
                    <Send className="size-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
