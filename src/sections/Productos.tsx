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
} from 'lucide-react';

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
  },
  {
    name: 'Concreto',
    icon: Layers,
    products: [
      { name: 'Concreto Premezclado', img: '/assets/images/Concreto/Fondo_de_Concreto_eliminado.png' },
    ],
    brands: [],
  },
];

export default function Productos() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.productos-title', { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: '.productos-title', start: 'top 85%' },
      });

      gsap.fromTo('.productos-tabs', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.6, delay: 0.2,
        scrollTrigger: { trigger: '.productos-tabs', start: 'top 85%' },
      });

      gsap.fromTo('.productos-content', { opacity: 0 }, {
        opacity: 1, duration: 0.8, delay: 0.4,
        scrollTrigger: { trigger: '.productos-content', start: 'top 85%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!contentRef.current) return;
    const items = contentRef.current.querySelectorAll('.product-item');
    gsap.fromTo(items, { opacity: 0, y: 20, scale: 0.95 }, {
      opacity: 1, y: 0, scale: 1,
      duration: 0.4, stagger: 0.05,
      ease: 'power2.out',
      overwrite: true,
    });
  }, [activeTab]);

  const current = categories[activeTab];

  return (
    <section ref={sectionRef} id="productos" className="py-24 md:py-32 bg-navy-950 relative overflow-hidden">
      <div className="texture-metal absolute inset-0" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="productos-title text-center mb-12">
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

        {/* Category tabs */}
        <div className="productos-tabs mb-10">
          <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-hide justify-start md:justify-center">
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              const isActive = i === activeTab;
              return (
                <button
                  key={cat.name}
                  onClick={() => setActiveTab(i)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300 flex-shrink-0 ${
                    isActive
                      ? 'bg-green-400/10 text-green-400 border border-green-400/20'
                      : 'text-white/40 hover:text-white/70 hover:bg-white/[0.03] border border-transparent'
                  }`}
                >
                  <Icon size={16} />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Product gallery */}
        <div className="productos-content" ref={contentRef}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {current.products.map((product) => (
              <div
                key={product.name}
                className="product-item group"
              >
                <div className="aspect-square rounded-xl border border-white/[0.06] bg-white/[0.02] flex items-center justify-center p-6 transition-all duration-300 group-hover:border-green-400/20 group-hover:bg-white/[0.04] group-hover:shadow-[0_8px_32px_rgba(122,182,72,0.08)]">
                  {product.img ? (
                    <img
                      src={product.img}
                      alt={product.name}
                      className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
                      style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }}
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                      {(() => { const CatIcon = current.icon; return <CatIcon className="text-white/20" size={28} />; })()}
                    </div>
                  )}
                </div>
                <p className="text-center text-sm text-white/50 mt-3 font-medium group-hover:text-white/80 transition-colors duration-300">
                  {product.name}
                </p>
              </div>
            ))}
          </div>

          {/* Brands row */}
          {current.brands.length > 0 && (
            <div className="mt-10 pt-8 border-t border-white/[0.04]">
              <p className="text-white/25 text-xs uppercase tracking-widest font-bold mb-4 text-center">
                Marcas Autorizadas
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {current.brands.map((brand) => (
                  <span
                    key={brand}
                    className="text-sm font-medium text-green-400/80 bg-green-400/[0.06] px-5 py-2 rounded-lg border border-green-400/10"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Download catalog */}
        <div className="text-center mt-16">
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
    </section>
  );
}
