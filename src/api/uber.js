/**
 * Simulación de la API de Uber Direct
 * Este archivo centraliza las llamadas a logística para que sea fácil
 * cambiar a la API real cuando el cliente tenga las credenciales.
 */

export const getUberDeliveryQuote = async (address) => {
    console.log(`[Uber API] Calculando presupuesto para: ${address}`);

    // Simulación de retardo de red
    await new Promise(resolve => setTimeout(resolve, 800));

    const isLocal = address.includes("11300") || address.toLowerCase().includes("línea");

    return {
        quote_id: `uber_quote_${Math.random().toString(36).substr(2, 9)}`,
        estimated_fee: isLocal ? 3.50 : 7.90,
        currency: "EUR",
        estimated_pickup_time: "10 min",
        estimated_delivery_time: isLocal ? "15 min" : "35 min",
        total_minutes: isLocal ? 25 : 45
    };
};

export const createUberOrder = async (orderId, address, items) => {
    console.log(`[Uber API] Solicitando repartidor para pedido ${orderId} a ${address}`);

    await new Promise(resolve => setTimeout(resolve, 1500));

    return {
        tracking_url: `https://direct.uber.com/tracking/${orderId}`,
        status: "pickup_requested",
        courier_name: "Juan (Moto Uber)",
        courier_phone: "+34 600 00 00 00"
    };
};
