'use client';
import React, { useEffect, useState } from 'react';
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
  const [transition, setTransition] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (typeof window === 'undefined') return;
      const { width, height } = document.documentElement.getBoundingClientRect();
      const offX = e.clientX - width * 0.5;
      const offY = e.clientY - height * 0.5;

      const layers = document.querySelectorAll('.parallax-layer');
      layers.forEach((layer) => {
        const classes = (layer as HTMLElement).classList;
        let imgClass = '';
        classes.forEach(c => { if(multipliers[c]) imgClass = c; });

        const multiplier = multipliers[imgClass] || 0.02;
        const x = offX * -multiplier;
        const y = offY * -multiplier;
        (layer as HTMLElement).style.transform = `translate(${x}px, ${y}px)`;
      });

      if (transition) setTransition(false);
    };

    const handleMouseLeave = () => {
      setTransition(true);
      document.querySelectorAll('.parallax-layer').forEach((layer) => {
        (layer as HTMLElement).style.transform = `translate(0px, 0px)`;
      });
    };

    const handleMouseEnter = () => setTransition(false);

    document.body.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.body.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [transition]);

  const styles = `
    @keyframes float {
      0%, 100% { transform: translateY(0px) translateX(0px); }
      33% { transform: translateY(-10px) translateX(5px); }
      66% { transform: translateY(5px) translateX(-5px); }
    }
    .animate-float {
      animation: float infinite ease-in-out;
    }
  `;

  const renderOrb = (src: string, name: string, className: string, size: string, blur = "0px") => {
      // eslint-disable-next-line react-hooks/purity
    const duration = 10 + Math.random() * 10 + "s";
      // eslint-disable-next-line react-hooks/purity
    const delay = "-" + Math.random() * 10 + "s";

    return (
        <div className={`parallax-layer absolute ${name} ${className} z-0 transition-transform duration-1000 ease-out`}>
            <img
                src={src}
                alt=""
                className={`animate-float opacity-70 hover:opacity-100 transition-opacity ${size}`}
                style={{
                    filter: `blur(${blur})`,
                    animationDuration: duration,
                    animationDelay: delay
                }}
            />
        </div>
    );
  };

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <style>{styles}</style>

      <div className="absolute inset-0 opacity-[0.03] z-[1]"
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      <div className="parallax-layer peechi absolute z-20 right-[12%] top-[15%] transition-transform duration-1000 ease-out">
        <img
            className="w-32 sm:w-40 lg:w-56 animate-float drop-shadow-[0_0_50px_rgba(255,255,255,0.3)]"
            src={peechi}
            alt="peechi"
            style={{ animationDuration: '6s' }}
        />
      </div>

      {renderOrb(orb1, "orb1", "left-[5%] top-[10%]", "w-32", "2px")}
      {renderOrb(orb2, "orb2", "right-[10%] bottom-[20%]", "w-48", "1px")}
      {renderOrb(orb3, "orb3", "left-[15%] bottom-[15%]", "w-32", "0px")}
      {renderOrb(orb4, "orb4", "right-[25%] top-[15%]", "w-40", "0px")}
      {renderOrb(orb5, "orb5", "left-[40%] top-[60%]", "w-24", "0px")}
      {renderOrb(orb6, "orb6", "left-[20%] top-[30%]", "w-48", "0px")}
      {renderOrb(orb7, "orb7", "left-[-5%] top-[30%]", "w-64", "4px")}
      {renderOrb(orb1, "orb1", "left-[70%] top-[80%]", "w-42", "2px")}

      <div className="absolute -left-[10%] -top-[10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(129,53,218,0.25)_0%,transparent_70%)] z-0" />
      <div className="absolute -right-[10%] top-[20%] w-[40vw] h-[40vw] rounded-full bg-[radial-gradient(circle,rgba(58,218,176,0.15)_0%,transparent_70%)] z-0" />
      <div className="absolute left-[30%] -bottom-[20%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(227,158,52,0.15)_0%,transparent_70%)] z-0" />
    </div>
  );
};

export default ParallaxImages;