import { cn } from "../../lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-metel-blue px-1.5 text-[11px] font-semibold leading-none text-white",
        className,
      )}
    >
      {children}
    </span>
  );
}
