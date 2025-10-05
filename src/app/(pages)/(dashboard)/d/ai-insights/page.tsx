"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Send, Loader2, RotateCcw, Trash2, StopCircle } from "lucide-react";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const SUGGESTIONS: string[] = [
  "Summarize the top trends in NASA bioscience publications from the last 5 years.",
  "What entities are most connected to 'microgravity' in the knowledge graph?",
  "Find correlations between radiation exposure and gene expression findings.",
  "Suggest 3 new research hypotheses to explore next.",
];

const ENDPOINT = "/api/ai/insights";

// Marquee suggestions (3 chips)
function MarqueeSuggestions({
  suggestions,
  onSuggestion,
  duration = "18s",
}: {
  suggestions: string[];
  onSuggestion: (s: string) => void;
  duration?: string;
}) {
  // Only take three
  const items = React.useMemo(() => suggestions.slice(0, 3), [suggestions]);
  // Duplicate for seamless loop
  const looped = React.useMemo(() => [...items, ...items], [items]);

  return (
    <div className="mx-auto mt-5 max-w-4xl px-6">
      <div
        className="
          group overflow-hidden
          [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]
        "
      >
        <div
          className={cn(
            "flex items-center gap-3 whitespace-nowrap",
            "animate-marquee",
            "group-hover:[animation-play-state:paused]"
          )}
          style={{ ["--marquee-duration" as string]: duration } as React.CSSProperties}
        >
          {looped.map((s, idx) => (
            <Button
              key={`${s}-${idx}`}
              type="button"
              variant="secondary"
              className="h-auto rounded-full px-4 py-2"
              onClick={() => onSuggestion(s)}
            >
              {s}
            </Button>
          ))}
        </div>
      </div>

      {/* Keyframes + prefers-reduced-motion (global) */}
      <style jsx global>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee var(--marquee-duration, 18s) linear infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

// Hero (greeting + orb + marquee)
function Hero({
  onSuggestion,
  name = "Researcher",
}: {
  onSuggestion: (s: string) => void;
  name?: string;
}) {
  const hour = new Date().getHours();
  const timeGreeting =
    hour < 5
      ? "Good night"
      : hour < 12
      ? "Good morning"
      : hour < 18
      ? "Good afternoon"
      : "Good evening";

  return (
    <section className="relative -mx-6 -mt-6 isolate overflow-hidden pb-6 sm:pb-8">
      {/* Ambient theme-aware gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_-20%,hsl(var(--primary)/0.25)_0%,transparent_60%),linear-gradient(to_bottom,transparent_0%,hsl(var(--primary)/0.08)_45%,transparent_100%)]" />

      {/* Glow orb */}
      <div className="flex w-full justify-center pt-8 sm:pt-10">
        <div
          className="
            size-16 sm:size-20 rounded-full
            bg-[radial-gradient(50%_50%_at_50%_50%,hsl(var(--primary))_0%,hsl(var(--primary)/.65)_45%,transparent_70%)]
            shadow-[0_30px_80px_-20px_hsl(var(--primary)/.7)]
            ring-1 ring-primary/30
          "
        />
      </div>

      {/* Headline */}
      <div className="mx-auto mt-5 max-w-3xl px-6 text-center">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
          {timeGreeting}, {name}.
          <br className="hidden sm:block" />
          <span className="block">Can I help you with anything?</span>
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Choose a prompt below or write your own to start chatting.
        </p>
      </div>

      {/* Marquee with exactly three suggestions */}
      <MarqueeSuggestions suggestions={SUGGESTIONS} onSuggestion={onSuggestion} />
    </section>
  );
}

function ChatBubble({ message }: { message: ChatMessage }) {
  const isAssistant = message.role === "assistant";
  return (
    <div className={cn("flex w-full gap-3", isAssistant ? "justify-start" : "justify-end")}>
      <div
        className={cn(
          "max-w-[75%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm",
          isAssistant
            ? "bg-muted/70 ring-1 ring-border/50"
            : "bg-primary text-primary-foreground shadow-sm"
        )}
      >
        {message.content}
      </div>
    </div>
  );
}

export default function AIInsightsChat() {
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [input, setInput] = React.useState("");
  const [isGenerating, setIsGenerating] = React.useState(false);
  const abortRef = React.useRef<AbortController | null>(null);
  const endRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isGenerating]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isGenerating) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: content.trim(),
    };
    const nextMessages = [...messages, userMsg];

    setMessages(nextMessages);
    setInput("");
    setIsGenerating(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      const data = await res.json();
      const reply = data.reply ?? data.insight ?? "I couldn't generate a response.";

      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: String(reply) },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "Sorry, I ran into an issue while generating that. Please try again or refine your prompt.",
        },
      ]);
    } finally {
      setIsGenerating(false);
      abortRef.current = null;
    }
  };

  const onSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;
    void sendMessage(input);
  };

  const onStop = () => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsGenerating(false);
  };

  const onRegenerate = () => {
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (lastUser) void sendMessage(lastUser.content);
  };

  const onClear = () => {
    setMessages([]);
    setInput("");
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="relative">
      {!hasMessages && <Hero onSuggestion={(s) => void sendMessage(s)} name="Milovan" />}

      {/* Messages list (no background container) */}
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 pb-40">
          {messages.map((m) => (
            <ChatBubble key={m.id} message={m} />
          ))}

          {isGenerating && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" />
              Thinking...
            </div>
          )}

          <div ref={endRef} />
        </div>
      </div>

      {/* Fixed composer at the bottom of the viewport (aligns with content area) */}
      <div className="fixed bottom-5 right-6 left-0 md:left-[var(--sidebar-width)] ml-5 md:ml-0 z-50 border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full px-4 md:px-6 py-3">
          <form onSubmit={onSubmit} className="space-y-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about entities, correlations, trends, or hypotheses…"
              className="min-h-[72px] resize-y rounded-2xl"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  onSubmit();
                }
              }}
            />

            <div className="flex flex-wrap items-center gap-2">
              <Button type="submit" disabled={!input.trim() || isGenerating} className="rounded-full">
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" /> Generating
                  </>
                ) : (
                  <>
                    <Send className="mr-2 size-4" />
                    Send
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={onRegenerate}
                disabled={messages.filter((m) => m.role === "user").length === 0 || isGenerating}
                className="rounded-full"
              >
                <RotateCcw className="mr-2 size-4" />
                Regenerate
              </Button>

              <Button
                type="button"
                variant="ghost"
                onClick={onClear}
                disabled={messages.length === 0}
                className="rounded-full"
              >
                <Trash2 className="mr-2 size-4" />
                Clear
              </Button>

              {isGenerating && (
                <Button type="button" variant="destructive" onClick={onStop} className="rounded-full">
                  <StopCircle className="mr-2 size-4" />
                  Stop
                </Button>
              )}
            </div>
          </form>
        </div>

        {/* Safe-area inset for iOS */}
        <div className="h-[env(safe-area-inset-bottom)]" />
      </div>
    </div>
  );
}