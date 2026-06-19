import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "../../lib/utils";

export const Tabs = TabsPrimitive.Root;

export const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex items-center rounded-xl bg-neutral-100 p-1 text-neutral-600",
      className,
    )}
    {...props}
  />
));

TabsList.displayName = TabsPrimitive.List.displayName;

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center gap-1 rounded-lg px-3 text-sm font-medium text-neutral-500 transition-colors",
      "hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-metel-blue/25",
      "disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:bg-white data-[state=active]:text-neutral-950 data-[state=active]:shadow-sm",
      className,
    )}
    {...props}
  />
));

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

export const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn("focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-metel-blue/25", className)}
    {...props}
  />
));

TabsContent.displayName = TabsPrimitive.Content.displayName;
