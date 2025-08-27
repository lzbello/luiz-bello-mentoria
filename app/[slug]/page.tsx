import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ClientEvent from './clientEvent';

export const dynamic = 'force-dynamic';

export default async function EventSlugPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const event = await prisma.event.findUnique({
        where: { slug },
    });

    if (!event) return notFound();

    const ticketTypes = [
        { id: 'pista', name: 'PISTA | LOTE 2', price: 30, fee: 3.9 },
        { id: 'vip', name: 'ÁREA VIP | LOTE 2', price: 60, fee: 7.8 },
        {
            id: 'premium',
            name: 'OPEN BAR PREMIUM | LOTE 3',
            price: 150,
            fee: 19.5,
        },
    ];

    return <ClientEvent event={event} ticketTypes={ticketTypes} />;
}
