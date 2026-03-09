import React from 'react';
import { X, Scale, FileText } from 'lucide-react';

export const LegalModals = ({ activeModal, onClose }) => {
    if (!activeModal) return null;

    return (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-crust-dark/80 backdrop-blur-sm">
            <div className="bg-white rounded-[2rem] w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-slide-in">

                {/* Header */}
                <div className="p-6 border-b border-crust/10 flex justify-between items-center bg-flour/30">
                    <div className="flex items-center gap-3">
                        {activeModal === 'aviso' && <Scale className="w-5 h-5 text-olive" />}
                        {activeModal === 'privacidad' && <FileText className="w-5 h-5 text-olive" />}
                        {activeModal === 'condiciones' && <Scale className="w-5 h-5 text-olive" />}
                        {activeModal === 'ia-disclaimer' && <Scale className="w-5 h-5 text-olive" />}
                        <h2 className="text-xl font-serif font-bold text-crust-dark">
                            {activeModal === 'aviso' && 'Aviso Legal y Términos de Uso'}
                            {activeModal === 'privacidad' && 'Política de Privacidad (RGPD)'}
                            {activeModal === 'condiciones' && 'Condiciones de Contratación y Venta'}
                            {activeModal === 'ia-disclaimer' && 'Descargo de Inteligencia Artificial'}
                        </h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-crust/5 rounded-full transition-colors">
                        <X className="w-6 h-6 text-crust-light" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 overflow-y-auto flex-1 font-light text-crust-dark text-sm leading-relaxed space-y-6">
                    {activeModal === 'aviso' && (
                        <>
                            <p>En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa a los usuarios de los siguientes datos identificativos:</p>

                            <div>
                                <h3 className="font-bold text-crust mb-2">1. Datos del Titular</h3>
                                <ul className="list-disc pl-5 space-y-2 text-crust-light">
                                    <li><strong>Denominación Social:</strong> Arte & Pan S.L.</li>
                                    <li><strong>NIF/CIF:</strong> B-12345678</li>
                                    <li><strong>Domicilio Social:</strong> Calle San Luis, 13, bajo, 11300 La Línea de la Concepción, Cádiz (España)</li>
                                    <li><strong>Correo Electrónico:</strong> arteypanaderia@hotmail.com</li>
                                    <li><strong>Teléfono:</strong> +34 633 02 32 75</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-bold text-crust mb-2">2. Condiciones de Uso</h3>
                                <p className="text-crust-light">El acceso y uso de este sitio web atribuye la condición de usuario, aceptando expresamente y sin reservas las presentes condiciones. El usuario se compromete a hacer un uso adecuado de los contenidos y servicios que Arte & Pan ofrece a través de su web.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-crust mb-2">3. Propiedad Intelectual</h3>
                                <p className="text-crust-light">Todos los contenidos de la web, entendiendo por estos a título meramente enunciativo los textos, fotografías, gráficos, imágenes, iconos, tecnología, software, links y demás contenidos audiovisuales o sonoros, son propiedad intelectual de Arte & Pan o de terceros.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-crust mb-2">4. Legislación Aplicable</h3>
                                <p className="text-crust-light">Las presentes condiciones se regirán por la legislación española vigente. Cualquier controversia será sometida a los Juzgados y tribunales de la ciudad de La Línea de la Concepción.</p>
                            </div>
                        </>
                    )}

                    {activeModal === 'privacidad' && (
                        <>
                            <p>En cumplimiento de lo dispuesto en el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo de 27 de abril de 2016 (RGPD) y la Ley Orgánica 3/2018 de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).</p>

                            <div>
                                <h3 className="font-bold text-crust mb-2">1. Responsable del Tratamiento</h3>
                                <p className="text-crust-light">Arte & Pan S.L. con NIF B-12345678, y domicilio en Calle San Luis, 13, bajo, 11300 La Línea de la Concepción, Cádiz.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-crust mb-2">2. Finalidad del Tratamiento</h3>
                                <p className="text-crust-light">Los datos personales facilitados a través de formularios, proceso de compra (checkout), o mediante nuestro Asistente Virtual (Bot de Chat), son utilizados de forma confidencial con la única finalidad de gestionar los pedidos, procesar los envíos a través de servicios de terceros (ej. Uber Direct), facturación y, si lo consientes explícitamente, envío de comunicaciones comerciales.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-crust mb-2">3. Uso de Inteligencia Artificial</h3>
                                <p className="text-crust-light">El Asistente Virtual de Arte & Pan opera utilizando tecnología de procesamiento de lenguaje natural (modelos de Google Gemini). Las conversaciones pueden ser procesadas para atender tu consulta y gestionar tu pedido. No proporciones información sensible (datos bancarios, contraseñas) directamente en el chat, utiliza siempre nuestras pasarelas de pago seguras.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-crust mb-2">4. Conservación de los Datos</h3>
                                <p className="text-crust-light">Los datos proporcionados se conservarán mientras se mantenga la relación comercial o durante los años necesarios para cumplir con las obligaciones legales aplicables.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-crust mb-2">5. Derechos del Usuario</h3>
                                <p className="text-crust-light">Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad dirigiéndote a nuestro correo electrónico: arteypanaderia@hotmail.com, adjuntando copia de tu DNI o documento equivalente.</p>
                            </div>
                        </>
                    )}

                    {activeModal === 'condiciones' && (
                        <>
                            <p>Términos y condiciones aplicables a la compra de productos a través de este sitio web, en cumplimiento con la Ley General para la Defensa de los Consumidores y Usuarios (TRLGDCU) de España.</p>

                            <div>
                                <h3 className="font-bold text-crust mb-2">1. Precios e Impuestos</h3>
                                <p className="text-crust-light">Todos los precios indicados en el Menú incluyen el Impuesto sobre el Valor Añadido (IVA) vigente en España (superreducido del 4% para panes básicos o 10% en ciertas bollerías según proceda). Los gastos de envío, de existir, se calculan y añaden expresamente en la pantalla de pago (Checkout).</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-crust mb-2">2. Medios de Pago y Seguridad</h3>
                                <p className="text-crust-light">Se procesan pagos electrónicos de forma segura utilizando la pasarela de Stripe. Aceptamos tarjetas de débito/crédito y Bizum.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-crust mb-2">3. Envíos (Uber Direct)</h3>
                                <p className="text-crust-light">Los envíos locales en la zona de La Línea de la Concepción se tramitan en tiempo real a través de repartidores independientes de Uber Direct. Los plazos de entrega estimados se indican durante la compra.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-crust mb-2">4. Excepción al Derecho de Desistimiento y Devoluciones</h3>
                                <p className="text-crust-light">De acuerdo con el Artículo 103 de la TRLGDCU, este comercio <strong>está exento del derecho de desistimiento de 14 días</strong> establecido por la legislación de ventas a distancia, puesto que nuestros productos (pan artesanal, bollería) se consideran bienes que pueden deteriorarse o caducar con rapidez y bienes precintados por razones de protección de la salud o higiene. No se admiten devoluciones de alimentos una vez entregados por el repartidor.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-crust mb-2">5. Garantía Legal</h3>
                                <p className="text-crust-light">Tanto la Ley española como Arte & Pan garantizan que los pedidos se entregan en perfecto estado de preparación térmica, visual y embalaje en las instalaciones de la tienda. En caso de incidencia severa (caja chafada o error grave en el producto imputable a nosotros), puedes contactarnos por teléfono o email (arteypanaderia@hotmail.com) máximo 2 horas post-entrega para una resolución adecuada u ofreciendo compensación equivalente a criterio de la tienda.</p>
                            </div>
                        </>
                    )}

                    {activeModal === 'ia-disclaimer' && (
                        <>
                            <p>En cumplimiento con la normativa europea en materia de IA Generativa y buenas prácticas de transparencia comercial (LSSI / IA Act).</p>

                            <div>
                                <h3 className="font-bold text-crust mb-2">1. Trato con Inteligencia Artificial (Transparencia)</h3>
                                <p className="text-crust-light">Aceptas y reconoces mediante el uso de nuestra plataforma que nuestro Asistente de Ventas Flotante / Chat y sistemas telefónicos operan integrados mediante modelos de predicción de lenguaje generativo e Inteligencia Artificial (IA) proveídos principalmente por Google (modelos Gemini). Por ende, en este medio, no estarás interactuando con un humano en vivo directamente.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-crust mb-2">2. Descargo de Responsabilidad por Alucinación</h3>
                                <p className="text-crust-light">Aunque nuestras IAs se re-entrenan limitadas al menú estricto de Arte & Pan (sus precios dictados y métodos de entrega), los modelos Predictivos pueden eventualmente sufrir eventos de "alucinación" del lenguaje asumiendo hechos falsificados. <br /><br />Arte & Pan se exime por completo de cualquier promesa extraoficial ofrecida por la Inteligencia Artificial (como ofertas no programadas, promociones inexistentes o productos que excedan el catálogo vigente). Ningún mensaje de la IA constituye contrato ni obligación comercial para la panadería. Solamente será válida la orden transaccionada y generada oficial con pago en carrito.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-crust mb-2">3. Decisiones Automatizadas y Revisión</h3>
                                <p className="text-crust-light">Nuestra IA no toma decisiones discriminatorias ni procesa la venta en su sistema, únicamente ofrece interfaces conversacionales, pero si detectas un problema en las interacciones y respuestas de nuestro Asistente puedes solicitar la paralización del servicio automatizado escalando una solicitud humana mediante teléfono (+34 633 02 32 75) o personándote en el local.</p>
                            </div>
                        </>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-crust/10 bg-flour/30 flex justify-end">
                    <button onClick={onClose} className="px-8 py-3 bg-crust text-flour rounded-xl font-black uppercase text-xs tracking-widest hover:bg-crust-light transition-colors shadow-md">
                        Entendido
                    </button>
                </div>
            </div>
        </div>
    );
};
