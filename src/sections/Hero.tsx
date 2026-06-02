import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import { useDevice } from '../hooks/useDevice';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const { isDesktop } = useDevice();

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

      if (isDesktop && imgRef.current) {
        gsap.to(imgRef.current, {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isDesktop]);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Full-screen background image */}
      <img
        ref={imgRef}
        src="https://images.pexels.com/photos/2323080/pexels-photo-2323080.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
        alt="Obra de construccion a gran escala"
        className="absolute inset-0 w-full h-full object-cover object-[center_30%] scale-110"
        loading="eager"
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-navy-950/60" />

      {/* Bottom gradient for depth and seamless transition to next section */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent" />

      {/* Top subtle gradient */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-navy-950/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <h1 className="hero-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[1.05] mb-8 opacity-0">
          Donde la obra{' '}
          <span className="relative inline-block">
            <span className="text-green-400">nunca</span>
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-green-400/40 rounded-full" />
          </span>{' '}
          se detiene
        </h1>

        <p className="hero-subtitle text-lg sm:text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed mb-12 opacity-0">
          Distribuidora de materiales de construcción en Querétaro.
          Calidad, rapidez y confianza en cada entrega.
        </p>

        <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center items-center mb-14 opacity-0">
          <a
            href="#contacto"
            className="group relative px-10 py-5 bg-green-400 text-navy-900 font-bold text-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(122,182,72,0.4)]"
          >
            <span className="relative z-10">Solicitar Cotización</span>
            <div className="absolute inset-0 bg-green-300 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>
          <a
            href="#productos"
            className="px-10 py-5 border-2 border-white/20 text-white font-semibold text-lg rounded-lg hover:border-green-400/50 hover:text-green-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(122,182,72,0.15)]"
          >
            Ver Productos
          </a>
        </div>

        {/* Industrial gauge stat */}
        <div className="hero-gauge inline-block opacity-0">
          <div className="bg-navy-900/70 backdrop-blur-md border border-white/10 rounded-xl px-8 py-5">
            <div className="flex items-center gap-4 mb-3">
              <span className="text-3xl font-black text-green-400">95%</span>
              <span className="text-white/60 text-sm text-left leading-tight max-w-[200px]">
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-green-400 transition-colors"
      >
        <ChevronDown size={28} className="animate-bounce" />
      </a>
    </section>
  );
}
