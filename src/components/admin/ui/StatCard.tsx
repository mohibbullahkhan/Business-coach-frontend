import React from 'react';
import { LucideIcon } from 'lucide-react';

export default function StatCard({ title, value, icon: Icon, trend }: { title: string, value: string | number, icon: LucideIcon, trend?: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        {trend && <span className="text-sm font-medium text-green-600">{trend}</span>}
      </div>
    </div>
  );
}