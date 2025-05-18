import { ItineraryBoard } from '@/components/itinerary/ItineraryBoard';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <div className="bg-[radial-gradient(#8B5CF6_1px,transparent_1px)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:16px_16px]">
        <div className="container mx-auto px-4 py-6">
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Plan Your Perfect Journey
            </h2>
          </div>

          <div className="rounded-lg border bg-card p-4 shadow-lg">
            <ItineraryBoard />
          </div>
        </div>
      </div>

      <footer className="mt-auto border-t bg-card/50 py-6">
        <div className="text-center text-sm text-muted-foreground">
          <p>© 2025 ItineraryFlow. Plan your journey with confidence.</p>
        </div>
      </footer>
    </main>
  );
}

