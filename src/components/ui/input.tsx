import * as React from "react";
import { cn } from "../../lib/utils";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-9 w-full rounded-lg border border-neutral-200 bg-white px-3 text-sm text-neutral-900 shadow-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-300 focus:ring-2 focus:ring-metel-blue/15",
        className,
      )}
      {...props}
    />
  );
}
