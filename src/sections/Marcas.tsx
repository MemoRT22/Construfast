import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const brands = [
  'DeAcero',
  'Sicartsa',
  'Simec',
  'Cuvasa',
  'Cemex',
  'Holcim',
  'Unibasico',
  'Uniblock',
  'Truper',
];

export default function Marcas() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.marcas-title', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: '.marcas-title', start: 'top 85%' },
      });

      if (trackRef.current) {
        const track = trackRef.current;
        const totalWidth = track.scrollWidth / 2;

        gsap.to(track, {
          x: -totalWidth,
          duration: 25,
          ease: 'none',
          repeat: -1,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const allBrands = [...brands, ...brands];

  return (
    <section ref={sectionRef} id="marcas" className="py-20 md:py-28 bg-navy-950 relative overflow-hidden">
      {/* Subtle wall texture */}
      <div className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(255,255,255,0.02) 60px, rgba(255,255,255,0.02) 61px)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="marcas-title text-center mb-14">
          <span className="text-green-400 font-semibold text-sm uppercase tracking-widest">
            Respaldo de Calidad
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-3">
            Distribuidores Autorizados
          </h2>
          <p className="text-white/40 mt-4 text-lg">
            Trabajamos con las principales marcas del mercado
          </p>
        </div>
      </div>

      {/* Infinite scrolling track */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-navy-950 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-navy-950 to-transparent z-10" />

        <div ref={trackRef} className="flex items-center gap-8 whitespace-nowrap">
          {allBrands.map((brand, i) => (
            <div
              key={`${brand}-${i}`}
              className="flex-shrink-0 bg-white/[0.03] border border-white/10 rounded-xl px-10 py-5 backdrop-blur-sm hover:border-green-400/30 hover:bg-green-400/5 transition-all duration-300"
            >
              <span className="text-white/80 font-bold text-lg tracking-wide">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
