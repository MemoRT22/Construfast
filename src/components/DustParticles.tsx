import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface DustParticlesProps {
  count?: number;
}

export default function DustParticles({ count = 15 }: DustParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const particles = containerRef.current.querySelectorAll('.dust-particle');
    const tweens: gsap.core.Tween[] = [];

    particles.forEach((p) => {
      const tween = gsap.to(p, {
        y: 'random(-80, 80)',
        x: 'random(-40, 40)',
        opacity: 'random(0, 0.4)',
        duration: 'random(4, 8)',
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: Math.random() * 3,
      });
      tweens.push(tween);
    });

    return () => {
      tweens.forEach((t) => t.kill());
    };
  }, [count]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="dust-particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            opacity: Math.random() * 0.3,
          }}
        />
      ))}
    </div>
  );
}
