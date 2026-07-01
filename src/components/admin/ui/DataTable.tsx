import React from 'react';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

export default function DataTable({ data, columns, isLoading, emptyState }: any) {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });
  
  if (isLoading) return <div className="space-y-4">{[1, 2, 3].map(i => <div key={i} className="h-12 bg-gray-100 animate-pulse rounded-lg" />)}</div>;
  if (!data || data.length === 0) return emptyState;

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-gray-700 border-b border-gray-200 uppercase text-xs font-semibold">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="px-6 py-4 whitespace-nowrap">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-100">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}