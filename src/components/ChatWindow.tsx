import { FormEvent, KeyboardEvent, useLayoutEffect, useRef, useState } from "react";
import { Info, Laugh, MoreHorizontal, Paperclip, Phone, Send, Trash2, Video } from "lucide-react";
import { Chat, Message } from "../data/mock";
import { cn } from "../lib/utils";
import { UserAvatar } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ScrollArea } from "./ui/scroll-area";
import { Textarea } from "./ui/textarea";

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

export function ChatWindow({ chat, onSendMessage }: ChatWindowProps) {
  const [draft, setDraft] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
    <section className="flex min-w-0 flex-1 flex-col bg-background text-foreground">
      <header className="flex h-[59px] shrink-0 items-center justify-between border-b border-border bg-card px-6 text-card-foreground">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <UserAvatar name={chat.name} src={chat.avatarUrl} className="h-10 w-10" />
          <div className="min-w-0 flex-1">
            <ResponsiveName name={chat.name} />
            <p className={cn("flex items-center gap-1.5 text-xs font-medium", chat.online ? "text-green-600" : "text-muted-foreground")}>
              <span className={cn("h-1.5 w-1.5 rounded-full", chat.online ? "bg-green-600" : "bg-muted-foreground")} />
              {chat.online ? "В сети" : "Не в сети"}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <Button variant="ghost" size="icon" title="Позвонить">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" title="Видео">
            <Video className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" title="Информация">
            <Info className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" title="Дополнительно">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>Открыть профиль</DropdownMenuItem>
              <DropdownMenuItem>Закрепить чат</DropdownMenuItem>
              <DropdownMenuItem>Очистить историю</DropdownMenuItem>
              <DropdownMenuItem variant="destructive">
                <Trash2 className="h-4 w-4" />
                Удалить чат
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
    </section>
  );
}
