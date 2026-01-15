'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useReferral } from '@/contexts/ReferralContext';

export default function ReferralListener() {
    const searchParams = useSearchParams();
    const { applyReferralCode } = useReferral();
    const hasApplied = useRef(false);

    useEffect(() => {
        const ref = searchParams.get('ref');

        if (ref && !hasApplied.current) {
            hasApplied.current = true; // Prevent double application
            const success = applyReferralCode(ref);

            if (success) {
                // Remove query param without refresh
                const newUrl = new URL(window.location.href);
                newUrl.searchParams.delete('ref');
                window.history.replaceState({}, '', newUrl.toString());

                // Show toast (Assuming sonner or similar toast is used, or fallback to alert/console)
                // If toast is not available in global scope, we might need to remove this or use specific toast lib
                console.log(`Referral code ${ref} applied successfully!`);
            }
        }
    }, [searchParams, applyReferralCode]);

    return null;
}
