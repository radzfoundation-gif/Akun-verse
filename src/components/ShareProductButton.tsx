'use client';

import { Share2, Check, X, Link as LinkIcon, Facebook, Twitter, Smartphone } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ShareProductButtonProps {
    productName: string;
    productImage: string;
    description: string;
}

export default function ShareProductButton({ productName, productImage, description }: ShareProductButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [currentUrl, setCurrentUrl] = useState('');

    useEffect(() => {
        setCurrentUrl(window.location.href);
    }, []);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(currentUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy', err);
        }
    };

    const shareSocial = (platform: 'wa' | 'fb' | 'twitter') => {
        const text = `Cek ${productName} di RLabs Store!`;
        const url = encodeURIComponent(currentUrl);
        const encodedText = encodeURIComponent(text);

        let shareUrl = '';
        if (platform === 'wa') {
            shareUrl = `https://wa.me/?text=${encodedText}%20${url}`;
        } else if (platform === 'fb') {
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        } else if (platform === 'twitter') {
            shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${url}`;
        }

        window.open(shareUrl, '_blank', 'width=600,height=400');
    };

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 active:bg-gray-100 active:scale-95 transition-all text-gray-700 font-medium"
            >
                <Share2 size={18} />
                <span>Bagikan</span>
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200">
                        {/* Header */}
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="font-semibold text-gray-900">Bagikan Produk</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6">
                            {/* Product Preview */}
                            <div className="flex gap-4 mb-6 bg-gray-50 p-3 rounded-xl">
                                <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                                    <Image
                                        src={productImage}
                                        alt={productName}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900 line-clamp-2">{productName}</h4>
                                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                        {description}
                                    </p>
                                </div>
                            </div>

                            {/* Share Options */}
                            <div className="grid grid-cols-4 gap-4 mb-6">
                                <button onClick={() => shareSocial('wa')} className="flex flex-col items-center gap-2 group">
                                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors">
                                        <Smartphone size={24} />
                                    </div>
                                    <span className="text-xs font-medium text-gray-600">WhatsApp</span>
                                </button>
                                <button onClick={() => shareSocial('fb')} className="flex flex-col items-center gap-2 group">
                                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        <Facebook size={24} />
                                    </div>
                                    <span className="text-xs font-medium text-gray-600">Facebook</span>
                                </button>
                                <button onClick={() => shareSocial('twitter')} className="flex flex-col items-center gap-2 group">
                                    <div className="w-12 h-12 bg-sky-100 text-sky-500 rounded-full flex items-center justify-center group-hover:bg-sky-500 group-hover:text-white transition-colors">
                                        <Twitter size={24} />
                                    </div>
                                    <span className="text-xs font-medium text-gray-600">Twitter</span>
                                </button>
                                <button onClick={handleCopy} className="flex flex-col items-center gap-2 group">
                                    <div className="w-12 h-12 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center group-hover:bg-gray-800 group-hover:text-white transition-colors">
                                        {copied ? <Check size={24} className="text-green-500 group-hover:text-green-400" /> : <LinkIcon size={24} />}
                                    </div>
                                    <span className="text-xs font-medium text-gray-600">{copied ? 'Disalin!' : 'Copy Link'}</span>
                                </button>
                            </div>

                            {/* Copy Link Input */}
                            <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl border border-gray-200">
                                <input
                                    type="text"
                                    readOnly
                                    value={currentUrl}
                                    className="flex-1 bg-transparent text-sm text-gray-600 focus:outline-none px-2"
                                />
                                <button
                                    onClick={handleCopy}
                                    className="text-sm font-medium text-brand-600 px-3 py-1.5 hover:bg-white rounded-lg transition-all"
                                >
                                    {copied ? 'Disalin' : 'Salin'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
