import { MessagesSquare, Search } from "lucide-react";
import { Chat, ChatKind } from "../data/mock";
import { cn } from "../lib/utils";
import { UserAvatar } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Switch } from "./ui/switch";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

type FilterKey = "all" | ChatKind;

const filters: Array<{ key: FilterKey; label: string }> = [
  { key: "all", label: "Все" },
  { key: "personal", label: "Личные" },
  { key: "group", label: "Группы" },
  { key: "channel", label: "Каналы" },
];

type ChatListProps = {
  chats: Chat[];
  activeChatId: string;
  selectedFilter: FilterKey;
  unreadOnly: boolean;
  onFilterChange: (filter: FilterKey) => void;
  onUnreadOnlyChange: (checked: boolean) => void;
  onChatSelect: (chatId: string) => void;
};

export function ChatList({
  chats,
  activeChatId,
  selectedFilter,
  unreadOnly,
  onFilterChange,
  onUnreadOnlyChange,
  onChatSelect,
}: ChatListProps) {
  const counts = {
    all: chats.filter((chat) => chat.unread > 0).length,
    personal: chats.filter((chat) => chat.kind === "personal" && chat.unread > 0).length,
    group: chats.filter((chat) => chat.kind === "group" && chat.unread > 0).length,
    channel: chats.filter((chat) => chat.kind === "channel" && chat.unread > 0).length,
  };

  const visibleChats = chats.filter((chat) => {
    const matchesFilter = selectedFilter === "all" || chat.kind === selectedFilter;
    const matchesUnread = !unreadOnly || chat.unread > 0;
    return matchesFilter && matchesUnread;
  });

  return (
    <section className="flex h-full w-[clamp(320px,30vw,364px)] shrink-0 flex-col overflow-hidden border-r border-border bg-card text-card-foreground">
      <div className="flex min-h-0 flex-1 flex-col gap-[13px] pt-4">
        <h1 className="px-4 text-base font-semibold text-foreground">Чаты</h1>

        <div className="px-4">
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Поиск" className="pl-9" />
          </div>
        </div>

        <Tabs
          value={selectedFilter}
          onValueChange={(value) => onFilterChange(value as FilterKey)}
          className="px-4"
        >
          <div className="scrollbar-none -mx-1 overflow-x-auto px-1">
            <TabsList aria-label="Фильтр чатов" className="w-max min-w-full">
              {filters.map((filter) => (
                <TabsTrigger key={filter.key} value={filter.key}>
                  {filter.label}
                  <span
                    className={cn(
                      "grid h-5 min-w-5 shrink-0 place-items-center rounded-full px-1.5 text-[11px] font-semibold leading-none",
                      counts[filter.key] > 0
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {counts[filter.key]}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </Tabs>

        {visibleChats.length > 0 ? (
          <ScrollArea className="min-h-0 flex-1">
            <div className="space-y-3 px-4 pr-5">
              {visibleChats.map((chat) => (
                <button
                  key={chat.id}
                  type="button"
                  onClick={() => onChatSelect(chat.id)}
                  className={cn(
                    "flex w-full min-w-0 items-center gap-3 rounded-[10px] px-4 py-3 text-left text-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                    activeChatId === chat.id && "bg-accent text-accent-foreground",
                  )}
                >
                  <UserAvatar name={chat.name} src={chat.avatarUrl} className="h-10 w-10 shrink-0" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-foreground">{chat.name}</span>
                    <span className="mt-1 block truncate text-sm text-muted-foreground">{chat.lastMessage}</span>
                  </span>
                  {chat.unread > 0 ? <Badge className="shrink-0">{chat.unread}</Badge> : null}
                </button>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="grid min-h-0 flex-1 place-items-center px-4">
            <div className="flex max-w-[220px] flex-col items-center text-center text-muted-foreground">
              <MessagesSquare className="mb-3 h-12 w-12 text-muted-foreground" strokeWidth={1.8} />
              <p className="text-sm font-medium text-muted-foreground">Диалоги отсутствуют</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex min-h-[60px] shrink-0 items-center border-t border-border bg-card px-4 py-2.5">
        <label className="flex min-h-10 cursor-pointer items-center gap-2 text-sm text-muted-foreground">
          <Switch
            checked={unreadOnly}
            onCheckedChange={onUnreadOnlyChange}
            aria-label="Только непрочитанные"
          />
          <span>Только непрочитанные</span>
        </label>
      </div>
    </section>
  );
}
