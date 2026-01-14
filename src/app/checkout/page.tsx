'use client';

import { useCart } from '@/contexts/CartContext';
import { ArrowLeft, ArrowRight, CreditCard, Smartphone, Building2, QrCode, Loader2, ShoppingBag, Mail, Phone, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import CheckoutSteps from '@/components/checkout/CheckoutSteps';
import CouponDropdown from '@/components/checkout/CouponDropdown';
import PaymentMethodCard from '@/components/checkout/PaymentMethodCard';
import SecurityBadge, { SecurityIndicator } from '@/components/checkout/SecurityBadge';
import { TrustBadgesGrid, TrustBadgesInline, SecurePaymentBanner } from '@/components/checkout/TrustBadges';
import { ScamWarningAlert, FraudAlertBanner } from '@/components/checkout/ScamWarningAlert';
import { createSecureCheckoutData, secureStore, sanitizeInput } from '@/lib/security';
import { markCouponAsUsed, reduceMultipleProductsStock } from '@/lib/supabase';
import { useUser } from '@clerk/nextjs';

const paymentMethods = [
    { id: 'qris', name: 'QRIS', icon: QrCode, color: 'bg-gradient-to-br from-purple-500 to-pink-500', description: 'Scan QR untuk bayar' },
    { id: 'dana', name: 'DANA', icon: Smartphone, color: 'bg-blue-500', description: 'E-wallet DANA' },
    { id: 'gopay', name: 'GoPay', icon: Smartphone, color: 'bg-green-500', description: 'E-wallet GoPay' },
    { id: 'ovo', name: 'OVO', icon: Smartphone, color: 'bg-purple-500', description: 'E-wallet OVO' },
    { id: 'bca', name: 'Transfer BCA', icon: Building2, color: 'bg-blue-600', description: 'Virtual Account BCA' },
    { id: 'mandiri', name: 'Transfer Mandiri', icon: Building2, color: 'bg-yellow-500', description: 'Virtual Account Mandiri' },
    { id: 'bni', name: 'Transfer BNI', icon: Building2, color: 'bg-orange-500', description: 'Virtual Account BNI' },
    { id: 'card', name: 'Kartu Kredit/Debit', icon: CreditCard, color: 'bg-gray-700', description: 'Visa, Mastercard, JCB' },
];

const STEPS = ['Review', 'Info', 'Pembayaran'];

// Demo promo codes
const PROMO_CODES: Record<string, { discount: number; type: 'percent' | 'fixed'; minSpend?: number }> = {
    'VERSE50': { discount: 0.5, type: 'percent', minSpend: 0 },
    'ONGKIRFREE': { discount: 15000, type: 'fixed', minSpend: 50000 },
    'BARUGABUNG': { discount: 20000, type: 'fixed', minSpend: 100000 },
    'DISKON10': { discount: 0.1, type: 'percent', minSpend: 0 },
};


export default function CheckoutPage() {
    const { items, totalPrice, clearCart, isHydrated } = useCart();
    const { user } = useUser();
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    // Customer info
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        email: '',
        phone: '',
    });
    const [infoErrors, setInfoErrors] = useState<Record<string, string>>({});

    // Promo code
    const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePhone = (phone: string) => {
        return /^(08|\+62)[0-9]{8,12}$/.test(phone.replace(/\s/g, ''));
    };

    const validateStep2 = () => {
        const errors: Record<string, string> = {};

        if (!customerInfo.name.trim()) {
            errors.name = 'Nama lengkap wajib diisi';
        }
        if (!customerInfo.email.trim()) {
            errors.email = 'Email wajib diisi';
        } else if (!validateEmail(customerInfo.email)) {
            errors.email = 'Format email tidak valid';
        }
        if (!customerInfo.phone.trim()) {
            errors.phone = 'Nomor telepon wajib diisi';
        } else if (!validatePhone(customerInfo.phone)) {
            errors.phone = 'Format nomor telepon tidak valid (08xx atau +62xx)';
        }

        setInfoErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handlePromoApply = async (code: string): Promise<{ valid: boolean; discount: number; message: string }> => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));

        // 1. Check if valid code exists in our system
        const promo = PROMO_CODES[code];
        if (!promo) {
            return { valid: false, discount: 0, message: 'Kode promo tidak valid' };
        }

        // 2. Check min spend
        if (promo.minSpend && totalPrice < promo.minSpend) {
            return {
                valid: false,
                discount: 0,
                message: `Min. belanja ${formatPrice(promo.minSpend)}`
            };
        }

        // 3. User verification (Client-side localStorage)
        const stored = localStorage.getItem('claimedCoupons');
        const claimedCoupons = stored ? JSON.parse(stored) : [];
        const isPublic = ['DISKON10'].includes(code); // Allow public codes

        if (!isPublic && !claimedCoupons.includes(code)) {
            return { valid: false, discount: 0, message: 'Kamu belum klaim kupon ini' };
        }

        let discountAmount = 0;
        if (promo.type === 'percent') {
            discountAmount = Math.floor(totalPrice * promo.discount);
        } else {
            discountAmount = promo.discount;
        }

        // Max discount is total price
        discountAmount = Math.min(discountAmount, totalPrice);

        setAppliedPromo({ code, discount: discountAmount });
        return { valid: true, discount: discountAmount, message: 'Promo berhasil diterapkan' };
    };

    const handlePromoRemove = () => {
        setAppliedPromo(null);
    };

    const finalPrice = appliedPromo ? totalPrice - appliedPromo.discount : totalPrice;

    const handleNextStep = () => {
        if (currentStep === 2) {
            if (!validateStep2()) return;
        }
        setCurrentStep(prev => Math.min(prev + 1, 3));
    };

    const handlePrevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const handleCheckout = async () => {
        if (items.length === 0) return;

        setIsProcessing(true);

        try {
            // Create Midtrans transaction
            const response = await fetch('/api/midtrans/create-transaction', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: items.map(item => ({
                        id: String(item.id),
                        title: sanitizeInput(item.title),
                        quantity: item.quantity,
                        price: item.priceValue,
                        image: item.image,
                    })),
                    customerInfo: {
                        name: sanitizeInput(customerInfo.name),
                        email: sanitizeInput(customerInfo.email),
                        phone: sanitizeInput(customerInfo.phone),
                    },
                    userId: user?.id,
                    totalPrice,
                    discount: appliedPromo?.discount || 0,
                    promoCode: appliedPromo?.code || null,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to create transaction');
            }

            // Store checkout data for status page
            const secureData = createSecureCheckoutData({
                items: items.map(item => ({
                    id: item.id,
                    title: sanitizeInput(item.title),
                    quantity: item.quantity,
                    priceValue: item.priceValue,
                    image: item.image,
                })),
                totalPrice,
                finalPrice,
                discount: appliedPromo?.discount || 0,
                promoCode: appliedPromo?.code || null,
                paymentMethod: 'midtrans',
                customerInfo: {
                    name: sanitizeInput(customerInfo.name),
                    email: sanitizeInput(customerInfo.email),
                    phone: sanitizeInput(customerInfo.phone),
                },
            });
            secureStore('checkout', secureData);
            secureStore('midtrans_order_id', data.order_id);

            // Mark coupon as used if applied
            if (appliedPromo?.code && user?.id) {
                try {
                    await markCouponAsUsed(user.id, appliedPromo.code);
                } catch (error) {
                    console.error('Failed to mark coupon as used:', error);
                }
            }

            // Open Midtrans Snap popup
            if (window.snap) {
                window.snap.pay(data.token, {
                    onSuccess: (result) => {
                        console.log('Payment success:', result);
                        clearCart();
                        router.push(`/checkout/status?order_id=${data.order_id}&status=success`);
                    },
                    onPending: (result) => {
                        console.log('Payment pending:', result);
                        router.push(`/checkout/status?order_id=${data.order_id}&status=pending`);
                    },
                    onError: (result) => {
                        console.log('Payment error:', result);
                        router.push(`/checkout/status?order_id=${data.order_id}&status=error`);
                    },
                    onClose: () => {
                        console.log('Payment popup closed');
                        setIsProcessing(false);
                    },
                });
            } else {
                // Fallback to redirect URL if Snap.js not loaded
                window.location.href = data.redirect_url;
            }
        } catch (error) {
            console.error('Checkout error:', error);
            setIsProcessing(false);
            alert(error instanceof Error ? error.message : 'Terjadi kesalahan saat checkout');
        }
    };

    // Loading state while hydrating from localStorage
    if (!isHydrated) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl p-8 sm:p-12 text-center max-w-md w-full shadow-xl">
                    <Loader2 size={48} className="text-brand-500 mx-auto mb-4 animate-spin" />
                    <h1 className="text-xl font-bold text-gray-900 mb-2">Memuat Keranjang...</h1>
                    <p className="text-gray-500">Mohon tunggu sebentar</p>
                </div>
            </div>
        );
    }

    // Empty cart view (only shown after hydration)
    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl p-8 sm:p-12 text-center max-w-md w-full shadow-xl">
                    <ShoppingBag size={64} className="text-gray-200 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Keranjang Kosong</h1>
                    <p className="text-gray-500 mb-6">Tambahkan game ke keranjang dulu ya!</p>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 bg-brand-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-600 transition-colors"
                    >
                        Belanja Sekarang
                    </Link>
                </div>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-[#0B0F19]">
            {/* Header */}
            <header className="bg-[#111827] border-b border-white/5 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-white/5 rounded-full transition-colors">
                        <ArrowLeft size={20} className="text-gray-400" />
                    </Link>
                    <h1 className="text-lg font-semibold text-white">Checkout</h1>
                </div>
            </header>

            {/* Scam Warning Banner */}
            <ScamWarningAlert variant="banner" dismissible={true} />

            <main className="max-w-6xl mx-auto px-4 py-8">
                {/* Checkout Steps */}
                <CheckoutSteps currentStep={currentStep} steps={STEPS} />

                {/* Trust Badges - Show on Step 1 */}
                {currentStep === 1 && (
                    <div className="mb-6">
                        <TrustBadgesInline />
                    </div>
                )}

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Step 1: Review Order */}
                        {currentStep === 1 && (
                            <div className="bg-[#1F2933] rounded-2xl p-6 shadow-sm border border-white/5">
                                <h2 className="text-lg font-semibold text-white mb-4">Review Pesanan</h2>
                                <div className="space-y-4">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex gap-4 p-4 bg-[#111827] rounded-xl border border-white/5">
                                            <img src={item.image} alt={item.title} className="w-20 h-24 object-cover rounded-lg" />
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-medium text-white truncate">{item.title}</h3>
                                                <p className="text-sm text-gray-400">{item.genre}</p>
                                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="font-semibold text-[#FACC15] whitespace-nowrap">
                                                {formatPrice(item.priceValue * item.quantity)}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Promo Code */}
                                <div className="mt-6 pt-6 border-t border-white/5">
                                    <CouponDropdown
                                        totalPrice={totalPrice}
                                        onApply={(code, discount) => setAppliedPromo({ code, discount })}
                                        onRemove={handlePromoRemove}
                                        appliedCode={appliedPromo?.code ?? null}
                                    />
                                </div>

                                {/* Trust Badges Grid */}
                                <div className="mt-6 pt-6 border-t border-white/5">
                                    <h3 className="text-sm font-medium text-gray-400 mb-3">Jaminan Keamanan</h3>
                                    <TrustBadgesGrid />
                                </div>
                            </div>
                        )}

                        {/* Step 2: Customer Info */}
                        {currentStep === 2 && (
                            <div className="bg-[#1F2933] rounded-2xl p-6 shadow-sm border border-white/5">
                                <h2 className="text-lg font-semibold text-white mb-4">Informasi Pembeli</h2>
                                <p className="text-sm text-gray-400 mb-6">
                                    Game key akan dikirim ke email yang kamu masukkan.
                                </p>

                                <div className="space-y-4">
                                    {/* Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">
                                            Nama Lengkap
                                        </label>
                                        <div className="relative">
                                            <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                            <input
                                                type="text"
                                                value={customerInfo.name}
                                                onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                                                placeholder="Masukkan nama lengkap"
                                                className={`w-full pl-10 pr-4 py-3 bg-[#111827] border rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#FACC15]/20 focus:border-[#FACC15] ${infoErrors.name ? 'border-red-500/50' : 'border-white/10'
                                                    }`}
                                            />
                                        </div>
                                        {infoErrors.name && (
                                            <p className="text-sm text-red-400 mt-1">{infoErrors.name}</p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">
                                            Email
                                        </label>
                                        <div className="relative">
                                            <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                            <input
                                                type="email"
                                                value={customerInfo.email}
                                                onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                                                placeholder="example@email.com"
                                                className={`w-full pl-10 pr-4 py-3 bg-[#111827] border rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#FACC15]/20 focus:border-[#FACC15] ${infoErrors.email ? 'border-red-500/50' : 'border-white/10'
                                                    }`}
                                            />
                                        </div>
                                        {infoErrors.email && (
                                            <p className="text-sm text-red-400 mt-1">{infoErrors.email}</p>
                                        )}
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">
                                            Nomor Telepon
                                        </label>
                                        <div className="relative">
                                            <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                            <input
                                                type="tel"
                                                value={customerInfo.phone}
                                                onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                                                placeholder="08xxxxxxxxxx"
                                                className={`w-full pl-10 pr-4 py-3 bg-[#111827] border rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#FACC15]/20 focus:border-[#FACC15] ${infoErrors.phone ? 'border-red-500/50' : 'border-white/10'
                                                    }`}
                                            />
                                        </div>
                                        {infoErrors.phone && (
                                            <p className="text-sm text-red-400 mt-1">{infoErrors.phone}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Payment Method */}
                        {currentStep === 3 && (
                            <div className="bg-[#1F2933] rounded-2xl p-6 shadow-sm border border-white/5">
                                <h2 className="text-lg font-semibold text-white mb-4">Pilih Metode Pembayaran</h2>

                                {/* E-wallets */}
                                <div className="mb-6">
                                    <h3 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wide">E-Wallet & QRIS</h3>
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        {paymentMethods.filter(m => ['qris', 'dana', 'gopay', 'ovo'].includes(m.id)).map((method) => (
                                            <PaymentMethodCard
                                                key={method.id}
                                                id={method.id}
                                                name={method.name}
                                                icon={method.icon}
                                                iconBgColor={method.color}
                                                isSelected={selectedPayment === method.id}
                                                onSelect={setSelectedPayment}
                                                description={method.description}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Bank Transfer */}
                                <div className="mb-6">
                                    <h3 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wide">Transfer Bank</h3>
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        {paymentMethods.filter(m => ['bca', 'mandiri', 'bni'].includes(m.id)).map((method) => (
                                            <PaymentMethodCard
                                                key={method.id}
                                                id={method.id}
                                                name={method.name}
                                                icon={method.icon}
                                                iconBgColor={method.color}
                                                isSelected={selectedPayment === method.id}
                                                onSelect={setSelectedPayment}
                                                description={method.description}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Card */}
                                <div>
                                    <h3 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wide">Kartu</h3>
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        {paymentMethods.filter(m => m.id === 'card').map((method) => (
                                            <PaymentMethodCard
                                                key={method.id}
                                                id={method.id}
                                                name={method.name}
                                                icon={method.icon}
                                                iconBgColor={method.color}
                                                isSelected={selectedPayment === method.id}
                                                onSelect={setSelectedPayment}
                                                description={method.description}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between gap-4">
                            {currentStep > 1 && (
                                <button
                                    onClick={handlePrevStep}
                                    className="flex items-center gap-2 px-6 py-3 bg-[#111827] text-gray-300 border border-white/5 rounded-xl font-medium hover:bg-white/5 transition-colors"
                                >
                                    <ArrowLeft size={18} />
                                    Kembali
                                </button>
                            )}
                            <div className="flex-1" />
                            {currentStep < 3 && (
                                <button
                                    onClick={handleNextStep}
                                    className="flex items-center gap-2 px-6 py-3 bg-[#FACC15] text-[#111827] rounded-xl font-medium hover:bg-[#EAB308] transition-colors"
                                >
                                    Lanjutkan
                                    <ArrowRight size={18} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-[#1F2933] rounded-2xl p-6 shadow-sm border border-white/5 sticky top-24">
                            <h2 className="text-lg font-semibold text-white mb-4">Ringkasan Pesanan</h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-400">
                                    <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} item)</span>
                                    <span>{formatPrice(totalPrice)}</span>
                                </div>
                                {appliedPromo && (
                                    <div className="flex justify-between text-green-400">
                                        <span>Diskon ({appliedPromo.code})</span>
                                        <span>-{formatPrice(appliedPromo.discount)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-gray-400">
                                    <span>Biaya Admin</span>
                                    <span className="text-green-400">Gratis</span>
                                </div>
                                <div className="border-t border-white/5 pt-3 flex justify-between">
                                    <span className="font-semibold text-white">Total</span>
                                    <span className="text-xl font-bold text-[#FACC15]">{formatPrice(finalPrice)}</span>
                                </div>
                            </div>

                            {/* Coupon Dropdown */}
                            <div className="mb-6">
                                <CouponDropdown
                                    totalPrice={totalPrice}
                                    onApply={(code, discount) => setAppliedPromo({ code, discount })}
                                    onRemove={() => setAppliedPromo(null)}
                                    appliedCode={appliedPromo?.code ?? null}
                                />
                            </div>

                            {currentStep === 2 && (
                                <>
                                    <button
                                        onClick={handleCheckout}
                                        disabled={!customerInfo.name || !customerInfo.email || !customerInfo.phone || isProcessing}
                                        className="w-full bg-[#FACC15] text-[#111827] py-3.5 rounded-xl font-medium hover:bg-[#EAB308] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isProcessing ? (
                                            <>
                                                <Loader2 size={18} className="animate-spin" />
                                                Memproses...
                                            </>
                                        ) : (
                                            'Lanjutkan ke Pembayaran'
                                        )}
                                    </button>
                                    <p className="text-xs text-gray-500 text-center mt-2">
                                        Pilih metode pembayaran di halaman selanjutnya
                                    </p>
                                </>
                            )}

                            {/* Customer info summary */}
                            {currentStep >= 2 && customerInfo.email && (
                                <div className="mt-4 pt-4 border-t border-white/5">
                                    <p className="text-xs text-gray-500 mb-1">Kirim ke:</p>
                                    <p className="text-sm font-medium text-white">{customerInfo.name || '-'}</p>
                                    <p className="text-sm text-gray-400">{customerInfo.email}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
