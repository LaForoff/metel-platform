import { ChevronUp, CircleUserRound, LogOut, SlidersHorizontal } from "lucide-react";
import { NavLink } from "react-router-dom";
import { UserAvatar } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const profileAvatarUrl =
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80";

type ProfileDropdownProps = {
  compact?: boolean;
};

export function ProfileDropdown({ compact = false }: ProfileDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {compact ? (
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-11 w-11 rounded-full shadow-sm hover:bg-neutral-50"
            title="Дмитрий Жданов"
          >
            <UserAvatar name="Дмитрий Жданов" src={profileAvatarUrl} className="h-9 w-9" />
          </Button>
        ) : (
          <Button
            type="button"
            variant="outline"
            className="h-auto w-full justify-start gap-3 px-3 py-2 text-left shadow-sm hover:bg-neutral-50"
          >
            <UserAvatar name="Дмитрий Жданов" src={profileAvatarUrl} className="h-8 w-8" />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-neutral-900">Дмитрий Жданов</span>
              <span className="block truncate text-xs text-neutral-500">mmaell99@mail.com</span>
            </span>
            <ChevronUp className="h-4 w-4 text-neutral-400" />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side={compact ? "right" : "top"}
        align={compact ? "end" : "start"}
        sideOffset={compact ? 12 : 8}
        className="w-[230px]"
      >
        <div className="flex items-center gap-3 px-3 py-3">
          <UserAvatar name="Дмитрий Жданов" src={profileAvatarUrl} className="h-8 w-8" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-neutral-900">Дмитрий Жданов</p>
            <p className="truncate text-xs text-neutral-500">mmaell99@mail.com</p>
          </div>
        </div>
        <DropdownMenuItem>
          <CircleUserRound className="h-4 w-4" />
          Профиль
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <NavLink to="/settings">
            <SlidersHorizontal className="h-4 w-4" />
            Настройки
          </NavLink>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOut className="h-4 w-4" />
          Выйти
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
