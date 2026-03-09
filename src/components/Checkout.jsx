import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../context/CartContext';
import { ShieldCheck, Lock, AlertCircle } from 'lucide-react';

// Reemplazar con tu clave pública de Stripe
const stripePromise = loadStripe('pk_test_51PKY...');

const CheckoutForm = ({ amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.origin + '/success',
            },
        });

        if (error) {
            setErrorMessage(error.message);
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement options={{
                layout: 'tabs',
                business: { name: 'Arte & Pan' }
            }} />

            {errorMessage && (
                <div className="p-4 bg-red-50 text-red-700 rounded-xl flex gap-3 items-start text-sm border border-red-100 italic">
                    <AlertCircle className="w-5 h-6 shrink-0" />
                    {errorMessage}
                </div>
            )}

            <button
                disabled={!stripe || loading}
                className="w-full bg-crust text-flour-light py-5 rounded-2xl font-black tracking-widest uppercase text-xs shadow-xl hover:bg-crust-light disabled:opacity-50 transition-all"
            >
                {loading ? 'Procesando...' : `Confirmar Pago — ${amount.toFixed(2)}€`}
            </button>

            <div className="flex items-center justify-center gap-4 opacity-40 text-[10px] uppercase font-black tracking-[0.2em] text-crust">
                <div className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Seguro</div>
                <div className="flex items-center gap-1"><Lock className="w-3 h-3" /> Stripe</div>
            </div>
        </form>
    );
};

export const Checkout = () => {
    const { subtotal, isCartOpen, setIsCartOpen } = useCart();
    const [clientSecret, setClientSecret] = useState("");

    // En una app real, esto vendría de tu backend (Phase 2)
    useEffect(() => {
        // Simulación de creación de Intent
        setClientSecret("pi_test_secret_...");
    }, [subtotal]);

    if (!isCartOpen) return null;

    return (
        <div className="p-8 space-y-8 animate-fade-in">
            <div className="text-center">
                <h3 className="text-2xl font-serif font-bold text-crust-dark mb-2">Finalizar Compra</h3>
                <p className="text-xs text-crust-light uppercase tracking-widest">Pago 100% seguro con Bizum</p>
            </div>

            {clientSecret ? (
                <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'flat', variables: { colorPrimary: '#3a2d28' } } }}>
                    <CheckoutForm amount={subtotal} />
                </Elements>
            ) : (
                <div className="flex justify-center py-12">
                    <div className="w-8 h-8 border-4 border-olive border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
        </div>
    );
};
