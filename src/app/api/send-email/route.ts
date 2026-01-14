import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, orderNumber, items, totalPrice, customerName } = body;

        if (!email || !orderNumber) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Format items for email
        const itemsList = items.map((item: any) =>
            `• ${item.title} (${item.quantity}x) - Rp ${item.price.toLocaleString('id-ID')}`
        ).join('\n');

        // Format download links
        const downloadLinks = items
            .filter((item: any) => item.deliveryLinks && item.deliveryLinks.length > 0)
            .map((item: any) =>
                `${item.title}:\n${item.deliveryLinks.map((link: string, i: number) => `  Link ${i + 1}: ${link}`).join('\n')}`
            ).join('\n\n');

        const emailContent = `
Halo ${customerName || 'Customer'}!

Terima kasih telah berbelanja di RLabs Store. Pembayaran Anda telah berhasil diproses.

📦 DETAIL PESANAN
━━━━━━━━━━━━━━━━━━━━━━━━━━
Nomor Pesanan: ${orderNumber}

Item yang dibeli:
${itemsList}

Total Pembayaran: Rp ${totalPrice.toLocaleString('id-ID')}

${downloadLinks ? `
🔗 LINK DOWNLOAD
━━━━━━━━━━━━━━━━━━━━━━━━━━
${downloadLinks}
` : ''}

Jika ada pertanyaan, silakan hubungi kami.

Salam,
RLabs Store Team
        `.trim();

        const { data, error } = await resend.emails.send({
            from: 'RLabs Store <noreply@resend.dev>',
            to: [email],
            subject: `✅ Pembayaran Berhasil - Pesanan #${orderNumber}`,
            text: emailContent,
        });

        if (error) {
            console.error('Email send error:', error);
            return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Email API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
