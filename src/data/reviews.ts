import { Review } from '@/components/ProductReviews';

export const productReviews: Record<string, Review[]> = {
    // Default reviews for any product if specific ones don't exist
    'default': [
        {
            id: 'rev1',
            userName: 'Budi Santoso',
            rating: 5,
            comment: 'Mantap, proses cepat nggak nyampe 5 menit langsung dapet datanya. Seller responsif banget.',
            date: '2026-01-10T08:30:00Z',
            helpful: 12,
            verified: true
        },
        {
            id: 'rev2',
            userName: 'Sari Wijaya',
            rating: 5,
            comment: 'Awalnya ragu beli di sini, tapi ternyata beneran aman. Akun sesuai deskripsi, private dan bisa ganti password.',
            date: '2026-01-12T14:45:00Z',
            helpful: 8,
            verified: true
        },
        {
            id: 'rev3',
            userName: 'Andi Pratama',
            rating: 4,
            comment: 'Harga murah banget dibanding toko sebelah. Cuma respon admin pas nanya agak lama, tapi pas udah bayar langsung dikirim.',
            date: '2026-01-14T10:20:00Z',
            helpful: 5,
            verified: true
        },
        {
            id: 'rev4',
            userName: 'Rina Kartika',
            rating: 5,
            comment: 'Langganan di sini terus buat top up diamond ML. Harganya miring dan selalu masuk hitungan detik.',
            date: '2026-01-15T09:15:00Z',
            helpful: 15,
            verified: true
        }
    ],
    // Specific reviews for ML
    '1': [
        {
            id: 'rev_ml1',
            userName: 'GamerSejati',
            rating: 5,
            comment: 'Skin Legend-nya beneran ada! Gila sih ini worth it banget. Akun langsung ditransfer ke email saya.',
            date: '2026-01-10T12:00:00Z',
            helpful: 24,
            verified: true
        },
        {
            id: 'rev_ml2',
            userName: 'Donny_ML',
            rating: 5,
            comment: 'Proses joki-nya cepet banget dari Epic ke Mythic cuma 2 hari. Winrate juga naik drastis.',
            date: '2026-01-11T18:30:00Z',
            helpful: 10,
            verified: true
        }
    ],
    // Specific reviews for Valorant
    '2': [
        {
            id: 'rev_val1',
            userName: 'VandalMaster',
            rating: 5,
            comment: 'Akun rank Immortal beneran ready. Skin-nya banyak yang premium. Recommended seller!',
            date: '2026-01-08T15:20:00Z',
            helpful: 18,
            verified: true
        }
    ],
    // Specific reviews for Genshin
    '3': [
        {
            id: 'rev_gen1',
            userName: 'PaimonLover',
            rating: 5,
            comment: 'Gila sih ini akun AR 60 archon lengkap. Gacha-nya hoki banget kayaknya. Aman 100%.',
            date: '2026-01-05T20:15:00Z',
            helpful: 32,
            verified: true
        }
    ],
    // Specific reviews for Canva
    '4': [
        {
            id: 'rev_can1',
            userName: 'DesainGrafis_99',
            rating: 5,
            comment: 'Langsung premium! Murah banget cuma 45rb udah bisa pake semua fitur canva pro setaun.',
            date: '2026-01-14T11:00:00Z',
            helpful: 45,
            verified: true
        }
    ],
    // Specific reviews for Spotify
    '5': [
        {
            id: 'rev_spot1',
            userName: 'MusicMania',
            rating: 5,
            comment: 'Spotify premium mendarat dengan aman. No ads, bisa download lagu. Proses 2 menit.',
            date: '2026-01-15T13:40:00Z',
            helpful: 21,
            verified: true
        }
    ],
    // Specific reviews for Netflix
    '6': [
        {
            id: 'rev_net1',
            userName: 'MovieBuff',
            rating: 5,
            comment: 'Netflix private aman banget. Bisa bikin profile sendiri, 4K lancar jaya.',
            date: '2026-01-13T21:10:00Z',
            helpful: 38,
            verified: true
        }
    ],
    // Specific reviews for Steam
    '7': [
        {
            id: 'rev_steam1',
            userName: 'GabenFan',
            rating: 5,
            comment: 'Steam wallet langsung masuk. Lebih murah dikit dari beli langsung di Steam.',
            date: '2026-01-14T16:50:00Z',
            helpful: 12,
            verified: true
        }
    ],
    // Specific reviews for Google Play
    '8': [
        {
            id: 'rev_gplay1',
            userName: 'AndroidUser',
            rating: 5,
            comment: 'Kode valid dan langsung bisa di-redeem. Thanks Akunverse!',
            date: '2026-01-12T09:30:00Z',
            helpful: 9,
            verified: true
        }
    ],
    // Specific reviews for Top-up Diamond
    '9': [
        {
            id: 'rev_dm1',
            userName: 'MLBB_King',
            rating: 5,
            comment: 'Diamond tercepat yang pernah saya beli. Bayar pake QRIS langsung masuk.',
            date: '2026-01-15T15:00:00Z',
            helpful: 56,
            verified: true
        }
    ],
    // Specific reviews for PUBG
    '10': [
        {
            id: 'rev_uc1',
            userName: 'WinnerWinner',
            rating: 5,
            comment: 'UC masuk hitungan detik. Siap buat gacha skin baru!',
            date: '2026-01-14T22:30:00Z',
            helpful: 27,
            verified: true
        }
    ],
    // Specific reviews for Joki ML
    '11': [
        {
            id: 'rev_joki1',
            userName: 'EpicAbadi',
            rating: 5,
            comment: 'Gila sih joki di sini winrate-nya 100%. Dari Epic ke Mythic beres 3 hari doang.',
            date: '2026-01-11T10:00:00Z',
            helpful: 42,
            verified: true
        }
    ],
    // Specific reviews for Joki Genshin
    '12': [
        {
            id: 'rev_joki2',
            userName: 'Traveler_ID',
            rating: 5,
            comment: 'Abyss 36 star akhirnya tercapai berkat bantuan di sini. Build char saya beneran dimaksimalin.',
            date: '2026-01-10T14:20:00Z',
            helpful: 15,
            verified: true
        }
    ]
};

export const homepageTestimonials = [
    {
        id: 't1',
        name: 'Ahmad Faisal',
        role: 'Pro Gamer',
        content: 'Pelayanan di Akunverse beneran top. Prosesnya instan dan harganya paling murah se-Indonesia buat voucher game.',
        avatar: '/avatars/avatar1.png',
        rating: 5
    },
    {
        id: 't2',
        name: 'Siska Amelia',
        role: 'Casual Player',
        content: 'Udah berkali-kali beli akun Netflix dan Spotify di sini, nggak pernah ada masalah. Garansinya beneran aman!',
        avatar: '/avatars/avatar2.png',
        rating: 5
    },
    {
        id: 't3',
        name: 'Kevin Pratama',
        role: 'Genshin Player',
        content: 'Beli akun Genshin Impact di sini prosesnya dibantu sampe tuntas ganti email. Adminnya sabar banget.',
        avatar: '/avatars/avatar3.png',
        rating: 5
    }
];
