import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Eye, Building2, Users } from 'lucide-react';
import { useDevice } from '../hooks/useDevice';
import DustParticles from '../components/DustParticles';

gsap.registerPlugin(ScrollTrigger);

const stations = [
  {
    icon: Target,
    title: 'Quiénes Somos',
    content: 'Más que vender materiales, brindamos confianza, calidad y rapidez para que cada obra avance sin detenerse. Atendemos a constructoras, desarrolladores y clientes corporativos en Querétaro.',
  },
  {
    icon: Target,
    title: 'Misión',
    content: 'Ayudar a nuestros clientes a construir sus proyectos con materiales de calidad, entregas rápidas y atención confiable, ofreciendo soluciones que impulsen cada obra con seguridad y compromiso.',
  },
  {
    icon: Eye,
    title: 'Visión',
    content: 'Convertirnos en una empresa reconocida por acompañar cada proyecto con rapidez, calidad y honestidad, siendo un aliado de confianza para quienes buscan construir con seguridad y tranquilidad.',
  },
  {
    icon: Building2,
    title: 'Experiencia',
    content: 'Atendemos desde remodelaciones y viviendas familiares hasta grandes proyectos corporativos, con logística eficiente y suministros oportunos.',
  },
  {
    icon: Users,
    title: 'Compromiso',
    content: 'Nuestra prioridad es que cada cliente reciba atención honesta, cercana y profesional, creando relaciones basadas en el respeto y la confianza.',
  },
];

export default function Nosotros() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { isDesktop } = useDevice();

  useEffect(() => {
    if (!isDesktop || !trackRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const totalScroll = track.scrollWidth - window.innerWidth + 60;

      gsap.to(track, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${totalScroll}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Animate each station as it comes into view
      track.querySelectorAll('.station-card').forEach((card) => {
        gsap.fromTo(card, { opacity: 0.3, scale: 0.95 }, {
          opacity: 1,
          scale: 1,
          scrollTrigger: {
            trigger: card,
            containerAnimation: gsap.getById('nosotros-scroll') || undefined,
            start: 'left 80%',
            end: 'left 20%',
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isDesktop]);

  useEffect(() => {
    if (isDesktop) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.mobile-nosotros-title', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: '.mobile-nosotros-title', start: 'top 85%' },
      });

      gsap.fromTo('.mobile-station', { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.15,
        scrollTrigger: { trigger: '.mobile-stations', start: 'top 80%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isDesktop]);

  if (!isDesktop) {
    return (
      <section ref={sectionRef} id="nosotros" className="py-20 bg-navy-950 relative">
        <div className="texture-concrete absolute inset-0 opacity-30" />
        <DustParticles count={10} />
        <div className="relative max-w-xl mx-auto px-6">
          <div className="mobile-nosotros-title mb-12">
            <span className="text-green-400 font-semibold text-xs uppercase tracking-widest">
              Quiénes Somos
            </span>
            <h2 className="text-3xl font-black text-white mt-2 leading-tight">
              Construimos confianza en cada proyecto
            </h2>
          </div>

          <div className="mobile-stations space-y-6">
            {stations.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="mobile-station bg-navy-800/60 backdrop-blur-sm border border-white/5 rounded-xl p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-green-400/10 rounded-lg flex items-center justify-center">
                      <Icon className="text-green-400" size={20} />
                    </div>
                    <h3 className="font-bold text-white text-lg">{s.title}</h3>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">{s.content}</p>
                  {s.sub && (
                    <p className="text-white/60 text-sm leading-relaxed mt-3">{s.sub}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="nosotros" className="relative overflow-hidden bg-navy-950">
      <div className="texture-concrete absolute inset-0 opacity-30" />
      <DustParticles count={12} />

      <div ref={trackRef} className="flex items-center h-screen relative">
        {/* Intro panel */}
        <div className="flex-shrink-0 w-screen h-full flex items-center justify-center px-16">
          <div className="max-w-2xl">
            <span className="text-green-400 font-semibold text-sm uppercase tracking-widest">
              Quiénes Somos
            </span>
            <h2 className="text-5xl lg:text-6xl font-black text-white mt-4 leading-tight">
              Construimos<br />
              confianza en<br />
              cada{' '}
              <span className="text-green-400">proyecto</span>
            </h2>
            <div className="mt-8 flex items-center gap-4 text-white/40">
              <div className="w-16 h-[2px] bg-green-400/40" />
              <span className="text-sm font-medium">Desliza para conocernos</span>
            </div>
          </div>
        </div>

        {/* Station cards */}
        {stations.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={s.title}
              className="station-card flex-shrink-0 w-[500px] h-[400px] mx-8 flex flex-col justify-center"
            >
              <div className="bg-navy-800/80 backdrop-blur-sm border border-white/5 rounded-2xl p-10 relative overflow-hidden">
                {/* Building progress indicator */}
                <div className="absolute top-0 left-0 w-1 h-full bg-white/5">
                  <div
                    className="w-full bg-green-400 transition-all duration-700"
                    style={{ height: `${((i + 1) / stations.length) * 100}%` }}
                  />
                </div>

                <div className="pl-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-green-400/10 rounded-xl flex items-center justify-center">
                      <Icon className="text-green-400" size={24} />
                    </div>
                    <div>
                      <span className="text-green-400/60 text-xs font-bold uppercase tracking-widest">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-black text-white text-2xl">{s.title}</h3>
                    </div>
                  </div>

                  <p className="text-white/70 text-base leading-relaxed">{s.content}</p>
                  {s.sub && (
                    <p className="text-white/70 text-base leading-relaxed mt-4">{s.sub}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* End spacer */}
        <div className="flex-shrink-0 w-[200px]" />
      </div>
    </section>
  );
}
