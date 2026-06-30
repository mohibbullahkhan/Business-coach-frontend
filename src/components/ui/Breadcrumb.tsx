import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbProps {
  pageName: string;
}

export function Breadcrumb({ pageName }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-white/60 mb-6">
      <Link href="/" className="hover:text-white transition-colors">
        Home
      </Link>
      <ChevronRight className="w-3.5 h-3.5" />
      <span className="text-white/90">{pageName}</span>
    </nav>
  );
}
