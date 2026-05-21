import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useDevice } from './hooks/useDevice';
import LateralNav from './components/LateralNav';
import MobileHeader from './components/MobileHeader';
import WhatsAppButton from './components/WhatsAppButton';
import Hero from './sections/Hero';
import Nosotros from './sections/Nosotros';
import Productos from './sections/Productos';
import Marcas from './sections/Marcas';
import Valores from './sections/Valores';
import Contacto from './sections/Contacto';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function SectionDivider() {
  return (
    <div className="relative h-px bg-navy-950">
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-green-400/20 to-transparent" />
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-8 bg-gradient-to-b from-navy-950 to-navy-950 blur-sm" />
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const { isDesktop } = useDevice();

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setLoading(false),
    });

    tl.to('.door-panel-left', {
      x: '-100%',
      duration: 1.2,
      ease: 'power3.inOut',
      delay: 0.8,
    })
      .to('.door-panel-right', {
        x: '100%',
        duration: 1.2,
        ease: 'power3.inOut',
      }, '<')
      .to('.loader-logo', {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        ease: 'power2.in',
      }, '<0.2')
      .to('.loader-overlay', {
        opacity: 0,
        duration: 0.3,
        pointerEvents: 'none',
      });
  }, []);

  return (
    <>
      {loading && (
        <div className="loader-overlay">
          <div className="door-panel door-panel-left">
            <div className="door-handle" />
          </div>
          <div className="door-panel door-panel-right">
            <div className="door-handle" />
          </div>
          <div className="loader-logo fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none">
            <div className="flex items-baseline">
              <span className="text-4xl sm:text-6xl font-black text-green-400">
                CONSTRU
              </span>
              <span className="text-4xl sm:text-6xl font-black text-white">
                FAST
              </span>
            </div>
          </div>
        </div>
      )}

      <div className={loading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
        {isDesktop ? <LateralNav /> : <MobileHeader />}
        <main className={isDesktop ? 'ml-[60px]' : ''}>
          <Hero />
          <SectionDivider />
          <Nosotros />
          <SectionDivider />
          <Productos />
          <SectionDivider />
          <Marcas />
          <SectionDivider />
          <Valores />
          <SectionDivider />
          <Contacto />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
}

export default App;
