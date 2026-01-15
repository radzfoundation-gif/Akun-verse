"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Gamepad2, ShoppingCart, Menu, Search, User, ClipboardList, Bell, HelpCircle, Heart } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import MobileMenu from './MobileMenu';
import { SignedIn, SignedOut, UserButton, useUser, SignInButton } from '@clerk/nextjs';

export default function Navbar() {
    const { totalItems, setIsCartOpen } = useCart();
    const { items: wishlistItems } = useWishlist();
    const { user } = useUser();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle search navigation
        window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    };

    return (
        <>
            <nav className="sticky top-0 z-50 bg-[#111827] shadow-xl text-[#F9FAFB] border-b border-white/5">
                {/* Top Bar (Hidden on Mobile) */}
                <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/5">
                    <div className="flex justify-between items-center h-8 text-[11px] font-medium text-gray-400">
                        <div className="flex items-center gap-4">
                            <span className="hover:text-[#FACC15] cursor-pointer transition-colors">Seller Centre</span>
                            <span className="border-l border-white/10 h-3"></span>
                            <span className="hover:text-[#FACC15] cursor-pointer transition-colors">Download Aplikasi</span>
                            <span className="border-l border-white/10 h-3"></span>
                            <div className="flex items-center gap-2">
                                <span>Ikuti kami di</span>
                                <div className="w-4 h-4 bg-white/10 rounded-full hover:bg-[#FACC15] hover:text-black cursor-pointer transition-colors"></div>
                                <div className="w-4 h-4 bg-white/10 rounded-full hover:bg-[#FACC15] hover:text-black cursor-pointer transition-colors"></div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href="/notifications" className="flex items-center gap-1 hover:text-[#FACC15] transition-colors">
                                <Bell size={14} />
                                <span>Notifikasi</span>
                            </Link>
                            <Link href="/help" className="flex items-center gap-1 hover:text-[#FACC15] transition-colors">
                                <HelpCircle size={14} />
                                <span>Bantuan</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Main Navbar */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-3 pt-2 md:pt-4">
                    <div className="flex items-center gap-4 sm:gap-8 h-10 md:h-auto">

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="md:hidden p-1 text-gray-300 hover:text-[#FACC15] transition-colors"
                        >
                            <Menu size={24} />
                        </button>

                        {/* Logo */}
                        <Link href="/" className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
                            <div className="bg-[#1F2933] text-[#FACC15] p-1.5 rounded-lg border border-[#FACC15]/20 shadow-[0_0_15px_rgba(250,204,21,0.2)]">
                                <Gamepad2 size={24} className="md:w-7 md:h-7" />
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="text-xl md:text-2xl font-bold tracking-tight text-white">Akunverse</span>
                                <span className="text-[10px] text-[#FACC15] font-medium tracking-[0.2em] uppercase">Premium Store</span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-1 mx-4">
                            {['Beranda', 'Kategori', 'Kupon', 'Toolkit'].map((item) => (
                                <Link
                                    key={item}
                                    href={item === 'Beranda' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                                    className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-full transition-all duration-200"
                                >
                                    {item}
                                </Link>
                            ))}
                        </div>

                        {/* Search Bar (Desktop) */}
                        <div className="flex-1 max-w-2xl hidden md:block">
                            <form onSubmit={handleSearch} className="relative w-full">
                                <div className="flex bg-[#1F2933] rounded-lg border border-white/10 p-1 focus-within:border-[#FACC15]/50 transition-colors">
                                    <input
                                        type="text"
                                        placeholder="Cari produk eksklusif..."
                                        className="flex-1 w-full px-4 py-2 text-sm bg-transparent text-white placeholder:text-gray-500 focus:outline-none"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <button
                                        type="submit"
                                        className="bg-[#FACC15] hover:bg-[#EAB308] text-[#111827] px-6 py-2 rounded-md font-medium transition-colors"
                                    >
                                        <Search size={18} />
                                    </button>
                                </div>
                                <div className="absolute top-full left-0 mt-2 flex gap-4 text-xs text-gray-400 font-light">
                                    <Link href="/search?q=Steam" className="hover:text-[#FACC15] transition-colors">Steam Wallet</Link>
                                    <Link href="/search?q=Netflix" className="hover:text-[#FACC15] transition-colors">Netflix Premium</Link>
                                    <Link href="/search?q=Valorant" className="hover:text-[#FACC15] transition-colors">Valorant Points</Link>
                                </div>
                            </form>
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-3 md:gap-4 ml-auto md:ml-0">
                            {/* Wishlist */}
                            <Link
                                href="/wishlist"
                                className="text-gray-300 hover:text-[#FACC15] transition-colors relative group p-1"
                            >
                                <Heart size={24} strokeWidth={1.5} className="md:w-7 md:h-7" />
                                {wishlistItems.length > 0 && (
                                    <span className="absolute -top-1 -right-1 h-4 w-4 md:h-5 md:w-5 bg-pink-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                        {wishlistItems.length > 99 ? '99+' : wishlistItems.length}
                                    </span>
                                )}
                            </Link>

                            {/* Cart */}
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="text-gray-300 hover:text-[#FACC15] transition-colors relative group p-1"
                            >
                                <ShoppingCart size={24} strokeWidth={1.5} className="md:w-7 md:h-7" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 h-4 w-4 md:h-5 md:w-5 bg-[#FACC15] text-[#111827] text-[10px] font-bold rounded-full flex items-center justify-center">
                                        {totalItems > 99 ? '99+' : totalItems}
                                    </span>
                                )}
                            </button>

                            {/* Auth */}
                            <div className="flex items-center text-sm font-medium">
                                <SignedOut>
                                    <div className="flex items-center gap-3 text-gray-300">
                                        <Link href="/sign-in" className="hover:text-[#FACC15] transition-colors">Login</Link>
                                        <span className="border-l border-white/10 h-4 hidden md:block"></span>
                                        <Link href="/sign-up" className="hidden md:block hover:text-[#FACC15] transition-colors">Daftar</Link>
                                    </div>
                                </SignedOut>
                                <SignedIn>
                                    <div className="flex items-center gap-3">
                                        <div className="hidden md:flex flex-col items-end leading-tight">
                                            <span className="text-[#F9FAFB] font-medium text-xs">
                                                {user?.username || user?.firstName}
                                            </span>
                                            <Link href="/profile" className="text-[10px] text-[#FACC15] hover:text-[#EAB308] flex items-center gap-1">
                                                <User size={10} /> Profile & Settings
                                            </Link>
                                        </div>
                                        <div className="bg-[#1F2933] p-0.5 rounded-full border border-white/10 hover:border-[#FACC15] transition-colors cursor-pointer">
                                            <UserButton
                                                afterSignOutUrl="/"
                                                appearance={{
                                                    elements: {
                                                        avatarBox: 'w-7 h-7'
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                </SignedIn>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Search (Compact) */}
                    <div className="md:hidden mt-3">
                        <form onSubmit={handleSearch} className="flex bg-[#1F2933] rounded-md border border-white/10 p-1">
                            <div className="flex-1 flex items-center px-2">
                                <Search size={16} className="text-gray-500 mr-2" />
                                <input
                                    type="text"
                                    placeholder="Cari produk..."
                                    className="w-full text-sm py-1.5 bg-transparent text-white focus:outline-none placeholder:text-gray-600"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </>
    );
}
