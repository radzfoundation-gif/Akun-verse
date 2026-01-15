export interface FAQItem {
    question: string;
    answer: string;
    category: string;
}

export const faqData: FAQItem[] = [
    // Umum
    {
        category: 'Umum',
        question: 'Apa itu Akunverse?',
        answer: 'Akunverse adalah platform marketplace untuk produk digital seperti akun game, voucher, top up game, dan software. Kami menyediakan produk dengan harga termurah dan proses yang cepat serta aman.',
    },
    {
        category: 'Umum',
        question: 'Apakah Akunverse aman dan terpercaya?',
        answer: 'Ya, 100% aman. Kami sudah melayani ribuan pelanggan sejak 2024. Semua transaksi dilindungi oleh payment gateway resmi (Midtrans) dan kami memberikan garansi untuk setiap produk.',
    },
    {
        category: 'Umum',
        question: 'Jam operasional customer service?',
        answer: 'Tim customer service kami aktif setiap hari dari jam 09:00 - 22:00 WIB. Untuk pertanyaan di luar jam operasional, Anda bisa mengirim pesan dan kami akan membalas keesokan harinya.',
    },
    // Pembelian
    {
        category: 'Pembelian',
        question: 'Bagaimana cara membeli produk?',
        answer: '1. Pilih produk yang diinginkan\n2. Klik "Beli Sekarang" atau tambahkan ke keranjang\n3. Login/daftar akun\n4. Pilih metode pembayaran\n5. Selesaikan pembayaran\n6. Produk akan dikirim otomatis atau via email',
    },
    {
        category: 'Pembelian',
        question: 'Metode pembayaran apa saja yang tersedia?',
        answer: 'Kami menerima berbagai metode pembayaran: QRIS (semua e-wallet), Transfer Bank (BCA, BNI, BRI, Mandiri, dll), E-Wallet (GoPay, OVO, Dana, ShopeePay), dan virtual account.',
    },
    {
        category: 'Pembelian',
        question: 'Berapa lama produk dikirim setelah pembayaran?',
        answer: 'Untuk produk instan, pengiriman langsung dalam hitungan detik setelah pembayaran terverifikasi. Untuk produk manual, maksimal 1-24 jam tergantung jenis produk.',
    },
    {
        category: 'Pembelian',
        question: 'Apakah ada minimal pembelian?',
        answer: 'Tidak ada minimal pembelian. Anda bisa membeli produk berapapun nilainya.',
    },
    // Akun
    {
        category: 'Akun',
        question: 'Apakah wajib membuat akun untuk membeli?',
        answer: 'Ya, Anda perlu membuat akun untuk melakukan pembelian. Ini untuk memudahkan tracking pesanan dan pengiriman produk digital.',
    },
    {
        category: 'Akun',
        question: 'Bagaimana cara melihat riwayat pesanan?',
        answer: 'Setelah login, klik menu profil di pojok kanan atas, lalu pilih "Pesanan Saya" untuk melihat semua riwayat transaksi.',
    },
    {
        category: 'Akun',
        question: 'Bagaimana jika lupa password?',
        answer: 'Klik "Lupa Password" di halaman login, masukkan email Anda, dan ikuti instruksi yang dikirim ke email untuk reset password.',
    },
    // Produk
    {
        category: 'Produk',
        question: 'Apa perbedaan akun sharing dan private?',
        answer: 'Akun Sharing: akun digunakan bersama user lain, lebih murah, cocok untuk penggunaan kasual.\nAkun Private: akun 100% milik Anda sendiri, bisa ganti email/password, cocok untuk jangka panjang.',
    },
    {
        category: 'Produk',
        question: 'Apakah produk bergaransi?',
        answer: 'Ya, semua produk memiliki garansi. Durasi garansi bervariasi tergantung jenis produk (biasanya 1-30 hari). Detail garansi tertera di halaman produk.',
    },
    {
        category: 'Produk',
        question: 'Bagaimana jika produk bermasalah?',
        answer: 'Segera hubungi customer service kami dengan menyertakan bukti pembelian dan screenshot masalah. Kami akan memproses penggantian atau refund sesuai kebijakan garansi.',
    },
    // Refund
    {
        category: 'Refund',
        question: 'Apakah bisa refund?',
        answer: 'Refund bisa dilakukan dalam kondisi tertentu: produk tidak sesuai deskripsi, produk tidak bisa digunakan (bukan kesalahan pembeli), atau stok habis setelah pembayaran. Pengajuan maksimal 24 jam setelah pembelian.',
    },
    {
        category: 'Refund',
        question: 'Berapa lama proses refund?',
        answer: 'Setelah pengajuan disetujui, dana akan dikembalikan dalam 1-3 hari kerja tergantung metode pembayaran awal.',
    },
];

export const faqCategories = ['Semua', 'Umum', 'Pembelian', 'Akun', 'Produk', 'Refund'];
