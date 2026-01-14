'use client';

import { useRef } from 'react';
import { FileText, Download, Printer } from 'lucide-react';

interface InvoiceItem {
    id: string | number;
    title: string;
    name?: string;
    quantity: number;
    priceValue?: number;
    price?: number;
}

interface InvoiceData {
    orderNumber: string;
    items: InvoiceItem[];
    totalPrice: number;
    finalPrice: number;
    discount: number;
    promoCode: string | null;
    paymentMethod: string;
    customerInfo: {
        name: string;
        email: string;
        phone: string;
    };
    paidAt: string;
}

interface InvoiceProps {
    data: InvoiceData;
}

export default function Invoice({ data }: InvoiceProps) {
    const invoiceRef = useRef<HTMLDivElement>(null);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const handlePrint = () => {
        const printContents = invoiceRef.current?.innerHTML;
        const originalContents = document.body.innerHTML;

        if (printContents) {
            document.body.innerHTML = `
                <html>
                    <head>
                        <title>Invoice ${data.orderNumber}</title>
                        <style>
                            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: white; }
                            .invoice { max-width: 800px; margin: 0 auto; }
                            .header { display: flex; justify-content: space-between; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #FACC15; }
                            .logo { font-size: 24px; font-weight: bold; }
                            .logo span { color: #FACC15; }
                            .invoice-info { text-align: right; }
                            .invoice-number { font-size: 14px; color: #666; }
                            .invoice-date { font-size: 12px; color: #999; }
                            .section { margin-bottom: 25px; }
                            .section-title { font-size: 12px; font-weight: bold; color: #666; margin-bottom: 8px; text-transform: uppercase; }
                            .customer-info { background: #F9FAFB; padding: 15px; border-radius: 8px; }
                            .customer-info p { margin: 4px 0; font-size: 14px; }
                            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                            th { background: #111827; color: white; padding: 12px; text-align: left; font-size: 12px; }
                            td { padding: 12px; border-bottom: 1px solid #eee; font-size: 14px; }
                            .summary { background: #F9FAFB; padding: 20px; border-radius: 8px; }
                            .summary-row { display: flex; justify-content: space-between; margin: 8px 0; }
                            .summary-total { font-size: 18px; font-weight: bold; border-top: 2px solid #111827; padding-top: 10px; margin-top: 10px; }
                            .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; color: #999; font-size: 12px; }
                            .status-badge { display: inline-block; background: #10B981; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; }
                        </style>
                    </head>
                    <body>${printContents}</body>
                </html>
            `;
            window.print();
            document.body.innerHTML = originalContents;
            window.location.reload();
        }
    };

    const handleDownload = () => {
        // Create a printable version and download as HTML (which can be saved as PDF)
        handlePrint();
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Actions Bar */}
            <div className="flex items-center justify-between p-4 bg-[#111827] border-b border-white/10">
                <div className="flex items-center gap-2 text-white">
                    <FileText size={20} className="text-[#FACC15]" />
                    <span className="font-semibold">Invoice</span>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handlePrint}
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm"
                    >
                        <Printer size={16} />
                        Print
                    </button>
                    <button
                        onClick={handleDownload}
                        className="flex items-center gap-2 px-4 py-2 bg-[#FACC15] hover:bg-[#EAB308] text-[#111827] rounded-lg transition-colors text-sm font-medium"
                    >
                        <Download size={16} />
                        Download PDF
                    </button>
                </div>
            </div>

            {/* Invoice Content */}
            <div ref={invoiceRef} className="invoice p-8">
                {/* Header */}
                <div className="header flex justify-between items-start mb-8 pb-6 border-b-2 border-[#FACC15]">
                    <div>
                        <div className="logo text-2xl font-bold">
                            AKUN<span className="text-[#FACC15]">VERSE</span>
                        </div>
                        <p className="text-gray-500 text-sm mt-1">Premium Digital Store</p>
                    </div>
                    <div className="invoice-info text-right">
                        <p className="text-xl font-bold text-gray-900">INVOICE</p>
                        <p className="invoice-number text-sm text-gray-600 font-mono mt-1">#{data.orderNumber}</p>
                        <p className="invoice-date text-xs text-gray-500 mt-2">
                            {formatDate(data.paidAt)} • {formatTime(data.paidAt)}
                        </p>
                        <span className="status-badge inline-block mt-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            LUNAS
                        </span>
                    </div>
                </div>

                {/* Customer Info */}
                <div className="section mb-6">
                    <p className="section-title text-xs font-bold text-gray-500 uppercase mb-2">Ditagihkan Kepada</p>
                    <div className="customer-info bg-gray-50 p-4 rounded-lg">
                        <p className="font-semibold text-gray-900">{data.customerInfo.name}</p>
                        <p className="text-gray-600 text-sm">{data.customerInfo.email}</p>
                        <p className="text-gray-600 text-sm">{data.customerInfo.phone}</p>
                    </div>
                </div>

                {/* Items Table */}
                <div className="section mb-6">
                    <p className="section-title text-xs font-bold text-gray-500 uppercase mb-2">Detail Pembelian</p>
                    <table className="w-full">
                        <thead>
                            <tr className="bg-[#111827] text-white">
                                <th className="text-left py-3 px-4 text-sm font-semibold rounded-tl-lg">Produk</th>
                                <th className="text-center py-3 px-4 text-sm font-semibold">Qty</th>
                                <th className="text-right py-3 px-4 text-sm font-semibold">Harga</th>
                                <th className="text-right py-3 px-4 text-sm font-semibold rounded-tr-lg">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.items.map((item, index) => (
                                <tr key={item.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                    <td className="py-3 px-4 text-gray-900">{item.title || item.name}</td>
                                    <td className="py-3 px-4 text-center text-gray-600">{item.quantity}</td>
                                    <td className="py-3 px-4 text-right text-gray-600">
                                        {formatPrice(item.priceValue || item.price || 0)}
                                    </td>
                                    <td className="py-3 px-4 text-right font-semibold text-gray-900">
                                        {formatPrice((item.priceValue || item.price || 0) * item.quantity)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Summary */}
                <div className="flex justify-end">
                    <div className="summary w-72 bg-gray-50 p-5 rounded-lg">
                        <div className="summary-row flex justify-between text-gray-600 text-sm">
                            <span>Subtotal</span>
                            <span>{formatPrice(data.totalPrice)}</span>
                        </div>
                        {data.discount > 0 && (
                            <div className="summary-row flex justify-between text-green-600 text-sm">
                                <span>Diskon {data.promoCode && `(${data.promoCode})`}</span>
                                <span>-{formatPrice(data.discount)}</span>
                            </div>
                        )}
                        <div className="summary-row flex justify-between text-gray-600 text-sm">
                            <span>Biaya Admin</span>
                            <span className="text-green-600">Gratis</span>
                        </div>
                        <div className="summary-total flex justify-between font-bold text-lg border-t-2 border-[#111827] pt-3 mt-3">
                            <span>Total</span>
                            <span className="text-[#FACC15]">{formatPrice(data.finalPrice)}</span>
                        </div>
                    </div>
                </div>

                {/* Payment Info */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg flex justify-between items-center text-sm">
                    <div>
                        <span className="text-gray-500">Metode Pembayaran:</span>
                        <span className="ml-2 font-semibold text-gray-900">{data.paymentMethod.toUpperCase()}</span>
                    </div>
                    <div>
                        <span className="text-gray-500">Status:</span>
                        <span className="ml-2 font-semibold text-green-600">Pembayaran Berhasil</span>
                    </div>
                </div>

                {/* Footer */}
                <div className="footer text-center mt-10 pt-6 border-t border-gray-200 text-gray-500 text-xs">
                    <p>Terima kasih telah berbelanja di <strong>AKUNVERSE</strong></p>
                    <p className="mt-1">Invoice ini dibuat secara otomatis dan sah tanpa tanda tangan.</p>
                    <p className="mt-2 text-gray-400">© {new Date().getFullYear()} Akunverse. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}
