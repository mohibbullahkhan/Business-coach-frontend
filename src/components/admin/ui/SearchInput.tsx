import React from 'react';
import { Search } from 'lucide-react';

export default function SearchInput({ placeholder = 'Search...', onChange }: { placeholder?: string, onChange?: (val: string) => void }) {
  return (
    <div className="relative">
      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input 
        type="text" 
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
      />
    </div>
  );
}