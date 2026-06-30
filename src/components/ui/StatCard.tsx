import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: ReactNode;
  value: string;
  label: string;
  className?: string;
  valueClassName?: string;
}

export function StatCard({ icon, value, label, className, valueClassName }: StatCardProps) {
  return (
    <div className={cn("bg-card-white rounded-[16px] p-6 shadow-soft flex flex-col items-center justify-center text-center border border-border", className)}>
      <div className="text-text-muted mb-4 h-10 w-10 flex items-center justify-center rounded-full bg-bg-cream">
        {icon}
      </div>
      <div className={cn("text-4xl font-bold text-text-dark mb-1 font-serif", valueClassName)}>
        {value}
      </div>
      <div className="text-sm text-text-muted font-medium">
        {label}
      </div>
    </div>
  );
}
