'use client';

import { useState } from 'react';
import { Star, ThumbsUp, User } from 'lucide-react';
import { motion } from 'framer-motion';

export interface Review {
    id: string;
    userName: string;
    userAvatar?: string;
    rating: number;
    comment: string;
    date: string;
    helpful: number;
    verified: boolean;
}

interface ProductReviewsProps {
    productId: string;
    reviews?: Review[];
}

// Demo reviews data
const demoReviews: Review[] = [
    {
        id: '1',
        userName: 'Ahmad S.',
        rating: 5,
        comment: 'Produk sesuai deskripsi, pengiriman cepat banget! Kurang dari 5 menit sudah masuk. Seller sangat responsif dan helpful. Recommended!',
        date: '2026-01-12',
        helpful: 12,
        verified: true,
    },
    {
        id: '2',
        userName: 'Budi P.',
        rating: 4,
        comment: 'Overall bagus, akun berjalan normal. Cuma agak lama nunggunya di jam sibuk. Tapi CS responsif kok.',
        date: '2026-01-10',
        helpful: 8,
        verified: true,
    },
    {
        id: '3',
        userName: 'Citra W.',
        rating: 5,
        comment: 'Sudah 3x beli di sini, selalu puas! Harga termurah dibanding kompetitor.',
        date: '2026-01-08',
        helpful: 15,
        verified: true,
    },
];

export default function ProductReviews({ productId, reviews = demoReviews }: ProductReviewsProps) {
    const [helpfulClicked, setHelpfulClicked] = useState<Set<string>>(new Set());

    const averageRating = reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;

    const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
        rating,
        count: reviews.filter(r => r.rating === rating).length,
        percentage: reviews.length > 0
            ? (reviews.filter(r => r.rating === rating).length / reviews.length) * 100
            : 0,
    }));

    const handleHelpful = (reviewId: string) => {
        setHelpfulClicked(prev => {
            const newSet = new Set(prev);
            if (newSet.has(reviewId)) {
                newSet.delete(reviewId);
            } else {
                newSet.add(reviewId);
            }
            return newSet;
        });
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    return (
        <div className="bg-white/5 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">Ulasan Pembeli</h3>

            {/* Summary */}
            <div className="flex flex-col md:flex-row gap-8 mb-8 pb-8 border-b border-white/10">
                {/* Average Rating */}
                <div className="text-center">
                    <div className="text-5xl font-bold text-white mb-2">
                        {averageRating.toFixed(1)}
                    </div>
                    <div className="flex justify-center gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                size={18}
                                className={star <= Math.round(averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
                            />
                        ))}
                    </div>
                    <p className="text-gray-400 text-sm">{reviews.length} ulasan</p>
                </div>

                {/* Distribution */}
                <div className="flex-1 space-y-2">
                    {ratingDistribution.map(({ rating, count, percentage }) => (
                        <div key={rating} className="flex items-center gap-2">
                            <span className="text-gray-400 text-sm w-4">{rating}</span>
                            <Star size={14} className="text-yellow-400 fill-yellow-400" />
                            <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percentage}%` }}
                                    transition={{ duration: 0.5, delay: rating * 0.1 }}
                                    className="h-full bg-yellow-400 rounded-full"
                                />
                            </div>
                            <span className="text-gray-500 text-xs w-8">{count}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
                {reviews.length === 0 ? (
                    <p className="text-center text-gray-400 py-8">Belum ada ulasan untuk produk ini</p>
                ) : (
                    reviews.map((review) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="pb-6 border-b border-white/5 last:border-0"
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                                        <User size={18} className="text-purple-400" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-white font-medium">{review.userName}</span>
                                            {review.verified && (
                                                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                                                    ✓ Terverifikasi
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex gap-0.5">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star
                                                        key={star}
                                                        size={12}
                                                        className={star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-gray-500 text-xs">{formatDate(review.date)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Comment */}
                            <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                                {review.comment}
                            </p>

                            {/* Helpful */}
                            <button
                                onClick={() => handleHelpful(review.id)}
                                className={`flex items-center gap-1.5 text-xs transition-colors ${helpfulClicked.has(review.id)
                                        ? 'text-purple-400'
                                        : 'text-gray-500 hover:text-gray-300'
                                    }`}
                            >
                                <ThumbsUp size={14} fill={helpfulClicked.has(review.id) ? 'currentColor' : 'none'} />
                                Membantu ({review.helpful + (helpfulClicked.has(review.id) ? 1 : 0)})
                            </button>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
}
