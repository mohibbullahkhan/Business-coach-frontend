import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumb({ items }: { items: { label: string, href?: string }[] }) {
  return (
    <nav className="flex text-sm text-gray-500 mb-4">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRight className="w-4 h-4 mx-2" />}
          {item.href ? <Link href={item.href} className="hover:text-blue-600">{item.label}</Link> : <span className="text-gray-900 font-medium">{item.label}</span>}
        </React.Fragment>
      ))}
    </nav>
  );
}