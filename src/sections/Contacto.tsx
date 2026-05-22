import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, AtSign } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useDevice } from '../hooks/useDevice';

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  mensaje: string;
}

export default function Contacto() {
  const sectionRef = useRef<HTMLElement>(null);
  const { isDesktop } = useDevice();
  const [form, setForm] = useState<FormData>({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contacto-title', { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: '.contacto-title', start: 'top 85%' },
      });

      gsap.fromTo('.contacto-clipboard', { opacity: 0, y: 40, rotateZ: isDesktop ? -1 : 0 }, {
        opacity: 1, y: 0, rotateZ: isDesktop ? -1 : 0, duration: 0.8,
        scrollTrigger: { trigger: '.contacto-clipboard', start: 'top 80%' },
      });

      gsap.fromTo('.contacto-notes', { opacity: 0, x: 40 }, {
        opacity: 1, x: 0, duration: 0.8, stagger: 0.1,
        scrollTrigger: { trigger: '.contacto-notes', start: 'top 80%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isDesktop]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.nombre.trim() || !form.email.trim() || !form.mensaje.trim()) {
      setError('Por favor llena los campos obligatorios');
      return;
    }

    setSending(true);
    const { error: dbError } = await supabase.from('contact_messages').insert({
      nombre: form.nombre.trim(),
      email: form.email.trim(),
      telefono: form.telefono.trim(),
      mensaje: form.mensaje.trim(),
    });

    setSending(false);

    if (dbError) {
      setError('Hubo un error al enviar tu mensaje. Intenta de nuevo.');
      return;
    }

    setSent(true);
    setForm({ nombre: '', email: '', telefono: '', mensaje: '' });
  };

  return (
    <section ref={sectionRef} id="contacto" className="py-24 md:py-32 bg-navy-950 relative overflow-hidden">
      <div className="texture-concrete absolute inset-0 opacity-20" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="contacto-title text-center mb-16">
          <span className="text-green-400 font-semibold text-sm uppercase tracking-widest">
            Contactanos
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-3">
            Hablemos de tu proyecto
          </h2>
          <p className="text-white/40 text-lg mt-4 max-w-2xl mx-auto">
            Solicita tu cotizacion o escribenos para resolver cualquier duda
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Clipboard form */}
          <div className={`contacto-clipboard lg:col-span-3 ${isDesktop ? 'transform -rotate-1' : ''}`}>
            <div className="clipboard-container">
              {/* Metal clip */}
              <div className="clipboard-clip" />

              {sent ? (
                <div className="pt-8 text-center relative">
                  {/* Stamp overlay */}
                  <div className="stamp-animation inline-block mb-6">
                    <div className="border-4 border-green-600 rounded-lg px-8 py-4 rotate-[-3deg]">
                      <span className="text-green-600 font-black text-2xl tracking-widest">RECIBIDO</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-navy-800 mb-2">Mensaje enviado</h3>
                  <p className="text-gray-600">
                    Gracias por contactarnos. Te responderemos lo antes posible.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-6 text-green-600 font-semibold hover:underline"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="pt-8 lined-paper">
                  {/* Form header */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                    <h3 className="font-bold text-navy-800 text-lg">Orden de Cotizacion</h3>
                    <span className="text-xs text-gray-400 font-mono">
                      #{String(Date.now()).slice(-6)}
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        placeholder="Tu nombre"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white/50 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all text-navy-800 font-handwriting text-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="tu@email.com"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white/50 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all text-navy-800 font-handwriting text-lg"
                      />
                    </div>
                  </div>

                  <div className="mt-5">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                      Telefono
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={form.telefono}
                      onChange={handleChange}
                      placeholder="442 000 0000"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white/50 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all text-navy-800 font-handwriting text-lg"
                    />
                  </div>

                  <div className="mt-5">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                      Mensaje *
                    </label>
                    <textarea
                      name="mensaje"
                      value={form.mensaje}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Cuentanos sobre tu proyecto o los materiales que necesitas..."
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white/50 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all resize-none text-navy-800 font-handwriting text-lg"
                    />
                  </div>

                  {error && (
                    <p className="mt-4 text-red-500 text-sm font-medium">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-green-500 text-white font-bold px-8 py-3.5 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shadow-lg"
                  >
                    <Send size={18} />
                    {sending ? 'Enviando...' : 'Enviar Solicitud'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact info cards */}
          <div className="contacto-notes lg:col-span-2 space-y-4">
            {/* Phone */}
            <a href="tel:+524421797779" className="contact-card flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-green-400/10 flex items-center justify-center flex-shrink-0">
                <Phone className="text-green-400" size={18} />
              </div>
              <div>
                <p className="text-[11px] text-white/40 font-semibold uppercase tracking-wider">Celular</p>
                <p className="text-white font-bold text-base mt-0.5">442 179 7779</p>
              </div>
            </a>

            {/* Email */}
            <a href="mailto:construfastqro@outlook.com" className="contact-card flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-green-400/10 flex items-center justify-center flex-shrink-0">
                <Mail className="text-green-400" size={18} />
              </div>
              <div>
                <p className="text-[11px] text-white/40 font-semibold uppercase tracking-wider">Correo</p>
                <p className="text-white font-bold text-base mt-0.5">construfastqro@outlook.com</p>
              </div>
            </a>

            {/* Location */}
            <div className="contact-card flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-green-400/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="text-green-400" size={18} />
              </div>
              <div>
                <p className="text-[11px] text-white/40 font-semibold uppercase tracking-wider">Ubicacion</p>
                <p className="text-white font-bold text-base mt-0.5">
                  C. Kilimanjaro #3 Col. Loma Bonita, Qro. C.P. 76118
                </p>
              </div>
            </div>

            {/* Instagram */}
            <a
              href="https://instagram.com/construfast_qro"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-green-400/10 flex items-center justify-center flex-shrink-0">
                <AtSign className="text-green-400" size={18} />
              </div>
              <div>
                <p className="text-[11px] text-white/40 font-semibold uppercase tracking-wider">Instagram</p>
                <p className="text-white font-bold text-base mt-0.5">@construfast_qro</p>
              </div>
            </a>

            {/* WhatsApp CTA card */}
            <div className="bg-gradient-to-br from-navy-800 to-navy-900 border border-white/10 rounded-xl p-6 text-white mt-6">
              <h4 className="font-bold text-lg mb-2">Atencion Rapida</h4>
              <p className="text-white/60 text-sm leading-relaxed">
                Escribenos por WhatsApp para una respuesta inmediata.
                Cotizaciones, disponibilidad y entregas al momento.
              </p>
              <a
                href="https://wa.me/524421797779?text=Hola%2C%20me%20interesa%20cotizar%20materiales"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-5 py-2.5 rounded-lg hover:bg-[#1fb855] transition-colors text-sm"
              >
                Escribir por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
