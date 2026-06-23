import whatsappLogo from "../assets/logo-whatsapp.svg";
import { Chat } from "../data/mock";
import { cn } from "../lib/utils";
import { UserAvatar } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

type UserInfoSidebarProps = {
  chat: Chat;
  isOpen: boolean;
};

export function UserInfoSidebar({ chat, isOpen }: UserInfoSidebarProps) {
  return (
    <aside
      aria-hidden={!isOpen}
      inert={!isOpen}
      className={cn(
        "absolute inset-y-0 right-0 z-20 shrink-0 overflow-hidden border-l border-border bg-card text-card-foreground shadow-soft transition-[width,opacity,transform] duration-200 ease-in-out xl:static xl:z-auto xl:shadow-none",
        isOpen
          ? "w-[320px] translate-x-0 opacity-100"
          : "pointer-events-none w-0 translate-x-4 border-l-0 opacity-0",
      )}
    >
      <div className="flex h-full w-[320px] flex-col gap-5 overflow-y-auto p-3">
        <section className="flex flex-col items-center gap-3 rounded-lg bg-muted p-3 text-center">
          <UserAvatar name={chat.name} src={chat.avatarUrl} className="h-20 w-20" />

          <div className="flex flex-col items-center gap-3">
            <h2 className="text-xl font-semibold text-foreground">{chat.name}</h2>

            <div className="flex items-center justify-center gap-[6px]">
              <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-1.5 py-1 text-sm font-medium text-green-600 dark:bg-green-950/50">
                <span className="h-2 w-2 rounded-full bg-green-600" />
                В сети
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#25D366] px-1.5 py-1 text-sm font-medium text-white">
                <img
                  src={whatsappLogo}
                  alt=""
                  aria-hidden="true"
                  className="h-4 w-4 brightness-0 invert"
                />
                WhatsApp
              </span>
            </div>
          </div>

          <p className="mt-1 text-base text-muted-foreground">+7 (999) 808-19-26</p>
        </section>

        <Tabs defaultValue="media" className="flex min-h-0 flex-1 flex-col gap-5">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="media" className="w-full">
              Медиа
            </TabsTrigger>
            <TabsTrigger value="files" className="w-full">
              Файлы
            </TabsTrigger>
          </TabsList>

          <TabsContent value="media" className="m-0 grid flex-1 place-items-center text-sm text-muted-foreground">
            Медиа пока нет
          </TabsContent>
          <TabsContent value="files" className="m-0 grid flex-1 place-items-center text-sm text-muted-foreground">
            Файлы пока не добавлены
          </TabsContent>
        </Tabs>
      </div>
    </aside>
  );
}
