'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'glow' | 'bordered';
  hover?: boolean;
  children: React.ReactNode;
}

export function Card({
  variant = 'default',
  hover = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl transition-all duration-300',
        {
          'bg-[#111128] border border-white/10': variant === 'default',
          'bg-white/5 backdrop-blur-xl border border-white/10': variant === 'glass',
          'bg-[#111128] border border-blue-500/20 shadow-lg shadow-blue-500/5':
            variant === 'glow',
          'bg-transparent border-2 border-white/15': variant === 'bordered',
          'hover:border-white/20 hover:shadow-xl hover:-translate-y-1 cursor-pointer':
            hover,
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('px-6 pt-6 pb-2', className)} {...props}>
      {children}
    </div>
  );
}

export function CardContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('px-6 py-4', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('px-6 pb-6 pt-2 border-t border-white/5', className)}
      {...props}
    >
      {children}
    </div>
  );
}
