import React, { useState } from 'react';
import { Package, Truck, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { createUberOrder } from '../api/uber';

export const StaffPanel = () => {
    const { orders, removeOrder } = useOrders();
    const [notifications, setNotifications] = useState([]);

    const handleReady = async (orderId) => {
        const order = orders.find(o => o.id === orderId);

        // Simular llamada a Uber Direct real
        setNotifications([...notifications, { id: Date.now(), msg: `Solicitando repartidor Uber...` }]);

        try {
            const uberResponse = await createUberOrder(orderId, "Dirección del Cliente", order?.items);

            setNotifications(prev => [
                ...prev.filter(n => !n.msg.includes("Solicitando")),
                { id: Date.now(), msg: `Uber en camino: ${uberResponse.courier_name}` }
            ]);

            // Esperar un poco para que el empleado vea el mensaje antes de quitar el pedido
            setTimeout(() => {
                removeOrder(orderId);
            }, 2000);

        } catch (error) {
            setNotifications([...notifications, { id: Date.now(), msg: `Error al solicitar Uber` }]);
        }

        // Auto-remove notifications
        setTimeout(() => {
            setNotifications([]);
        }, 5000);
    };

    return (
        <div className="min-h-screen bg-flour p-4 md:p-8 font-sans">
            <div className="max-w-6xl mx-auto space-y-8">
                <header className="flex justify-between items-center border-b border-crust/10 pb-6">
                    <div>
                        <h1 className="text-3xl font-serif font-black text-crust-dark">Panel de Control: Arte & Pan</h1>
                        <p className="text-xs text-crust-light uppercase tracking-widest mt-1">Gestión de Pedidos en Tiempo Real</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-white p-3 rounded-2xl shadow-sm border border-crust/5 flex items-center gap-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-xs font-bold text-crust uppercase tracking-tighter">Sistema Online</span>
                        </div>
                    </div>
                </header>

                {/* Notificaciones flotantes */}
                <div className="fixed top-8 right-8 z-50 space-y-3">
                    {notifications.map(n => (
                        <div key={n.id} className="bg-crust text-flour px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-slide-in">
                            <Truck className="w-5 h-5 text-olive" />
                            <span className="text-sm font-bold">{n.msg}</span>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {orders.length === 0 ? (
                        <div className="col-span-full py-20 text-center space-y-4 opacity-30">
                            <Package className="w-16 h-16 mx-auto" />
                            <p className="font-serif italic text-xl">No hay pedidos pendientes...</p>
                        </div>
                    ) : (
                        orders.map(order => (
                            <div key={order.id} className="bg-white rounded-3xl p-6 shadow-xl border border-crust/5 space-y-6 hover:border-olive/30 transition-all">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className="text-[10px] font-black tracking-widest text-crust-light uppercase block mb-1">{order.id}</span>
                                        <h3 className="text-xl font-serif font-bold text-crust-dark">{order.customer}</h3>
                                    </div>
                                    <div className="flex items-center gap-1 text-olive bg-olive/10 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                                        <Clock className="w-3 h-3" /> {order.time}
                                    </div>
                                </div>

                                <div className="p-4 bg-flour/50 rounded-2xl border border-crust/5 space-y-2">
                                    <p className="text-sm text-crust-dark font-medium leading-relaxed italic">
                                        "{order.items}"
                                    </p>
                                    {order.phone && (
                                        <div className="pt-2 border-t border-crust/5 flex flex-col gap-1">
                                            <p className="text-[10px] font-bold text-olive flex items-center gap-1 uppercase tracking-widest">
                                                <Phone className="w-3 h-3" /> {order.phone}
                                            </p>
                                            {order.address && (
                                                <p className="text-[10px] font-medium text-crust-light flex items-center gap-1">
                                                    <MapPin className="w-3 h-3" /> {order.address}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-black text-crust-dark">{order.total ? `${order.total.toFixed(2)}€` : 'Pte. Calcular'}</span>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-tighter border italic ${order.status === 'pending'
                                            ? 'text-amber-600 bg-amber-50 border-amber-100'
                                            : 'text-green-600 bg-green-50 border-green-100'
                                        }`}>
                                        {order.status === 'pending' ? 'Validar Pedido' : 'Pagado'}
                                    </span>
                                </div>

                                <button
                                    onClick={() => handleReady(order.id)}
                                    className="w-full bg-olive text-white py-4 rounded-2xl font-black tracking-widest uppercase text-xs shadow-lg hover:bg-olive-dark flex items-center justify-center gap-2 transition-all active:scale-95"
                                >
                                    <CheckCircle className="w-4 h-4" /> Marcar como Listo
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
