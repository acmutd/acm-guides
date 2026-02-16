'use client';
import React, { useEffect, useRef } from 'react';
import { peechi, orb1, orb2, orb3, orb4, orb5, orb6, orb7 } from './data';

const multipliers: { [key: string]: number } = {
  peechi: 0.03,
  orb1: 0.05,
  orb2: 0.04,
  orb3: 0.06,
  orb4: 0.04,
  orb5: 0.03,
  orb6: 0.05,
  orb7: 0.04,
};

const ParallaxImages: React.FC = () => {
  const rafRef = useRef<number | undefined>(undefined);
  const mousePos = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);

  useEffect(() => {
    let width = window.innerWidth;
    let height = window.innerHeight;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
    };

    const updateParallax = () => {
      if (!isHovering.current) return;

      const offX = mousePos.current.x - width * 0.5;
      const offY = mousePos.current.y - height * 0.5;

      const layers = document.querySelectorAll('.parallax-layer');
      layers.forEach((layer) => {
        let imgClass = '';
        layer.classList.forEach((c) => {
          if (multipliers[c]) imgClass = c;
        });

        const multiplier = multipliers[imgClass] || 0.02;
        const x = offX * -multiplier;
        const y = offY * -multiplier;
        
        (layer as HTMLElement).style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      if (!isHovering.current) return;

      // Cancel previous frame and request new one (safari throttling workaround me thinks)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      rafRef.current = requestAnimationFrame(updateParallax);
    };

    const handleMouseLeave = () => {
      isHovering.current = false;
      
      document.querySelectorAll('.parallax-layer').forEach((layer) => {
        const img = layer.querySelector('img');
        if (img) img.style.animation = 'none';
        (layer as HTMLElement).style.transition = 'transform 6s cubic-bezier(0.05, 0.7, 0.3, 1)';
        (layer as HTMLElement).style.transform = 'translate3d(0, 0, 0)';
      });

      setTimeout(() => {
        document.querySelectorAll('.parallax-layer img').forEach((img) => {
          (img as HTMLElement).style.animation = '';
        });
      }, 2000);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      isHovering.current = true;
      mousePos.current = { x: e.clientX, y: e.clientY };

      const offX = e.clientX - width * 0.5;
      const offY = e.clientY - height * 0.5;

      document.querySelectorAll('.parallax-layer').forEach((layer) => {
        let imgClass = '';
        layer.classList.forEach((c) => {
          if (multipliers[c]) imgClass = c;
        });
        const multiplier = multipliers[imgClass] || 0.02;

        (layer as HTMLElement).style.transition = 'transform 6s cubic-bezier(0.05, 0.7, 0.3, 1)';
        (layer as HTMLElement).style.transform = `translate3d(${offX * -multiplier}px, ${offY * -multiplier}px, 0)`;

        const img = layer.querySelector('img');
        if (img) (img as HTMLElement).style.animation = '';
      });

      setTimeout(() => {
        document.querySelectorAll('.parallax-layer').forEach((layer) => {
          (layer as HTMLElement).style.transition = 'none';
        });
      }, 6000);
    };

    window.addEventListener('resize', handleResize);
    document.body.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener('resize', handleResize);
      document.body.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  const styles = `
    @keyframes float {
      0%, 100% { transform: translateY(0px) translateX(0px); }
      33% { transform: translateY(-10px) translateX(5px); }
      66% { transform: translateY(5px) translateX(-5px); }
    }
    .animate-float {
      animation: float infinite ease-in-out;
    }
    .parallax-layer {
      will-change: transform;
    }
  `;

  const renderOrb = (
    src: string,
    name: string,
    className: string,
    size: string,
    blur = '0px'
  ) => {
    const duration = 10 + Math.random() * 10 + 's';
    const delay = '-' + Math.random() * 10 + 's';

    const blurClass = blur === '4px' ? 'blur-sm' :
      blur === '2px' ? 'blur-[2px]' :
      blur === '1px' ? 'blur-[1px]' :
      '';

    return (
      <div
        className={`parallax-layer absolute ${name} ${className} z-0`}
      >
        <img
          src={src}
          alt=""
          className={`animate-float transition-opacity duration-300 ${size} ${blurClass}
            opacity-90 hover:opacity-100 mix-blend-multiply dark:mix-blend-normal dark:opacity-70 dark:hover:opacity-100`}
          style={{
            animationDuration: duration,
            animationDelay: delay,
          }}
        />
      </div>
    );
  };

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden transition-colors duration-500 bg-zinc-50 dark:bg-black">
      <style>{styles}</style>

      <div className="absolute inset-0 z-[1] opacity-[0.03] dark:opacity-[0.03] mix-blend-overlay">
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full opacity-100"
        >
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* Gradient blobs - reduced blur */}
      <div
        className="absolute -left-[10%] -top-[10%] w-[50vw] h-[50vw] rounded-full blur-2xl z-0
        bg-[radial-gradient(circle,rgba(168,85,247,0.4)_0%,transparent_70%)]
        dark:bg-[radial-gradient(circle,rgba(129,53,218,0.25)_0%,transparent_70%)]"
      />

      <div
        className="absolute -right-[10%] top-[20%] w-[40vw] h-[40vw] rounded-full blur-2xl z-0
        bg-[radial-gradient(circle,rgba(45,212,191,0.4)_0%,transparent_70%)]
        dark:bg-[radial-gradient(circle,rgba(58,218,176,0.15)_0%,transparent_70%)]"
      />

      <div
        className="absolute left-[30%] -bottom-[20%] w-[60vw] h-[60vw] rounded-full blur-2xl z-0
        bg-[radial-gradient(circle,rgba(249,115,22,0.3)_0%,transparent_70%)]
        dark:bg-[radial-gradient(circle,rgba(227,158,52,0.15)_0%,transparent_70%)]"
      />

      <div className="parallax-layer peechi absolute z-20 right-[12%] top-[15%]">
        <img
          className="w-32 sm:w-40 lg:w-56 animate-float
            drop-shadow-[0_10px_20px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_0_50px_rgba(255,255,255,0.3)]"
          src={peechi}
          alt="peechi"
          style={{ animationDuration: '6s' }}
        />
      </div>

      {renderOrb(orb1, 'orb1', 'left-[5%] top-[10%]', 'w-32', '2px')}
      {renderOrb(orb2, 'orb2', 'right-[10%] bottom-[20%]', 'w-48', '1px')}
      {renderOrb(orb3, 'orb3', 'left-[15%] bottom-[15%]', 'w-32', '0px')}
      {renderOrb(orb4, 'orb4', 'right-[25%] top-[15%]', 'w-40', '0px')}
      {renderOrb(orb5, 'orb5', 'left-[40%] top-[60%]', 'w-24', '0px')}
      {renderOrb(orb6, 'orb6', 'left-[20%] top-[30%]', 'w-48', '0px')}
      {renderOrb(orb7, 'orb7', 'left-[-5%] top-[30%]', 'w-64', '4px')}
      {renderOrb(orb1, 'orb1', 'left-[70%] top-[80%]', 'w-42', '2px')}
    </div>
  );
};

export default ParallaxImages;