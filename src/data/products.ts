export interface Product {
    id: string;
    name: string;
    slug: string;
    category: string;
    game?: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    image: string;
    seller: {
        name: string;
        rating: number;
        totalSales: number;
        verified: boolean;
    };
    badge?: 'best_seller' | 'termurah' | 'promo' | 'new';
    stock: number;
    sold: number;
    description: string;
    accountType?: 'sharing' | 'private';
}

export const products: Product[] = [
    // Akun Game
    {
        id: '1',
        name: 'Akun ML Sultan Skin Lengkap',
        slug: 'akun-ml-sultan-skin-lengkap',
        category: 'akun-game',
        game: 'mobile-legends',
        price: 750000,
        originalPrice: 1000000,
        discount: 25,
        image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&h=300&fit=crop',
        seller: {
            name: 'GameShop_ID',
            rating: 4.9,
            totalSales: 1250,
            verified: true
        },
        badge: 'best_seller',
        stock: 5,
        sold: 342,
        description: 'Akun Mobile Legends dengan 200+ skin epic & legend. Hero lengkap, emblem max.'
    },
    {
        id: '2',
        name: 'Akun Valorant Immortal 3',
        slug: 'akun-valorant-immortal-3',
        category: 'akun-game',
        game: 'valorant',
        price: 450000,
        originalPrice: 600000,
        discount: 25,
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
        seller: {
            name: 'ValorantPro',
            rating: 4.8,
            totalSales: 890,
            verified: true
        },
        badge: 'termurah',
        stock: 3,
        sold: 156,
        description: 'Akun Valorant rank Immortal 3, full agent, 50+ skins.'
    },
    {
        id: '3',
        name: 'Akun Genshin AR 60 Full Archon',
        slug: 'akun-genshin-ar-60',
        category: 'akun-game',
        game: 'genshin-impact',
        price: 1200000,
        image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=300&fit=crop',
        seller: {
            name: 'GenshinMart',
            rating: 5.0,
            totalSales: 567,
            verified: true
        },
        stock: 2,
        sold: 245,
        description: 'Akun Genshin Impact AR 60, semua Archon, 5-star weapon lengkap.'
    },

    // Software PC
    {
        id: '4',
        name: 'Canva Pro 1 Tahun',
        slug: 'canva-pro-1-tahun',
        category: 'software-pc',
        price: 45000,
        originalPrice: 150000,
        discount: 70,
        image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop',
        seller: {
            name: 'SoftwareMurah',
            rating: 4.7,
            totalSales: 2340,
            verified: true
        },
        badge: 'best_seller',
        stock: 100,
        sold: 1523,
        description: 'Akun Canva Pro premium 1 tahun. Akses semua fitur premium.'
    },
    {
        id: '5',
        name: 'Spotify Premium 1 Bulan',
        slug: 'spotify-premium-1-bulan',
        category: 'software-pc',
        price: 15000,
        image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=400&h=300&fit=crop',
        seller: {
            name: 'MusicStore',
            rating: 4.9,
            totalSales: 5670,
            verified: true
        },
        badge: 'termurah',
        stock: 500,
        sold: 4521,
        description: 'Upgrade Spotify ke Premium. Tanpa iklan, download offline.'
    },
    {
        id: '6',
        name: 'Netflix Premium 1 Bulan',
        slug: 'netflix-premium-1-bulan',
        category: 'software-pc',
        price: 35000,
        originalPrice: 55000,
        discount: 36,
        image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=300&fit=crop',
        seller: {
            name: 'StreamingID',
            rating: 4.6,
            totalSales: 3210,
            verified: true
        },
        badge: 'promo',
        stock: 50,
        sold: 2890,
        description: 'Akun Netflix Premium 4K UHD. Private account.'
    },

    // Voucher
    {
        id: '7',
        name: 'Steam Wallet IDR 60.000',
        slug: 'steam-wallet-60k',
        category: 'voucher',
        price: 62000,
        image: 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=400&h=300&fit=crop',
        seller: {
            name: 'SteamShop',
            rating: 5.0,
            totalSales: 8900,
            verified: true
        },
        badge: 'best_seller',
        stock: 200,
        sold: 6754,
        description: 'Kode voucher Steam Wallet IDR 60.000. Langsung masuk ke akun.'
    },
    {
        id: '8',
        name: 'Google Play Gift Card 50K',
        slug: 'google-play-50k',
        category: 'voucher',
        price: 51000,
        image: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=400&h=300&fit=crop',
        seller: {
            name: 'VoucherKing',
            rating: 4.8,
            totalSales: 4560,
            verified: true
        },
        stock: 150,
        sold: 3421,
        description: 'Kode voucher Google Play Rp 50.000. Region Indonesia.'
    },

    // Top Up
    {
        id: '9',
        name: 'Diamond ML 1000 + Bonus',
        slug: 'diamond-ml-1000',
        category: 'top-up',
        game: 'mobile-legends',
        price: 245000,
        originalPrice: 280000,
        discount: 12,
        image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&h=300&fit=crop',
        seller: {
            name: 'TopUpCepat',
            rating: 4.9,
            totalSales: 12500,
            verified: true
        },
        badge: 'termurah',
        stock: 999,
        sold: 8976,
        description: 'Top up 1000 Diamond Mobile Legends + bonus 100 diamond.'
    },
    {
        id: '10',
        name: 'UC PUBG 660 + 60',
        slug: 'uc-pubg-660',
        category: 'top-up',
        game: 'pubg-mobile',
        price: 145000,
        image: 'https://images.unsplash.com/photo-1493711662062-fa541f7f19f5?w=400&h=300&fit=crop',
        seller: {
            name: 'PUBGStore',
            rating: 4.7,
            totalSales: 6780,
            verified: true
        },
        stock: 999,
        sold: 4532,
        description: 'Top up 660 UC PUBG Mobile + bonus 60 UC. Proses cepat.'
    },

    // Joki
    {
        id: '11',
        name: 'Joki ML ke Mythic',
        slug: 'joki-ml-mythic',
        category: 'joki',
        game: 'mobile-legends',
        price: 150000,
        originalPrice: 200000,
        discount: 25,
        image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&h=300&fit=crop',
        seller: {
            name: 'JokiPro',
            rating: 4.9,
            totalSales: 890,
            verified: true
        },
        badge: 'best_seller',
        stock: 10,
        sold: 456,
        description: 'Jasa push rank ke Mythic. Garansi bintang, proses 1-3 hari.'
    },
    {
        id: '12',
        name: 'Joki Genshin Spiral Abyss',
        slug: 'joki-genshin-abyss',
        category: 'joki',
        game: 'genshin-impact',
        price: 75000,
        image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=300&fit=crop',
        seller: {
            name: 'AbyssPro',
            rating: 5.0,
            totalSales: 234,
            verified: true
        },
        stock: 20,
        sold: 178,
        description: 'Jasa clear Spiral Abyss 36 star. Harga per floor.'
    }
];

export const featuredProducts = products.filter(p => p.badge === 'best_seller').slice(0, 4);
export const promoProducts = products.filter(p => p.discount && p.discount >= 20).slice(0, 6);
