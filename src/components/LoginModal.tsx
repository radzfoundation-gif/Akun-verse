"use client";

import { usePathname } from "next/navigation";
import { SignIn, useUser } from "@clerk/nextjs";

export default function LoginModal() {
    const pathname = usePathname();
    const { isLoaded, isSignedIn } = useUser();

    // Don't show modal if:
    // 1. Auth is not loaded yet
    // 2. User is already signed in
    // 3. User is already on sign-in or sign-up page
    if (!isLoaded || isSignedIn) {
        return null;
    }

    if (pathname.includes("/sign-in") || pathname.includes("/sign-up")) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="animate-in fade-in zoom-in duration-300">
                <SignIn routing="hash" />
            </div>
        </div>
    );
}
