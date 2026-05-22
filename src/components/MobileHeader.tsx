import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Productos', href: '#productos' },
  { label: 'Marcas', href: '#marcas' },
  { label: 'Valores', href: '#valores' },
  { label: 'Contacto', href: '#contacto' },
];

export default function MobileHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-navy-900/95 backdrop-blur-md shadow-lg py-3'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="px-5 flex items-center justify-between">
          <a href="#inicio" className="flex items-baseline gap-0">
            <span className="text-xl font-black tracking-tight text-green-400">CONSTRU</span>
            <span className="text-xl font-black tracking-tight text-white">FAST</span>
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white p-2"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-navy-900/98 backdrop-blur-md menu-slide-in">
          <div className="texture-metal absolute inset-0" />
          <div className="relative h-full flex flex-col justify-center px-8">
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-5 right-5 text-white p-2"
              aria-label="Cerrar menú"
            >
              <X size={28} />
            </button>

            <nav className="space-y-1">
              {navLinks.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-3xl font-black text-white/80 hover:text-green-400 py-3 transition-colors"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <a
              href="#contacto"
              onClick={() => setMenuOpen(false)}
              className="mt-8 inline-block text-center font-bold bg-green-400 text-navy-900 px-6 py-4 rounded-lg text-lg hover:bg-green-300 transition-colors"
            >
              Solicitar Cotización
            </a>
          </div>
        </div>
      )}

      {/* Fixed bottom bar for mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-navy-900/95 backdrop-blur-md border-t border-white/10 py-3 px-4 flex items-center justify-between gap-3 md:hidden">
        <a
          href="#contacto"
          className="flex-1 text-center text-sm font-bold bg-green-400 text-navy-900 py-3 rounded-lg hover:bg-green-300 transition-colors"
        >
          Cotizar
        </a>
        <a
          href="https://wa.me/524421797779?text=Hola%2C%20me%20interesa%20cotizar%20materiales"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center text-sm font-bold bg-[#25D366] text-white py-3 rounded-lg"
        >
          WhatsApp
        </a>
      </div>
    </>
  );
}
