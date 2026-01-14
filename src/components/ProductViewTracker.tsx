'use client';

import { useEffect } from 'react';
import { trackBehavior } from '@/lib/userBehavior';

interface ProductViewTrackerProps {
    productId: string;
    category: string;
    price: number;
}

export default function ProductViewTracker({ productId, category, price }: ProductViewTrackerProps) {
    useEffect(() => {
        // Track product view when component mounts
        trackBehavior(productId, 'view', category, price);
    }, [productId, category, price]);

    // This component doesn't render anything
    return null;
}
