import * as React from "react";
import { cn } from "../../lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-10 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-300 focus:ring-2 focus:ring-metel-blue/15 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";
