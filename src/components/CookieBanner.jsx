import React, { useState, useEffect } from 'react';
import { X, Settings, Check, Shield, Cookie } from 'lucide-react';

export const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [showConfig, setShowConfig] = useState(false);
    const [preferences, setPreferences] = useState({
        necessary: true, // Always true
        analytics: false,
        marketing: false,
    });

    useEffect(() => {
        const hasConsented = localStorage.getItem('arteyPanCookieConsent');
        if (!hasConsented) {
            setTimeout(() => setIsVisible(true), 1500); // Slight delay for better UX
        }
    }, []);

    const handleAcceptAll = () => {
        const allAccepted = { necessary: true, analytics: true, marketing: true };
        setPreferences(allAccepted);
        localStorage.setItem('arteyPanCookieConsent', JSON.stringify(allAccepted));
        setIsVisible(false);
    };

    const handleRejectAll = () => {
        localStorage.setItem('arteyPanCookieConsent', 'necessary');
        setIsVisible(false);
    };

    const handleSaveConfig = () => {
        localStorage.setItem('arteyPanCookieConsent', JSON.stringify(preferences));
        setIsVisible(false);
        setShowConfig(false);
    };

    return (
        <>
            {/* Persistent Settings Button (Visible when banner is closed) */}
            {!isVisible && (
                <button
                    onClick={() => setIsVisible(true)}
                    className="fixed bottom-6 left-6 z-[9998] p-3 glass-card rounded-full shadow-lg border border-crust/10 hover:bg-crust hover:text-white transition-all transform hover:scale-110 group pointer-events-auto"
                    title="Configuración de Cookies"
                >
                    <Cookie className="w-5 h-5 text-crust transition-colors group-hover:text-white" />
                </button>
            )}

            {isVisible && (
                <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6 pointer-events-none">
                    <div className="max-w-4xl mx-auto glass-card rounded-3xl shadow-2xl border border-crust/10 overflow-hidden pointer-events-auto transition-all transform translate-y-0 opacity-100 flex flex-col md:flex-row shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
                        {/* Main Banner Message */}
                        {!showConfig ? (
                            <div className="flex-1 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Shield className="w-5 h-5 text-olive" />
                                        <h3 className="font-serif font-bold text-xl text-crust-dark">Valoramos tu privacidad</h3>
                                    </div>
                                    <p className="text-sm text-crust-light leading-relaxed">
                                        Arte & Pan utiliza cookies propias (necesarias) y de terceros para analizar nuestros servicios y mostrarte publicidad relacionada con tus preferencias en base a un perfil elaborado a partir de tus hábitos de navegación. Para cumplir con la normativa de la AEPD en España, puedes aceptar todas, rechazar las no necesarias o configurar tus preferencias.
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 w-full md:w-auto">
                                    <button
                                        onClick={handleAcceptAll}
                                        className="bg-crust text-flour px-6 py-3 rounded-xl text-xs font-black tracking-widest uppercase hover:bg-crust-light transition-all shadow-md text-center"
                                    >
                                        Aceptar Todo
                                    </button>
                                    <button
                                        onClick={handleRejectAll}
                                        className="bg-flour text-crust border border-crust/20 px-6 py-3 rounded-xl text-xs font-black tracking-widest uppercase hover:bg-crust/5 transition-all text-center"
                                    >
                                        Rechazar Todo
                                    </button>
                                    <button
                                        onClick={() => setShowConfig(true)}
                                        className="text-crust-light text-xs font-bold underline underline-offset-4 hover:text-olive transition-colors text-center py-2"
                                    >
                                        Configurar Cookies
                                    </button>
                                </div>
                            </div>
                        ) : (
                            /* Configuration Panel */
                            <div className="w-full p-6 md:p-8">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center gap-2">
                                        <Settings className="w-5 h-5 text-olive" />
                                        <h3 className="font-serif font-bold text-xl text-crust-dark">Configuración de Cookies</h3>
                                    </div>
                                    <button onClick={() => setShowConfig(false)} className="p-2 hover:bg-crust/5 rounded-full">
                                        <X className="w-5 h-5 text-crust-light" />
                                    </button>
                                </div>

                                <div className="space-y-4 mb-8">
                                    {/* Necessary */}
                                    <div className="flex items-start justify-between gap-4 p-4 border border-crust/10 rounded-xl bg-flour/30">
                                        <div>
                                            <h4 className="font-bold text-crust-dark text-sm mb-1">Cookies Estrictamente Necesarias</h4>
                                            <p className="text-xs text-crust-light">Imprescindibles para que la web funcione (ej. carrito de compras, sesión, preferencias de privacidad). Siempre activas.</p>
                                        </div>
                                        <div className="shrink-0 pt-1">
                                            <div className="bg-olive/20 text-olive p-1 rounded-md">
                                                <Check className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Analytics */}
                                    <div className="flex items-start justify-between gap-4 p-4 border border-crust/10 rounded-xl hover:border-olive/30 transition-colors cursor-pointer" onClick={() => setPreferences({ ...preferences, analytics: !preferences.analytics })}>
                                        <div>
                                            <h4 className="font-bold text-crust-dark text-sm mb-1">Cookies de Análisis</h4>
                                            <p className="text-xs text-crust-light">Nos permiten contar las visitas y fuentes de tráfico para medir y mejorar el rendimiento de nuestra web.</p>
                                        </div>
                                        <div className="shrink-0 pt-1">
                                            <div className={`w-10 h-6 rounded-full transition-colors flex items-center p-1 ${preferences.analytics ? 'bg-olive' : 'bg-crust/20'}`}>
                                                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${preferences.analytics ? 'translate-x-4' : 'translate-x-0'}`}></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Marketing */}
                                    <div className="flex items-start justify-between gap-4 p-4 border border-crust/10 rounded-xl hover:border-olive/30 transition-colors cursor-pointer" onClick={() => setPreferences({ ...preferences, marketing: !preferences.marketing })}>
                                        <div>
                                            <h4 className="font-bold text-crust-dark text-sm mb-1">Cookies de Publicidad Consolidada</h4>
                                            <p className="text-xs text-crust-light">Utilizadas para crear un perfil de tus intereses y mostrarte anuncios relevantes en otros sitios.</p>
                                        </div>
                                        <div className="shrink-0 pt-1">
                                            <div className={`w-10 h-6 rounded-full transition-colors flex items-center p-1 ${preferences.marketing ? 'bg-olive' : 'bg-crust/20'}`}>
                                                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${preferences.marketing ? 'translate-x-4' : 'translate-x-0'}`}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3">
                                    <button
                                        onClick={() => setShowConfig(true)}
                                        className="px-6 py-3 rounded-xl text-xs font-bold text-crust-light hover:text-crust transition-colors"
                                    >
                                        Volver
                                    </button>
                                    <button
                                        onClick={handleSaveConfig}
                                        className="bg-crust text-flour px-6 py-3 rounded-xl text-xs font-black tracking-widest uppercase hover:bg-crust-light transition-all shadow-md"
                                    >
                                        Guardar Preferencias
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};
