
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BaseLayoutProps {
  children: ReactNode;
  className?: string;
  withPadding?: boolean;
}

export const BaseLayout = ({ children, className, withPadding = true }: BaseLayoutProps) => {
  return (
    <div className={cn(
      "min-h-screen bg-gradient-to-br from-background via-background to-secondary/20",
      withPadding && "p-4",
      className
    )}>
      {children}
    </div>
  );
};
