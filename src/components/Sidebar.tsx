import { CheckSquare, MessagesSquare, Phone, UsersRound } from "lucide-react";
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
        "flex h-full shrink-0 flex-col justify-between border-r border-neutral-200 bg-[#FAFAFA] p-4 transition-[width] duration-200",
        collapsed ? "w-[84px]" : "w-[244px]",
      )}
    >
      <div>
        <div className={cn("mb-7 flex h-7 items-center", collapsed && "justify-center")}>
          {collapsed ? (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onToggle}
              disabled={!canToggle}
              className={cn(
                "h-9 w-9 rounded-lg",
                canToggle ? "cursor-pointer" : "cursor-default",
              )}
              title={canToggle ? "Развернуть меню" : "Недостаточно места для раскрытия"}
            >
              <img src={logoSmallLightTheme} alt="МЕТЭЛ" className="h-6 w-6" />
            </Button>
          ) : (
            <div className="relative">
              <img src={logoLightTheme} alt="МЕТЭЛ" className="h-[22px] w-auto" />
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={onToggle}
                className="absolute left-0 top-1/2 h-7 w-7 -translate-y-1/2 rounded-md hover:bg-neutral-100/70"
                title="Свернуть меню"
                aria-label="Свернуть меню"
              />
            </div>
          )}
        </div>

        <p className={cn("mb-3 px-3 text-sm text-neutral-500", collapsed && "hidden")}>Меню</p>
        <nav className={cn("space-y-1", collapsed && "flex flex-col items-center")}>
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  buttonVariants({ variant: "ghost" }),
                  "h-9 w-full justify-start gap-3 rounded-lg px-3 text-neutral-700",
                  collapsed && "h-11 w-11 justify-center px-0",
                  isActive && "bg-neutral-100 text-neutral-950",
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
