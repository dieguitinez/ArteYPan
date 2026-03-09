import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, doc, updateDoc } from "firebase/firestore";

// Tu configuración web de Firebase
// Se cargará desde las variables de entorno de Vite/Vercel
const firebaseConfig = {
    apiKey: import.meta.env.artypan_FIREBASE_API_KEY || import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.artypan_FIREBASE_AUTH_DOMAIN || import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.artypan_FIREBASE_PROJECT_ID || import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.artypan_FIREBASE_STORAGE_BUCKET || import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.artypan_FIREBASE_MESSAGING_SENDER_ID || import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.artypan_FIREBASE_APP_ID || import.meta.env.VITE_FIREBASE_APP_ID
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
export const db = getFirestore(app);

// Helpers para interactuar con Firestore
export const ordersCollection = collection(db, "orders");

export const saveOrderToFirestore = async (orderData) => {
    try {
        const docRef = await addDoc(ordersCollection, {
            ...orderData,
            createdAt: new Date()
        });
        return docRef.id;
    } catch (e) {
        console.error("Error añadiendo documento: ", e);
        throw e;
    }
};

export const updateOrderStatusInFirestore = async (orderId, newStatus) => {
    try {
        const orderRef = doc(db, "orders", orderId);
        await updateDoc(orderRef, {
            status: newStatus
        });
    } catch (e) {
        console.error("Error actualizando documento: ", e);
        throw e;
    }
};
