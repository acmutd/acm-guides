import { useEffect, useRef } from 'react';
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

const ORB_CONFIGS = [
  { src: 'orb1', name: 'orb1', className: 'left-[5%] top-[10%]', size: 'w-32', blur: '2px' },
  { src: 'orb2', name: 'orb2', className: 'right-[10%] bottom-[20%]', size: 'w-48', blur: '1px' },
  { src: 'orb3', name: 'orb3', className: 'left-[15%] bottom-[15%]', size: 'w-32', blur: '0px' },
  { src: 'orb4', name: 'orb4', className: 'right-[25%] top-[15%]', size: 'w-40', blur: '0px' },
  { src: 'orb5', name: 'orb5', className: 'left-[40%] top-[60%]', size: 'w-24', blur: '0px' },
  { src: 'orb6', name: 'orb6', className: 'left-[20%] top-[30%]', size: 'w-48', blur: '0px' },
  { src: 'orb7', name: 'orb7', className: 'left-[-5%] top-[30%]', size: 'w-64', blur: '4px' },
  { src: 'orb1', name: 'orb1', className: 'left-[70%] top-[80%]', size: 'w-42', blur: '2px' },
] as const;

const orbSrcMap: Record<string, string> = { orb1, orb2, orb3, orb4, orb5, orb6, orb7 };

const orbAnimations = ORB_CONFIGS.map(() => ({
  duration: 10 + Math.random() * 10 + 's',
  delay: '-' + Math.random() * 10 + 's',
}));

const ParallaxImages = () => {
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

        (layer as HTMLElement).style.transform =
          `translate3d(${x}px, ${y}px, 0)`;
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (!isHovering.current) return;

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
        (layer as HTMLElement).style.transition =
          'transform 6s cubic-bezier(0.05, 0.7, 0.3, 1)';
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

        (layer as HTMLElement).style.transition =
          'transform 6s cubic-bezier(0.05, 0.7, 0.3, 1)';
        (layer as HTMLElement).style.transform =
          `translate3d(${offX * -multiplier}px, ${offY * -multiplier}px, 0)`;

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
    document.body.addEventListener('mousemove', handleMouseMove, {
      passive: true,
    });
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

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden transition-colors duration-500 bg-zinc-50 dark:bg-black">
      <div className="absolute inset-0 z-[1] opacity-[0.03] mix-blend-overlay">
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
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

      {ORB_CONFIGS.map((orb, i) => {
        const blurClass =
          orb.blur === '4px'
            ? 'blur-sm'
            : orb.blur === '2px'
              ? 'blur-[2px]'
              : orb.blur === '1px'
                ? 'blur-[1px]'
                : '';

        return (
          <div key={i} className={`parallax-layer absolute ${orb.name} ${orb.className} z-0`}>
            <img
              src={orbSrcMap[orb.src]}
              alt=""
              className={`animate-float transition-opacity duration-300 ${orb.size} ${blurClass}
                opacity-90 hover:opacity-100 mix-blend-multiply dark:mix-blend-normal dark:opacity-70 dark:hover:opacity-100`}
              style={{
                animationDuration: orbAnimations[i].duration,
                animationDelay: orbAnimations[i].delay,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ParallaxImages;
