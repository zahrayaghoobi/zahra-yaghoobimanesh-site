"use client";

import { useEffect, useRef, useState } from "react";

const suggestions = [
  "درباره تجربه کاری‌ات بگو",
  "در چه نرم‌افزارهایی مهارت داری؟",
  "مهم‌ترین پروژه‌هایت چه بوده‌اند؟",
];

export default function CareerChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const conversationRef = useRef(null);

  useEffect(() => {
    conversationRef.current?.scrollTo({
      top: conversationRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function sendMessage(text = input) {
    const content = text.trim();
    if (!content || loading || content.length > 2000) return;

    const nextMessages = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(-12) }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "ارسال پیام با مشکل روبه‌رو شد.");
      }

      if (!response.body) {
        throw new Error("پاسخی از سرویس گفتگو دریافت نشد.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let pending = "";
      let answer = "";

      function processLine(line) {
        if (!line.startsWith("data:")) return false;
        const data = line.slice(5).trim();
        if (data === "[DONE]") return true;

        const chunk = JSON.parse(data);
        if (chunk.error) throw new Error(chunk.error.message || "سرویس گفتگو با خطا روبه‌رو شد.");
        const content = chunk.choices?.[0]?.delta?.content;
        if (typeof content === "string" && content) {
          answer += content;
          setMessages([...nextMessages, { role: "assistant", content: answer }]);
        }
        return false;
      }

      let finished = false;
      while (!finished) {
        const { done, value } = await reader.read();
        pending += decoder.decode(value, { stream: !done });
        const lines = pending.split("\n");
        pending = lines.pop() || "";

        for (const line of lines) {
          if (processLine(line.trim())) {
            finished = true;
            break;
          }
        }

        if (done) {
          if (pending) processLine(pending.trim());
          finished = true;
        }
      }

      if (!answer.trim()) {
        throw new Error("پاسخ سرویس خالی بود؛ لطفاً دوباره تلاش کنید.");
      }
    } catch (requestError) {
      const transportError =
        requestError instanceof TypeError ||
        requestError.name === "AbortError" ||
        requestError.name === "TimeoutError";
      setInput(content);
      setError(
        transportError
          ? "ارتباط با مدل قطع شد؛ لطفاً دوباره تلاش کنید. ممکن است سرویس مدل موقتاً در دسترس نباشد."
          : requestError.message || "ارسال پیام با مشکل روبه‌رو شد.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <aside className="career-chat" dir="rtl">
      {open && (
        <section className="chat-panel" aria-label="گفتگو با دوقلوی دیجیتال شغلی">
          <header className="chat-header">
            <div>
              <strong>دوقلوی دیجیتال زهرا</strong>
              <span>پرسشی درباره مسیر شغلی و تخصص‌ها بپرسید</span>
            </div>
            <button className="chat-close" type="button" onClick={() => setOpen(false)} aria-label="بستن گفتگو">
              ×
            </button>
          </header>

          <div className="chat-messages" ref={conversationRef} aria-live="polite">
            {messages.length === 0 && (
              <div className="chat-welcome">
                سلام! من دوقلوی دیجیتال شغلی زهرا هستم. درباره تجربه‌ها، مهارت‌ها یا پروژه‌هایش بپرسید.
                <div className="chat-suggestions">
                  {suggestions.map((suggestion) => (
                    <button key={suggestion} type="button" onClick={() => sendMessage(suggestion)}>
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((message, index) => (
              <p className={`chat-message ${message.role}`} key={`${index}-${message.role}`}>
                {message.content}
              </p>
            ))}
            {loading && <p className="chat-message assistant chat-loading">در حال فکر کردن…</p>}
            {error && <p className="chat-error" role="alert">{error}</p>}
          </div>

          <form
            className="chat-form"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
          >
            <textarea
              aria-label="پیام شما"
              placeholder="سؤالتان را بنویسید…"
              value={input}
              maxLength={2000}
              rows={2}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  sendMessage();
                }
              }}
            />
            <button type="submit" disabled={loading || !input.trim()} aria-label="ارسال پیام">
              ارسال
            </button>
          </form>
        </section>
      )}
      <button
        className="chat-toggle"
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={open ? "بستن گفتگو" : "پاسخگوی سوالات شما"}
      >
        <span aria-hidden="true">{open ? "×" : "پاسخگوی سوالات شما"}</span>
      </button>
    </aside>
  );
}
