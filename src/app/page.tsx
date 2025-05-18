import { ItineraryBoard } from '@/components/itinerary/ItineraryBoard';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="py-6 px-4 text-center shadow-sm">
        <h1 className="text-4xl font-bold tracking-tight text-primary">
          ItineraryFlow
        </h1>
        <p className="text-muted-foreground mt-1">Drag and drop to plan your perfect trip!</p>
      </header>
      <div className="flex-grow">
        <ItineraryBoard />
      </div>
      <footer className="py-4 text-center text-sm text-muted-foreground border-t">
        Built with Next.js & Tailwind CSS.
      </footer>
    </main>
  );
}
