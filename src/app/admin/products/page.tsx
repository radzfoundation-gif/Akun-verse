'use client';

import { useState, useEffect } from 'react';
import { supabase, AdminProduct, deleteProduct } from '@/lib/supabase';
import { Plus, Pencil, Trash2, Package, Loader2, RefreshCw, Eye } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const categories = [
    { value: 'akun-game', label: 'Akun Game' },
    { value: 'akun-streaming', label: 'Akun Streaming' },
    { value: 'software-pc', label: 'Software PC' },
    { value: 'topup-game', label: 'Top Up Game' },
    { value: 'gift-card', label: 'Gift Card' },
    { value: 'vpn-premium', label: 'VPN Premium' },
];

export default function AdminProductsPage() {
    const router = useRouter();
    const [products, setProducts] = useState<AdminProduct[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchProducts() {
        setLoading(true);
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            setProducts(data);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    async function handleDelete(id: string) {
        if (!confirm('Yakin hapus produk ini?')) return;

        try {
            await deleteProduct(id);
            await fetchProducts();
        } catch (error) {
            console.error('Failed to delete product:', error);
            alert('Gagal menghapus produk');
        }
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <main className="min-h-screen bg-[#0B0F19]">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#FACC15] to-orange-500 rounded-xl flex items-center justify-center">
                            <Package size={24} className="text-[#111827]" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">Admin Produk</h1>
                            <p className="text-gray-400">Kelola produk di Supabase</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={fetchProducts}
                            className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors"
                        >
                            <RefreshCw size={18} />
                            Refresh
                        </button>
                        <Link
                            href="/admin/products/new"
                            className="flex items-center gap-2 px-4 py-2 bg-[#FACC15] text-[#111827] font-bold rounded-xl hover:bg-[#FACC15]/90 transition-colors"
                        >
                            <Plus size={18} />
                            Tambah Produk
                        </Link>
                    </div>
                </div>

                {/* Products Table */}
                <div className="bg-[#1F2933] border border-white/10 rounded-2xl overflow-hidden">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 size={24} className="text-[#FACC15] animate-spin" />
                            <span className="ml-2 text-gray-400">Memuat produk...</span>
                        </div>
                    ) : products.length === 0 ? (
                        <div className="text-center py-12">
                            <Package size={48} className="mx-auto text-gray-600 mb-4" />
                            <p className="text-gray-400">Belum ada produk</p>
                            <Link
                                href="/admin/products/new"
                                className="mt-4 inline-block px-4 py-2 bg-[#FACC15] text-[#111827] font-bold rounded-xl"
                            >
                                Tambah Produk Pertama
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-[#111827]">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Produk</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Tipe</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Harga</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Stok</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {products.map((product) => (
                                        <tr key={product.id} className="hover:bg-white/5">
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-3">
                                                    {product.image && (
                                                        <img
                                                            src={product.image}
                                                            alt={product.name}
                                                            className="w-12 h-12 rounded-lg object-cover"
                                                        />
                                                    )}
                                                    <div>
                                                        <p className="font-medium text-white">{product.name}</p>
                                                        <p className="text-xs text-gray-500">{product.slug}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-sm text-gray-400">
                                                        {categories.find(c => c.value === product.category)?.label || product.category}
                                                    </span>
                                                    {product.account_type && (
                                                        <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 w-fit">
                                                            {product.account_type === 'sharing' ? 'Sharing' : 'Private'}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className="text-[#FACC15] font-bold">{formatPrice(product.price)}</span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.stock <= 0 ? 'bg-red-500/20 text-red-400' :
                                                        product.stock <= 5 ? 'bg-orange-500/20 text-orange-400' :
                                                            'bg-green-500/20 text-green-400'
                                                    }`}>
                                                    {product.stock}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex gap-2">
                                                    <Link
                                                        href={`/produk/${product.slug}`}
                                                        target="_blank"
                                                        className="p-2 text-gray-400 hover:text-blue-400 hover:bg-white/10 rounded-lg transition-colors"
                                                    >
                                                        <Eye size={16} />
                                                    </Link>
                                                    <Link
                                                        href={`/admin/products/${product.id}`}
                                                        className="p-2 text-gray-400 hover:text-[#FACC15] hover:bg-white/10 rounded-lg transition-colors"
                                                    >
                                                        <Pencil size={16} />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(product.id)}
                                                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-white/10 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
