'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from '../../styles/ClientEvent.module.css';
import TicketSelector from './ticketSelector';

export default function ClientEvent({
    event,
    ticketTypes,
}: {
    event: any;
    ticketTypes: { id: string; name: string; price: number; fee: number }[];
}) {
    const [selectedQuantities, setSelectedQuantities] = useState<
        Record<string, number>
    >({});

    const router = useRouter();

    const handleQuantityChange = (quantities: Record<string, number>) => {
        setSelectedQuantities(quantities);
    };

    const totalTickets = Object.values(selectedQuantities).reduce(
        (acc, val) => acc + val,
        0
    );

    const totalPrice = Object.entries(selectedQuantities).reduce(
        (acc, [ticketId, qty]) => {
            const ticket = ticketTypes.find((t) => t.id === ticketId);
            return acc + (ticket ? ticket.price * qty : 0);
        },
        0
    );

    const totalFee = Object.entries(selectedQuantities).reduce(
        (acc, [ticketId, qty]) => {
            const ticket = ticketTypes.find((t) => t.id === ticketId);
            return acc + (ticket ? ticket.fee * qty : 0);
        },
        0
    );

    const handleFinish = () => {
        // monta um payload completo para o checkout
        const items = ticketTypes
            .map((t) => ({
                id: t.id,
                name: t.name,
                price: t.price,
                fee: t.fee,
                qty: selectedQuantities[t.id] || 0,
            }))
            .filter((i) => i.qty > 0);

        if (!items.length) return;

        const payload = {
            event: {
                id: event?.id,
                title: event?.title,
                date: event?.date,
                venue: event?.venue,
            },
            items,
        };

        const cart = encodeURIComponent(JSON.stringify(payload));
        router.push(`/checkout?cart=${cart}`);
    };

    return (
        <>
            <div
                className={`${styles.header} ${
                    totalTickets > 0 ? styles.headerVisible : ''
                }`}
            >
                <div className={styles.headerContent}>
                    <div>
                        <strong>
                            R$ {totalPrice.toFixed(2).replace('.', ',')}
                        </strong>
                        {' + R$ '}
                        {totalFee.toFixed(2).replace('.', ',')} taxa
                        <br />
                        {totalTickets}{' '}
                        {totalTickets === 1 ? 'Ingresso' : 'Ingressos'}
                    </div>
                    <button
                        className={styles.headerCta}
                        onClick={handleFinish}
                        disabled={totalTickets === 0}
                    >
                        Finalizar
                    </button>
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.card}>
                    <Image
                        src={event.image || '/placeholder.svg'}
                        alt={event.title}
                        width={800}
                        height={400}
                        className={styles.image}
                        priority
                    />

                    <h1 className={styles.eventTitle}>{event.title}</h1>

                    <div className={styles.gridInfo}>
                        <div>
                            <p className={styles.label}>📍 Local</p>
                            <p>{event.venue}</p>
                        </div>
                        <div>
                            <p className={styles.label}>🗓 Data</p>
                            <p>
                                {new Date(event.date).toLocaleString('pt-BR', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </p>
                        </div>
                    </div>

                    <h2 className={styles.label}>
                        Selecione um ingresso para comprar
                    </h2>

                    <TicketSelector
                        ticketTypes={ticketTypes}
                        onQuantityChange={handleQuantityChange}
                    />

                    <button className={styles.buyBtn} onClick={handleFinish}>
                        Comprar Ingresso
                    </button>
                </div>
            </div>
        </>
    );
}
