import {
    Gamepad2,
    Monitor,
    CreditCard,
    Diamond,
    ShoppingBag,
    Trophy,
    Headphones,
    Film,
    type LucideIcon
} from 'lucide-react';

export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    icon: LucideIcon;
    color: string;
    bgColor: string;
    productCount: number;
}

export const categories: Category[] = [
    {
        id: '1',
        name: 'Akun Game',
        slug: 'akun-game',
        description: 'Akun game premium siap pakai',
        icon: Gamepad2,
        color: 'text-blue-500',
        bgColor: 'bg-blue-50',
        productCount: 1250
    },
    {
        id: '2',
        name: 'Software PC',
        slug: 'software-pc',
        description: 'Lisensi software original',
        icon: Monitor,
        color: 'text-purple-500',
        bgColor: 'bg-purple-50',
        productCount: 340
    },
    {
        id: '3',
        name: 'Voucher Digital',
        slug: 'voucher',
        description: 'Gift card & voucher game',
        icon: CreditCard,
        color: 'text-green-500',
        bgColor: 'bg-green-50',
        productCount: 890
    },
    {
        id: '4',
        name: 'Top Up Game',
        slug: 'top-up',
        description: 'Isi diamond, UC, gems',
        icon: Diamond,
        color: 'text-cyan-500',
        bgColor: 'bg-cyan-50',
        productCount: 2100
    },
    {
        id: '5',
        name: 'Game Steam',
        slug: 'game-steam',
        description: 'Steam wallet & game keys',
        icon: ShoppingBag,
        color: 'text-orange-500',
        bgColor: 'bg-orange-50',
        productCount: 560
    },
    {
        id: '6',
        name: 'Joki & Boosting',
        slug: 'joki',
        description: 'Push rank & farming',
        icon: Trophy,
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-50',
        productCount: 780
    },
    {
        id: '7',
        name: 'Streaming',
        slug: 'streaming',
        description: 'Netflix, Spotify, YouTube',
        icon: Film,
        color: 'text-red-500',
        bgColor: 'bg-red-50',
        productCount: 420
    },
    {
        id: '8',
        name: 'Lainnya',
        slug: 'lainnya',
        description: 'Produk digital lainnya',
        icon: Headphones,
        color: 'text-gray-500',
        bgColor: 'bg-gray-100',
        productCount: 230
    }
];

export interface PopularGame {
    id: string;
    name: string;
    slug: string;
    image: string;
    productCount: number;
}

export const popularGames: PopularGame[] = [
    {
        id: '1',
        name: 'Mobile Legends',
        slug: 'mobile-legends',
        image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=200&h=200&fit=crop',
        productCount: 5420
    },
    {
        id: '2',
        name: 'Valorant',
        slug: 'valorant',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=200&fit=crop',
        productCount: 3210
    },
    {
        id: '3',
        name: 'Genshin Impact',
        slug: 'genshin-impact',
        image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=200&h=200&fit=crop',
        productCount: 2890
    },
    {
        id: '4',
        name: 'Free Fire',
        slug: 'free-fire',
        image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=200&h=200&fit=crop',
        productCount: 4150
    },
    {
        id: '5',
        name: 'PUBG Mobile',
        slug: 'pubg-mobile',
        image: 'https://images.unsplash.com/photo-1493711662062-fa541f7f19f5?w=200&h=200&fit=crop',
        productCount: 2560
    },
    {
        id: '6',
        name: 'Roblox',
        slug: 'roblox',
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=200&h=200&fit=crop',
        productCount: 1890
    },
    {
        id: '7',
        name: 'Steam',
        slug: 'steam',
        image: 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=200&h=200&fit=crop',
        productCount: 3450
    },
    {
        id: '8',
        name: 'Honkai Star Rail',
        slug: 'honkai-star-rail',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=200&h=200&fit=crop',
        productCount: 1240
    }
];
