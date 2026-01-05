import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageWrapperProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function PageWrapper({
  title,
  description,
  children,
  className,
}: PageWrapperProps) {
  return (
    <div className={cn('space-y-6 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6', className)}>
      <div className="space-y-1">
        <h1 className="font-headline text-3xl font-bold tracking-tight text-primary">
          {title}
        </h1>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}
