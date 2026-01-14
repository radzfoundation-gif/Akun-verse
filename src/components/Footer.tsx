
import Link from 'next/link';
import { Gamepad2, Instagram, Twitter, CreditCard } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#111827] border-t border-white/5 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="bg-[#FACC15] text-[#111827] p-1 rounded transform -rotate-3">
                                <Gamepad2 size={16} />
                            </div>
                            <span className="text-lg font-semibold tracking-tighter text-white">Akunverse</span>
                        </div>
                        <p className="text-sm text-gray-400 mb-4">Platform jual beli game termurah dan terpercaya di Indonesia.</p>
                        <div className="flex gap-4">
                            <Link href="#" className="text-gray-500 hover:text-[#FACC15]"><Instagram size={20} /></Link>
                            <Link href="#" className="text-gray-500 hover:text-[#FACC15]"><Twitter size={20} /></Link>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4 text-sm">Belanja</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="#" className="hover:text-[#FACC15]">Game Steam</Link></li>
                            <li><Link href="#" className="hover:text-[#FACC15]">Voucher Game</Link></li>
                            <li><Link href="#" className="hover:text-[#FACC15]">Flash Sale</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4 text-sm">Bantuan</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/lacak-pesanan" className="hover:text-[#FACC15]">Lacak Pesanan</Link></li>
                            <li><Link href="/orders" className="hover:text-[#FACC15]">Riwayat Pesanan</Link></li>
                            <li><Link href="#" className="hover:text-[#FACC15]">Hubungi Kami</Link></li>
                            <li><Link href="#" className="hover:text-[#FACC15]">FAQ</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4 text-sm">Legal</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="#" className="hover:text-[#FACC15]">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-[#FACC15]">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-500">© 2024 Akunverse. All rights reserved.</p>
                    <div className="flex gap-2">
                        <CreditCard className="text-gray-500" size={24} />
                    </div>
                </div>
            </div>
        </footer>
    );
}
