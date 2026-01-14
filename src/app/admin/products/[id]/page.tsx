'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Plus, X, Link as LinkIcon, Key, Loader2, Trash2 } from 'lucide-react';
import { getProductById, updateProduct, deleteProduct, generateSlug, AdminProduct } from '@/lib/supabase';

const categories = [
    { value: 'akun-game', label: 'Akun Game' },
    { value: 'software-pc', label: 'Software PC' },
    { value: 'voucher', label: 'Voucher' },
    { value: 'top-up', label: 'Top Up' },
    { value: 'joki', label: 'Joki' },
];

const badges = [
    { value: '', label: 'Tidak ada' },
    { value: 'best_seller', label: 'Best Seller' },
    { value: 'termurah', label: 'Termurah' },
    { value: 'promo', label: 'Promo' },
    { value: 'new', label: 'New' },
];

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        category: 'software-pc',
        price: '',
        originalPrice: '',
        discount: '',
        image: '',
        description: '',
        stock: '10',
        badge: '',
        accountType: 'sharing',
        deliveryType: 'instant',
        deliveryLinks: [''],
        deliveryKeys: [''],
    });

    useEffect(() => {
        loadProduct();
    }, [resolvedParams.id]);

    const loadProduct = async () => {
        try {
            const product = await getProductById(resolvedParams.id);
            setFormData({
                name: product.name,
                slug: product.slug,
                category: product.category,
                price: product.price.toString(),
                originalPrice: product.original_price?.toString() || '',
                discount: product.discount?.toString() || '',
                image: product.image || '',
                description: product.description || '',
                stock: product.stock.toString(),
                badge: product.badge || '',
                accountType: product.account_type || 'sharing',
                deliveryType: product.delivery_type || 'instant',
                deliveryLinks: product.delivery_links?.length ? product.delivery_links : [''],
                deliveryKeys: product.delivery_keys?.length ? product.delivery_keys : [''],
            });
        } catch (err: any) {
            setError(err.message || 'Gagal memuat produk');
        } finally {
            setIsLoading(false);
        }
    };

    const handleNameChange = (name: string) => {
        setFormData({
            ...formData,
            name,
            slug: generateSlug(name),
        });
    };

    const handleAddLink = () => {
        setFormData({
            ...formData,
            deliveryLinks: [...formData.deliveryLinks, ''],
        });
    };

    const handleRemoveLink = (index: number) => {
        setFormData({
            ...formData,
            deliveryLinks: formData.deliveryLinks.filter((_, i) => i !== index),
        });
    };

    const handleLinkChange = (index: number, value: string) => {
        const newLinks = [...formData.deliveryLinks];
        newLinks[index] = value;
        setFormData({ ...formData, deliveryLinks: newLinks });
    };

    const handleAddKey = () => {
        setFormData({
            ...formData,
            deliveryKeys: [...formData.deliveryKeys, ''],
        });
    };

    const handleRemoveKey = (index: number) => {
        setFormData({
            ...formData,
            deliveryKeys: formData.deliveryKeys.filter((_, i) => i !== index),
        });
    };

    const handleKeyChange = (index: number, value: string) => {
        const newKeys = [...formData.deliveryKeys];
        newKeys[index] = value;
        setFormData({ ...formData, deliveryKeys: newKeys });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            // Calculate discount if original price provided
            let discount = undefined;
            if (formData.originalPrice && formData.price) {
                const original = parseFloat(formData.originalPrice);
                const current = parseFloat(formData.price);
                discount = Math.round(((original - current) / original) * 100);
            }

            await updateProduct(resolvedParams.id, {
                name: formData.name,
                slug: formData.slug,
                category: formData.category,
                price: parseFloat(formData.price),
                original_price: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
                discount,
                image: formData.image,
                description: formData.description,
                stock: parseInt(formData.stock),
                badge: formData.badge as any || null,
                account_type: formData.accountType as 'sharing' | 'private' | null,
                delivery_type: formData.deliveryType as 'instant' | 'manual',
                delivery_links: formData.deliveryLinks.filter(l => l.trim()),
                delivery_keys: formData.deliveryKeys.filter(k => k.trim()),
            });

            router.push('/admin/products');
        } catch (err: any) {
            setError(err.message || 'Gagal menyimpan produk');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteProduct(resolvedParams.id);
            router.push('/admin/products');
        } catch (err: any) {
            setError(err.message || 'Gagal menghapus produk');
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/products"
                        className="p-2 hover:bg-gray-800 rounded-xl text-gray-400 hover:text-white"
                    >
                        <ArrowLeft size={24} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Edit Produk</h1>
                        <p className="text-gray-400">{formData.name}</p>
                    </div>
                </div>
                {deleteConfirm ? (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleDelete}
                            className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
                        >
                            Konfirmasi Hapus
                        </button>
                        <button
                            onClick={() => setDeleteConfirm(false)}
                            className="px-4 py-2 bg-gray-700 text-white rounded-xl hover:bg-gray-600"
                        >
                            Batal
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setDeleteConfirm(true)}
                        className="flex items-center gap-2 text-red-400 hover:text-red-300"
                    >
                        <Trash2 size={18} />
                        Hapus
                    </button>
                )}
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Informasi Dasar</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Nama Produk *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => handleNameChange(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Slug URL
                            </label>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Kategori *
                            </label>
                            <select
                                required
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                            >
                                {categories.map(cat => (
                                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                URL Gambar
                            </label>
                            <input
                                type="url"
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Deskripsi
                            </label>
                            <textarea
                                rows={3}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Pricing */}
                <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Harga & Stock</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Harga Jual (Rp) *
                            </label>
                            <input
                                type="number"
                                required
                                min="0"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Harga Asli (Rp)
                            </label>
                            <input
                                type="number"
                                min="0"
                                value={formData.originalPrice}
                                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Stock *
                            </label>
                            <input
                                type="number"
                                required
                                min="0"
                                value={formData.stock}
                                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Badge
                            </label>
                            <select
                                value={formData.badge}
                                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                            >
                                {badges.map(badge => (
                                    <option key={badge.value} value={badge.value}>{badge.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Account Type */}
                <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Tipe Akun</h2>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer p-4 rounded-xl border border-gray-600 bg-gray-700 hover:bg-gray-600 transition-colors flex-1">
                            <input
                                type="radio"
                                name="accountType"
                                value="sharing"
                                checked={formData.accountType === 'sharing'}
                                onChange={(e) => setFormData({ ...formData, accountType: e.target.value })}
                                className="text-brand-500 focus:ring-brand-500 w-5 h-5"
                            />
                            <div>
                                <span className="block text-white font-medium">Sharing</span>
                                <span className="text-sm text-gray-400">1 akun dipakai bersama</span>
                            </div>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer p-4 rounded-xl border border-gray-600 bg-gray-700 hover:bg-gray-600 transition-colors flex-1">
                            <input
                                type="radio"
                                name="accountType"
                                value="private"
                                checked={formData.accountType === 'private'}
                                onChange={(e) => setFormData({ ...formData, accountType: e.target.value })}
                                className="text-brand-500 focus:ring-brand-500 w-5 h-5"
                            />
                            <div>
                                <span className="block text-white font-medium">Private</span>
                                <span className="text-sm text-gray-400">Akun milik sendiri</span>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Delivery Settings */}
                <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Pengiriman Digital</h2>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Tipe Pengiriman
                        </label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="deliveryType"
                                    value="instant"
                                    checked={formData.deliveryType === 'instant'}
                                    onChange={(e) => setFormData({ ...formData, deliveryType: e.target.value })}
                                    className="text-brand-500 focus:ring-brand-500"
                                />
                                <span className="text-white">Instant (Otomatis)</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="deliveryType"
                                    value="manual"
                                    checked={formData.deliveryType === 'manual'}
                                    onChange={(e) => setFormData({ ...formData, deliveryType: e.target.value })}
                                    className="text-brand-500 focus:ring-brand-500"
                                />
                                <span className="text-white">Manual</span>
                            </label>
                        </div>
                    </div>

                    {/* Google Drive Links */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                            <LinkIcon size={16} />
                            Link Download (Google Drive, dll)
                        </label>
                        <div className="space-y-2">
                            {formData.deliveryLinks.map((link, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="url"
                                        value={link}
                                        onChange={(e) => handleLinkChange(index, e.target.value)}
                                        placeholder="https://drive.google.com/..."
                                        className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                                    />
                                    {formData.deliveryLinks.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveLink(index)}
                                            className="p-3 bg-gray-700 hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-xl"
                                        >
                                            <X size={18} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={handleAddLink}
                            className="mt-2 flex items-center gap-2 text-brand-400 hover:text-brand-300 text-sm"
                        >
                            <Plus size={16} />
                            Tambah Link
                        </button>
                    </div>

                    {/* Pre-generated Keys */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                            <Key size={16} />
                            Serial Key / License
                        </label>
                        <div className="space-y-2">
                            {formData.deliveryKeys.map((key, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={key}
                                        onChange={(e) => handleKeyChange(index, e.target.value)}
                                        placeholder="XXXXX-XXXXX-XXXXX-XXXXX"
                                        className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 font-mono focus:outline-none focus:ring-2 focus:ring-brand-500"
                                    />
                                    {formData.deliveryKeys.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveKey(index)}
                                            className="p-3 bg-gray-700 hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-xl"
                                        >
                                            <X size={18} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={handleAddKey}
                            className="mt-2 flex items-center gap-2 text-brand-400 hover:text-brand-300 text-sm"
                        >
                            <Plus size={16} />
                            Tambah Key
                        </button>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-4">
                    <Link
                        href="/admin/products"
                        className="px-6 py-3 text-gray-400 hover:text-white"
                    >
                        Batal
                    </Link>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 bg-brand-500 text-white px-6 py-3 rounded-xl hover:bg-brand-600 transition-colors disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                Menyimpan...
                            </>
                        ) : (
                            <>
                                <Save size={18} />
                                Simpan Perubahan
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
