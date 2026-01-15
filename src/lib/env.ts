/**
 * Environment validation utility
 * Validates required environment variables at startup
 */

interface EnvConfig {
    // Supabase
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;

    // Clerk
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
    CLERK_SECRET_KEY?: string;

    // Midtrans
    NEXT_PUBLIC_MIDTRANS_CLIENT_KEY: string;
    MIDTRANS_SERVER_KEY?: string;
    MIDTRANS_MERCHANT_ID?: string;

    // Email
    RESEND_API_KEY?: string;
}

const requiredEnvVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
    'NEXT_PUBLIC_MIDTRANS_CLIENT_KEY',
] as const;

const serverEnvVars = [
    'CLERK_SECRET_KEY',
    'MIDTRANS_SERVER_KEY',
    'RESEND_API_KEY',
] as const;

export function validateEnv(): void {
    const missing: string[] = [];

    // Check required public env vars
    for (const key of requiredEnvVars) {
        if (!process.env[key]) {
            missing.push(key);
        }
    }

    // Check server env vars (only on server side)
    if (typeof window === 'undefined') {
        for (const key of serverEnvVars) {
            if (!process.env[key]) {
                console.warn(`⚠️ Optional env var ${key} is not set`);
            }
        }
    }

    if (missing.length > 0) {
        throw new Error(
            `Missing required environment variables:\n${missing.map(k => `  - ${k}`).join('\n')}\n\n` +
            `Please check your .env.local file.`
        );
    }
}

export function getEnv(): EnvConfig {
    return {
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!,
        CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
        NEXT_PUBLIC_MIDTRANS_CLIENT_KEY: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!,
        MIDTRANS_SERVER_KEY: process.env.MIDTRANS_SERVER_KEY,
        MIDTRANS_MERCHANT_ID: process.env.MIDTRANS_MERCHANT_ID,
        RESEND_API_KEY: process.env.RESEND_API_KEY,
    };
}

// Validate on import (server-side only during build)
if (typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
    try {
        validateEnv();
        console.log('✅ Environment variables validated successfully');
    } catch (error) {
        console.error('❌ Environment validation failed:', error);
        // Don't throw in production to prevent crash, just log
    }
}
