import { useState, useEffect } from 'react';

const sections = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'nosotros', label: 'Nosotros' },
  { id: 'productos', label: 'Productos' },
  { id: 'marcas', label: 'Marcas' },
  { id: 'valores', label: 'Valores' },
  { id: 'contacto', label: 'Contacto' },
];

export default function LateralNav() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = window.innerHeight * 0.5;

      if (scrollY < threshold) {
        setActive(0);
        return;
      }

      const offset = scrollY + window.innerHeight / 3;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= offset) {
          setActive(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Logo */}
      <a
        href="#inicio"
        className="fixed top-6 left-8 z-50 flex items-baseline gap-0"
      >
        <span className="text-lg font-black tracking-tight text-green-400">CONSTRU</span>
        <span className="text-lg font-black tracking-tight text-white">FAST</span>
      </a>

      {/* Cotizar button */}
      <a
        href="#contacto"
        className="fixed top-6 right-8 z-50 text-sm font-bold bg-green-400 text-navy-900 px-5 py-2.5 rounded-lg hover:bg-green-300 transition-colors duration-200 hover:shadow-[0_0_20px_rgba(122,182,72,0.3)]"
      >
        Cotizar
      </a>

      {/* Floating dot nav — no background panel */}
      <nav
        className="fixed left-6 top-1/2 -translate-y-1/2 z-40"
        aria-label="Navegación de secciones"
      >
        <div className="relative flex flex-col gap-4">
          <div className="absolute top-0 bottom-0 w-[1px] bg-white/[0.06] left-[4px]" />

          {sections.map((section, i) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="group flex items-center gap-3"
            >
              <span
                className={`relative z-10 flex-shrink-0 w-[9px] h-[9px] rounded-full border-2 transition-all duration-300 ${
                  i === active
                    ? 'border-green-400 bg-green-400 shadow-[0_0_10px_rgba(122,182,72,0.5)]'
                    : 'border-white/20 group-hover:border-white/40'
                }`}
              />
              <span
                className={`text-[11px] tracking-wide transition-all duration-300 ${
                  i === active
                    ? 'text-green-400 font-semibold opacity-100'
                    : 'text-white/0 group-hover:text-white/60 font-medium'
                }`}
              >
                {section.label}
              </span>
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
