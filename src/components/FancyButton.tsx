'use client';

import { useMemo, useState } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

function getVariantClasses(variant: Variant, disabled: boolean) {
  if (variant === 'primary') {
    return disabled
      ? 'bg-gray-200 text-gray-400 shadow-none cursor-not-allowed'
      : 'bg-black text-white shadow-[0_10px_25px_rgba(0,0,0,0.22)]';
  }
  if (variant === 'secondary') {
    return disabled
      ? 'bg-white text-gray-300 border-gray-200 cursor-not-allowed'
      : 'bg-white text-gray-900 border border-black/10 hover:border-black/20 hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)]';
  }
  // ghost
  return disabled
    ? 'bg-transparent text-gray-300 cursor-not-allowed'
    : 'bg-white/5 text-gray-900/90 border border-black/10 hover:bg-white/20';
}

export function FancyButton({
  variant = 'primary',
  disabled,
  className,
  children,
  onClick,
  type = 'button',
}: {
  variant?: Variant;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
}) {
  const [ripples, setRipples] = useState<Array<{ id: string; x: number; y: number }>>([]);

  const base =
    'relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl px-4 py-2 text-sm font-semibold outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-black/20';

  const primaryHover =
    'hover:-translate-y-[1px] hover:shadow-[0_18px_40px_rgba(0,0,0,0.28)] active:translate-y-0';

  const variantClasses = getVariantClasses(variant, !!disabled);

  const btnClass = useMemo(() => {
    if (disabled) return `${base} ${variantClasses}`;
    if (variant === 'primary') {
      return `${base} ${variantClasses} ${primaryHover} hover:bg-gray-900`; // subtle
    }
    return `${base} ${variantClasses} ${primaryHover}`;
  }, [disabled, variant, variantClasses]);

  function handlePointerDown(e: React.PointerEvent<HTMLButtonElement>) {
    if (disabled) return;

    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    // drive the glow overlay too
    try {
      el.style.setProperty('--rx', `${(x / Math.max(1, r.width)) * 100}%`);
      el.style.setProperty('--ry', `${(y / Math.max(1, r.height)) * 100}%`);
    } catch {
      // ignore
    }

    const id = `${Date.now()}_${Math.random().toString(16).slice(2)}`;
    setRipples((prev) => [...prev.slice(-2), { id, x, y }]);
    // ripple spans auto-remove via animation end
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onPointerDown={handlePointerDown}
      onClick={onClick}
      className={`${btnClass} ${className ?? ''}`}
    >
      {/* moving glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(circle at var(--rx, 50%) var(--ry, 50%), rgba(255,255,255,0.40), transparent 45%)',
        }}
      />

      {/* ripple */}
      {ripples.map((rp) => (
        <span
          key={rp.id}
          aria-hidden
          className="fancy-ripple"
          style={{ left: rp.x, top: rp.y }}
          onAnimationEnd={() => {
            setRipples((prev) => prev.filter((p) => p.id !== rp.id));
          }}
        />
      ))}

      <span className="relative z-10">{children}</span>
    </button>
  );
}

export function FancyAnchor({
  variant = 'primary',
  disabled,
  className,
  children,
  href,
  target,
  rel,
}: {
  variant?: Variant;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  href: string;
  target?: string;
  rel?: string;
}) {
  const [ripples, setRipples] = useState<Array<{ id: string; x: number; y: number }>>([]);

  const base =
    'relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl px-4 py-2 text-sm font-semibold outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-black/20';

  const variantClasses = getVariantClasses(variant, !!disabled);

  function handlePointerDown(e: React.PointerEvent<HTMLAnchorElement>) {
    if (disabled) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    try {
      el.style.setProperty('--rx', `${(x / Math.max(1, r.width)) * 100}%`);
      el.style.setProperty('--ry', `${(y / Math.max(1, r.height)) * 100}%`);
    } catch {
      // ignore
    }

    const id = `${Date.now()}_${Math.random().toString(16).slice(2)}`;
    setRipples((prev) => [...prev.slice(-2), { id, x, y }]);
  }

  const anchorClass = useMemo(() => {
    if (disabled) return `${base} ${variantClasses}`;
    if (variant === 'primary') {
      return `${base} ${variantClasses} hover:-translate-y-[1px] hover:shadow-[0_18px_40px_rgba(0,0,0,0.28)] active:translate-y-0 hover:bg-gray-900`;
    }
    return `${base} ${variantClasses} hover:-translate-y-[1px] active:translate-y-0`;
  }, [disabled, variant, variantClasses]);

  return (
    <a
      aria-disabled={disabled ? 'true' : 'false'}
      href={disabled ? '#' : href}
      target={target}
      rel={rel}
      onPointerDown={handlePointerDown}
      onClick={(e) => {
        if (disabled) e.preventDefault();
      }}
      className={`${anchorClass} ${className ?? ''}`}
    >
      {ripples.map((rp) => (
        <span
          key={rp.id}
          aria-hidden
          className="fancy-ripple"
          style={{ left: rp.x, top: rp.y }}
          onAnimationEnd={() => setRipples((prev) => prev.filter((p) => p.id !== rp.id))}
        />
      ))}
      <span className="relative z-10">{children}</span>
    </a>
  );
}
