import { useState } from 'react';
import { Compass } from 'lucide-react';

interface ResilientImageProps {
  src?: string;
  alt: string;
  fallbackTitle: string;
  className?: string;
}

export function ResilientImage({
  src,
  alt,
  fallbackTitle,
  className = '',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#161920] via-[#121418] to-[#0A0B0D] border border-white/[0.08] p-6 text-center ${className}`}
      >
        <Compass className="w-8 h-8 text-amber-500/80 mb-3" aria-hidden="true" />
        <p className="font-display text-sm font-semibold text-neutral-200 max-w-xs">
          {fallbackTitle}
        </p>
        <p className="text-xs text-neutral-400 mt-1">
          Elevate Digital SA · Adelaide
        </p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
