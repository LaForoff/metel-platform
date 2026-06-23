import { FormEvent, KeyboardEvent, useLayoutEffect, useRef, useState } from "react";
import { Info, Laugh, MessageCircle, Paperclip, Phone, Send, Video } from "lucide-react";
import whatsappLogo from "../assets/logo-whatsapp.svg";
import { Chat, Message } from "../data/mock";
import { cn } from "../lib/utils";
import { UserInfoSidebar } from "./UserInfoSidebar";
import { UserAvatar } from "./ui/avatar";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";

type Messenger = "whatsapp" | "telegram" | "max";

const messengerOptions: Array<{
  value: Messenger;
  label: string;
  colorClassName: string;
}> = [
  { value: "whatsapp", label: "WhatsApp", colorClassName: "text-[#25D366]" },
  { value: "telegram", label: "Telegram", colorClassName: "text-[#229ED9]" },
  { value: "max", label: "Max", colorClassName: "text-primary" },
];

type ChatWindowProps = {
  chat: Chat;
  onSendMessage: (message: Message) => void;
};

function getCompactName(name: string) {
  const [firstName, ...lastNameParts] = name.split(" ");
  const lastName = lastNameParts.join(" ");

  if (!firstName || !lastName) {
    return name;
  }

  return `${firstName[0]}. ${lastName}`;
}

function ResponsiveName({ name }: { name: string }) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const measurerRef = useRef<HTMLSpanElement>(null);
  const compactName = getCompactName(name);
  const [displayName, setDisplayName] = useState(name);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const measurer = measurerRef.current;

    if (!container || !measurer) {
      return;
    }

    function updateName() {
      if (!container || !measurer) {
        return;
      }

      measurer.textContent = name;
      setDisplayName(measurer.scrollWidth <= container.clientWidth ? name : compactName);
    }

    updateName();

    const resizeObserver = new ResizeObserver(updateName);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [compactName, name]);

  return (
    <div className="relative min-w-0 w-full">
      <h2 ref={containerRef} className="w-full min-w-0 truncate text-base font-semibold text-foreground">
        {displayName}
      </h2>
      <span
        ref={measurerRef}
        aria-hidden="true"
        className="pointer-events-none invisible absolute left-0 top-0 whitespace-nowrap text-base font-semibold"
      />
    </div>
  );
}

function MessengerIcon({ messenger }: { messenger: Messenger }) {
  if (messenger === "whatsapp") {
    return <img src={whatsappLogo} alt="" aria-hidden="true" className="h-4 w-4 shrink-0" />;
  }

  if (messenger === "telegram") {
    return <Send aria-hidden="true" className="h-4 w-4 shrink-0 text-[#229ED9]" />;
  }

  return <MessageCircle aria-hidden="true" className="h-4 w-4 shrink-0 text-primary" />;
}

export function ChatWindow({ chat, onSendMessage }: ChatWindowProps) {
  const [draft, setDraft] = useState("");
  const [messenger, setMessenger] = useState<Messenger>("whatsapp");
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const selectedMessenger = messengerOptions.find((option) => option.value === messenger) ?? messengerOptions[0];

  useLayoutEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) {
      return;
    }

    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 128)}px`;
  }, [draft, chat.id]);

  function sendMessage() {
    const text = draft.trim();

    if (!text) {
      return;
    }

    onSendMessage({
      id: `${chat.id}-${Date.now()}`,
      direction: "outgoing",
      text,
      time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
    });
    setDraft("");
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage();
  }

  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }

  return (
    <section className="relative flex min-w-0 flex-1 bg-background text-foreground">
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-[59px] shrink-0 items-center justify-between border-b border-border bg-card px-6 text-card-foreground">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <UserAvatar name={chat.name} src={chat.avatarUrl} className="h-10 w-10" />
            <div className="min-w-0 flex-1">
              <ResponsiveName name={chat.name} />
              <p className="flex items-center gap-1.5 text-xs font-medium">
                <MessengerIcon messenger={messenger} />
                <span className={selectedMessenger.colorClassName}>{selectedMessenger.label}</span>
                <span className="text-green-600">•</span>
                <span className="text-green-600">В сети</span>
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <Select value={messenger} onValueChange={(value) => setMessenger(value as Messenger)}>
              <SelectTrigger aria-label="Канал ответа" className="mr-2 h-11 w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="end">
                {messengerOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="ghost" size="icon" title="Позвонить">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" title="Видео">
              <Video className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsUserInfoOpen((isOpen) => !isOpen)}
              className={cn(isUserInfoOpen && "bg-accent text-accent-foreground")}
              title={isUserInfoOpen ? "Закрыть информацию о клиенте" : "Открыть информацию о клиенте"}
              aria-label={isUserInfoOpen ? "Закрыть информацию о клиенте" : "Открыть информацию о клиенте"}
              aria-pressed={isUserInfoOpen}
            >
              <Info className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <ScrollArea className="min-h-0 flex-1">
          <div className="flex flex-col gap-3 px-6 py-6">
            {chat.messages.map((message) => (
              <div
                key={message.id}
                className={cn("flex", message.direction === "outgoing" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "relative max-w-[520px] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-snug shadow-sm",
                    message.direction === "outgoing"
                      ? "bubble-out rounded-br-md bg-primary text-primary-foreground"
                      : "bubble-in rounded-bl-md bg-muted text-foreground",
                  )}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <form
          onSubmit={onSubmit}
          className="flex min-h-[60px] shrink-0 items-end gap-2 border-t border-border bg-card px-4 py-2.5"
        >
          <Button variant="ghost" size="icon" type="button" title="Прикрепить файл">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Textarea
            ref={textareaRef}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Напишите сообщение"
            rows={1}
            className="max-h-32 flex-1 resize-none overflow-y-auto"
          />
          <Button variant="ghost" size="icon" type="button" title="Эмодзи">
            <Laugh className="h-5 w-5" />
          </Button>
          <Button size="icon" type="submit" title="Отправить">
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>

      <UserInfoSidebar chat={chat} isOpen={isUserInfoOpen} />
    </section>
  );
}
