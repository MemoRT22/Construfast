import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  CircleDot,
  Layers,
  Blocks,
  Mountain,
  TreePine,
  Cylinder,
  Download,
  X,
  ChevronRight,
} from 'lucide-react';
import { useDevice } from '../hooks/useDevice';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    name: 'Acero',
    icon: CircleDot,
    products: [
      { name: 'Varilla', img: '/assets/images/Acero/Fondo_de_varilla_eliminado.png' },
      { name: 'Armex', img: '/assets/images/Acero/Fondo_de_armex_eliminado.png' },
      { name: 'Alambre', img: '/assets/images/Acero/Fondo_de_alambre_eliminado.png' },
      { name: 'Alambron', img: '/assets/images/Acero/Fondo_de_ALAMBRON_eliminado.png' },
      { name: 'Clavo', img: '/assets/images/Acero/Fondo_de_clavo_std_eliminado.png' },
      { name: 'Malla Electrosoldada', img: '/assets/images/Acero/Fondo_de_malla-electrosoldada_eliminado.png' },
      { name: 'Estribo', img: '/assets/images/Acero/Fondo_de_Estribo_eliminado.png' },
    ],
    brands: ['DeAcero', 'Sicartsa', 'Simec'],
    accent: '#6b7280',
  },
  {
    name: 'Polvos',
    icon: Cylinder,
    products: [
      { name: 'Cemento', img: '/assets/images/Polvos/Fondo_de_cemento_holcim_eliminado.png' },
      { name: 'Mortero', img: '/assets/images/Polvos/MORTERO_25_KG.png' },
      { name: 'Estuco', img: '/assets/images/Polvos/Fondo_de_estuco_uniblock_eliminado.png' },
      { name: 'Yeso', img: '/assets/images/Polvos/Fondo_de_Yeso_unibasico_eliminado.png' },
      { name: 'Adhesivo', img: '/assets/images/Polvos/Fondo_de_Adhesivo_universal_uniblock_eliminado.png' },
      { name: 'Cal', img: '/assets/images/Polvos/Fondo_de_cal_calidra_eliminado.png' },
    ],
    brands: ['Cuvasa', 'Cemex', 'Holcim', 'Unibasico', 'Uniblock'],
    accent: '#d97706',
  },
  {
    name: 'Prefabricados',
    icon: Blocks,
    products: [
      { name: 'Block', img: '/assets/images/Prefabricados/Fondo_de_Block_eliminado.png' },
      { name: 'Tabique', img: '/assets/images/Prefabricados/Fondo_de_tabicon_eliminado.png' },
      { name: 'Ladrillo', img: '/assets/images/Prefabricados/Fondo_de_ladrillo_rojo_eliminado.png' },
      { name: 'Vigueta', img: '/assets/images/Prefabricados/Vigueta.png' },
      { name: 'Bovedilla', img: '/assets/images/Prefabricados/Fondo_de_Bovedilla_eliminado.png' },
    ],
    brands: [],
    accent: '#78716c',
  },
  {
    name: 'Agregados',
    icon: Mountain,
    products: [
      { name: 'Arena', img: '/assets/images/Agregados/arena.webp' },
      { name: 'Grava', img: '/assets/images/Agregados/grava.jpg' },
      { name: 'Tepetate', img: '/assets/images/Agregados/tepetate.webp' },
      { name: 'Piedra', img: '/assets/images/Agregados/piedra.jpg' },
    ],
    brands: [],
    accent: '#ea580c',
  },
  {
    name: 'Madera / Ferreteria',
    icon: TreePine,
    products: [
      { name: 'Polin', img: '/assets/images/Ferreteria_y_madera/Fondo_de_Polin_eliminado.png' },
      { name: 'Barrote', img: '/assets/images/Ferreteria_y_madera/barrote.png' },
      { name: 'Triplay', img: '/assets/images/Ferreteria_y_madera/Fondo_de_triplay_eliminado.png' },
      { name: 'Herramientas', img: '/assets/images/Ferreteria_y_madera/Fondo_de_herramientas_eliminado.png' },
    ],
    brands: ['Truper'],
    accent: '#a16207',
  },
  {
    name: 'Concreto',
    icon: Layers,
    products: [
      { name: 'Concreto Premezclado', img: null },
    ],
    brands: [],
    accent: '#64748b',
  },
];

const marqueeItems = categories.flatMap((cat) =>
  cat.products.filter((p) => p.img !== null).map((p) => ({
    name: p.name,
    img: p.img as string,
    category: cat.name,
  }))
);

export default function Productos() {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const { isDesktop } = useDevice();
  const [expanded, setExpanded] = useState<number | null>(null);
  const marqueeAnimRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.productos-title', { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: '.productos-title', start: 'top 85%' },
      });

      gsap.fromTo('.product-card', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.products-grid', start: 'top 80%' },
      });

      gsap.fromTo('.marquee-strip', { opacity: 0 }, {
        opacity: 1, duration: 1,
        scrollTrigger: { trigger: '.marquee-strip', start: 'top 90%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!marqueeRef.current) return;
    const track = marqueeRef.current;
    const totalWidth = track.scrollWidth / 2;

    const tween = gsap.to(track, {
      x: -totalWidth,
      duration: 45,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
      },
    });

    marqueeAnimRef.current = tween;
    return () => { tween.kill(); };
  }, []);

  const pauseMarquee = () => marqueeAnimRef.current?.pause();
  const resumeMarquee = () => marqueeAnimRef.current?.resume();

  return (
    <section ref={sectionRef} id="productos" className="py-24 md:py-32 bg-navy-950 relative overflow-hidden">
      <div className="texture-metal absolute inset-0" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="productos-title text-center mb-16">
          <span className="text-green-400 font-semibold text-sm uppercase tracking-widest">
            Catálogo
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-3">
            Nuestros Productos
          </h2>
          <p className="text-white/40 text-lg mt-4 max-w-2xl mx-auto">
            Portafolio integral de materiales para cada etapa de tu obra
          </p>
        </div>

        {/* Clean minimal product cards */}
        <div className="products-grid">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.name}
                  onClick={() => setExpanded(i)}
                  className="product-card cursor-pointer group relative rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-green-400/20 transition-all duration-400 overflow-hidden"
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300 group-hover:bg-green-400/15"
                          style={{ background: `${cat.accent}15` }}
                        >
                          <Icon className="text-white/60 group-hover:text-green-400 transition-colors duration-300" size={20} />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-white group-hover:text-green-400 transition-colors duration-300">
                            {cat.name}
                          </h3>
                          <span className="text-white/30 text-xs">
                            {cat.products.length} producto{cat.products.length > 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="text-white/20 group-hover:text-green-400/60 transition-all duration-300 group-hover:translate-x-1" size={18} />
                    </div>

                    {/* Product list preview */}
                    <div className="space-y-1.5 mb-4">
                      {cat.products.slice(0, 3).map((product) => (
                        <div key={product.name} className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-green-400/50 transition-colors duration-300" />
                          <span className="text-white/50 text-sm group-hover:text-white/70 transition-colors duration-300">
                            {product.name}
                          </span>
                        </div>
                      ))}
                      {cat.products.length > 3 && (
                        <span className="text-white/25 text-xs ml-3">
                          +{cat.products.length - 3} más
                        </span>
                      )}
                    </div>

                    {/* Brands */}
                    {cat.brands.length > 0 && (
                      <div className="pt-3 border-t border-white/[0.04]">
                        <div className="flex flex-wrap gap-1.5">
                          {cat.brands.map((brand) => (
                            <span
                              key={brand}
                              className="text-[10px] text-white/40 bg-white/[0.04] px-2 py-0.5 rounded font-medium"
                            >
                              {brand}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom accent line on hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-green-400/0 group-hover:bg-green-400/40 transition-all duration-500" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Download catalog */}
        <div className="text-center mt-14">
          <a
            href="/Catalogo_CONSTRUFAST_compressed.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white/[0.03] border border-white/10 text-white font-semibold px-8 py-4 rounded-xl hover:bg-green-400/10 hover:border-green-400/20 transition-all duration-300 group"
          >
            <Download size={18} className="group-hover:animate-bounce" />
            Descargar Catálogo PDF
          </a>
        </div>
      </div>

      {/* Marquee strip of product images — visual accent */}
      <div
        className="marquee-strip mt-20 overflow-hidden relative"
        onMouseEnter={pauseMarquee}
        onMouseLeave={resumeMarquee}
      >
        <div className="absolute left-0 top-0 w-32 h-full z-10 bg-gradient-to-r from-navy-950 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 w-32 h-full z-10 bg-gradient-to-l from-navy-950 to-transparent pointer-events-none" />

        <div className="flex items-center border-t border-b border-white/[0.04] py-6">
          <div ref={marqueeRef} className="flex items-center gap-12 will-change-transform">
            {[...marqueeItems, ...marqueeItems].map((item, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 flex flex-col items-center gap-2 group/item"
              >
                <div className="w-16 h-16 flex items-center justify-center">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="max-w-full max-h-full object-contain opacity-50 group-hover/item:opacity-90 transition-all duration-300 group-hover/item:scale-110"
                    style={{ filter: 'drop-shadow(0 2px 8px rgba(122,182,72,0.1))' }}
                  />
                </div>
                <span className="text-white/20 text-[10px] font-medium tracking-wide whitespace-nowrap group-hover/item:text-white/50 transition-colors duration-300">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal detail */}
      {expanded !== null && (
        <div
          className="fixed inset-0 z-[70] bg-navy-950/90 backdrop-blur-md flex items-center justify-center p-6"
          onClick={() => setExpanded(null)}
        >
          <div
            className="bg-navy-900 border border-white/[0.08] rounded-2xl p-8 max-w-lg w-full relative max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setExpanded(null)}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
            >
              <X size={22} />
            </button>

            <div className="flex items-center gap-4 mb-8">
              {(() => { const Icon = categories[expanded].icon; return <Icon className="text-green-400" size={24} />; })()}
              <h3 className="text-xl font-bold text-white">{categories[expanded].name}</h3>
            </div>

            <div className="mb-6">
              <p className="text-white/30 text-xs uppercase tracking-widest font-bold mb-4">Productos</p>
              <div className="flex flex-col gap-0.5">
                {categories[expanded].products.map((p) => (
                  <div key={p.name} className="flex items-center gap-3 py-2.5 border-b border-white/[0.04] last:border-0">
                    {p.img ? (
                      <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-white/[0.03]">
                        <img
                          src={p.img}
                          alt={p.name}
                          className="max-w-[32px] max-h-[32px] object-contain"
                          style={{ filter: 'drop-shadow(0 1px 4px rgba(122,182,72,0.15))' }}
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400/50" />
                      </div>
                    )}
                    <span className="text-white/70 text-sm font-medium">{p.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {categories[expanded].brands.length > 0 && (
              <div>
                <p className="text-white/30 text-xs uppercase tracking-widest font-bold mb-3">Marcas Autorizadas</p>
                <div className="flex flex-wrap gap-2">
                  {categories[expanded].brands.map((b) => (
                    <span key={b} className="text-sm font-medium text-green-400 bg-green-400/[0.08] px-4 py-2 rounded-lg border border-green-400/15">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
