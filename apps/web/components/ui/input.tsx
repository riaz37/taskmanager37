import * as React from "react";

import { cn } from "./utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
        "border-input flex h-9 w-full min-w-0 rounded-md border border-border/60 bg-background px-3 py-2 text-sm",
        "shadow-sm transition-colors outline-none",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20",
        "hover:border-border/80",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
