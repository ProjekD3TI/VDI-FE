import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/components/theme-provider";

export function ModeSwitch() {
  // const { setTheme } = useTheme();
  const theme = true

  return (
    <>
      <div className="flex items-center gap-1 bg-secondary p-0.5 rounded-full">
        <span className="pl-2 text-xs">Dark</span>
        <Moon className="bg-black size-8 p-2 rounded-full" />
      </div>
    </>
  );
}
