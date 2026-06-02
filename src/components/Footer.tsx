import { Phone, Mail, MapPin } from 'lucide-react';

const quickLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Productos', href: '#productos' },
  { label: 'Valores', href: '#valores' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Footer() {
  return (
    <footer className="bg-navy-950 relative overflow-hidden pt-16 pb-8">
      {/* Blueprint grid background */}
      <div className="absolute inset-0 texture-blueprint opacity-60" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 pb-12 border-b border-green-400/10">
          {/* Logo as architect stamp */}
          <div>
            <div className="inline-block border-2 border-green-400/30 rounded-full px-6 py-3 mb-5">
              <div className="flex items-baseline gap-0">
                <span className="text-xl font-black tracking-tight text-green-400">CONSTRU</span>
                <span className="text-xl font-black tracking-tight text-white">FAST</span>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Donde la obra nunca se detiene. Distribuidora de materiales de
              construcción en Querétaro.
            </p>
          </div>

          {/* Links as blueprint annotations */}
          <div>
            <h4 className="text-green-400/60 font-bold text-xs uppercase tracking-widest mb-5">
              -- Enlaces --
            </h4>
            <nav className="space-y-2">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-white/40 hover:text-green-400 text-sm transition-colors neon-glow font-mono"
                >
                  &gt; {link.label}
                </a>
              ))}
              <a
                href="/Catalogo_CONSTRUFAST_compressed.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white/40 hover:text-green-400 text-sm transition-colors neon-glow font-mono"
              >
                &gt; Catálogo PDF
              </a>
            </nav>
          </div>

          {/* Contact info with dashed connectors */}
          <div>
            <h4 className="text-green-400/60 font-bold text-xs uppercase tracking-widest mb-5">
              -- Contacto --
            </h4>
            <div className="space-y-4">
              <a href="tel:+524421797779" className="flex items-center gap-3 text-white/40 hover:text-green-400 text-sm transition-colors group">
                <Phone size={14} className="text-green-400/50 group-hover:text-green-400" />
                <span className="border-b border-dashed border-white/10 group-hover:border-green-400/30 pb-0.5">
                  442 179 7779
                </span>
              </a>
              <a href="mailto:construfastqro@outlook.com" className="flex items-center gap-3 text-white/40 hover:text-green-400 text-sm transition-colors group">
                <Mail size={14} className="text-green-400/50 group-hover:text-green-400" />
                <span className="border-b border-dashed border-white/10 group-hover:border-green-400/30 pb-0.5">
                  construfastqro@outlook.com
                </span>
              </a>
              <a href="https://maps.app.goo.gl/MVahfBkaS8jZivFz5" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-white/40 hover:text-green-400 text-sm transition-colors group">
                <MapPin size={14} className="text-green-400/50 group-hover:text-green-400 mt-0.5 flex-shrink-0" />
                <span className="border-b border-dashed border-white/10 group-hover:border-green-400/30 pb-0.5">
                  C. Kilimanjaro #3 Col. Loma Bonita, Qro. C.P. 76118
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs font-mono">
            &copy; {new Date().getFullYear()} CONSTRUFAST // TODOS LOS DERECHOS RESERVADOS
          </p>
          <a
            href="https://instagram.com/construfast_qro"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/20 hover:text-green-400 text-xs transition-colors font-mono"
          >
            @construfast_qro
          </a>
        </div>
      </div>
    </footer>
  );
}
