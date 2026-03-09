import React from 'react';
import { Star, MessageSquare, ExternalLink } from 'lucide-react';

const reviewsData = [
    {
        id: 1,
        author: "David García",
        rating: 5,
        text: "La mejor hogaza de masa madre de toda La Línea. Se nota el cariño y las 24h de fermentación. ¡Y las japonesas son de otro mundo!",
        date: "Hace 2 semanas"
    },
    {
        id: 2,
        author: "Maria López",
        rating: 5,
        text: "Un trato excelente y productos de calidad superior. El olor a pan recién hecho nada más entrar es increíble. Muy recomendado.",
        date: "Hace 1 mes"
    },
    {
        id: 3,
        author: "Juanma R.",
        rating: 4,
        text: "Calidad-precio insuperable. Pan artesano de verdad, nada de precocinados. Hay que ir temprano porque vuelan las cosas.",
        date: "Hace 3 semanas"
    },
    {
        id: 4,
        author: "Elena M.",
        rating: 5,
        text: "Las japonesas rellenas de crema son espectaculares. El ambiente es super acogedor y el personal es encantador.",
        date: "Hace 2 meses"
    }
];

export const Reviews = () => {
    return (
        <section id="reviews" className="py-24 bg-flour/30">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-olive text-olive" />
                                ))}
                            </div>
                            <span className="font-bold text-crust">4.7 / 5 (164 reseñas)</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif font-black text-crust-dark max-w-xl leading-tight">
                            Lo que dicen nuestros clientes en Google Maps
                        </h2>
                    </div>
                    <a
                        href="https://maps.app.goo.gl/GDRwVn9VYtSotXmJA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-8 py-4 bg-white border border-crust/10 text-crust-dark rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-crust-dark hover:text-white transition-all shadow-sm hover:shadow-xl group"
                    >
                        Ver todas las reseñas
                        <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {reviewsData.map((review) => (
                        <div key={review.id} className="bg-white p-8 rounded-[2rem] border border-crust/5 shadow-sm hover:shadow-2xl transition-all hover:-translate-y-2 group">
                            <div className="flex gap-1 mb-6">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="w-3 h-3 fill-olive text-olive" />
                                ))}
                            </div>
                            <p className="text-crust-dark/80 italic mb-8 leading-relaxed font-light text-sm">
                                "{review.text}"
                            </p>
                            <div className="flex items-center gap-4 border-t border-crust/5 pt-6">
                                <div className="w-10 h-10 bg-olive/10 rounded-full flex items-center justify-center text-olive font-bold text-xs uppercase">
                                    {review.author[0]}
                                </div>
                                <div>
                                    <h4 className="font-bold text-crust-dark text-xs uppercase tracking-wider">{review.author}</h4>
                                    <p className="text-[10px] text-crust-light uppercase tracking-widest font-bold">{review.date}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-crust-light text-xs font-bold uppercase tracking-[0.2em] mb-4">Integrado con Google Maps</p>
                    <div className="h-1 w-20 bg-olive/30 mx-auto rounded-full"></div>
                </div>
            </div>
        </section>
    );
};
