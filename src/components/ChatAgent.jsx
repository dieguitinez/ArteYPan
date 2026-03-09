import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { generateChatResponse } from '../services/ai/geminiService';

export const ChatAgent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            role: 'assistant',
            content: '¡Hola! Soy Arti, el asistente virtual de Arte & Pan. ¿En qué puedo ayudarte hoy? Recuerda que puedes hacerme tu pedido directamente por aquí o llamarnos si lo prefieres.',
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        const userText = inputMessage;
        if (!userText.trim()) return;

        // Add user message
        const newMsg = { id: Date.now(), role: 'user', content: userText };
        setMessages((prev) => [...prev, newMsg]);
        setInputMessage('');
        setIsTyping(true);

        try {
            // Pass history (before current message) and the new message
            const aiResponse = await generateChatResponse(messages, userText, import.meta.env.VITE_GEMINI_API_KEY);
            setIsTyping(false);
            setMessages((prev) => [...prev, { id: Date.now(), ...aiResponse }]);
        } catch (err) {
            setIsTyping(false);
            setMessages((prev) => [...prev, { id: Date.now(), role: 'assistant', content: 'Lo siento, hubo un error de conexión inesperado.' }]);
        }
    };

    return (
        <>
            {/* Floating Button with Label */}
            {/* Floating Button with Label */}
            <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 transition-all duration-500 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}>
                <div className="bg-olive text-white px-5 py-2.5 rounded-2xl shadow-2xl text-[10px] font-black uppercase tracking-[0.2em] transform hover:-translate-x-2 transition-transform cursor-pointer" onClick={() => setIsOpen(true)}>
                    Chatea con nosotros
                </div>
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-olive text-white p-4 rounded-full shadow-2xl hover:bg-olive-light transition-all transform hover:scale-110 relative"
                    aria-label="Abrir chat de asistencia"
                >
                    <MessageSquare className="w-6 h-6" />
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-flour opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-flour"></span>
                    </span>
                </button>
            </div>

            {/* Chat Window */}
            <div
                className={`fixed bottom-6 right-6 z-50 w-[350px] sm:w-[400px] h-[550px] max-h-[80vh] flex flex-col bg-white rounded-3xl overflow-hidden shadow-2xl border border-crust/10 transition-all transform origin-bottom-right duration-300 ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}
            >
                {/* Header */}
                <div className="bg-olive p-4 flex justify-between items-center text-white">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                            <Bot className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-serif font-bold text-sm tracking-wide">Arti — Asistente IA</h3>
                            <p className="text-[10px] uppercase tracking-widest text-white/70 flex items-center gap-1">
                                <Sparkles className="w-3 h-3" /> Siempre en línea
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Message Area */}
                <div className="flex-1 overflow-y-auto p-4 bg-flour/10 space-y-4">
                    {/* Legal Disclaimer Banner */}
                    <div className="bg-olive/10 border border-olive/20 p-3 rounded-2xl mb-4">
                        <p className="text-[10px] text-olive-dark font-medium leading-relaxed">
                            ⚠️ **Aviso**: Las respuestas de Arti son informativas. Los pedidos y precios finales están sujetos a confirmación por nuestro personal en tienda o por teléfono.
                        </p>
                    </div>

                    <div className="text-center text-[10px] text-crust-light/60 uppercase tracking-widest mb-6">
                        Hoy
                    </div>

                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
                        >
                            <div
                                className={`w-8 h-8 rounded-full flex justify-center items-center shrink-0 ${msg.role === 'user' ? 'bg-crust text-white' : 'bg-olive/10 text-olive'
                                    }`}
                            >
                                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                            </div>
                            <div
                                className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user'
                                    ? 'bg-crust text-flour-light rounded-tr-sm'
                                    : 'bg-white border border-crust/10 text-crust-dark rounded-tl-sm'
                                    }`}
                            >
                                {msg.content.split(/(https?:\/\/[^\s]+)/g).map((part, i) =>
                                    part.match(/^https?:\/\//) ? (
                                        <div key={i} className="my-3">
                                            <a
                                                href={part}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-3 bg-olive text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all transform hover:bg-olive-dark"
                                            >
                                                <Sparkles className="w-4 h-4" />
                                                {part.includes('#pedido') ? 'Rellenar Formulario de Pedido' : 'Ir al enlace'}
                                            </a>
                                        </div>
                                    ) : (
                                        <span key={i} className="whitespace-pre-wrap">{part}</span>
                                    )
                                )}
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex gap-3 max-w-[85%] mr-auto">
                            <div className="w-8 h-8 rounded-full bg-olive/10 text-olive flex justify-center items-center shrink-0">
                                <Bot className="w-4 h-4" />
                            </div>
                            <div className="bg-white border border-crust/10 p-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-olive/40 rounded-full animate-bounce"></span>
                                <span className="w-1.5 h-1.5 bg-olive/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                                <span className="w-1.5 h-1.5 bg-olive/40 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Support Note with Hallucination Disclaimer */}
                <div className="text-center py-2 px-4 bg-olive/5 border-t border-crust/5">
                    <p className="text-[9px] text-olive/60 uppercase tracking-widest leading-tight">
                        Arti es una IA y puede cometer errores o tener delirios.
                        <br />Verifica siempre la información importante.
                    </p>
                </div>

                {/* Input Area */}
                <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-crust/10 flex items-center gap-2">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Pregunta o haz tu pedido..."
                        className="flex-1 bg-flour/30 border border-crust/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-olive/50 text-crust-dark placeholder-crust-light/60 transition-all font-light"
                    />
                    <button
                        type="submit"
                        disabled={!inputMessage.trim()}
                        className="p-3 bg-crust text-white rounded-xl hover:bg-crust-light transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </form>
            </div>
        </>
    );
};
