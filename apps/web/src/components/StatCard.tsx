import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  suffix?: ReactNode;
  className?: string;
}

export function StatCard({ title, value, suffix, className = '' }: StatCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl sm:text-3xl font-bold flex items-center gap-2 text-gray-900 dark:text-gray-100">
          {value}
          {suffix && <span>{suffix}</span>}
        </div>
      </CardContent>
    </Card>
  );
}
