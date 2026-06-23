import {
  CheckSquare,
  MessagesSquare,
  PanelLeftClose,
  PanelLeftOpen,
  Phone,
  UsersRound,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import logoLightTheme from "../assets/logo-light-theme.svg";
import logoSmallLightTheme from "../assets/logo-small-light-theme.svg";
import { cn } from "../lib/utils";
import { ProfileDropdown } from "./ProfileDropdown";
import { Button, buttonVariants } from "./ui/button";

const navItems = [
  { label: "Чаты", icon: MessagesSquare, to: "/chats" },
  { label: "Звонки", icon: Phone, to: "/calls" },
  { label: "Задачи", icon: CheckSquare, to: "/tasks" },
  { label: "Сотрудники", icon: UsersRound, to: "/employees" },
];

type SidebarProps = {
  collapsed: boolean;
  canToggle: boolean;
  onToggle: () => void;
};

export function Sidebar({ collapsed, canToggle, onToggle }: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex h-full shrink-0 flex-col justify-between border-r border-sidebar-border bg-sidebar text-sidebar-foreground p-4 transition-[width] duration-200",
        collapsed ? "w-[84px]" : "w-[244px]",
      )}
    >
      <div>
        <div
          className={cn(
            "mb-6 flex h-8 items-center justify-between",
            collapsed && "mb-7 h-auto flex-col justify-start gap-4",
          )}
        >
          {collapsed ? (
            <>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={onToggle}
                disabled={!canToggle}
                className={cn(
                  "h-8 w-8 rounded-lg p-2 hover:bg-sidebar-accent",
                  canToggle ? "cursor-pointer" : "cursor-default",
                )}
                title={canToggle ? "Развернуть боковую панель" : "Недостаточно места для раскрытия"}
                aria-label="Развернуть боковую панель"
              >
                <PanelLeftOpen className="h-4 w-4" />
              </Button>
              <img src={logoSmallLightTheme} alt="МЕТЭЛ" className="h-6 w-6" />
            </>
          ) : (
            <>
              <div className="relative">
                <img src={logoLightTheme} alt="МЕТЭЛ" className="h-[22px] w-auto" />
                <img
                  src={logoLightTheme}
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 hidden h-[22px] w-auto brightness-0 invert [clip-path:inset(0_0_0_21px)] dark:block"
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={onToggle}
                className="h-8 w-8 rounded-lg p-2 hover:bg-sidebar-accent"
                title="Свернуть боковую панель"
                aria-label="Свернуть боковую панель"
              >
                <PanelLeftClose className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>

        <p className={cn("mb-3 px-3 text-sm text-muted-foreground", collapsed && "hidden")}>Меню</p>
        <nav className={cn("space-y-1", collapsed && "flex flex-col items-center")}>
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  buttonVariants({ variant: "ghost" }),
                  "h-9 w-full justify-start gap-3 rounded-lg px-3 text-sidebar-foreground",
                  collapsed && "h-11 w-11 justify-center px-0",
                  isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
                )
              }
              title={item.label}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span className={cn(collapsed && "hidden")}>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className={cn(collapsed && "hidden")}>
        <ProfileDropdown />
      </div>
      <div className={cn("hidden justify-center", collapsed && "flex")}>
        <ProfileDropdown compact />
      </div>
    </aside>
  );
}
