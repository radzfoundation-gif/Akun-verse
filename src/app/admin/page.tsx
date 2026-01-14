'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Package, ShoppingCart, DollarSign, TrendingUp, Plus, Eye } from 'lucide-react';
import { getProducts, AdminProduct } from '@/lib/supabase';

interface StatCard {
    label: string;
    value: string;
    icon: React.ElementType;
    color: string;
    change?: string;
}

export default function AdminDashboard() {
    const [products, setProducts] = useState<AdminProduct[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (err: any) {
            setError(err.message || 'Gagal memuat produk');
            // Use empty array if Supabase not configured
            setProducts([]);
        } finally {
            setIsLoading(false);
        }
    };

    const stats: StatCard[] = [
        {
            label: 'Total Produk',
            value: products.length.toString(),
            icon: Package,
            color: 'bg-blue-500',
            change: '+12%',
        },
        {
            label: 'Total Stock',
            value: products.reduce((sum, p) => sum + (p.stock || 0), 0).toString(),
            icon: TrendingUp,
            color: 'bg-green-500',
            change: '+5%',
        },
        {
            label: 'Total Nilai',
            value: `Rp ${(products.reduce((sum, p) => sum + (p.price * (p.stock || 0)), 0) / 1000000).toFixed(1)}M`,
            icon: DollarSign,
            color: 'bg-purple-500',
        },
        {
            label: 'Pesanan Hari Ini',
            value: '0',
            icon: ShoppingCart,
            color: 'bg-orange-500',
        },
    ];

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                    <p className="text-gray-400">Kelola toko RLabs Store</p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="flex items-center gap-2 bg-brand-500 text-white px-4 py-2 rounded-xl hover:bg-brand-600 transition-colors"
                >
                    <Plus size={20} />
                    Tambah Produk
                </Link>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 px-4 py-3 rounded-xl">
                    <p className="font-medium">Perhatian</p>
                    <p className="text-sm">{error}. Pastikan Supabase sudah dikonfigurasi dengan benar.</p>
                </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                                <stat.icon size={24} className="text-white" />
                            </div>
                            {stat.change && (
                                <span className="text-green-400 text-sm font-medium">{stat.change}</span>
                            )}
                        </div>
                        <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                        <p className="text-gray-400 text-sm">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Recent Products */}
            <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-gray-700">
                    <h2 className="text-lg font-semibold text-white">Produk Terbaru</h2>
                    <Link href="/admin/products" className="text-brand-400 hover:text-brand-300 text-sm">
                        Lihat Semua
                    </Link>
                </div>

                {isLoading ? (
                    <div className="p-8 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-500 mx-auto"></div>
                        <p className="text-gray-400 mt-4">Memuat produk...</p>
                    </div>
                ) : products.length === 0 ? (
                    <div className="p-8 text-center">
                        <Package size={48} className="text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400">Belum ada produk</p>
                        <Link
                            href="/admin/products/new"
                            className="inline-flex items-center gap-2 mt-4 text-brand-400 hover:text-brand-300"
                        >
                            <Plus size={16} />
                            Tambah produk pertama
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-700/50">
                                <tr>
                                    <th className="text-left text-gray-400 font-medium px-6 py-3 text-sm">Produk</th>
                                    <th className="text-left text-gray-400 font-medium px-6 py-3 text-sm">Kategori</th>
                                    <th className="text-left text-gray-400 font-medium px-6 py-3 text-sm">Harga</th>
                                    <th className="text-left text-gray-400 font-medium px-6 py-3 text-sm">Stock</th>
                                    <th className="text-left text-gray-400 font-medium px-6 py-3 text-sm">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {products.slice(0, 5).map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-700/50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={product.image || 'https://via.placeholder.com/40'}
                                                    alt={product.name}
                                                    className="w-10 h-10 rounded-lg object-cover"
                                                />
                                                <span className="text-white font-medium truncate max-w-[200px]">
                                                    {product.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded-lg text-sm">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-white">{formatPrice(product.price)}</td>
                                        <td className="px-6 py-4">
                                            <span className={`${product.stock > 10 ? 'text-green-400' : product.stock > 0 ? 'text-yellow-400' : 'text-red-400'}`}>
                                                {product.stock}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link
                                                href={`/admin/products/${product.id}`}
                                                className="text-brand-400 hover:text-brand-300"
                                            >
                                                <Eye size={18} />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                    href="/admin/products/new"
                    className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-brand-500 transition-colors group"
                >
                    <Plus size={24} className="text-brand-500 mb-3" />
                    <h3 className="text-white font-semibold group-hover:text-brand-400">Tambah Produk Baru</h3>
                    <p className="text-gray-400 text-sm mt-1">Tambahkan produk ke katalog</p>
                </Link>
                <Link
                    href="/admin/products"
                    className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-brand-500 transition-colors group"
                >
                    <Package size={24} className="text-blue-500 mb-3" />
                    <h3 className="text-white font-semibold group-hover:text-brand-400">Kelola Produk</h3>
                    <p className="text-gray-400 text-sm mt-1">Edit, hapus, atau update stock</p>
                </Link>
                <Link
                    href="/"
                    className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-brand-500 transition-colors group"
                >
                    <Eye size={24} className="text-green-500 mb-3" />
                    <h3 className="text-white font-semibold group-hover:text-brand-400">Lihat Toko</h3>
                    <p className="text-gray-400 text-sm mt-1">Preview halaman toko</p>
                </Link>
            </div>
        </div>
    );
}
