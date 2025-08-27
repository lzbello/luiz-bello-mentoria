// components/event-grid.tsx
import { EventCard } from '@/components/event-card';
import { Event } from '@prisma/client';
import Link from 'next/link';

interface EventGridProps {
    events: Event[];
}

export function EventGrid({ events }: EventGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
                <Link key={event.id} href={`/${event.slug}`}>
                    <EventCard
                        event={{
                            ...event,
                            date: event.date.toLocaleDateString('pt-BR'),
                        }}
                    />
                </Link>
            ))}
        </div>
    );
}
