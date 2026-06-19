import { useEffect, useRef } from "react";
import { ArrowLeft, Info, MoreHorizontal, Phone, Send, Video } from "lucide-react";
import { NavLink } from "react-router-dom";
import { ModeToggle } from "../components/mode-toggle";
import { useTheme } from "../components/theme-provider";
import { UserAvatar } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Input } from "../components/ui/input";
import { ScrollArea } from "../components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Separator } from "../components/ui/separator";
import { Switch } from "../components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Textarea } from "../components/ui/textarea";

export function UiPreviewPage() {
  const { theme, setTheme } = useTheme();
  const initialTheme = useRef(theme);

  useEffect(() => {
    setTheme("dark");

    return () => setTheme(initialTheme.current);
  }, []);

  return (
    <main className="h-dvh overflow-y-auto bg-background text-foreground">
      <div className="mx-auto w-full max-w-6xl px-5 py-6 sm:px-8">
        <header className="flex items-center justify-between gap-4 border-b pb-5">
          <div className="flex min-w-0 items-center gap-3">
            <Button asChild variant="ghost" size="icon" title="Вернуться к чатам">
              <NavLink to="/chats">
                <ArrowLeft className="h-4 w-4" />
              </NavLink>
            </Button>
            <div className="min-w-0">
              <h1 className="truncate text-xl font-semibold">UI Preview</h1>
              <p className="text-sm text-muted-foreground">Semantic tokens and component states</p>
            </div>
          </div>
          <ModeToggle />
        </header>

        <div className="grid gap-5 py-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
              <CardDescription>Buttons, icon controls and status elements.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Delete</Button>
              </div>
              <Separator />
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="outline" size="icon" title="Позвонить"><Phone className="h-4 w-4" /></Button>
                <Button variant="outline" size="icon" title="Видео"><Video className="h-4 w-4" /></Button>
                <Button variant="outline" size="icon" title="Информация"><Info className="h-4 w-4" /></Button>
                <Button size="icon" title="Отправить"><Send className="h-4 w-4" /></Button>
                <Badge>4</Badge>
                <UserAvatar name="Антон Ибрагимов" className="h-9 w-9" />
              </div>
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">Все</TabsTrigger>
                  <TabsTrigger value="unread">Непрочитанные</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="pt-3 text-sm text-muted-foreground">Все диалоги</TabsContent>
                <TabsContent value="unread" className="pt-3 text-sm text-muted-foreground">Только новые сообщения</TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Form controls</CardTitle>
              <CardDescription>Inputs use background, input, muted and ring tokens.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Поиск диалогов" />
              <Textarea placeholder="Напишите сообщение" rows={3} />
              <Select defaultValue="personal">
                <SelectTrigger aria-label="Тип диалога">
                  <SelectValue placeholder="Выберите тип" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">Личный</SelectItem>
                  <SelectItem value="group">Группа</SelectItem>
                  <SelectItem value="channel">Канал</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center justify-between gap-4 rounded-lg border p-3">
                <label htmlFor="preview-checkbox" className="text-sm font-medium">Показывать только важные</label>
                <Checkbox id="preview-checkbox" defaultChecked />
              </div>
              <div className="flex items-center justify-between gap-4 rounded-lg border p-3">
                <label htmlFor="preview-switch" className="text-sm font-medium">Уведомления</label>
                <Switch id="preview-switch" defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Overlays</CardTitle>
              <CardDescription>Popover and dialog surfaces inherit dark tokens through portals.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <MoreHorizontal className="h-4 w-4" />
                    User menu
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem>Профиль</DropdownMenuItem>
                  <DropdownMenuItem>Настройки</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">Выйти</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary">Open Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Новый диалог</DialogTitle>
                    <DialogDescription>Проверка popover, border и muted tokens в тёмной теме.</DialogDescription>
                  </DialogHeader>
                  <Input placeholder="Имя сотрудника" />
                  <DialogFooter>
                    <Button>Создать</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Scroll Area</CardTitle>
              <CardDescription>Compact messenger content inside a fixed viewport.</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-52 rounded-lg border bg-muted/30">
                <div className="space-y-3 p-4">
                  {Array.from({ length: 8 }, (_, index) => (
                    <div key={index} className="flex items-center gap-3 rounded-md bg-card p-3">
                      <UserAvatar name={`User ${index + 1}`} className="h-8 w-8" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">Диалог {index + 1}</p>
                        <p className="truncate text-xs text-muted-foreground">Последнее сообщение в переписке</p>
                      </div>
                      {index < 3 ? <Badge>{index + 1}</Badge> : null}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
