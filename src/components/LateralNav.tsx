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
      {/* Logo fixed top-left */}
      <a
        href="#inicio"
        className="fixed top-6 left-6 z-50 flex items-baseline gap-0"
      >
        <span className="text-xl font-black tracking-tight text-green-400">CONSTRU</span>
        <span className="text-xl font-black tracking-tight text-white">FAST</span>
      </a>

      {/* Cotizar button fixed top-right */}
      <a
        href="#contacto"
        className="fixed top-6 right-6 z-50 text-sm font-bold bg-green-400 text-navy-900 px-5 py-2.5 rounded-lg hover:bg-green-300 transition-colors duration-200 hover:shadow-[0_0_20px_rgba(122,182,72,0.3)]"
      >
        Cotizar
      </a>

      {/* Lateral dots */}
      <nav className="nav-lateral" aria-label="Navegación de secciones">
        <div className="relative flex flex-col items-center gap-6">
          {/* Background line */}
          <div className="absolute top-0 bottom-0 w-[2px] bg-white/10 left-1/2 -translate-x-1/2" />

          {sections.map((section, i) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`nav-dot relative z-10 ${i === active ? 'active' : ''}`}
              aria-label={section.label}
            >
              <span className="nav-dot-label">{section.label}</span>
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
