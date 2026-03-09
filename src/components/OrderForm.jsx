import React, { useState } from 'react';
import { Package, User, Phone, MapPin, Send, ArrowLeft, CheckCircle } from 'lucide-react';
import { useOrders } from '../context/OrderContext';

export const OrderForm = ({ onBack }) => {
    const { addOrder } = useOrders();
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        customer: '',
        phone: '',
        address: '',
        items: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        addOrder({
            customer: formData.customer,
            phone: formData.phone,
            address: formData.address,
            items: formData.items,
            status: 'pending', // Los empleados lo verán como pendiente de validar
        });
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-flour flex items-center justify-center p-6">
                <div className="bg-white p-12 rounded-[3rem] shadow-2xl max-w-md w-full text-center space-y-6 border border-crust/5">
                    <div className="w-20 h-20 bg-olive/10 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="w-10 h-10 text-olive" />
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-crust-dark">¡Recibido!</h2>
                    <p className="text-crust-light leading-relaxed">
                        Tu solicitud ha llegado a nuestras manos. Un miembro de **Arte & Pan** revisará los detalles y te llamará pronto para confirmar el envío y el pago.
                    </p>
                    <button
                        onClick={() => window.location.hash = ''}
                        className="w-full bg-crust text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-crust-light transition-all"
                    >
                        Volver al Inicio
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-flour/50 py-20 px-6">
            <div className="max-w-2xl mx-auto space-y-8">
                <button
                    onClick={() => window.location.hash = ''}
                    className="flex items-center gap-2 text-crust-light hover:text-olive transition-colors font-bold uppercase tracking-widest text-[10px]"
                >
                    <ArrowLeft className="w-4 h-4" /> Volver
                </button>

                <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-crust/5">
                    <div className="bg-olive p-10 text-white">
                        <h2 className="text-4xl font-serif font-bold mb-2">Finalizar Pedido</h2>
                        <p className="text-white/80 font-light">Completa tus datos y nuestro equipo humano se encargará del resto.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-10 space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-black tracking-widest text-crust/50 flex items-center gap-2">
                                    <User className="w-3 h-3" /> Nombre Completo
                                </label>
                                <input
                                    required
                                    type="text"
                                    className="w-full bg-flour/30 border border-crust/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-olive/50 transition-all"
                                    placeholder="Ej. Juan Pérez"
                                    value={formData.customer}
                                    onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-black tracking-widest text-crust/50 flex items-center gap-2">
                                    <Phone className="w-3 h-3" /> Teléfono de Contacto
                                </label>
                                <input
                                    required
                                    type="tel"
                                    className="w-full bg-flour/30 border border-crust/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-olive/50 transition-all"
                                    placeholder="+34 600 000 000"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-black tracking-widest text-crust/50 flex items-center gap-2">
                                <MapPin className="w-3 h-3" /> Dirección de Entrega (La Línea)
                            </label>
                            <input
                                required
                                type="text"
                                className="w-full bg-flour/30 border border-crust/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-olive/50 transition-all"
                                placeholder="Calle, Número, Piso..."
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-black tracking-widest text-crust/50 flex items-center gap-2">
                                <Package className="w-3 h-3" /> Detalles del Pedido
                            </label>
                            <textarea
                                required
                                rows="4"
                                className="w-full bg-flour/30 border border-crust/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-olive/50 transition-all resize-none"
                                placeholder="Ej. 2 Hogazas de masa madre y 5 Japonesas..."
                                value={formData.items}
                                onChange={(e) => setFormData({ ...formData, items: e.target.value })}
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-crust text-white py-5 rounded-3xl font-black uppercase tracking-[0.2em] text-xs shadow-xl hover:bg-crust-light transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1"
                        >
                            Enviar al Horno <Send className="w-4 h-4" />
                        </button>

                        <p className="text-[10px] text-center text-crust-light/60 uppercase tracking-widest pt-4">
                            Un panadero te llamará en unos minutos para confirmar.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};
