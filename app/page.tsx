// app/page.tsx
import { EventGrid } from "@/components/event-grid";
import { EventSearch } from "@/components/event-search";
import { HeroBanner } from "@/components/hero-banner";
import { getEvents } from "@/lib/services/get-events";

export default async function Home() {
  const events = await getEvents();

  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Hero Banner */}
        <HeroBanner />

        {/* Eventos */}
        <section id="events" className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6">Eventos</h2>
            <EventSearch />
            <EventGrid events={events} />
          </div>
        </section>
      </main>
    </div>
  );
}
