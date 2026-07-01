import React from 'react';

export default function Avatar({ src, name, size = 'md' }: { src?: string, name: string, size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-14 h-14 text-base' };
  return (
    <div className={`${sizeClasses[size]} rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold overflow-hidden shrink-0`}> 
      {src ? <img src={src} alt={name} className="w-full h-full object-cover" /> : name.charAt(0).toUpperCase()}
    </div>
  );
}