import { NextResponse } from 'next/server';

interface InvoiceItem {
    name: string;
    quantity: number;
    price: number;
}

interface InvoiceRequest {
    orderId: string;
    orderDate: string;
    customerName: string;
    customerEmail: string;
    items: InvoiceItem[];
    subtotal: number;
    discount?: number;
    total: number;
    paymentMethod: string;
    paymentStatus: string;
}

export async function POST(request: Request) {
    try {
        const body: InvoiceRequest = await request.json();
        const {
            orderId,
            orderDate,
            customerName,
            customerEmail,
            items,
            subtotal,
            discount,
            total,
            paymentMethod,
            paymentStatus,
        } = body;

        const formatCurrency = (amount: number) =>
            new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

        const formatDate = (dateString: string) =>
            new Date(dateString).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });

        // Generate items rows
        const itemsRows = items.map((item, index) => `
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #374151;">${index + 1}</td>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #374151;">${item.name}</td>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: center; color: #374151;">${item.quantity}</td>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: right; color: #374151;">${formatCurrency(item.price)}</td>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: right; color: #374151;">${formatCurrency(item.price * item.quantity)}</td>
            </tr>
        `).join('');

        // Generate HTML invoice
        const invoiceHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Invoice ${orderId}</title>
    <style>
        @media print {
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .no-print { display: none !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 20px; font-family: 'Segoe UI', sans-serif; background: #f3f4f6;">
    <div style="max-width: 800px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%); padding: 30px; color: white;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h1 style="margin: 0; font-size: 28px;">🎮 Akunverse</h1>
                    <p style="margin: 5px 0 0; opacity: 0.9;">Platform Jual Beli Game Digital</p>
                </div>
                <div style="text-align: right;">
                    <h2 style="margin: 0; font-size: 24px;">INVOICE</h2>
                    <p style="margin: 5px 0 0; font-size: 14px; opacity: 0.9;">${orderId}</p>
                </div>
            </div>
        </div>

        <!-- Content -->
        <div style="padding: 30px;">
            <!-- Info Section -->
            <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
                <div>
                    <h3 style="margin: 0 0 10px; color: #6b7280; font-size: 12px; text-transform: uppercase;">Diterbitkan Untuk</h3>
                    <p style="margin: 0; color: #1f2937; font-weight: 600;">${customerName}</p>
                    <p style="margin: 5px 0 0; color: #6b7280;">${customerEmail}</p>
                </div>
                <div style="text-align: right;">
                    <h3 style="margin: 0 0 10px; color: #6b7280; font-size: 12px; text-transform: uppercase;">Detail Invoice</h3>
                    <p style="margin: 0; color: #6b7280;">Tanggal: <span style="color: #1f2937;">${formatDate(orderDate)}</span></p>
                    <p style="margin: 5px 0 0; color: #6b7280;">Status: <span style="color: ${paymentStatus === 'paid' ? '#10b981' : '#f59e0b'}; font-weight: 600;">${paymentStatus === 'paid' ? 'LUNAS' : 'PENDING'}</span></p>
                    <p style="margin: 5px 0 0; color: #6b7280;">Pembayaran: <span style="color: #1f2937;">${paymentMethod}</span></p>
                </div>
            </div>

            <!-- Items Table -->
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <thead>
                    <tr style="background: #f9fafb;">
                        <th style="padding: 12px 10px; text-align: left; color: #6b7280; font-size: 12px; text-transform: uppercase; border-bottom: 2px solid #e5e7eb;">No</th>
                        <th style="padding: 12px 10px; text-align: left; color: #6b7280; font-size: 12px; text-transform: uppercase; border-bottom: 2px solid #e5e7eb;">Produk</th>
                        <th style="padding: 12px 10px; text-align: center; color: #6b7280; font-size: 12px; text-transform: uppercase; border-bottom: 2px solid #e5e7eb;">Qty</th>
                        <th style="padding: 12px 10px; text-align: right; color: #6b7280; font-size: 12px; text-transform: uppercase; border-bottom: 2px solid #e5e7eb;">Harga</th>
                        <th style="padding: 12px 10px; text-align: right; color: #6b7280; font-size: 12px; text-transform: uppercase; border-bottom: 2px solid #e5e7eb;">Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsRows}
                </tbody>
            </table>

            <!-- Summary -->
            <div style="display: flex; justify-content: flex-end;">
                <div style="width: 300px;">
                    <div style="display: flex; justify-content: space-between; padding: 8px 0; color: #6b7280;">
                        <span>Subtotal</span>
                        <span style="color: #1f2937;">${formatCurrency(subtotal)}</span>
                    </div>
                    ${discount ? `
                    <div style="display: flex; justify-content: space-between; padding: 8px 0; color: #10b981;">
                        <span>Diskon</span>
                        <span>-${formatCurrency(discount)}</span>
                    </div>
                    ` : ''}
                    <div style="display: flex; justify-content: space-between; padding: 12px 0; border-top: 2px solid #1f2937; font-size: 18px; font-weight: 700;">
                        <span style="color: #1f2937;">Total</span>
                        <span style="color: #7c3aed;">${formatCurrency(total)}</span>
                    </div>
                </div>
            </div>

            <!-- Footer Note -->
            <div style="margin-top: 40px; padding: 20px; background: #f9fafb; border-radius: 8px;">
                <p style="margin: 0; color: #6b7280; font-size: 14px;">
                    <strong>Catatan:</strong> Invoice ini sah dan diterbitkan secara otomatis oleh sistem Akunverse. 
                    Untuk pertanyaan terkait pesanan, silakan hubungi customer service kami.
                </p>
            </div>
        </div>

        <!-- Print Button (hidden when printing) -->
        <div class="no-print" style="padding: 0 30px 30px; text-align: center;">
            <button onclick="window.print()" style="padding: 12px 30px; background: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%); color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer;">
                🖨️ Cetak / Download PDF
            </button>
        </div>

        <!-- Company Footer -->
        <div style="background: #1f2937; padding: 20px 30px; color: #9ca3af; font-size: 12px; text-align: center;">
            <p style="margin: 0;">© ${new Date().getFullYear()} Akunverse. All rights reserved.</p>
            <p style="margin: 5px 0 0;">Website: akunverse.com | Email: support@akunverse.com</p>
        </div>
    </div>
</body>
</html>
        `;

        return new NextResponse(invoiceHtml, {
            headers: {
                'Content-Type': 'text/html',
            },
        });
    } catch (error) {
        console.error('Invoice generation error:', error);
        return NextResponse.json({ error: 'Failed to generate invoice' }, { status: 500 });
    }
}
