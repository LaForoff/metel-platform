import { useMemo, useState } from "react";
import { ChatList } from "../components/ChatList";
import { ChatWindow } from "../components/ChatWindow";
import { Chat, chats as initialChats, Message } from "../data/mock";

type FilterKey = "all" | Chat["kind"];

export function ChatsPage() {
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [activeChatId, setActiveChatId] = useState("anton");
  const [selectedFilter, setSelectedFilter] = useState<FilterKey>("all");
  const [unreadOnly, setUnreadOnly] = useState(false);

  const activeChat = useMemo(
    () => chats.find((chat) => chat.id === activeChatId) ?? chats[0],
    [activeChatId, chats],
  );

  function handleSendMessage(message: Message) {
    setChats((currentChats) =>
      currentChats.map((chat) =>
        chat.id === activeChat.id
          ? {
              ...chat,
              lastMessage: message.text,
              messages: [...chat.messages, message],
            }
          : chat,
      ),
    );
  }

  function handleChatSelect(chatId: string) {
    setActiveChatId(chatId);
    setChats((currentChats) =>
      currentChats.map((chat) => (chat.id === chatId ? { ...chat, unread: 0 } : chat)),
    );
  }

  return (
    <>
      <ChatList
        chats={chats}
        activeChatId={activeChat.id}
        selectedFilter={selectedFilter}
        unreadOnly={unreadOnly}
        onFilterChange={setSelectedFilter}
        onUnreadOnlyChange={setUnreadOnly}
        onChatSelect={handleChatSelect}
      />
      <ChatWindow chat={activeChat} onSendMessage={handleSendMessage} />
    </>
  );
}
