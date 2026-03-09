import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, ordersCollection, saveOrderToFirestore, updateOrderStatusInFirestore } from '../services/firebase';
import { onSnapshot, query, orderBy, deleteDoc, doc } from 'firebase/firestore';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const isFirebaseConfigured = !!import.meta.env.VITE_FIREBASE_API_KEY;

    useEffect(() => {
        if (!isFirebaseConfigured) {
            console.warn("Firebase no está configurado. Usando datos locales temporales.");
            const savedOrders = localStorage.getItem('arteyPanOrders');
            if (savedOrders) {
                setOrders(JSON.parse(savedOrders));
            } else {
                setOrders([
                    { id: 'ORD-001', customer: 'David G.', items: '2x Hogaza Tradicional, 1x Japonesa', total: 9.50, status: 'paid', time: '5m ago' },
                    { id: 'ORD-002', customer: 'Maria L.', items: '1x Pan de Centeno, 2x Palmeras', total: 8.90, status: 'paid', time: '12m ago' },
                ]);
            }
            return;
        }

        // Suscripción en tiempo real a Firestore
        const q = query(ordersCollection, orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const ordersData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                time: doc.data().createdAt ? new Date(doc.data().createdAt.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Justo ahora'
            }));
            setOrders(ordersData);
        }, (error) => {
            console.error("Error al escuchar pedidos:", error);
        });

        return () => unsubscribe();
    }, [isFirebaseConfigured]);

    // Fallback guardar en local si no hay firebase
    useEffect(() => {
        if (!isFirebaseConfigured) {
            localStorage.setItem('arteyPanOrders', JSON.stringify(orders));
        }
    }, [orders, isFirebaseConfigured]);

    const addOrder = async (order) => {
        if (isFirebaseConfigured) {
            await saveOrderToFirestore({ ...order, status: order.status || 'paid' });
        } else {
            setOrders(prev => [{
                ...order,
                id: `ORD-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
                time: 'Justo ahora',
                status: order.status || 'paid'
            }, ...prev]);
        }
    };

    const updateOrderStatus = async (id, newStatus) => {
        if (isFirebaseConfigured) {
            await updateOrderStatusInFirestore(id, newStatus);
        } else {
            setOrders(prev => prev.map(order =>
                order.id === id ? { ...order, status: newStatus } : order
            ));
        }
    };

    const removeOrder = async (id) => {
        if (isFirebaseConfigured) {
            // Eliminar de Firebase
            try {
                await deleteDoc(doc(db, "orders", id));
            } catch (e) {
                console.error("Error eliminando", e);
            }
        } else {
            setOrders(prev => prev.filter(order => order.id !== id));
        }
    };

    return (
        <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus, removeOrder }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrders = () => useContext(OrderContext);
