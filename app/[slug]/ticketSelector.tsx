'use client';

import { useState } from 'react';
import styles from '../../styles/EventSlugPage.module.css';

export default function TicketSelector({
    ticketTypes,
    onQuantityChange,
}: {
    ticketTypes: { id: string; name: string; price: number; fee: number }[];
    onQuantityChange: (quantities: Record<string, number>) => void;
}) {
    const [quantities, setQuantities] = useState<Record<string, number>>({});

    const updateQuantity = (id: string, value: number) => {
        const newQuantities = {
            ...quantities,
            [id]: Math.max(0, value),
        };
        setQuantities(newQuantities);
        onQuantityChange(newQuantities); // 🔹 envia para o pai
    };

    const increment = (id: string) => {
        updateQuantity(id, (quantities[id] || 0) + 1);
    };

    const decrement = (id: string) => {
        updateQuantity(id, (quantities[id] || 0) - 1);
    };

    return (
        <div className={styles.ticketList}>
            {ticketTypes.map((ticket) => (
                <div key={ticket.id} className={styles.ticketItem}>
                    <div>
                        <p className={styles.ticketName}>{ticket.name}</p>
                        <p className={styles.ticketPrice}>
                            R$ {ticket.price.toFixed(2).replace('.', ',')} + R${' '}
                            {ticket.fee.toFixed(2).replace('.', ',')} taxa
                        </p>
                    </div>
                    <div className={styles.counter}>
                        <button
                            onClick={() => decrement(ticket.id)}
                            className={`${styles.counterBtn} ${styles.counterBtnMinus}`}
                        >
                            −
                        </button>
                        <span>{quantities[ticket.id] || 0}</span>
                        <button
                            onClick={() => increment(ticket.id)}
                            className={`${styles.counterBtn} ${styles.counterBtnPlus}`}
                        >
                            +
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
