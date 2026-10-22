import React, { useId, useState, useEffect } from 'react';

export interface SigapLogoProps {
  variant?: 'icon' | 'horizontal' | 'stacked' | 'monochrome-cream' | 'monochrome-navy' | 'favicon';
  size?: number | string;
  animated?: boolean;
  isIntroSplash?: boolean;
  countdownSeconds?: number; // for countdown ring on Beranda (0 to 3600)
  totalSeconds?: number; // default 3600
  showTagline?: boolean;
  className?: string;
  onClick?: () => void;
}

export const SigapLogo: React.FC<SigapLogoProps> = ({
  variant = 'icon',
  size = 64,
  animated = false,
  isIntroSplash = false,
  countdownSeconds,
  totalSeconds = 3600,
  showTagline = true,
  className = '',
  onClick,
}) => {
  const filterId = useId().replace(/:/g, '');
  const [activeSecondTick, setActiveSecondTick] = useState<number>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Idle second-hand tick loop (60s cycle)
  useEffect(() => {
    if (prefersReducedMotion || countdownSeconds !== undefined) return;
    const interval = setInterval(() => {
      setActiveSecondTick((prev) => (prev + 1) % 60);
    }, 1000);
    return () => clearInterval(interval);
  }, [prefersReducedMotion, countdownSeconds]);

  // Color schemes based on variant
  const isMonoCream = variant === 'monochrome-cream';
  const isMonoNavy = variant === 'monochrome-navy';

  const tealColor = isMonoCream ? '#FFF4B7' : isMonoNavy ? '#000B58' : '#006A67';
  const creamColor = isMonoCream ? '#FFF4B7' : isMonoNavy ? '#000B58' : '#FFF4B7';
  const dimColor = isMonoCream ? 'rgba(255, 244, 183, 0.2)' : isMonoNavy ? 'rgba(0, 11, 88, 0.2)' : 'rgba(0, 106, 103, 0.25)';

  // 60 ticks definition
  // Gap at 12 o'clock: omit ticks 58, 59, 60, 1, 2
  // We number ticks 1 to 60. Angle is: -90 + (i * 6) degrees.
  const allTicks = Array.from({ length: 60 }, (_, idx) => {
    const tickNum = idx + 1; // 1..60
    const isGap = [58, 59, 60, 1, 2].includes(tickNum);
    const isMajor = tickNum % 5 === 0; // every 5th tick (12 total)
    const angleDeg = -90 + tickNum * 6;
    const angleRad = (angleDeg * Math.PI) / 180;

    const cx = 100;
    const cy = 100;
    const radius = 80;

    // normal tick: len 8 (r=76 to r=84), major tick: len 14 (r=72 to r=86)
    const innerR = isMajor ? 72 : 76;
    const outerR = isMajor ? 86 : 84;

    const x1 = cx + innerR * Math.cos(angleRad);
    const y1 = cy + innerR * Math.sin(angleRad);
    const x2 = cx + outerR * Math.cos(angleRad);
    const y2 = cy + outerR * Math.sin(angleRad);

    return {
      tickNum,
      isGap,
      isMajor,
      x1,
      y1,
      x2,
      y2,
      angleDeg,
    };
  });

  // Render Favicon variant (simplified 32px with 12 ticks + dot)
  if (variant === 'favicon') {
    return (
      <svg
        viewBox="0 0 32 32"
        width={size}
        height={size}
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="16" cy="16" r="15" fill="#000B58" />
        <g stroke="#006A67" strokeWidth="1.5" strokeLinecap="round">
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 - 90) * (Math.PI / 180);
            if (i === 0) return null; // gap at 12 o'clock
            const r1 = 10.5;
            const r2 = 13.5;
            return (
              <line
                key={i}
                x1={16 + r1 * Math.cos(angle)}
                y1={16 + r1 * Math.sin(angle)}
                x2={16 + r2 * Math.cos(angle)}
                y2={16 + r2 * Math.sin(angle)}
                stroke={i % 3 === 0 ? '#FFF4B7' : '#006A67'}
              />
            );
          })}
        </g>
        <circle cx="16" cy="4.5" r="2" fill="#FFF4B7" />
      </svg>
    );
  }

  // Calculate active ticks for countdown ring
  const activeTickCount =
    countdownSeconds !== undefined
      ? Math.round((countdownSeconds / totalSeconds) * 60)
      : 60;

  // Icon SVG
  const IconSvg = (
    <svg
      viewBox="0 0 200 200"
      className={`shrink-0 overflow-visible ${className}`}
      style={{
        width: typeof size === 'number' ? `${size}px` : size,
        height: typeof size === 'number' ? `${size}px` : size,
      }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Logo SIGAP 60: Cincin 60 dan Celah Pertama"
    >
      <defs>
        {/* Soft glow filter for cream dot */}
        <filter id={`glow-${filterId}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur1" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur2" />
          <feMerge>
            <feMergeNode in="blur2" />
            <feMergeNode in="blur1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Pulse ring animation style */}
        <style>{`
          @keyframes introTicks {
            0% { opacity: 0; stroke-dashoffset: 20; }
            100% { opacity: 1; stroke-dashoffset: 0; }
          }
          @keyframes dotEnter {
            0% { transform: translate(100px, -40px) scale(0.2); opacity: 0; }
            60% { transform: translate(100px, 16px) scale(1.3); opacity: 1; }
            100% { transform: translate(100px, 20px) scale(1); opacity: 1; }
          }
        `}</style>
      </defs>

      {/* 1. Circular Ring of 60 ticks (omit ticks 58, 59, 60, 1, 2) */}
      <g id="sigap-ring-ticks">
        {allTicks.map((tick, i) => {
          if (tick.isGap) return null;

          // Countdown coloring or active second hand
          let tickStroke = tick.isMajor ? creamColor : tealColor;
          let tickOpacity = tick.isMajor ? 0.75 : 0.85;

          if (countdownSeconds !== undefined) {
            // In countdown mode: ticks beyond remaining fraction become dim
            const isRemaining = tick.tickNum <= activeTickCount;
            if (!isRemaining) {
              tickStroke = dimColor;
              tickOpacity = 0.2;
            }
          } else if (animated && !prefersReducedMotion) {
            // Idle loop: bright second hand tick effect
            if (activeSecondTick === tick.tickNum - 1) {
              tickStroke = creamColor;
              tickOpacity = 1;
            }
          }

          // Animation delays during intro (~0.0s - 1.4s)
          const introAnimStyle =
            animated && !prefersReducedMotion
              ? {
                  animation: `introTicks 0.35s ease-out ${(i * 0.024).toFixed(3)}s forwards`,
                  opacity: 0,
                }
              : { opacity: tickOpacity };

          return (
            <line
              key={tick.tickNum}
              x1={tick.x1}
              y1={tick.y1}
              x2={tick.x2}
              y2={tick.y2}
              stroke={tickStroke}
              strokeWidth={tick.isMajor ? 2.5 : 2}
              strokeLinecap="round"
              style={introAnimStyle}
            />
          );
        })}
      </g>

      {/* 2. Glowing Cream Dot at 12 o'clock gap (x=100, y=20, r=6) */}
      <g id="sigap-companion-dot">
        {/* Pulse ring expanding on arrival (1.4s - 2.2s) */}
        {animated && !prefersReducedMotion && (
          <circle
            cx="100"
            cy="20"
            r="6"
            fill="none"
            stroke={creamColor}
            style={{
              animation: 'pulseRing 0.8s ease-out 1.4s forwards',
              opacity: 0,
            }}
          />
        )}

        {/* Glowing dot */}
        <g
          style={
            animated && !prefersReducedMotion
              ? {
                  animation: 'dotEnter 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 1.4s forwards',
                  transformOrigin: '100px 20px',
                }
              : {}
          }
        >
          {/* Subtle outer halo */}
          <circle
            cx="100"
            cy="20"
            r="11"
            fill={creamColor}
            opacity="0.18"
            filter={`url(#glow-${filterId})`}
          />
          {/* Core glowing dot */}
          <circle
            cx="100"
            cy="20"
            r="6"
            fill={creamColor}
            filter={`url(#glow-${filterId})`}
            className={animated && !prefersReducedMotion ? 'animate-dot-glow' : ''}
          />
        </g>
      </g>
    </svg>
  );

  // If icon only requested
  if (variant === 'icon' || variant === 'monochrome-cream' || variant === 'monochrome-navy') {
    return (
      <div
        className={`inline-flex items-center justify-center ${className}`}
        onClick={onClick}
      >
        {IconSvg}
      </div>
    );
  }

  // Wordmark element
  const Wordmark = (
    <div className="flex flex-col select-none">
      <div className="flex items-baseline gap-1.5">
        <span
          className="font-extrabold tracking-[0.18em] text-cream"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: isIntroSplash ? '32px' : '20px',
            color: creamColor,
            lineHeight: 1,
          }}
        >
          SIGAP
        </span>
        <span
          className="font-extrabold text-teal border-b-2 border-cream/80 pb-0.5"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: isIntroSplash ? '32px' : '20px',
            color: tealColor,
            borderColor: creamColor,
            lineHeight: 1,
          }}
        >
          60
        </span>
      </div>
      {showTagline && (
        <span
          className="text-cream/70 font-medium tracking-wide mt-1"
          style={{
            fontSize: isIntroSplash ? '13px' : '10px',
            color: isMonoNavy ? '#000B58' : 'rgba(255, 244, 183, 0.7)',
            lineHeight: 1.2,
          }}
        >
          Jam pertama menentukan.
        </span>
      )}
    </div>
  );

  // Stacked Lockup
  if (variant === 'stacked') {
    return (
      <div
        className={`inline-flex flex-col items-center justify-center gap-3 text-center ${className}`}
        onClick={onClick}
      >
        {IconSvg}
        {Wordmark}
      </div>
    );
  }

  // Horizontal Lockup (Default for Navbar & Branding)
  return (
    <div
      className={`inline-flex items-center gap-3.5 cursor-pointer ${className}`}
      onClick={onClick}
    >
      {IconSvg}
      {Wordmark}
    </div>
  );
};
