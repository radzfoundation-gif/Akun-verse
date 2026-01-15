'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useUser, useClerk } from '@clerk/nextjs';
import { useWishlist } from '@/contexts/WishlistContext';
import { useReferral } from '@/contexts/ReferralContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ReferralCard from '@/components/ReferralCard';
import {
    User, Package, Heart, Settings, LogOut, ChevronRight,
    Mail, Calendar, Shield, Bell, CreditCard, ArrowLeft,
    Star, Clock, Gift, Wallet
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type TabType = 'overview' | 'orders' | 'wishlist' | 'referral' | 'settings';

export default function ProfilePage() {
    const { user, isLoaded } = useUser();
    const { signOut } = useClerk();
    const { items: wishlistItems } = useWishlist();
    const { referralData } = useReferral();
    const [activeTab, setActiveTab] = useState<TabType>('overview');

    // Mock orders data
    const orders = [
        { id: 'RLABS-1705300000-ABC123', date: '2026-01-15', total: 85000, status: 'paid', items: 2 },
        { id: 'RLABS-1705200000-DEF456', date: '2026-01-10', total: 150000, status: 'paid', items: 3 },
        { id: 'RLABS-1705100000-GHI789', date: '2026-01-05', total: 45000, status: 'paid', items: 1 },
    ];

    if (!isLoaded) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <Navbar />
                <div className="max-w-6xl mx-auto px-4 py-12">
                    <div className="animate-pulse">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-20 h-20 bg-gray-700/50 rounded-full" />
                            <div>
                                <div className="h-6 bg-gray-700/50 rounded w-48 mb-2" />
                                <div className="h-4 bg-gray-700/50 rounded w-32" />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </main>
        );
    }

    if (!user) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <Navbar />
                <div className="max-w-md mx-auto px-4 py-24 text-center">
                    <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <User className="w-10 h-10 text-purple-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-4">Login Diperlukan</h1>
                    <p className="text-gray-400 mb-8">
                        Silakan login untuk mengakses halaman profil Anda.
                    </p>
                    <Link
                        href="/sign-in"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all"
                    >
                        Login Sekarang
                    </Link>
                </div>
                <Footer />
            </main>
        );
    }

    const tabs = [
        { id: 'overview' as TabType, label: 'Overview', icon: User },
        { id: 'orders' as TabType, label: 'Pesanan', icon: Package },
        { id: 'wishlist' as TabType, label: 'Wishlist', icon: Heart },
        { id: 'referral' as TabType, label: 'Referral', icon: Gift },
        { id: 'settings' as TabType, label: 'Pengaturan', icon: Settings },
    ];

    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

    const stats = [
        { label: 'Total Pesanan', value: orders.length, icon: Package, color: 'text-blue-400' },
        { label: 'Wishlist', value: wishlistItems.length, icon: Heart, color: 'text-pink-400' },
        { label: 'Total Belanja', value: formatCurrency(orders.reduce((sum, o) => sum + o.total, 0)), icon: Wallet, color: 'text-green-400' },
        { label: 'Referral', value: referralData?.totalReferrals || 0, icon: Gift, color: 'text-purple-400' },
    ];

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <Navbar />

            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Back Link */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
                >
                    <ArrowLeft size={18} />
                    Kembali ke Beranda
                </Link>

                {/* Profile Header */}
                <div className="bg-white/5 rounded-2xl p-6 mb-6">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                        <Image
                            src={user.imageUrl}
                            alt={user.fullName || 'User'}
                            width={80}
                            height={80}
                            className="rounded-full border-4 border-purple-500/30"
                        />
                        <div className="text-center sm:text-left flex-1">
                            <h1 className="text-2xl font-bold text-white mb-1">
                                {user.fullName || 'User'}
                            </h1>
                            <p className="text-gray-400 flex items-center justify-center sm:justify-start gap-2">
                                <Mail size={14} />
                                {user.primaryEmailAddress?.emailAddress}
                            </p>
                            <div className="flex items-center justify-center sm:justify-start gap-4 mt-2 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                    <Calendar size={14} />
                                    Bergabung {new Date(user.createdAt!).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                                </span>
                                <span className="flex items-center gap-1 text-green-400">
                                    <Shield size={14} />
                                    Terverifikasi
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={() => signOut()}
                            className="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
                        >
                            <LogOut size={18} />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-4 gap-6">
                    {/* Sidebar Tabs */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/5 rounded-2xl p-4 sticky top-24">
                            <nav className="space-y-1">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === tab.id
                                                ? 'bg-purple-600 text-white'
                                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                            }`}
                                    >
                                        <tab.icon size={18} />
                                        {tab.label}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-3">
                        <AnimatePresence mode="wait">
                            {/* Overview Tab */}
                            {activeTab === 'overview' && (
                                <motion.div
                                    key="overview"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-6"
                                >
                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {stats.map((stat) => (
                                            <div key={stat.label} className="bg-white/5 rounded-xl p-4">
                                                <div className={`${stat.color} mb-2`}>
                                                    <stat.icon size={20} />
                                                </div>
                                                <p className="text-2xl font-bold text-white">{stat.value}</p>
                                                <p className="text-gray-500 text-sm">{stat.label}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Recent Orders */}
                                    <div className="bg-white/5 rounded-2xl p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-semibold text-white">Pesanan Terbaru</h3>
                                            <button
                                                onClick={() => setActiveTab('orders')}
                                                className="text-purple-400 text-sm hover:underline"
                                            >
                                                Lihat Semua
                                            </button>
                                        </div>
                                        <div className="space-y-3">
                                            {orders.slice(0, 3).map((order) => (
                                                <Link
                                                    key={order.id}
                                                    href={`/orders?id=${order.id}`}
                                                    className="flex items-center justify-between p-4 bg-black/20 rounded-xl hover:bg-black/30 transition-colors"
                                                >
                                                    <div>
                                                        <p className="text-white font-medium text-sm">{order.id}</p>
                                                        <p className="text-gray-500 text-xs">{order.items} produk</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-purple-400 font-semibold">{formatCurrency(order.total)}</p>
                                                        <span className="text-xs text-green-400">Lunas</span>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Orders Tab */}
                            {activeTab === 'orders' && (
                                <motion.div
                                    key="orders"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="bg-white/5 rounded-2xl p-6"
                                >
                                    <h3 className="text-lg font-semibold text-white mb-4">Riwayat Pesanan</h3>
                                    {orders.length === 0 ? (
                                        <div className="text-center py-12">
                                            <Package className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                            <p className="text-gray-400">Belum ada pesanan</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {orders.map((order) => (
                                                <Link
                                                    key={order.id}
                                                    href={`/orders?id=${order.id}`}
                                                    className="flex items-center justify-between p-4 bg-black/20 rounded-xl hover:bg-black/30 transition-colors group"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                                                            <Package className="w-5 h-5 text-green-400" />
                                                        </div>
                                                        <div>
                                                            <p className="text-white font-medium">{order.id}</p>
                                                            <p className="text-gray-500 text-sm">{order.date} • {order.items} produk</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <div className="text-right">
                                                            <p className="text-purple-400 font-semibold">{formatCurrency(order.total)}</p>
                                                            <span className="text-xs text-green-400">Lunas</span>
                                                        </div>
                                                        <ChevronRight className="text-gray-600 group-hover:text-white transition-colors" size={18} />
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {/* Wishlist Tab */}
                            {activeTab === 'wishlist' && (
                                <motion.div
                                    key="wishlist"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="bg-white/5 rounded-2xl p-6"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-white">Wishlist Saya</h3>
                                        <Link href="/wishlist" className="text-purple-400 text-sm hover:underline">
                                            Lihat Semua
                                        </Link>
                                    </div>
                                    {wishlistItems.length === 0 ? (
                                        <div className="text-center py-12">
                                            <Heart className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                            <p className="text-gray-400">Wishlist kosong</p>
                                            <Link href="/katalog" className="text-purple-400 text-sm hover:underline mt-2 inline-block">
                                                Jelajahi Produk
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                            {wishlistItems.slice(0, 6).map((item) => (
                                                <Link key={item.id} href={`/produk/${item.slug}`} className="group">
                                                    <div className="aspect-square relative rounded-xl overflow-hidden mb-2">
                                                        <Image
                                                            src={item.image}
                                                            alt={item.name}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition-transform"
                                                        />
                                                    </div>
                                                    <p className="text-white text-sm line-clamp-1">{item.name}</p>
                                                    <p className="text-purple-400 text-sm font-semibold">{formatCurrency(item.price)}</p>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {/* Referral Tab */}
                            {activeTab === 'referral' && (
                                <motion.div
                                    key="referral"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    <ReferralCard />
                                </motion.div>
                            )}

                            {/* Settings Tab */}
                            {activeTab === 'settings' && (
                                <motion.div
                                    key="settings"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-4"
                                >
                                    <div className="bg-white/5 rounded-2xl p-6">
                                        <h3 className="text-lg font-semibold text-white mb-4">Pengaturan Akun</h3>

                                        <div className="space-y-4">
                                            <button className="w-full flex items-center justify-between p-4 bg-black/20 rounded-xl hover:bg-black/30 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <Bell className="text-gray-400" size={20} />
                                                    <div className="text-left">
                                                        <p className="text-white">Notifikasi</p>
                                                        <p className="text-gray-500 text-sm">Kelola preferensi notifikasi</p>
                                                    </div>
                                                </div>
                                                <ChevronRight className="text-gray-600" size={18} />
                                            </button>

                                            <button className="w-full flex items-center justify-between p-4 bg-black/20 rounded-xl hover:bg-black/30 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <CreditCard className="text-gray-400" size={20} />
                                                    <div className="text-left">
                                                        <p className="text-white">Metode Pembayaran</p>
                                                        <p className="text-gray-500 text-sm">Kelola metode pembayaran</p>
                                                    </div>
                                                </div>
                                                <ChevronRight className="text-gray-600" size={18} />
                                            </button>

                                            <button className="w-full flex items-center justify-between p-4 bg-black/20 rounded-xl hover:bg-black/30 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <Shield className="text-gray-400" size={20} />
                                                    <div className="text-left">
                                                        <p className="text-white">Keamanan</p>
                                                        <p className="text-gray-500 text-sm">Password & 2FA</p>
                                                    </div>
                                                </div>
                                                <ChevronRight className="text-gray-600" size={18} />
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => signOut()}
                                        className="w-full flex items-center justify-center gap-2 p-4 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-colors"
                                    >
                                        <LogOut size={18} />
                                        Logout dari Akun
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
