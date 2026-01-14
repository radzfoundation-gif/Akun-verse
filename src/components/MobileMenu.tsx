'use client';

import Link from 'next/link';
import { X, Home, ShoppingBag, Zap, HelpCircle, Gamepad2, Search, Percent, Package, User, ClipboardList } from 'lucide-react';
import { categories } from '@/data/categories';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const menuItems = [
    { href: '/', label: 'Beranda', icon: Home },
    { href: '/kategori', label: 'Semua Kategori', icon: ShoppingBag },
    { href: '/games', label: 'Games', icon: Gamepad2 },
    { href: '/promo', label: 'Promo & Diskon', icon: Percent },
    { href: '/search', label: 'Cari Produk', icon: Search },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    const { user } = useUser();

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-[60] md:hidden"
                onClick={onClose}
            />

            {/* Menu Drawer */}
            <div className="fixed left-0 top-0 h-full w-80 bg-white z-[70] shadow-2xl md:hidden animate-slide-in-left overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <span className="text-lg font-semibold text-gray-900">Menu</span>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                {/* Main Menu Items */}
                <nav className="p-4">
                    <ul className="space-y-1">
                        {menuItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    onClick={onClose}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-brand-50 hover:text-brand-600 transition-colors"
                                >
                                    <item.icon size={20} />
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            </li>
                        ))}
                        <SignedIn>
                            <li>
                                <Link
                                    href="/orders"
                                    onClick={onClose}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-brand-50 hover:text-brand-600 transition-colors"
                                >
                                    <ClipboardList size={20} />
                                    <span className="font-medium">Riwayat Pesanan</span>
                                </Link>
                            </li>
                        </SignedIn>
                    </ul>
                </nav>

                {/* Categories */}
                <div className="px-4 pb-4">
                    <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                        Kategori
                    </h3>
                    <ul className="space-y-1">
                        {categories.slice(0, 6).map((cat) => {
                            const Icon = cat.icon;
                            return (
                                <li key={cat.id}>
                                    <Link
                                        href={`/kategori/${cat.slug}`}
                                        onClick={onClose}
                                        className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
                                    >
                                        <div className={`${cat.bgColor} ${cat.color} w-8 h-8 rounded-lg flex items-center justify-center`}>
                                            <Icon size={16} />
                                        </div>
                                        <span className="text-sm">{cat.name}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* CTA / Auth */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-white">
                    <SignedOut>
                        <Link
                            href="/sign-in"
                            className="flex items-center justify-center w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
                        >
                            Masuk / Daftar
                        </Link>
                    </SignedOut>
                    <SignedIn>
                        <div className="space-y-3">
                            <Link
                                href="/orders"
                                onClick={onClose}
                                className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                                <Package size={20} />
                                <span className="font-medium">Riwayat Pesanan</span>
                            </Link>

                            <div className="flex items-center gap-3 px-4 py-2 border border-gray-100 rounded-xl">
                                <UserButton afterSignOutUrl="/" />
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-gray-900 line-clamp-1">
                                        {user?.firstName || user?.username}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {user?.primaryEmailAddress?.emailAddress}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </SignedIn>
                </div>
            </div>
        </>
    );
}
