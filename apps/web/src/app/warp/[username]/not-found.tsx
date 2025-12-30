import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <div className="space-y-6 max-w-md">
        <div className="text-8xl">😕</div>
        
        <h1 className="text-4xl md:text-5xl font-bold">
          User Not Found
        </h1>
        
        <p className="text-lg text-muted-foreground">
          We couldn&apos;t find a GitHub user with that username. Please check the spelling and try again.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button asChild size="lg">
            <Link href="/">
              Try Another Username
            </Link>
          </Button>
          
          <Button asChild size="lg" variant="outline">
            <Link href="https://github.com" target="_blank">
              Browse GitHub
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
