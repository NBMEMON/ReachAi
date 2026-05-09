'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'premium';
  size?: 'sm' | 'md';
}

export function Badge({
  variant = 'default',
  size = 'sm',
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        {
          'bg-white/10 text-gray-300 border border-white/10': variant === 'default',
          'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20':
            variant === 'success',
          'bg-amber-500/15 text-amber-400 border border-amber-500/20':
            variant === 'warning',
          'bg-red-500/15 text-red-400 border border-red-500/20': variant === 'danger',
          'bg-blue-500/15 text-blue-400 border border-blue-500/20': variant === 'info',
          'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/20':
            variant === 'premium',
          'px-2 py-0.5 text-xs': size === 'sm',
          'px-3 py-1 text-sm': size === 'md',
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
