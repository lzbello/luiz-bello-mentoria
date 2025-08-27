// lib/services/get-events.ts
import { prisma } from '@/lib/prisma';

export async function getEvents() {
    return prisma.event.findMany({
        orderBy: { date: 'asc' },
    });
}
