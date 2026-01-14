import { Game } from '@/types';

export const games: Game[] = [
    {
        id: 1,
        title: "Resident Evil 4",
        genre: "Survival Horror",
        priceOriginal: "Rp 600K",
        priceDiscount: "Rp 5K",
        priceValue: 5000,
        discount: "-99%",
        image: "/re4.jpg",
        tag: "HOT",
        tagColor: "brand"
    },
    {
        id: 2,
        title: "Grand Theft Auto V",
        genre: "Action Adventure",
        priceOriginal: "Rp 400K",
        priceDiscount: "Rp 5K",
        priceValue: 5000,
        discount: "-99%",
        image: "/gtav.jpg",
        tag: "BEST SELLER",
        tagColor: "brand"
    },
    {
        id: 3,
        title: "Clair Obscur: Expedition 33",
        genre: "RPG",
        priceOriginal: "Rp 550K",
        priceDiscount: "Rp 5K",
        priceValue: 5000,
        discount: "-99%",
        image: "/expedition33.jpg",
        tag: "NEW",
        tagColor: "blue"
    },
    {
        id: 4,
        title: "Galactic Empire",
        genre: "Strategy",
        priceOriginal: "Rp 80K",
        priceDiscount: "Rp 5K",
        priceValue: 5000,
        discount: "-94%",
        image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4734259a-bad7-422f-981e-ce01e79184f2_1600w.jpg",
        tag: null,
        tagColor: "red"
    }
];
