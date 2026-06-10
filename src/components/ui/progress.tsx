import * as React from "react";
import { Progress as ProgressPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

function Progress({
  className,
  value = 0,
  max = 0,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
 const isInvalidMax = max == null || max <= 0;
 const percentage = isInvalidMax ? 0 : ((value || 0) / max) * 100;

 return (
   <ProgressPrimitive.Root
     data-slot="progress"
     className={cn(
       "relative h-2 w-full overflow-hidden rounded-full",
       isInvalidMax ? "bg-primary/30" : "bg-primary/20",
       className,
     )}
     {...props}
   >
     {!isInvalidMax && (
       <ProgressPrimitive.Indicator
         data-slot="progress-indicator"
         className="h-full w-full flex-1 bg-primary transition-all"
         style={{
           transform: `translateX(-${100 - percentage}%)`,
         }}
       />
     )}
   </ProgressPrimitive.Root>
 );
}

export { Progress };
