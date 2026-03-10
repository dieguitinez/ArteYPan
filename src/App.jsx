import React, { useState, useEffect } from 'react';
import { ShoppingBag, ChevronRight, Star, MapPin, Phone, Instagram, Facebook, Menu as MenuIcon, X, Plus, Minus, Trash2, Heart, Award, ArrowRight, UserCircle, Wheat, PlusCircle, CheckCircle, Clock, Truck, Package, Coffee, TrendingUp } from 'lucide-react';
import { CartProvider, useCart } from './context/CartContext';
import { OrderProvider, useOrders } from './context/OrderContext';
import { StaffPanel } from './components/StaffPanel';
import { AdminPanel } from './components/AdminPanel';
import { CookieBanner } from './components/CookieBanner';
import { ChatAgent } from './components/ChatAgent';
import { LegalModals } from './components/LegalModals';
import { Reviews } from './components/Reviews';
import { OrderForm } from './components/OrderForm';

// Images imported from assets
import heroImg from './assets/founders_hero.png';
import bakeryImg from './assets/bakery.png';
import logoImg from './assets/logo.jpg';
import staffImg from './assets/staff.jpg';

// Real product photos from the bakery
import hogazaArtesanalImg from './assets/hogaza_artesanal.jpg';
import hogazaDecoradadImg from './assets/hogaza_decorada.jpg';
import croissantRojoImg from './assets/croissant_rojo.jpg';
import cuernaMantequillaImg from './assets/cuerno_mantequilla.jpg';
import caracolaHojaldreImg from './assets/caracola_hojaldre.jpg';
import cuernoFresaImg from './assets/cuerno_fresa.jpg';
import croissantsEspecialesImg from './assets/croissants_especiales.jpg';
import danesasPistachoImg from './assets/danesas_pistachoychoco.jpg';
import premioLinensesImg from './assets/premio_linenses.jpg';
import diplomaPanetoneImg from './assets/diploma_panettone.jpg';
import trofeosEstrellasImg from './assets/trofeos_estrellas.jpg';
import rutaBuenPanImg from './assets/ruta_buen_pan.jpg';

const AppContent = () => {
  const { cart, addToCart, removeFromCart, updateQuantity, subtotal, totalItems, isCartOpen, setIsCartOpen } = useCart();
  const { addOrder } = useOrders();
  const [isStaffView, setIsStaffView] = useState(window.location.hash === '#staff');
  const [isAdminView, setIsAdminView] = useState(window.location.hash === '#admin');
  const [isOrderView, setIsOrderView] = useState(window.location.hash === '#pedido');
  const [activeModal, setActiveModal] = useState(null);
  const [isStaffAuthenticated, setIsStaffAuthenticated] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      setIsStaffView(window.location.hash === '#staff');
      setIsAdminView(window.location.hash === '#admin');
      setIsOrderView(window.location.hash === '#pedido');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (isStaffView) {
    if (!isStaffAuthenticated) {
      return (
        <div className="min-h-screen bg-flour flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-3xl shadow-xl max-w-sm w-full text-center space-y-6">
            <h2 className="font-serif font-black text-2xl text-crust">Acceso Empleados</h2>
            <p className="text-sm text-crust-light">Introduce la contraseña para acceder al panel de pedidos.</p>
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full p-3 rounded-xl bg-flour/50 border border-crust/10 focus:outline-none focus:border-olive text-center"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (e.target.value === 'Panadero2026') {
                    setIsStaffAuthenticated(true);
                  } else {
                    alert('Contraseña incorrecta');
                  }
                }
              }}
            />
            <button
              onClick={(e) => {
                const input = e.target.previousSibling;
                if (input.value === 'Panadero2026') {
                  setIsStaffAuthenticated(true);
                } else {
                  alert('Contraseña incorrecta');
                }
              }}
              className="w-full bg-olive text-white py-3 rounded-xl font-black tracking-widest uppercase text-xs hover:bg-olive-dark transition-colors"
            >
              Entrar al Panel
            </button>
            <button onClick={() => window.location.hash = ''} className="text-xs text-crust-light underline hover:text-crust transition-colors pt-2">
              Volver a la tienda
            </button>
          </div>
        </div>
      );
    }
    return <StaffPanel />;
  }

  if (isAdminView) {
    if (!isAdminAuthenticated) {
      return (
        <div className="min-h-screen bg-flour flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-3xl shadow-xl max-w-sm w-full text-center space-y-6">
            <h2 className="font-serif font-black text-2xl text-crust">Acceso Gerencia</h2>
            <p className="text-sm text-crust-light">ID de usuario y contraseña requeridos.</p>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="ID de Usuario"
                id="admin-id"
                className="w-full p-3 rounded-xl bg-flour/50 border border-crust/10 focus:outline-none focus:border-olive text-center"
              />
              <input
                type="password"
                placeholder="Contraseña"
                id="admin-pass"
                className="w-full p-3 rounded-xl bg-flour/50 border border-crust/10 focus:outline-none focus:border-olive text-center"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const idInput = document.getElementById('admin-id');
                    if (idInput.value.toLowerCase() === 'gerencia' && e.target.value === 'ArteYPan2026') {
                      setIsAdminAuthenticated(true);
                    } else {
                      alert('Credenciales incorrectas');
                    }
                  }
                }}
              />
            </div>
            <button
              onClick={() => {
                const idInput = document.getElementById('admin-id');
                const passInput = document.getElementById('admin-pass');
                if (idInput.value.toLowerCase() === 'gerencia' && passInput.value === 'ArteYPan2026') {
                  setIsAdminAuthenticated(true);
                } else {
                  alert('Credenciales incorrectas');
                }
              }}
              className="w-full bg-olive text-white py-3 rounded-xl font-black tracking-widest uppercase text-xs hover:bg-olive-dark transition-colors"
            >
              Entrar al Dashboard
            </button>
            <button onClick={() => window.location.hash = ''} className="text-xs text-crust-light underline hover:text-crust transition-colors pt-2">
              Volver a la tienda
            </button>
          </div>
        </div>
      );
    }
    return <AdminPanel />;
  }

  if (isOrderView) {
    return <OrderForm />;
  }

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const orderItemsText = cart.map(item => `${item.quantity}x ${item.name}`).join(', ');
    const newOrder = {
      customer: 'Cliente Web',
      items: orderItemsText,
      total: subtotal
    };

    addOrder(newOrder);
    alert('¡Tu pedido ha sido enviado al horno exitosamente!\nLos empleados ya lo pueden ver en su panel en tiempo real.');
    setIsCartOpen(false);
  };

  return (
    <div className="relative min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card px-4 py-2 md:px-6 md:py-4 flex justify-between items-center transition-all duration-300">
        <div className="flex items-center gap-2 md:gap-3">
          <img
            src={logoImg}
            alt="Arte & Pan Logo"
            className="w-10 h-10 md:w-14 md:h-14 rounded-md object-cover shadow-sm border border-crust/10"
          />
          <span className="text-lg md:text-2xl font-serif font-bold tracking-tight text-crust-dark">Arte & Pan</span>
        </div>
        <div className="hidden lg:flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-crust/70">
          <a href="#historia" className="hover:text-olive transition-colors underline-offset-4 hover:underline">Historia</a>
          <a href="#menu" className="hover:text-olive transition-colors underline-offset-4 hover:underline">El Horno</a>
          <a href="#contacto" className="hover:text-olive transition-colors underline-offset-4 hover:underline">Contacto</a>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-crust hover:text-olive transition-all transform hover:scale-110"
          >
            <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-olive text-white text-[10px] font-black w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center animate-bounce">
                {totalItems}
              </span>
            )}
          </button>
          <a
            href="tel:+34633023275"
            className="bg-crust text-flour px-4 py-2 md:px-6 md:py-2.5 rounded-full text-[9px] md:text-[10px] font-black tracking-[0.2em] hover:bg-crust-light transition-all transform hover:scale-105 shadow-xl uppercase"
          >
            Llamar
          </a>
        </div>
      </nav>

      {/* Cart Drawer */}
      <div className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white z-[100] shadow-2xl transform transition-transform duration-500 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} `}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-crust/10 flex justify-between items-center bg-flour/30">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-crust" />
              <h2 className="text-xl font-serif font-bold text-crust-dark">Tu Cesta</h2>
            </div>
            <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-crust/5 rounded-full transition-colors">
              <X className="w-6 h-6 text-crust-light" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                <Wheat className="w-12 h-12 text-crust" />
                <p className="font-serif italic">Tu cesta está vacía.<br />¡Añade algo de nuestro horno!</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4 group">
                  <div className="w-20 h-20 rounded-xl overflow-hidden shadow-md shrink-0 border border-crust/5">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-serif font-bold text-crust-dark text-sm">{item.name}</h4>
                      <button onClick={() => removeFromCart(item.id)} className="text-crust-light hover:text-red-500 transition-colors p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-crust-light italic mb-3">{item.price.toFixed(2)}€ / ud.</p>
                    <div className="flex items-center gap-3">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-1 border border-crust/10 rounded-md hover:bg-crust/5"><Minus className="w-3 h-3" /></button>
                      <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-1 border border-crust/10 rounded-md hover:bg-crust/5"><Plus className="w-3 h-3" /></button>
                      <span className="ml-auto font-black text-crust-dark text-sm">{(item.price * item.quantity).toFixed(2)}€</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-8 border-t border-crust/10 bg-flour/30 space-y-6">
              <div className="flex justify-between items-end">
                <span className="text-xs font-black uppercase tracking-widest text-crust-light">Subtotal</span>
                <span className="text-3xl font-serif font-bold text-crust-dark tracking-tighter">{subtotal.toFixed(2)}€</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-crust text-flour-light py-5 rounded-2xl font-black tracking-widest uppercase text-xs shadow-xl hover:bg-crust-light transition-all transform hover:-translate-y-1 active:translate-y-0"
              >
                Pagar con Bizum
              </button>
              <p className="text-[10px] text-center text-crust-light/60 uppercase tracking-widest">Entrega en La Línea (CP 11300)</p>
            </div>
          )}
        </div>
      </div>

      <main>
        {/* HERO SECTION */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={heroImg}
              alt="Arte & Pan Interior"
              className="w-full h-full object-cover scale-105 animate-slow-zoom"
            />
            {/* Darker Overlay for High Contrast */}
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-crust-dark/95 via-transparent to-black/30"></div>
          </div>

          <div className="relative z-10 text-center px-6 max-w-5xl pt-20 md:pt-0">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md px-4 py-1.5 rounded-full mb-8">
              <span className="flex h-2 w-2 rounded-full bg-olive-light animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-flour-light">Artesanos Linenses</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-2xl">
              El pan de verdad ha vuelto a <br />
              <span className="text-olive-light italic">La Línea.</span>
            </h1>
            <p className="text-lg md:text-2xl text-flour/90 mb-10 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-lg">
              Masa madre, 24 horas de fermentación y manos artesanas. Sin prisas, sin procesos industriales. Solo el sabor que creías olvidado.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => setIsCartOpen(true)}
                className="bg-flour text-crust-dark px-10 py-5 rounded-2xl font-black tracking-widest uppercase text-[10px] shadow-2xl hover:bg-white transition-all flex items-center justify-center gap-3 group"
              >
                Ver nuestros productos
                <ShoppingBag className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </button>
              <a
                href="#contacto"
                className="bg-white/5 backdrop-blur-sm border border-white/20 text-white px-10 py-5 rounded-2xl font-black tracking-widest uppercase text-[10px] hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                📍 Ven a visitarnos
              </a>
            </div>
          </div>
        </section>

        {/* OUR STORY / HISTORIA */}
        <section id="historia" className="py-20 md:py-32 px-6 hero-gradient">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 md:gap-20 items-center">
            <div className="relative">
              <div className="absolute -inset-4 border-2 border-olive/10 rounded-3xl -z-10 rotate-3"></div>
              <img
                src={staffImg}
                alt="El equipo de Arte & Pan"
                className="rounded-2xl shadow-2xl grayscale-[20%] hover:grayscale-0 transition-all duration-700 w-full object-cover"
              />
              <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 glass-card p-4 md:p-8 rounded-3xl shadow-xl max-w-[200px] md:max-w-xs animate-float">
                <Heart className="text-crust w-6 h-6 md:w-8 md:h-8 mb-2 md:mb-4 fill-crust/10" />
                <p className="text-[10px] md:text-sm font-medium italic text-crust-light">
                  "Arte & Pan nació en 2020 como un acto de resiliencia y amor por el pan de verdad."
                </p>
                <div className="mt-2 md:mt-4 flex items-center gap-3">
                  <div className="h-px grow bg-crust/10"></div>
                  <span className="text-[8px] md:text-[10px] uppercase font-bold tracking-widest text-olive">Fundadores</span>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-olive font-bold text-xs uppercase tracking-[0.3em] mb-4">Nuestra Filosofía</h2>
                <h3 className="text-5xl font-serif font-bold text-crust-dark leading-tight">
                  No somos una franquicia.<br /> <span className="text-olive italic">Somos artesanos.</span>
                </h3>
              </div>
              <p className="text-lg text-crust-light leading-relaxed">
                Detrás de Arte & Pan estamos Cristian y Jessica. Abrimos nuestras puertas con una misión muy clara: devolverle a La Línea el pan que alimenta y sienta bien. Mientras otros eligen la producción masiva, las prisas y las masas congeladas, nosotros elegimos madrugar. Amasamos a mano y respetamos los tiempos naturales del pan. Porque las cosas buenas, las que de verdad importan, toman su tiempo.
              </p>

              <div className="mt-8 pt-8 border-t border-crust/10">
                <h4 className="text-2xl font-serif font-bold text-crust-dark mb-6">El secreto está en el tiempo (y en la masa madre)</h4>
                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <span className="text-2xl">🍞</span>
                    <div>
                      <strong className="text-crust-dark block mb-1">Más digestivo y saludable</strong>
                      <p className="text-sm text-crust-light leading-relaxed">Gracias a nuestras 24 horas de fermentación, el gluten se descompone de forma natural. Un pan que no inflama y cuida tu estómago.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <span className="text-2xl">⏳</span>
                    <div>
                      <strong className="text-crust-dark block mb-1">Frescura que dura días</strong>
                      <p className="text-sm text-crust-light leading-relaxed">Olvídate del pan que parece chicle al día siguiente. Nuestra masa madre garantiza una corteza crujiente y una miga tierna por mucho más tiempo.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <span className="text-2xl">🌾</span>
                    <div>
                      <strong className="text-crust-dark block mb-1">Ingredientes 100% reales</strong>
                      <p className="text-sm text-crust-light leading-relaxed">Harinas puras molidas a la piedra, agua, sal y mucha pasión. Cero aditivos, cero conservantes.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* THE OVEN / MENU SHOWCASE */}
        <section id="menu" className="py-32 px-6 bg-flour">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-olive font-bold text-xs uppercase tracking-[0.3em] mb-4">El Horno</h2>
              <h3 className="text-5xl font-serif font-bold text-crust-dark mb-6">Del horno a tus manos</h3>
              <p className="text-crust-light max-w-2xl mx-auto text-lg font-light">
                Cada día creamos piezas únicas siguiendo recetas tradicionales y toques modernos.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Category 1: Panadería */}
              <div className="space-y-10">
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-3">
                    <Wheat className="text-olive w-8 h-8" />
                    <h4 className="text-3xl font-serif font-bold text-crust underline decoration-olive/20 underline-offset-8">Hogazas de Masa Madre</h4>
                  </div>
                  <p className="text-crust-light leading-relaxed">El Pan Nuestro de Cada Día. Rústico, de corteza tostada y miga alveolada. El acompañamiento perfecto para cualquier comida o un buen aceite de oliva.</p>
                </div>

                {/* Main banner: real hogaza artesanal photo */}
                <div className="group relative overflow-hidden rounded-3xl shadow-xl transition-all hover:-translate-y-2">
                  <img src={hogazaArtesanalImg} alt="Hogaza Artesanal de Masa Madre" className="w-full h-80 object-cover object-center group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-crust-dark via-crust-dark/20 opacity-80"></div>
                  <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
                    <div>
                      <div className="bg-olive/80 backdrop-blur-md inline-block px-3 py-1 rounded-full text-[10px] text-flour font-bold uppercase tracking-widest mb-3">Masa Madre · 24h</div>
                      <h5 className="text-2xl font-serif font-bold text-flour mb-2">Hogaza Artesanal</h5>
                      <p className="text-flour/70 text-sm">3.50€ / ud.</p>
                    </div>
                    <button
                      onClick={() => addToCart({ id: 'hogaza-trad', name: 'Hogaza Artesanal', price: 3.50, image: hogazaArtesanalImg })}
                      className="bg-olive text-white p-3 rounded-xl shadow-lg hover:bg-olive-light transition-colors"
                    >
                      <Plus className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* Second banner: decorated artistic bread */}
                <div className="group relative overflow-hidden rounded-3xl shadow-xl transition-all hover:-translate-y-2">
                  <img src={hogazaDecoradadImg} alt="Pan Artístico Decorado" className="w-full h-56 object-cover object-center group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-crust-dark via-transparent opacity-80"></div>
                  <div className="absolute bottom-0 left-0 p-6 w-full flex justify-between items-end">
                    <div>
                      <h5 className="text-xl font-serif font-bold text-flour mb-1">Pan Artístico con Sésamo</h5>
                      <p className="text-flour/70 text-sm">6.50€ / ud.</p>
                    </div>
                    <button
                      onClick={() => addToCart({ id: 'pan-artistico', name: 'Pan Artístico con Sésamo', price: 6.50, image: hogazaDecoradadImg })}
                      className="bg-olive text-white p-3 rounded-xl shadow-lg hover:bg-olive-light transition-colors"
                    >
                      <Plus className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  {[
                    { id: 'hogaza-cer', name: 'Hogaza de Cereales', price: 4.20, desc: 'Mezcla premium de granos y semillas.', image: hogazaArtesanalImg },
                    { id: 'baguette', name: 'Baguette Rústica', price: 1.80, desc: 'El clásico francés con nuestro toque artesano.', image: hogazaArtesanalImg },
                    { id: 'centeno', name: 'Pan de Centeno Integral', price: 4.50, desc: 'Densidad y sabor profundo.', image: hogazaArtesanalImg }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-crust/5 pb-4 hover:border-olive/20 transition-colors group">
                      <div className="flex items-center gap-4">
                        <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover shadow-md shrink-0" />
                        <div>
                          <span className="text-lg font-serif font-bold text-crust-dark block">{item.name}</span>
                          <p className="text-xs text-crust-light italic">{item.desc} — {item.price.toFixed(2)}€</p>
                        </div>
                      </div>
                      <button
                        onClick={() => addToCart(item)}
                        className="p-2 border border-crust/10 rounded-full hover:bg-olive hover:text-white transition-all transform group-hover:scale-110 shrink-0 ml-2"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category 2: Bollería & Tradición */}
              <div className="space-y-10">
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-3">
                    <Coffee className="text-olive w-8 h-8" />
                    <h4 className="text-3xl font-serif font-bold text-crust underline decoration-olive/20 underline-offset-8">Bollería Fina</h4>
                  </div>
                  <p className="text-crust-light leading-relaxed">Un toque de Francia. Palmeras crujientes y croissants elaborados con pura mantequilla y paciencia, capa por capa.</p>
                </div>

                {/* Main banner: real butter croissant photo */}
                <div className="group relative overflow-hidden rounded-3xl shadow-xl transition-all hover:-translate-y-2">
                  <img src={cuernaMantequillaImg} alt="Cuerno de Mantequilla Artesanal" className="w-full h-80 object-cover object-center group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-olive-dark via-transparent opacity-80"></div>
                  <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
                    <div>
                      <div className="bg-flour/20 backdrop-blur-md inline-block px-3 py-1 rounded-full text-[10px] text-flour font-bold uppercase tracking-widest mb-4">Hojaldrado Artesanal</div>
                      <h5 className="text-2xl font-serif font-bold text-flour mb-2">Cuerno de Mantequilla</h5>
                      <p className="text-flour/70 text-sm">2.50€ / ud.</p>
                    </div>
                    <button
                      onClick={() => addToCart({ id: 'cuerno-mantequilla', name: 'Cuerno de Mantequilla', price: 2.50, image: cuernaMantequillaImg })}
                      className="bg-flour text-crust-dark p-3 rounded-xl shadow-lg hover:bg-white transition-colors"
                    >
                      <Plus className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* Second banner: strawberry croissant */}
                <div className="group relative overflow-hidden rounded-3xl shadow-xl transition-all hover:-translate-y-2">
                  <img src={cuernoFresaImg} alt="Cuerno de Fresa" className="w-full h-56 object-cover object-center group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-crust-dark via-transparent opacity-80"></div>
                  <div className="absolute bottom-0 left-0 p-6 w-full flex justify-between items-end">
                    <div>
                      <div className="bg-red-500/80 backdrop-blur-md inline-block px-3 py-1 rounded-full text-[10px] text-flour font-bold uppercase tracking-widest mb-2">Especialidad</div>
                      <h5 className="text-xl font-serif font-bold text-flour mb-1">Cuerno de Fresa</h5>
                      <p className="text-flour/70 text-sm">3.20€ / ud.</p>
                    </div>
                    <button
                      onClick={() => addToCart({ id: 'cuerno-fresa', name: 'Cuerno de Fresa', price: 3.20, image: cuernoFresaImg })}
                      className="bg-flour text-crust-dark p-3 rounded-xl shadow-lg hover:bg-white transition-colors"
                    >
                      <Plus className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  {[
                    { id: 'croissant-rojo', name: 'Croissants Laminados', price: 2.80, desc: 'Laminado a mano, capas perfectas.', image: croissantRojoImg },
                    { id: 'caracola', name: 'Caracola de Hojaldre', price: 2.50, desc: 'Espiral de hojaldre artesanal con mantequilla.', image: caracolaHojaldreImg },
                    { id: 'pain-choco', name: 'Pain au Chocolat', price: 1.90, desc: 'Equilibrio perfecto de masa y cacao.', image: cuernaMantequillaImg }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-crust/5 pb-4 hover:border-olive/20 transition-colors group">
                      <div className="flex items-center gap-4">
                        <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover shadow-md shrink-0" />
                        <div>
                          <span className="text-lg font-serif font-bold text-crust-dark block">{item.name}</span>
                          <p className="text-xs text-crust-light italic">{item.desc} — {item.price.toFixed(2)}€</p>
                        </div>
                      </div>
                      <button
                        onClick={() => addToCart(item)}
                        className="p-2 border border-crust/10 rounded-full hover:bg-olive hover:text-white transition-all transform group-hover:scale-110 shrink-0 ml-2"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Creaciones Especiales — full width section */}
            <div className="mt-20 pt-20 border-t border-crust/5">
              <div className="mb-12 max-w-2xl">
                <div className="flex items-center gap-4 mb-3">
                  <Award className="text-olive w-8 h-8" />
                  <h4 className="text-3xl font-serif font-bold text-crust underline decoration-olive/20 underline-offset-8">La Japonesa Artesana</h4>
                </div>
                <p className="text-crust-light leading-relaxed text-lg">El Ícono de La Línea, Elevado. Hemos perfeccionado la receta tradicional. Fritura limpia, masa esponjosa y una crema pastelera casera que marca la diferencia. Tienes que probarla.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Croissants with toppings */}
                <div className="group relative overflow-hidden rounded-3xl shadow-xl transition-all hover:-translate-y-2">
                  <img src={croissantsEspecialesImg} alt="Croissants Especiales con Toppings" className="w-full h-72 object-cover object-center group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-crust-dark via-crust-dark/10 opacity-85"></div>
                  <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
                    <div>
                      <div className="bg-amber-500/80 backdrop-blur-md inline-block px-3 py-1 rounded-full text-[10px] text-flour font-bold uppercase tracking-widest mb-3">Creación Única</div>
                      <h5 className="text-2xl font-serif font-bold text-flour mb-2">Croissants con Toppings</h5>
                      <p className="text-flour/70 text-sm">Caramelo & palomitas · Merengue tostado</p>
                      <p className="text-flour font-bold mt-2">4.50€ / ud.</p>
                    </div>
                    <button
                      onClick={() => addToCart({ id: 'croissant-topping', name: 'Croissant con Topping', price: 4.50, image: croissantsEspecialesImg })}
                      className="bg-amber-500 text-white p-3 rounded-xl shadow-lg hover:bg-amber-400 transition-colors shrink-0"
                    >
                      <Plus className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* Danesas pistacho y chocolate */}
                <div className="group relative overflow-hidden rounded-3xl shadow-xl transition-all hover:-translate-y-2">
                  <img src={danesasPistachoImg} alt="Danesas de Pistacho y Chocolate" className="w-full h-72 object-cover object-center group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-crust-dark via-crust-dark/10 opacity-85"></div>
                  <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
                    <div>
                      <div className="bg-emerald-600/80 backdrop-blur-md inline-block px-3 py-1 rounded-full text-[10px] text-flour font-bold uppercase tracking-widest mb-3">Favorito</div>
                      <h5 className="text-2xl font-serif font-bold text-flour mb-2">Danesas de Pistacho & Chocolate</h5>
                      <p className="text-flour/70 text-sm">Crema de pistacho · Chocolate belga · Coco</p>
                      <p className="text-flour font-bold mt-2">3.80€ / ud.</p>
                    </div>
                    <button
                      onClick={() => addToCart({ id: 'danesa-pistacho', name: 'Danesa de Pistacho & Chocolate', price: 3.80, image: danesasPistachoImg })}
                      className="bg-emerald-600 text-white p-3 rounded-xl shadow-lg hover:bg-emerald-500 transition-colors shrink-0"
                    >
                      <Plus className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AWARDS & RECOGNITION SECTION */}
        <section className="py-32 px-6 bg-crust-dark overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-olive-light font-bold text-xs uppercase tracking-[0.3em] mb-4">Reconocimientos</h2>
              <h3 className="text-5xl font-serif font-bold text-flour mb-6">Premios & Excelencia</h3>
              <p className="text-flour/50 max-w-2xl mx-auto text-lg font-light">
                La calidad de nuestro pan ha sido reconocida a nivel nacional e internacional. Cada premio es una promesa renovada de seguir mejorando.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Award 1: Top 10 Panettones Ibérica */}
              <div className="group relative overflow-hidden rounded-2xl shadow-2xl aspect-[3/4]">
                <img src={diplomaPanetoneImg} alt="Top 10 Panettones de la Península Ibérica 2024" className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <div className="bg-red-500/80 backdrop-blur-md inline-block px-2 py-0.5 rounded-full text-[9px] text-flour font-bold uppercase tracking-widest mb-2">2024</div>
                  <h5 className="text-base font-serif font-bold text-flour leading-snug">Top 10 Panettones<br />Península Ibérica</h5>
                  <p className="text-flour/50 text-xs mt-1">IRCA Group · Gallarate, Italia</p>
                </div>
              </div>

              {/* Award 2: Linenses con Talento */}
              <div className="group relative overflow-hidden rounded-2xl shadow-2xl aspect-[3/4]">
                <img src={premioLinensesImg} alt="Linenses con Talento 2024" className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <div className="bg-blue-500/80 backdrop-blur-md inline-block px-2 py-0.5 rounded-full text-[9px] text-flour font-bold uppercase tracking-widest mb-2">2024</div>
                  <h5 className="text-base font-serif font-bold text-flour leading-snug">Linenses con<br />Talento</h5>
                  <p className="text-flour/50 text-xs mt-1">Emprendimiento · La Línea</p>
                </div>
              </div>

              {/* Award 3: Trofeos de estrellas */}
              <div className="group relative overflow-hidden rounded-2xl shadow-2xl aspect-[3/4]">
                <img src={trofeosEstrellasImg} alt="Trofeos de Estrellas" className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <div className="bg-amber-500/80 backdrop-blur-md inline-block px-2 py-0.5 rounded-full text-[9px] text-flour font-bold uppercase tracking-widest mb-2">Premio</div>
                  <h5 className="text-base font-serif font-bold text-flour leading-snug">Trofeo de<br />Excelencia</h5>
                  <p className="text-flour/50 text-xs mt-1">Reconocimiento artesanal</p>
                </div>
              </div>

              {/* Award 4: Ruta del Buen Pan */}
              <div className="group relative overflow-hidden rounded-2xl shadow-2xl aspect-[3/4]">
                <img src={rutaBuenPanImg} alt="Ruta del Buen Pan de Andalucía" className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <div className="bg-emerald-500/80 backdrop-blur-md inline-block px-2 py-0.5 rounded-full text-[9px] text-flour font-bold uppercase tracking-widest mb-2">Selección</div>
                  <h5 className="text-base font-serif font-bold text-flour leading-snug">Ruta del Buen Pan<br />de Andalucía</h5>
                  <p className="text-flour/50 text-xs mt-1">Comunidad de Andalucía</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT & HOURS */}
        <section id="contacto" className="py-32 px-6 bg-olive/5">
          <div className="max-w-6xl mx-auto">
            <div className="glass-card rounded-[3rem] overflow-hidden shadow-2xl grid lg:grid-cols-2">
              <div className="p-12 md:p-20 space-y-12">
                <div>
                  <h3 className="text-4xl font-serif font-bold text-crust-dark mb-4 drop-shadow-sm">¿Te guardamos tu pan favorito?</h3>
                  <p className="text-crust-light font-light leading-relaxed">Horneamos en cantidades limitadas para garantizar la máxima calidad. Pásate por nuestro obrador o llámanos para reservar tus hogazas y dulces antes de que se agoten.</p>
                </div>

                <div className="space-y-8">
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 bg-olive rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                      <MapPin className="text-flour w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-crust uppercase tracking-widest text-xs mb-2">Dirección</h4>
                      <p className="text-lg text-crust-dark font-medium">C. San Luis, 13, bajo</p>
                      <p className="text-sm text-crust-light">11300 La Línea de la Concepción</p>
                    </div>
                  </div>

                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 bg-olive rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                      <Clock className="text-flour w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-crust uppercase tracking-widest text-xs mb-2">Horario</h4>
                      <p className="text-lg text-crust-dark font-medium">Lun-Jue: 07:00 - 18:00</p>
                      <p className="text-sm text-crust-light">Viernes y Sábado: 07:00 - 14:30<br />Domingos: Cerrados</p>
                    </div>
                  </div>

                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 bg-crust rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                      <Phone className="text-flour w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-crust uppercase tracking-widest text-xs mb-2">Reservas</h4>
                      <a href="tel:+34633023275" className="text-lg text-crust-dark font-medium hover:text-olive transition-colors block">+34 633 02 32 75</a>
                      <a href="tel:+34633023275" className="inline-block mt-2 bg-crust text-flour px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-crust-light transition-colors">📞 Llamar para reservar</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative min-h-[400px] bg-crust-dark overflow-hidden flex items-center justify-center">
                {/* Visual representation of "La Línea" / Map vibe */}
                <div className="absolute inset-0 opacity-40">
                  <img src={heroImg} alt="Map Background" className="w-full h-full object-cover blur-sm" />
                </div>
                <div className="relative z-10 text-center p-8 bg-flour/10 backdrop-blur-xl border border-flour/20 rounded-3xl max-w-sm">
                  <MapPin className="w-12 h-12 text-flour mx-auto mb-4 animate-bounce" />
                  <h4 className="text-2xl font-serif font-bold text-flour mb-4">La Línea de la Concepción</h4>
                  <p className="text-flour/60 text-sm mb-8">Ubicados en el corazón de la bahía, honrando la tradición de Cádiz.</p>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://maps.app.goo.gl/LMBNrbwGDRqfD8PT7"
                    className="inline-block bg-flour text-crust-dark px-8 py-3 rounded-xl font-bold hover:bg-white transition-all shadow-xl"
                  >
                    Cómo llegar
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Reviews />

      {/* Footer */}
      <footer className="bg-crust-dark text-flour py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-16">
          <div className="col-span-2">
            <div className="flex items-center gap-4 mb-8">
              <img
                src={logoImg}
                alt="Logo Arte & Pan"
                className="w-20 h-20 rounded-md object-cover"
              />
              <span className="text-3xl font-serif font-bold tracking-tight">Arte & Pan</span>
            </div>
            <p className="text-flour/50 max-w-md leading-relaxed mb-8 font-light">
              Panaderos por pasión, artesanos por vocación. Defendemos el pan de verdad, sin prisas y con la mejor materia prima linense.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/arte_y_pan_cristian_arango/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-flour/10 flex items-center justify-center hover:bg-olive transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/arteypan2020"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-flour/10 flex items-center justify-center hover:bg-olive transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#staff" className="flex items-center gap-2 text-flour/40 hover:text-flour transition-colors text-xs font-bold uppercase tracking-widest mt-4">
                <UserCircle className="w-4 h-4" /> Acceso Empleados
              </a>
              <a href="#admin" className="flex items-center gap-2 text-flour/40 hover:text-flour transition-colors text-xs font-bold uppercase tracking-widest mt-2">
                <TrendingUp className="w-4 h-4" /> Acceso Gerencia
              </a>
            </div>
          </div>

          <div>
            <h5 className="font-bold text-xs uppercase tracking-[0.2em] mb-8 text-olive">Explora</h5>
            <ul className="space-y-4 font-light opacity-80">
              <li><a href="#historia" className="hover:text-olive transition-colors">Nuestra Historia</a></li>
              <li><a href="#menu" className="hover:text-olive transition-colors">El Horno</a></li>
              <li><a href="#contacto" className="hover:text-olive transition-colors">Ubicación</a></li>
              <li><a href="#pedido" className="hover:text-olive transition-colors">Pedidos Online</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-xs uppercase tracking-[0.2em] mb-8 text-olive">Horario</h5>
            <ul className="space-y-4 font-light opacity-80 text-sm">
              <li>Lun—Jue <span className="font-bold text-flour">07:00 - 18:00</span></li>
              <li>Vie—Sáb <span className="font-bold text-flour">07:00 - 14:30</span></li>
              <li className="text-flour/30 italic">Domingos cerrados.</li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-flour/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase font-bold tracking-widest text-flour/30">
          <p>© 2026 <span className="text-flour/60">Arte & Pan</span> | Created by <a href="https://nivopartners.com" target="_blank" rel="noopener noreferrer" className="hover:text-flour transition-colors underline decoration-olive/30 underline-offset-4">Nivo Partners</a></p>
          <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-3">
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveModal('aviso'); }} className="hover:text-flour transition-colors">Aviso Legal</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveModal('condiciones'); }} className="hover:text-flour transition-colors">Condiciones Generales</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveModal('privacidad'); }} className="hover:text-flour transition-colors">Privacidad</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveModal('ia-disclaimer'); }} className="hover:text-flour transition-colors">Políticas IA</a>
            <a href="#" onClick={(e) => { e.preventDefault(); localStorage.removeItem('arteyPanCookieConsent'); window.location.reload(); }} className="hover:text-flour transition-colors">Cookies</a>
          </div>
        </div>
      </footer>

      {/* Global Overlays */}
      <CookieBanner />
      <ChatAgent />
      <LegalModals activeModal={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
};

const App = () => {
  return (
    <OrderProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </OrderProvider>
  );
};

export default App;
