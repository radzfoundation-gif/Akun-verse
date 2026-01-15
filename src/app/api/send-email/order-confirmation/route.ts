import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface OrderItem {
    name: string;
    quantity: number;
    price: number;
}

interface OrderEmailRequest {
    to: string;
    customerName: string;
    orderId: string;
    orderDate: string;
    items: OrderItem[];
    subtotal: number;
    discount?: number;
    total: number;
    paymentMethod: string;
}

export async function POST(request: Request) {
    try {
        const body: OrderEmailRequest = await request.json();
        const { to, customerName, orderId, orderDate, items, subtotal, discount, total, paymentMethod } = body;

        if (!to || !customerName || !orderId || !items) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Format currency
        const formatCurrency = (amount: number) =>
            new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

        // Generate items HTML
        const itemsHtml = items.map(item => `
            <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <div style="font-weight: 500; color: #1f2937;">${item.name}</div>
                    <div style="font-size: 14px; color: #6b7280;">Qty: ${item.quantity}</div>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right; color: #1f2937;">
                    ${formatCurrency(item.price * item.quantity)}
                </td>
            </tr>
        `).join('');

        const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <!-- Header -->
                <div style="background: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%); border-radius: 16px 16px 0 0; padding: 32px; text-align: center;">
                    <h1 style="color: white; margin: 0; font-size: 24px;">🎮 Akunverse</h1>
                    <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0;">Pesanan Berhasil!</p>
                </div>

                <!-- Content -->
                <div style="background: white; padding: 32px; border-radius: 0 0 16px 16px;">
                    <p style="color: #374151; font-size: 16px; margin: 0 0 24px;">
                        Halo <strong>${customerName}</strong>,
                    </p>
                    <p style="color: #6b7280; font-size: 16px; margin: 0 0 24px;">
                        Terima kasih telah berbelanja di Akunverse! Pembayaran kamu sudah kami terima dan pesanan sedang diproses.
                    </p>

                    <!-- Order Info -->
                    <div style="background: #f9fafb; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="color: #6b7280; padding: 4px 0;">Order ID</td>
                                <td style="color: #1f2937; font-weight: 600; text-align: right;">${orderId}</td>
                            </tr>
                            <tr>
                                <td style="color: #6b7280; padding: 4px 0;">Tanggal</td>
                                <td style="color: #1f2937; text-align: right;">${orderDate}</td>
                            </tr>
                            <tr>
                                <td style="color: #6b7280; padding: 4px 0;">Pembayaran</td>
                                <td style="color: #1f2937; text-align: right;">${paymentMethod}</td>
                            </tr>
                        </table>
                    </div>

                    <!-- Items -->
                    <h3 style="color: #1f2937; font-size: 16px; margin: 0 0 16px;">Detail Pesanan</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        ${itemsHtml}
                    </table>

                    <!-- Total -->
                    <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #e5e7eb;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="color: #6b7280; padding: 4px 0;">Subtotal</td>
                                <td style="color: #1f2937; text-align: right;">${formatCurrency(subtotal)}</td>
                            </tr>
                            ${discount ? `
                            <tr>
                                <td style="color: #10b981; padding: 4px 0;">Diskon</td>
                                <td style="color: #10b981; text-align: right;">-${formatCurrency(discount)}</td>
                            </tr>
                            ` : ''}
                            <tr>
                                <td style="color: #1f2937; font-weight: 700; font-size: 18px; padding: 12px 0 0;">Total</td>
                                <td style="color: #7c3aed; font-weight: 700; font-size: 18px; text-align: right; padding: 12px 0 0;">${formatCurrency(total)}</td>
                            </tr>
                        </table>
                    </div>

                    <!-- CTA -->
                    <div style="text-align: center; margin-top: 32px;">
                        <a href="https://akunverse.com/orders" style="display: inline-block; background: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%); color: white; text-decoration: none; padding: 14px 32px; border-radius: 12px; font-weight: 600;">
                            Lihat Pesanan
                        </a>
                    </div>

                    <!-- Note -->
                    <div style="margin-top: 32px; padding: 16px; background: #fef3c7; border-radius: 12px;">
                        <p style="color: #92400e; font-size: 14px; margin: 0;">
                            <strong>📦 Pengiriman:</strong> Produk digital akan dikirim ke email ini atau tersedia di halaman pesanan Anda dalam beberapa menit.
                        </p>
                    </div>
                </div>

                <!-- Footer -->
                <div style="text-align: center; padding: 24px; color: #9ca3af; font-size: 12px;">
                    <p style="margin: 0 0 8px;">Butuh bantuan? <a href="https://akunverse.com/contact" style="color: #7c3aed;">Hubungi kami</a></p>
                    <p style="margin: 0;">© 2026 Akunverse. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        `;

        const { data, error } = await resend.emails.send({
            from: 'Akunverse <noreply@akunverse.com>',
            to: [to],
            subject: `✅ Pesanan #${orderId} Berhasil - Akunverse`,
            html: emailHtml,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, messageId: data?.id });
    } catch (error) {
        console.error('Email send error:', error);
        return NextResponse.json(
            { error: 'Failed to send email' },
            { status: 500 }
        );
    }
}
