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
    color: 'from-gray-600 to-gray-800',
    accent: '#6b7280',
    bgImage: '/assets/images/Acero/Fondo_de_varilla_eliminado.png',
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
    color: 'from-amber-600 to-amber-800',
    accent: '#d97706',
    bgImage: '/assets/images/Polvos/CEMENTO_25_KG.png',
  },
  {
    name: 'Prefabricados',
    icon: Blocks,
    products: [
      { name: 'Block', img: '/assets/images/Prefabricados/Fondo_de_Block_eliminado.png' },
      { name: 'Tabique', img: '/assets/images/Prefabricados/Fondo_de_tabicon_eliminado.png' },
      { name: 'Ladrillo', img: '/assets/images/Prefabricados/Fondo_de_ladrillo_rojo_eliminado.png' },
      { name: 'Vigueta', img: '/assets/images/Prefabricados/Vigueta.png' },
      { name: 'Bovedilla', img: '/assets/images/Prefabricados/Bovedilla.webp' },
    ],
    brands: [],
    color: 'from-stone-500 to-stone-700',
    accent: '#78716c',
    bgImage: '/assets/images/Prefabricados/Fondo_de_Block_eliminado.png',
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
    color: 'from-orange-600 to-orange-800',
    accent: '#ea580c',
    bgImage: '/assets/images/Agregados/grava.jpg',
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
    color: 'from-yellow-700 to-yellow-900',
    accent: '#a16207',
    bgImage: '/assets/images/Ferreteria_y_madera/Fondo_de_triplay_eliminado.png',
  },
  {
    name: 'Concreto',
    icon: Layers,
    products: [
      { name: 'Concreto Premezclado', img: null },
    ],
    brands: [],
    color: 'from-slate-500 to-slate-700',
    accent: '#64748b',
    bgImage: null,
  },
];

// Flat list of all product images for the marquee
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

      gsap.fromTo('.product-iso-card', { opacity: 0, y: 60 }, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.products-warehouse', start: 'top 80%' },
      });

      gsap.fromTo('.marquee-strip', { opacity: 0 }, {
        opacity: 1, duration: 1,
        scrollTrigger: { trigger: '.marquee-strip', start: 'top 90%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Infinite marquee animation
  useEffect(() => {
    if (!marqueeRef.current) return;
    const track = marqueeRef.current;
    const totalWidth = track.scrollWidth / 2;

    const tween = gsap.to(track, {
      x: -totalWidth,
      duration: 40,
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

      {/* Warehouse ambient lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-white/5" />
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white/5" />
        <div className="absolute top-0 left-3/4 w-[1px] h-full bg-white/5" />
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-radial from-green-400/5 to-transparent rounded-full blur-3xl" />

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

        {/* Product cards grid */}
        <div className="products-warehouse" style={isDesktop ? { perspective: '1200px' } : {}}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.name}
                  onClick={() => setExpanded(i)}
                  className={`product-iso-card cursor-pointer group relative bg-navy-800/60 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden transition-all duration-500 hover:border-green-400/20 ${
                    isDesktop ? 'iso-card' : ''
                  }`}
                >
                  {/* Subtle category image background */}
                  {cat.bgImage && (
                    <div
                      className="absolute inset-0 z-0 transition-all duration-700 group-hover:opacity-20 group-hover:scale-105"
                      style={{
                        backgroundImage: `url(${cat.bgImage})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right center',
                        opacity: 0.07,
                        transform: 'scale(1)',
                      }}
                    />
                  )}
                  {/* Dark overlay to keep text readable */}
                  <div className="absolute inset-0 z-0 bg-gradient-to-r from-navy-800/95 via-navy-800/80 to-navy-800/40" />

                  {/* Color bar top */}
                  <div className={`relative z-10 h-1.5 bg-gradient-to-r ${cat.color} w-full`} />

                  <div className="relative z-10 p-6">
                    <div className="flex items-center gap-4 mb-5">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(122,182,72,0.3)]"
                        style={{ background: `${cat.accent}20` }}
                      >
                        <Icon className="text-green-400 transition-transform duration-300 group-hover:scale-110" size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                        {cat.name}
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {cat.products.slice(0, 4).map((product) => (
                        <span
                          key={product.name}
                          className="text-xs bg-white/5 text-white/60 px-3 py-1.5 rounded-full border border-white/5"
                        >
                          {product.name}
                        </span>
                      ))}
                      {cat.products.length > 4 && (
                        <span className="text-xs text-green-400/60 px-3 py-1.5">
                          +{cat.products.length - 4} mas
                        </span>
                      )}
                    </div>

                    {cat.brands.length > 0 && (
                      <div className="pt-4 border-t border-white/5">
                        <div className="flex flex-wrap gap-2">
                          {cat.brands.map((brand) => (
                            <span
                              key={brand}
                              className="text-xs text-green-400/80 bg-green-400/5 px-2.5 py-1 rounded font-semibold border border-green-400/10"
                            >
                              {brand}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Hover glow */}
                  <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-t from-green-400/5 to-transparent" />
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
            className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-white font-semibold px-8 py-4 rounded-xl hover:bg-green-400/10 hover:border-green-400/20 transition-all duration-300 group"
          >
            <Download size={18} className="group-hover:animate-bounce" />
            Descargar Catálogo PDF
          </a>
        </div>
      </div>

      {/* Marquee strip of product images */}
      <div
        className="marquee-strip mt-20 overflow-hidden relative"
        onMouseEnter={pauseMarquee}
        onMouseLeave={resumeMarquee}
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 w-32 h-full z-10 bg-gradient-to-r from-navy-950 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 w-32 h-full z-10 bg-gradient-to-l from-navy-950 to-transparent pointer-events-none" />

        <div className="flex items-center border-t border-b border-white/5 py-6">
          <div ref={marqueeRef} className="flex items-center gap-10 will-change-transform">
            {/* Duplicate for seamless loop */}
            {[...marqueeItems, ...marqueeItems].map((item, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 flex flex-col items-center gap-2 group/item"
              >
                <div className="w-20 h-20 relative flex items-center justify-center">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="max-w-full max-h-full object-contain transition-all duration-300 group-hover/item:scale-110"
                    style={{
                      filter: 'drop-shadow(0 4px 12px rgba(122,182,72,0.15))',
                      opacity: 0.75,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLImageElement).style.opacity = '1';
                      (e.currentTarget as HTMLImageElement).style.filter = 'drop-shadow(0 4px 20px rgba(122,182,72,0.4))';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLImageElement).style.opacity = '0.75';
                      (e.currentTarget as HTMLImageElement).style.filter = 'drop-shadow(0 4px 12px rgba(122,182,72,0.15))';
                    }}
                  />
                </div>
                <span className="text-white/30 text-xs font-medium tracking-wide whitespace-nowrap group-hover/item:text-white/60 transition-colors duration-300">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Expanded product detail overlay */}
      {expanded !== null && (
        <div
          className="fixed inset-0 z-[70] bg-navy-950/90 backdrop-blur-md flex items-center justify-center p-6"
          onClick={() => setExpanded(null)}
        >
          <div
            className="bg-navy-800 border border-white/10 rounded-2xl p-8 max-w-lg w-full relative max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setExpanded(null)}
              className="absolute top-4 right-4 text-white/50 hover:text-white"
            >
              <X size={24} />
            </button>

            <div className={`h-2 bg-gradient-to-r ${categories[expanded].color} rounded-full mb-6`} />

            <div className="flex items-center gap-4 mb-6">
              {(() => { const Icon = categories[expanded].icon; return <Icon className="text-green-400" size={28} />; })()}
              <h3 className="text-2xl font-black text-white">{categories[expanded].name}</h3>
            </div>

            <div className="mb-6">
              <p className="text-white/40 text-xs uppercase tracking-widest font-bold mb-3">Productos</p>
              <div className="flex flex-col gap-1">
                {categories[expanded].products.map((p) => (
                  <div key={p.name} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                    {p.img ? (
                      <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
                        <img
                          src={p.img}
                          alt={p.name}
                          className="max-w-full max-h-full object-contain"
                          style={{ filter: 'drop-shadow(0 2px 6px rgba(122,182,72,0.2))' }}
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400/60" />
                      </div>
                    )}
                    <span className="text-white/70 text-sm">{p.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {categories[expanded].brands.length > 0 && (
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest font-bold mb-3">Marcas Autorizadas</p>
                <div className="flex flex-wrap gap-2">
                  {categories[expanded].brands.map((b) => (
                    <span key={b} className="text-sm font-semibold text-green-400 bg-green-400/10 px-4 py-2 rounded-lg border border-green-400/20">
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
