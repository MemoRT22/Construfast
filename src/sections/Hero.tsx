import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ChevronDown } from 'lucide-react';
import { useDevice } from '../hooks/useDevice';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const maskRef = useRef<HTMLHeadingElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const { isDesktop } = useDevice();
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1.8 });

      tl.fromTo('.hero-headline', { opacity: 0, y: 80 }, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      })
        .fromTo('.hero-subtitle', { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        }, '-=0.5')
        .fromTo('.hero-cta', { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
        }, '-=0.4')
        .fromTo('.hero-gauge', { opacity: 0, scale: 0.9 }, {
          opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)',
        }, '-=0.3');

      // Floating construction elements
      gsap.to('.float-element', {
        y: -15,
        rotation: 'random(-5, 5)',
        duration: 'random(2.5, 4)',
        ease: 'sine.inOut',
        stagger: { each: 0.3, from: 'random' },
        yoyo: true,
        repeat: -1,
      });

      // Dust particles continuous animation
      if (particlesRef.current) {
        const particles = particlesRef.current.querySelectorAll('.dust-particle');
        particles.forEach((p) => {
          gsap.to(p, {
            y: 'random(-100, 100)',
            x: 'random(-50, 50)',
            opacity: 'random(0, 0.5)',
            duration: 'random(4, 8)',
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: Math.random() * 3,
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [isDesktop]);

  const parallaxStyle = isDesktop ? {
    transform: `translate(${(mousePos.x - 50) * 0.02}px, ${(mousePos.y - 50) * 0.02}px)`,
  } : {};

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy-950"
    >
      {/* Concrete texture background */}
      <div className="absolute inset-0 texture-concrete opacity-60" />

      {/* Radial spotlight following mouse (desktop only) */}
      {isDesktop && (
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-700"
          style={{
            background: `radial-gradient(ellipse 600px 600px at ${mousePos.x}% ${mousePos.y}%, rgba(122,182,72,0.06), transparent)`,
          }}
        />
      )}

      {/* Dust particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="dust-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              opacity: Math.random() * 0.4,
            }}
          />
        ))}
      </div>

      {/* Floating construction elements */}
      <div className="absolute inset-0 pointer-events-none" style={parallaxStyle}>
        {/* Steel beam */}
        <div className="float-element absolute top-[15%] left-[8%] w-32 h-3 bg-gradient-to-r from-gray-600 to-gray-500 rounded-sm opacity-20 rotate-12" />
        {/* Bolt */}
        <div className="float-element absolute top-[25%] right-[12%] w-6 h-6 border-2 border-white/15 rounded-full">
          <div className="absolute inset-1 border border-white/10 rounded-full" />
        </div>
        {/* Nail */}
        <div className="float-element absolute bottom-[35%] left-[15%] w-1 h-16 bg-gradient-to-b from-gray-400/20 to-gray-600/20 rounded-full" />
        {/* I-beam cross section */}
        <div className="float-element absolute top-[55%] right-[20%] opacity-15">
          <div className="w-14 h-2 bg-white/40" />
          <div className="w-2 h-10 bg-white/40 mx-auto" />
          <div className="w-14 h-2 bg-white/40" />
        </div>
        {/* Concrete block */}
        <div className="float-element absolute bottom-[20%] right-[8%] w-16 h-10 border border-white/10 bg-white/5 rounded-sm" />
        {/* Wire mesh */}
        <div className="float-element absolute top-[10%] right-[40%] w-12 h-12 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(0deg, white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
            backgroundSize: '6px 6px',
          }}
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-navy-950 to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-navy-950/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <h1
          ref={maskRef}
          className="hero-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[1.05] mb-8 opacity-0"
        >
          Donde la obra{' '}
          <span className="relative inline-block">
            <span className="text-green-400">nunca</span>
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-green-400/40 rounded-full" />
          </span>{' '}
          se detiene
        </h1>

        <p className="hero-subtitle text-lg sm:text-xl md:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed mb-12 opacity-0">
          Distribuidora de materiales de construccion en Queretaro.
          Calidad, rapidez y confianza en cada entrega.
        </p>

        <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center items-center mb-14 opacity-0">
          <a
            href="#contacto"
            className="group relative px-10 py-5 bg-green-400 text-navy-900 font-bold text-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(122,182,72,0.4)]"
          >
            <span className="relative z-10">Solicitar Cotizacion</span>
            <div className="absolute inset-0 bg-green-300 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>
          <a
            href="#productos"
            className="px-10 py-5 border-2 border-white/15 text-white font-semibold text-lg rounded-lg hover:border-green-400/50 hover:text-green-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(122,182,72,0.15)]"
          >
            Ver Productos
          </a>
        </div>

        {/* Industrial gauge stat */}
        <div className="hero-gauge inline-block opacity-0">
          <div className="bg-navy-800/80 backdrop-blur-sm border border-white/10 rounded-xl px-8 py-5">
            <div className="flex items-center gap-4 mb-3">
              <span className="text-3xl font-black text-green-400">95%</span>
              <span className="text-white/50 text-sm text-left leading-tight max-w-[200px]">
                de retencion de clientes
              </span>
            </div>
            <div className="gauge-track w-full">
              <div className="gauge-fill" style={{ width: '95%' }} />
            </div>
          </div>
        </div>
      </div>

      <a
        href="#nosotros"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 hover:text-green-400 transition-colors"
      >
        <ChevronDown size={28} className="animate-bounce" />
      </a>
    </section>
  );
}
