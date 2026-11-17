import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onBookClick: () => void;
}

const NAV_LINKS = [
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Results', href: '#results' },
  { label: 'Estimator', href: '#estimator' },
  { label: 'About', href: '#about' },
];

export function Navbar({ onBookClick }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  const handleCtaClick = () => {
    setMobileOpen(false);
    onBookClick();
  };

  return (
    <header className="sticky top-0 z-40 h-16 bg-[#0A0B0D]/90 backdrop-blur-md border-b border-white/[0.08]">
      <div className="max-w-[1200px] mx-auto h-full px-6 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="font-display text-lg font-bold tracking-tight text-neutral-50 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-500 rounded-sm"
        >
          Elevate Digital SA
        </a>

        {/* Zone 2: 4 clean single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:text-neutral-50 hover:border-amber-500 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-500 rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="hidden md:flex items-center shrink-0">
          <button
            type="button"
            onClick={handleCtaClick}
            className="px-5 py-2.5 text-sm font-semibold text-[#0A0B0D] bg-amber-500 hover:bg-amber-400 active:bg-amber-600 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
          >
            Book Strategy Call
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-neutral-200 hover:text-neutral-50 hover:bg-white/[0.06] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-500"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile navigation drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#121418] border-b border-white/[0.08] px-6 py-5 space-y-4">
          <nav aria-label="Mobile navigation" className="flex flex-col space-y-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="py-2.5 text-base font-medium text-neutral-200 hover:text-amber-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            onClick={handleCtaClick}
            className="w-full py-3 px-5 text-sm font-semibold text-[#0A0B0D] bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors cursor-pointer"
          >
            Book Strategy Call
          </button>
        </div>
      )}
    </header>
  );
}
