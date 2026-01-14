'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, Bot, Loader2, ChevronRight, Headset } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';

interface Message {
    id: string;
    content: string;
    is_admin: boolean; // true = admin/bot, false = user
    created_at: string;
}

const FAQ_OPTIONS = [
    { label: 'Cara Order', trigger: 'cara_order' },
    { label: 'Metode Pembayaran', trigger: 'payment' },
    { label: 'Garansi', trigger: 'warranty' },
    { label: 'Hubungi Admin', trigger: 'human' },
];

export default function FloatingChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [sessionId, setSessionId] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initialize session ID
    useEffect(() => {
        let storedSession = localStorage.getItem('chat_session_id');
        if (!storedSession) {
            storedSession = crypto.randomUUID();
            localStorage.setItem('chat_session_id', storedSession);
        }
        setSessionId(storedSession);
    }, []);

    // Load messages and subscribe
    useEffect(() => {
        if (!sessionId) return;

        // Fetch history
        const fetchMessages = async () => {
            const { data } = await supabase
                .from('messages')
                .select('*')
                .eq('session_id', sessionId)
                .order('created_at', { ascending: true });

            if (data) {
                setMessages(data);
            } else {
                // Initial greeting if no history
                setMessages([
                    {
                        id: 'init-1',
                        content: 'Halo! Selamat datang di Akunverse Premium Store. Ada yang bisa kami bantu? 👋',
                        is_admin: true,
                        created_at: new Date().toISOString()
                    }
                ]);
            }
        };

        fetchMessages();

        // Subscribe to realtime
        const channel = supabase
            .channel('chat_room')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                    filter: `session_id=eq.${sessionId}`
                },
                (payload) => {
                    const newMsg = payload.new as Message;
                    setMessages((prev) => {
                        // Avoid duplicates
                        if (prev.find(m => m.id === newMsg.id)) return prev;
                        return [...prev, newMsg];
                    });
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [sessionId]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSendMessage = async (e?: React.FormEvent, customText?: string) => {
        e?.preventDefault();
        const text = customText || newMessage;
        if (!text.trim()) return;

        setNewMessage('');

        // 1. Optimistic update (User message)
        const tempId = crypto.randomUUID();
        const userMsg: Message = {
            id: tempId,
            content: text,
            is_admin: false,
            created_at: new Date().toISOString()
        };
        setMessages(prev => [...prev, userMsg]);

        // 2. Save to Supabase
        await supabase.from('messages').insert({
            session_id: sessionId,
            content: text,
            is_admin: false,
            created_at: new Date().toISOString()
        });

        // 3. Bot Auto-Reply Logic
        setIsTyping(true);
        setTimeout(async () => {
            let replyText = '';

            // Simple Keyword Matching
            const lowerText = text.toLowerCase();

            if (text === 'cara_order' || lowerText.includes('cara order') || lowerText.includes('beli')) {
                replyText = "Untuk order, pilih produk > klik 'Beli Sekarang' > isi data > lakukan pembayaran. Akun akan dikirim otomatis ke email/WhatsApp kamu! 🚀";
            } else if (text === 'payment' || lowerText.includes('bayar') || lowerText.includes('metode')) {
                replyText = "Kami menerima pembayaran via QRIS, E-Wallet (Dana/OVO/Gopay), dan Transfer Bank. Semua otomatis verifikasi! 💳";
            } else if (text === 'warranty' || lowerText.includes('garansi')) {
                replyText = "Semua akun bergaransi! Jika ada masalah login, kami ganti baru. Garansi berlaku selama tidak melanggar ToS kami (misal: ganti email/password untuk akun sharing). 🛡️";
            } else if (text === 'human' || lowerText.includes('admin') || lowerText.includes('manusia')) {
                replyText = "Baik, saya sambungkan ke Admin ya. Silakan klik tombol di bawah ini untuk lanjut ke WhatsApp 👇";
            }

            if (replyText) {
                const botMsg: Message = {
                    id: crypto.randomUUID(),
                    content: replyText,
                    is_admin: true,
                    created_at: new Date().toISOString()
                };

                // Save bot reply
                await supabase.from('messages').insert({
                    session_id: sessionId,
                    content: replyText,
                    is_admin: true,
                    created_at: new Date().toISOString()
                });

                // If asked for admin, show WA link logic (pseudo-message)
                if (text === 'human' || lowerText.includes('admin')) {
                    // logic handled by rendering link in message or next message
                }
            }

            setIsTyping(false);
        }, 1500);
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-6 z-50 w-[350px] md:w-[380px] bg-[#1F2933] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[600px]"
                    >
                        {/* Header */}
                        <div className="bg-[#111827] p-4 flex items-center justify-between border-b border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 bg-[#FACC15] rounded-full flex items-center justify-center">
                                        <Bot size={24} className="text-[#111827]" />
                                    </div>
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#111827] rounded-full"></span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-sm">Akunverse Support</h3>
                                    <p className="text-xs text-green-400">Online • Bot Assistant</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px] max-h-[400px]">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.is_admin ? 'justify-start' : 'justify-end'}`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.is_admin
                                                ? 'bg-[#111827] text-gray-200 rounded-tl-sm'
                                                : 'bg-[#FACC15] text-[#111827] rounded-tr-sm font-medium'
                                            }`}
                                    >
                                        <p>{msg.content}</p>
                                    </div>
                                </div>
                            ))}

                            {/* Admin WA Button Special Case */}
                            {messages.some(m => m.content.includes('lanjut ke WhatsApp')) && messages[messages.length - 1].is_admin && (
                                <div className="flex justify-start">
                                    <a
                                        href="https://wa.me/6281234567890"
                                        target="_blank"
                                        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-green-700 transition-colors"
                                    >
                                        <MessageCircle size={14} />
                                        Chat via WhatsApp
                                    </a>
                                </div>
                            )}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-[#111827] rounded-2xl px-4 py-3 rounded-tl-sm">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                                            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></span>
                                            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Options */}
                        <div className="p-3 bg-[#111827]/50 border-t border-white/5 flex gap-2 overflow-x-auto no-scrollbar">
                            {FAQ_OPTIONS.map((opt) => (
                                <button
                                    key={opt.trigger}
                                    onClick={() => handleSendMessage(undefined, opt.trigger)}
                                    className="whitespace-nowrap px-3 py-1.5 bg-[#1F2933] border border-white/10 rounded-full text-xs text-gray-300 hover:text-[#FACC15] hover:border-[#FACC15] transition-colors"
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSendMessage} className="p-4 bg-[#111827] border-t border-white/10 flex gap-2">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Tulis pesan..."
                                className="flex-1 bg-[#1F2933] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FACC15] focus:ring-1 focus:ring-[#FACC15] placeholder:text-gray-500"
                            />
                            <button
                                type="submit"
                                disabled={!newMessage.trim()}
                                className="bg-[#FACC15] text-[#111827] p-2.5 rounded-xl hover:bg-[#EAB308] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="group relative flex items-center justify-center w-14 h-14 bg-[#FACC15] text-[#111827] rounded-full shadow-lg shadow-black/50 hover:bg-[#EAB308] transition-all hover:scale-110 focus:outline-none"
                >
                    {isOpen ? (
                        <X size={28} />
                    ) : (
                        <MessageCircle size={28} className="animate-bounce-slow" />
                    )}

                    {!isOpen && (
                        <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-[#1F2933]"></span>
                    )}
                </button>
            </div>
        </>
    );
}
