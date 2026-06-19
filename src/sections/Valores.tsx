import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Heart,
  Shield,
  Handshake,
  Award,
  ClipboardCheck,
  Zap,
  Truck,
  Clock,
} from 'lucide-react';
import { useDevice } from '../hooks/useDevice';
import DustParticles from '../components/DustParticles';

gsap.registerPlugin(ScrollTrigger);

const valores = [
  { name: 'Respeto', icon: Heart, desc: 'Relaciones basadas en la dignidad y consideración mutua' },
  { name: 'Honestidad', icon: Shield, desc: 'Transparencia comercial en cada operación' },
  { name: 'Compromiso', icon: Handshake, desc: 'Dedicación total con cada proyecto y cliente' },
  { name: 'Calidad', icon: Award, desc: 'Materiales de las mejores marcas del mercado' },
  { name: 'Responsabilidad', icon: ClipboardCheck, desc: 'Cumplimiento puntual de entregas y acuerdos' },
];

const diferenciadores = [
  { icon: Zap, title: 'Atención Inmediata', desc: 'Respuesta rápida y personalizada a tus necesidades' },
  { icon: Truck, title: 'Logística Eficiente', desc: 'Entregas oportunas que mantienen tu obra en marcha' },
  { icon: Clock, title: 'Cumplimiento de Cronogramas', desc: 'Suministros que se adaptan a tus tiempos' },
];

export default function Valores() {
  const sectionRef = useRef<HTMLElement>(null);
  const [gaugeVisible, setGaugeVisible] = useState(false);
  const { isDesktop } = useDevice();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.valores-title', { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: '.valores-title', start: 'top 85%' },
      });

      // Values "chisel" animation - each appears with a slight vibrate
      gsap.fromTo('.valor-engraved', { opacity: 0, x: -20 }, {
        opacity: 1, x: 0, duration: 0.4, stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.valores-wall', start: 'top 80%' },
      });

      // Differentiators "bolt in" animation
      gsap.fromTo('.diferenciador-plate', { opacity: 0, rotateZ: -3, y: 30 }, {
        opacity: 1, rotateZ: 0, y: 0, duration: 0.5, stagger: 0.15,
        ease: 'back.out(1.5)',
        scrollTrigger: { trigger: '.diferenciadores-section', start: 'top 80%' },
      });

      // Gauge trigger
      ScrollTrigger.create({
        trigger: '.retention-stamp',
        start: 'top 80%',
        onEnter: () => setGaugeVisible(true),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="valores" className="py-24 md:py-32 relative overflow-hidden bg-navy-950">
      {/* Concrete wall background - subtle texture, same base color */}
      <div className="absolute inset-0 texture-concrete opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-950/95 to-navy-950" />
      <DustParticles count={12} />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="valores-title text-center mb-16">
          <span className="text-green-400 font-semibold text-sm uppercase tracking-widest">
            Lo que nos define
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-3 text-emboss">
            Nuestros Valores
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Values wall - engraved in concrete */}
          <div className="valores-wall space-y-3">
            {valores.map((valor) => {
              const Icon = valor.icon;
              return (
                <div
                  key={valor.name}
                  className="valor-engraved group flex items-start gap-4 p-5 rounded-xl bg-white/[0.03] border border-white/5 backdrop-blur-sm hover:bg-white/[0.06] hover:border-green-400/20 transition-all duration-300"
                >
                  <div className="w-11 h-11 bg-green-400/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-400/20 transition-colors">
                    <Icon className="text-green-400" size={20} />
                  </div>
                  <div>
                    <h3 className="font-black text-white text-lg text-emboss">{valor.name}</h3>
                    <p className="text-white/50 text-sm mt-0.5">{valor.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Differentiators as metal plates + stamp */}
          <div className="diferenciadores-section space-y-5">
            <h3 className="text-xl font-bold text-white/80 mb-6">
              Por qué elegirnos
            </h3>

            {diferenciadores.map((dif) => {
              const Icon = dif.icon;
              return (
                <div
                  key={dif.title}
                  className="diferenciador-plate bg-navy-800/80 backdrop-blur-sm border border-white/5 rounded-xl p-6 text-white relative overflow-hidden group hover:border-green-400/20 transition-all duration-300"
                >
                  {/* Bolt decorations */}
                  {isDesktop && (
                    <>
                      <div className="absolute top-3 left-3 w-2.5 h-2.5 rounded-full bg-white/10 border border-white/20" />
                      <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-white/10 border border-white/20" />
                      <div className="absolute bottom-3 left-3 w-2.5 h-2.5 rounded-full bg-white/10 border border-white/20" />
                      <div className="absolute bottom-3 right-3 w-2.5 h-2.5 rounded-full bg-white/10 border border-white/20" />
                    </>
                  )}

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-400/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="text-green-400" size={22} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{dif.title}</h4>
                      <p className="text-white/50 text-sm mt-1">{dif.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Retention stamp */}
            <div className="retention-stamp relative mt-8 bg-navy-900/80 border border-white/5 rounded-xl p-8 text-center overflow-hidden">
              <div className="relative z-10">
                <p className="text-5xl font-black text-green-400">95%</p>
                <div className="gauge-track w-48 mx-auto mt-4">
                  <div className="gauge-fill" style={{ width: gaugeVisible ? '95%' : '0%' }} />
                </div>
                <p className="text-white/70 font-medium mt-3">de retención de clientes</p>
                <p className="text-white/40 text-sm mt-1">
                  Nuestros nuevos clientes nos escogen como proveedores para futuros proyectos
                </p>
              </div>

              {/* Stamp overlay */}
              {gaugeVisible && (
                <div className="absolute top-4 right-4 stamp-animation">
                  <div className="border-4 border-green-400/60 rounded-lg px-4 py-2 rotate-[-3deg]">
                    <span className="text-green-400/80 font-black text-sm tracking-widest">APROBADO</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
