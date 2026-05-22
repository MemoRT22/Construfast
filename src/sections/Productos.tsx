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
    products: ['Varilla', 'Armex', 'Alambre', 'Alambron', 'Clavo', 'Malla Electrosoldada', 'Estribo'],
    brands: ['DeAcero', 'Sicartsa', 'Simec'],
    color: 'from-gray-600 to-gray-800',
    accent: '#6b7280',
  },
  {
    name: 'Polvos',
    icon: Cylinder,
    products: ['Cemento', 'Mortero', 'Estuco', 'Yeso', 'Adhesivo', 'Cal'],
    brands: ['Cuvasa', 'Cemex', 'Holcim', 'Unibasico', 'Uniblock'],
    color: 'from-amber-600 to-amber-800',
    accent: '#d97706',
  },
  {
    name: 'Prefabricados',
    icon: Blocks,
    products: ['Block', 'Tabique', 'Ladrillo', 'Vigueta', 'Bovedilla'],
    brands: [],
    color: 'from-stone-500 to-stone-700',
    accent: '#78716c',
  },
  {
    name: 'Agregados',
    icon: Mountain,
    products: ['Arena', 'Grava', 'Tepetate', 'Piedra'],
    brands: [],
    color: 'from-orange-600 to-orange-800',
    accent: '#ea580c',
  },
  {
    name: 'Madera / Ferreteria',
    icon: TreePine,
    products: ['Polin', 'Barrote', 'Triplay', 'Herramientas'],
    brands: ['Truper'],
    color: 'from-yellow-700 to-yellow-900',
    accent: '#a16207',
  },
  {
    name: 'Concreto',
    icon: Layers,
    products: ['Concreto Premezclado'],
    brands: [],
    color: 'from-slate-500 to-slate-700',
    accent: '#64748b',
  },
];

export default function Productos() {
  const sectionRef = useRef<HTMLElement>(null);
  const { isDesktop } = useDevice();
  const [expanded, setExpanded] = useState<number | null>(null);

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="productos" className="py-24 md:py-32 bg-navy-950 relative overflow-hidden">
      <div className="texture-metal absolute inset-0" />

      {/* Warehouse ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-white/5" />
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white/5" />
        <div className="absolute top-0 left-3/4 w-[1px] h-full bg-white/5" />
      </div>

      {/* Top spotlight */}
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

        {/* Product cards grid with perspective */}
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
                  {/* Color bar top */}
                  <div className={`h-1.5 bg-gradient-to-r ${cat.color} w-full`} />

                  <div className="p-6">
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
                          key={product}
                          className="text-xs bg-white/5 text-white/60 px-3 py-1.5 rounded-full border border-white/5"
                        >
                          {product}
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
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-t from-green-400/5 to-transparent" />
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

      {/* Expanded product detail overlay */}
      {expanded !== null && (
        <div
          className="fixed inset-0 z-[70] bg-navy-950/90 backdrop-blur-md flex items-center justify-center p-6"
          onClick={() => setExpanded(null)}
        >
          <div
            className="bg-navy-800 border border-white/10 rounded-2xl p-8 max-w-lg w-full relative"
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
              <div className="grid grid-cols-2 gap-2">
                {categories[expanded].products.map((p) => (
                  <div key={p} className="flex items-center gap-2 text-white/70 text-sm py-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400/60" />
                    {p}
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
