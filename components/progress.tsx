'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const Loader = () => {
    const pathname = usePathname();
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setProgress(0);
        setVisible(true);

        const start = setTimeout(() => setProgress(60), 50);

        const finish = setTimeout(() => {
            setProgress(100);
            setTimeout(() => {
                setVisible(false);
                setProgress(0);
            }, 300);
        }, 500);

        return () => {
            clearTimeout(start);
            clearTimeout(finish);
        };
    }, [pathname]);

    return (
        <>
            <style jsx>{`
                .loader-bar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    height: 4px;
                    background-color: #f97316; /* goldDark */
                    transition: width 0.3s ease-in-out, opacity 0.3s;
                    z-index: 9999;
                }
            `}</style>
            <div
                className="loader-bar"
                style={{
                    width: `${progress}%`,
                    opacity: visible ? 1 : 0,
                }}
            />
        </>
    );
};

export default Loader;
