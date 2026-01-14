'use client';

import { useState } from 'react';
import { Settings, Save, Loader2, Database } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { products } from '@/data/products';

export default function SettingsPage() {
    const [storeName, setStoreName] = useState('RLabs Store');
    const [storeEmail, setStoreEmail] = useState('admin@rlabs.store');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Migration State
    const [isMigrating, setIsMigrating] = useState(false);
    const [migrationStatus, setMigrationStatus] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate save
        await new Promise(r => setTimeout(r, 1000));
        setIsSubmitting(false);
    };

    const handleMigration = async () => {
        if (!confirm('Apakah anda yakin ingin mengupload data statis ke Supabase? Data yang sama akan diupdate.')) return;

        setIsMigrating(true);
        setMigrationStatus('Memulai migrasi...');

        try {
            let successCount = 0;
            let failCount = 0;

            for (const p of products) {
                // Check if exists by slug
                const { data: existing } = await supabase
                    .from('products')
                    .select('id')
                    .eq('slug', p.slug)
                    .single();

                const productData = {
                    name: p.name,
                    slug: p.slug,
                    category: p.category,
                    price: p.price,
                    original_price: p.originalPrice,
                    discount: p.discount,
                    image: p.image,
                    badge: p.badge,
                    stock: p.stock,
                    description: p.description,
                    delivery_type: 'manual', // Default for migrated items
                };

                if (existing) {
                    const { error } = await supabase
                        .from('products')
                        .update(productData)
                        .eq('id', existing.id);

                    if (error) {
                        console.error('Update failed for', p.name, error);
                        failCount++;
                    } else successCount++;
                } else {
                    const { error } = await supabase
                        .from('products')
                        .insert(productData);

                    if (error) {
                        console.error('Insert failed for', p.name, error);
                        failCount++;
                    } else successCount++;
                }
            }
            setMigrationStatus(`Selesai! Berhasil: ${successCount}, Gagal: ${failCount}`);
        } catch (err) {
            setMigrationStatus('Terjadi kesalahan fatal saat migrasi');
            console.error(err);
        }
        setIsMigrating(false);
    };


    return (
        <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-8">
                <Settings size={28} className="text-brand-500" />
                <h1 className="text-2xl font-bold text-white">Pengaturan</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Informasi Toko</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Nama Toko
                            </label>
                            <input
                                type="text"
                                value={storeName}
                                onChange={(e) => setStoreName(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Email Admin
                            </label>
                            <input
                                type="email"
                                value={storeEmail}
                                onChange={(e) => setStoreEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Supabase Configuration</h2>
                    <p className="text-gray-400 text-sm mb-4">
                        Untuk mengaktifkan admin panel, Anda perlu mengatur environment variables:
                    </p>
                    <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm text-gray-300">
                        <p>NEXT_PUBLIC_SUPABASE_URL=your_url</p>
                        <p>NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key</p>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Migrasi Data</h2>
                    <p className="text-gray-400 text-sm mb-4">
                        Upload semua data produk statis ke Supabase agar siap dipublish.
                        Ini akan menimpa data yang memiliki slug sama.
                    </p>

                    {migrationStatus && (
                        <div className={`p-4 rounded-xl mb-4 ${migrationStatus.includes('Berhasil') ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                            {migrationStatus}
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={handleMigration}
                        disabled={isMigrating}
                        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        {isMigrating ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                Sedang Mengupload...
                            </>
                        ) : (
                            <>
                                <Database size={18} />
                                Upload Data ke Supabase
                            </>
                        )}
                    </button>
                </div>


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
                            Simpan Pengaturan
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
