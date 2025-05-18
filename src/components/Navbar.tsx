import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  return (
    <nav className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
      <div className="flex h-16 items-center justify-between px-10">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <h1 className="text-2xl font-bold tracking-tight text-primary">
              ItineraryFlow
            </h1>
          </Link>
        </div>

        <div className="flex items-center space-x-8">
          <button className="text-muted-foreground hover:text-primary transition-colors duration-200 relative group">
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full" />
          </button>

          <button className="text-muted-foreground hover:text-primary transition-colors duration-200 relative group">
            Features
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full" />
          </button>

          <button className="text-muted-foreground hover:text-primary transition-colors duration-200 relative group">
            Pricing
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full" />
          </button>

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}