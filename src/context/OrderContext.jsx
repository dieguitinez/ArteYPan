import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    // Intentar cargar pedidos desde localStorage
    const [orders, setOrders] = useState(() => {
        const savedOrders = localStorage.getItem('arteyPanOrders');
        if (savedOrders) {
            return JSON.parse(savedOrders);
        }
        // Inicializar con datos de ejemplo para que la tienda no se vea vacía por defecto
        return [
            { id: 'ORD-001', customer: 'David G.', items: '2x Hogaza Tradicional, 1x Japonesa', total: 9.50, status: 'paid', time: '5m ago' },
            { id: 'ORD-002', customer: 'Maria L.', items: '1x Pan de Centeno, 2x Palmeras', total: 8.90, status: 'paid', time: '12m ago' },
        ];
    });

    // Guardar pedidos en localStorage cada vez que cambien
    useEffect(() => {
        localStorage.setItem('arteyPanOrders', JSON.stringify(orders));
    }, [orders]);

    const addOrder = (order) => {
        setOrders(prev => [{
            ...order,
            id: `ORD-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
            time: 'Justo ahora',
            status: order.status || 'paid'
        }, ...prev]);
    };

    const updateOrderStatus = (id, newStatus) => {
        setOrders(prev => prev.map(order =>
            order.id === id ? { ...order, status: newStatus } : order
        ));
    };

    const removeOrder = (id) => {
        setOrders(prev => prev.filter(order => order.id !== id));
    };

    return (
        <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus, removeOrder }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrders = () => useContext(OrderContext);
