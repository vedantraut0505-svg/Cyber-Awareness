import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '../context/ThemeContext.tsx';

/**
 * Ambient spotlight & cursor tracking with grey, green and white aesthetics.
 * Uses simple flat geometry (no circular pill boxes).
 */
export const CursorSpotlight: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const targetPos = useRef({ x: -200, y: -200 });
  const animFrame = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable =
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.getAttribute('role') === 'button' ||
          target.closest('button') ||
          target.closest('a') ||
          target.closest('[role="button"]');
        setIsPointer(!!isClickable);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    let currentX = -200;
    let currentY = -200;
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const render = () => {
      currentX = lerp(currentX, targetPos.current.x, 0.18);
      currentY = lerp(currentY, targetPos.current.y, 0.18);
      setPos({ x: currentX, y: currentY });
      animFrame.current = requestAnimationFrame(render);
    };
    animFrame.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden transition-opacity duration-300">
      {/* Soft ambient green/grey lighting following cursor */}
      <div
        className="absolute transition-transform duration-75 ease-out opacity-40 dark:opacity-30 blur-2xl"
        style={{
          width: '380px',
          height: '380px',
          transform: `translate3d(${pos.x - 190}px, ${pos.y - 190}px, 0)`,
          background:
            resolvedTheme === 'dark'
              ? 'radial-gradient(circle, rgba(34, 197, 94, 0.16) 0%, rgba(74, 222, 128, 0.05) 45%, rgba(0, 0, 0, 0) 70%)'
              : 'radial-gradient(circle, rgba(34, 197, 94, 0.12) 0%, rgba(200, 200, 200, 0.08) 45%, rgba(255, 255, 255, 0) 70%)',
        }}
      />

      {/* Clean precision box indicator (flat square, no circular div) */}
      <div
        className={`absolute border transition-all duration-100 ease-out ${
          isPointer
            ? 'w-7 h-7 -ml-3.5 -mt-3.5 border-emerald-500 bg-emerald-500/15 scale-110'
            : 'w-4 h-4 -ml-2 -mt-2 border-emerald-500/70 bg-emerald-500/10'
        }`}
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        }}
      />
    </div>
  );
};

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glareEffect?: boolean;
}

/**
 * Interactive 3D Card that tilts as the cursor moves over it
 */
export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 5,
  glareEffect = true,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState<string>('');
  const [glarePos, setGlarePos] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTransformStyle(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.008, 1.008, 1.008)`);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.1,
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: 'transform 0.15s ease-out',
        transformStyle: 'preserve-3d',
      }}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {children}

      {/* Dynamic Specular Glare reacting to cursor movement */}
      {glareEffect && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle 220px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.25), transparent 80%)`,
          }}
        />
      )}
    </div>
  );
};
