import React from 'react';

export default function FilterSelect({ options, onChange }: { options: { label: string, value: string }[], onChange?: (val: string) => void }) {
  return (
    <select 
      onChange={(e) => onChange?.(e.target.value)}
      className="py-2 pl-3 pr-8 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">All</option>
      {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
    </select>
  );
}