'use client';

import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { syncUserToSupabase } from '@/lib/userService';

export default function UserSync() {
    const { user, isLoaded } = useUser();

    useEffect(() => {
        if (isLoaded && user) {
            // Sync user to Supabase when logged in
            syncUserToSupabase({
                id: user.id,
                email: user.primaryEmailAddress?.emailAddress || '',
                firstName: user.firstName,
                lastName: user.lastName,
                imageUrl: user.imageUrl,
            });
        }
    }, [isLoaded, user]);

    return null; // This component doesn't render anything
}
