"use client";

import { useEffect, useState } from "react";

export default function RealtimeSold({ initialSold }: { initialSold: number }) {
    const [sold, setSold] = useState(initialSold);

    useEffect(() => {
        // Randomly increment sold count every 5-15 seconds
        const interval = setInterval(() => {
            if (Math.random() > 0.7) {
                setSold((prev) => prev + 1);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return <span>{sold} terjual</span>;
}
