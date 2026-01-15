'use client';

import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { homepageTestimonials } from '@/data/reviews';

export default function Testimonials() {
    return (
        <section className="py-20 bg-[#0B0F19]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Apa Kata <span className="text-[#FACC15]">Mereka?</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Ribuan gamer telah mempercayakan kebutuhan digital mereka kepada kami.
                        Berikut adalah pengalaman jujur dari pelanggan setia Akunverse.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {homepageTestimonials.map((testimonial, idx) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-[#1F2933] p-8 rounded-2xl border border-white/5 relative group hover:border-[#FACC15]/30 transition-all"
                        >
                            <Quote className="absolute top-6 right-6 w-8 h-8 text-white/5 group-hover:text-[#FACC15]/10 transition-colors" />

                            <div className="flex gap-1 mb-6">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        size={16}
                                        className={star <= testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
                                    />
                                ))}
                            </div>

                            <p className="text-gray-300 mb-8 italic leading-relaxed">
                                "{testimonial.content}"
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-[#FACC15]/10 rounded-full flex items-center justify-center border border-[#FACC15]/20">
                                    <span className="text-[#FACC15] font-bold">{testimonial.name.charAt(0)}</span>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">{testimonial.name}</h4>
                                    <p className="text-gray-500 text-xs">{testimonial.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Trust Stats */}
                <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8 py-8 border-y border-white/5">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-1">10k+</div>
                        <div className="text-gray-500 text-sm">Pesanan Selesai</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-1">5k+</div>
                        <div className="text-gray-500 text-sm">Pelanggan Aktif</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-1">4.9/5</div>
                        <div className="text-gray-500 text-sm">Rating Kepuasan</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-1">24/7</div>
                        <div className="text-gray-500 text-sm">Layanan Bantuan</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
