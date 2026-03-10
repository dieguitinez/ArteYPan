import React, { useState, useEffect } from 'react';
import { db, ordersCollection } from '../services/firebase';
import { onSnapshot, query, orderBy, getDocs } from 'firebase/firestore';
import { ArrowLeft, TrendingUp, Package, Users, Calendar, Download } from 'lucide-react';

export const AdminPanel = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const isFirebaseConfigured = !!import.meta.env.artypan_FIREBASE_API_KEY || !!import.meta.env.VITE_FIREBASE_API_KEY;

    useEffect(() => {
        if (!isFirebaseConfigured) {
            // Mock data si no hay Firebase (para mostrar la UI al cliente)
            setAllOrders([
                { id: 'ORD-TEST1', customer: 'David G.', items: '2x Hogaza Tradicional', total: 6.50, status: 'paid', createdAt: new Date() },
                { id: 'ORD-TEST2', customer: 'Maria L.', items: '1x Pan de Centeno', total: 4.90, status: 'paid', createdAt: new Date(Date.now() - 86400000) },
            ]);
            setIsLoading(false);
            return;
        }

        // Cargar todo el historial de Firebase
        const q = query(ordersCollection, orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const ordersData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setAllOrders(ordersData);
            setIsLoading(false);
        }, (error) => {
            console.error("Error cargando historial de pedidos:", error);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [isFirebaseConfigured]);

    const totalRevenue = allOrders.reduce((sum, order) => sum + (order.total || 0), 0);
    const totalSales = allOrders.length;

    // Calcular ticket medio
    const averageTicket = totalSales > 0 ? (totalRevenue / totalSales) : 0;

    return (
        <div className="min-h-screen bg-flour p-4 md:p-8 font-sans">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Cabecera */}
                <header className="flex justify-between items-center border-b border-crust/10 pb-6 flex-wrap gap-4">
                    <div>
                        <h1 className="text-3xl font-serif font-black text-crust-dark flex items-center gap-3">
                            <TrendingUp className="w-8 h-8 text-olive" />
                            Panel de Contabilidad (Admin)
                        </h1>
                        <p className="text-xs text-crust-light uppercase tracking-widest mt-1">
                            Histórico de Ventas y Rendimiento
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => window.print()}
                            className="flex items-center gap-2 bg-crust text-white px-5 py-3 rounded-2xl shadow-sm text-[10px] font-black uppercase tracking-widest hover:bg-crust-dark transition-all"
                        >
                            <Download className="w-4 h-4" /> Exportar / Imprimir
                        </button>
                        <button
                            onClick={() => window.location.hash = ''}
                            className="flex items-center gap-2 bg-white px-5 py-3 rounded-2xl shadow-sm border border-crust/5 text-[10px] font-black uppercase tracking-widest text-olive hover:bg-olive hover:text-white transition-all"
                        >
                            <ArrowLeft className="w-4 h-4" /> Cerrar Sesión
                        </button>
                    </div>
                </header>

                {!isFirebaseConfigured && (
                    <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl text-sm flex items-start gap-3">
                        <span className="text-xl">⚠️</span>
                        <div>
                            <strong>Modo Demostración Activo.</strong> Aún no has configurado las claves de Firebase en Vercel.
                            Lo que ves abajo son datos de prueba. Configura Firebase para ver el historial real de tu negocio.
                        </div>
                    </div>
                )}

                {/* KPIs */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-crust/5 flex items-center gap-4">
                        <div className="bg-olive/10 p-4 rounded-full text-olive">
                            <TrendingUp className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-xs text-crust-light uppercase tracking-widest font-bold">Ingresos Totales</p>
                            <h3 className="text-3xl font-serif font-black text-crust-dark">€{totalRevenue.toFixed(2)}</h3>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-crust/5 flex items-center gap-4">
                        <div className="bg-crust/5 p-4 rounded-full text-crust-dark">
                            <Package className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-xs text-crust-light uppercase tracking-widest font-bold">Pedidos Gestionados</p>
                            <h3 className="text-3xl font-serif font-black text-crust-dark">{totalSales}</h3>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-crust/5 flex items-center gap-4">
                        <div className="bg-crust/5 p-4 rounded-full text-crust-dark">
                            <Users className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-xs text-crust-light uppercase tracking-widest font-bold">Ticket Medio</p>
                            <h3 className="text-3xl font-serif font-black text-crust-dark">€{averageTicket.toFixed(2)}</h3>
                        </div>
                    </div>
                </div>

                {/* Tabla de Histórico */}
                <div className="bg-white rounded-3xl shadow-sm border border-crust/5 overflow-hidden">
                    <div className="px-6 py-5 border-b border-crust/5 bg-crust/5">
                        <h3 className="font-bold text-crust-dark uppercase tracking-widest text-xs flex items-center gap-2">
                            <Calendar className="w-4 h-4" /> Registro Histórico Completo
                        </h3>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-[10px] uppercase tracking-widest text-crust-light border-b border-crust/5">
                                    <th className="p-4 font-black">ID Pedido / Fecha</th>
                                    <th className="p-4 font-black">Cliente</th>
                                    <th className="p-4 font-black">Productos</th>
                                    <th className="p-4 font-black text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="4" className="text-center p-8 text-crust-light animate-pulse">
                                            Cargando base de datos...
                                        </td>
                                    </tr>
                                ) : allOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="text-center p-8 text-crust-light italic">
                                            Aún no hay ventas registradas.
                                        </td>
                                    </tr>
                                ) : (
                                    allOrders.map((order) => {
                                        let displayDate = "Fecha desconocida";
                                        if (order.createdAt) {
                                            const dateObj = order.createdAt.toDate ? order.createdAt.toDate() : new Date(order.createdAt);
                                            displayDate = dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                        }

                                        return (
                                            <tr key={order.id} className="border-b border-crust/5 hover:bg-flour/50 transition-colors">
                                                <td className="p-4">
                                                    <div className="font-bold text-crust-dark text-xs">{order.id}</div>
                                                    <div className="text-[10px] text-crust-light">{displayDate}</div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="font-bold text-crust-dark">{order.customer || 'Anónimo'}</div>
                                                    {order.phone && <div className="text-[10px] text-crust-light">{order.phone}</div>}
                                                </td>
                                                <td className="p-4 text-sm max-w-xs">{order.items}</td>
                                                <td className="p-4 font-black text-crust-dark text-right">€{(order.total || 0).toFixed(2)}</td>
                                            </tr>
                                        )
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
