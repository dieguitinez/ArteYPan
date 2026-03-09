export const salesToolsDeclaration = [{
    functionDeclarations: [
        {
            name: "get_menu",
            description: "Devuelve el catálogo actual de panes, bollería y sus precios. Útil cuando un cliente pregunta qué se vende o cuánto cuesta.",
        },
        {
            name: "get_delivery_quote",
            description: "Calcula el coste de envío a través de Uber Direct usando la dirección del cliente o código postal.",
            parameters: {
                type: "OBJECT",
                properties: {
                    address: {
                        type: "STRING",
                        description: "La calle o código postal del cliente (ej. 11300 La Línea)."
                    }
                },
                required: ["address"]
            }
        },
        {
            name: "open_order_form",
            description: "Proporciona el enlace al formulario oficial de pedido de la panadería. Útil cuando el cliente decide qué quiere comprar.",
        }
    ]
}];

// Simulación de base de datos de productos (Catalogo real de Arte & Pan)
const PRODUCT_CATALOG = [
    { name: "Hogaza Tradicional (Masa Madre)", price: 3.50, description: "Nuestra especialidad con 24h de fermentación." },
    { name: "Pan de Cereales", price: 4.20, description: "Mezcla de 7 semillas y harinas integrales." },
    { name: "Baguette Parisina", price: 1.80, description: "Crocante por fuera, aireada por dentro." },
    { name: "Japonesas (Especialidad La Línea)", price: 2.50, description: "Dulce típico linense relleno de crema." },
    { name: "Palmeras de Miel", price: 2.20, description: "Bollería artesana con miel pura." }
];

export const executeTool = async (functionCall) => {
    const { name, args } = functionCall;
    console.log(`[SalesTool] Ejecutando: ${name}`, args);

    switch (name) {
        case "get_menu":
            const menuText = PRODUCT_CATALOG.map(p => `- ${p.name}: ${p.price.toFixed(2)}€ (${p.description})`).join("\n");
            return {
                status: "success",
                data: `Catálogo de Arte & Pan:\n${menuText}\n\nNota: Todos nuestros panes son artesanos.`
            };

        case "get_delivery_quote":
            // Lógica de simulación basada en el CP de La Línea (11300)
            const isLocal = args.address.includes("11300") || args.address.toLowerCase().includes("línea");
            const cost = isLocal ? 3.50 : 7.90;
            const eta = isLocal ? "15-25 min" : "45-60 min";

            return {
                status: "success",
                address: args.address,
                delivery_cost: cost,
                estimated_arrival: eta,
                provider: "Uber Direct"
            };

        case "open_order_form":
            return {
                status: "success",
                order_url: `${window.location.origin}/#pedido`,
                message: "Por favor, dile al cliente que use este enlace para introducir sus datos. Un panadero revisará el pedido personalmente."
            };

        default:
            return { error: "Herramienta no implementada en el servidor" };
    }
};
