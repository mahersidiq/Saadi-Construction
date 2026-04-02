import { useState, useEffect, useRef } from 'react';
import { serviceCategories } from '@/data/services';
import { serviceAreas } from '@/data/serviceAreas';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services', hasMega: true },
  { label: 'Service Areas', href: '/service-areas' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
];

export default function Navbar({ pathname = '/' }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileAreasOpen, setMobileAreasOpen] = useState(false);
  const megaRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (megaRef.current && !megaRef.current.contains(e.target)) setMegaOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-navy shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a href="/" className="flex items-baseline gap-1.5 text-white">
              <span className="font-heading text-2xl font-bold tracking-tight">SAADI</span>
              <span className="font-heading text-sm font-medium tracking-wide opacity-90">CONSTRUCTION GROUP</span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.hasMega ? (
                  <div key={link.label} ref={megaRef} className="relative">
                    <button
                      onClick={() => setMegaOpen(!megaOpen)}
                      className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        isActive(link.href) ? 'text-gold' : 'text-white/90 hover:text-white'
                      }`}
                    >
                      {link.label}
                      <svg className={`w-4 h-4 transition-transform ${megaOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {megaOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[720px] bg-white rounded-xl shadow-2xl border border-mid-gray p-6 animate-fade-in-up" style={{ animationDuration: '0.2s' }}>
                        <div className="grid grid-cols-3 gap-6">
                          {serviceCategories.map((cat) => (
                            <div key={cat.slug}>
                              <h4 className="font-heading text-sm font-semibold text-navy mb-3 pb-2 border-b border-mid-gray">{cat.name}</h4>
                              <ul className="space-y-1.5">
                                {cat.services.map((s) => (
                                  <li key={s.slug}>
                                    <a href={`/services/${s.slug}`} className="text-sm text-charcoal/80 hover:text-gold transition-colors block py-0.5" onClick={() => setMegaOpen(false)}>
                                      {s.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                        <div className="mt-5 pt-4 border-t border-mid-gray text-center">
                          <a href="/services" className="text-sm font-semibold text-navy hover:text-gold transition-colors" onClick={() => setMegaOpen(false)}>
                            View All Services &rarr;
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive(link.href) ? 'text-gold' : 'text-white/90 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </a>
                )
              )}
            </nav>

            <div className="flex items-center gap-3">
              <a href="/contact" className="hidden lg:inline-flex items-center px-5 py-2.5 bg-gold text-white text-sm font-semibold rounded-lg hover:bg-gold/90 transition-colors">
                Request a Bid
              </a>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-white p-2" aria-label="Toggle menu">
                {mobileOpen ? (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
          <div className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-navy z-50 lg:hidden overflow-y-auto" style={{ animation: 'slideInRight 0.3s ease-out' }}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <span className="font-heading text-xl font-bold text-white">SAADI</span>
                <button onClick={() => setMobileOpen(false)} className="text-white p-1">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <nav className="space-y-1">
                {navLinks.map((link) =>
                  link.hasMega ? (
                    <div key={link.label}>
                      <button
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className={`flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium rounded-md ${isActive(link.href) ? 'text-gold' : 'text-white/90'}`}
                      >
                        {link.label}
                        <svg className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                      </button>
                      {mobileServicesOpen && (
                        <div className="pl-3">
                          {serviceCategories.map((cat) => (
                            <div key={cat.slug} className="mb-3">
                              <p className="text-xs font-semibold text-gold/80 uppercase tracking-wider px-3 py-1">{cat.name}</p>
                              {cat.services.map((s) => (
                                <a key={s.slug} href={`/services/${s.slug}`} className="block px-3 py-1.5 text-sm text-white/70 hover:text-white">{s.name}</a>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : link.label === 'Service Areas' ? (
                    <div key={link.label}>
                      <button
                        onClick={() => setMobileAreasOpen(!mobileAreasOpen)}
                        className={`flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium rounded-md ${isActive(link.href) ? 'text-gold' : 'text-white/90'}`}
                      >
                        {link.label}
                        <svg className={`w-4 h-4 transition-transform ${mobileAreasOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                      </button>
                      {mobileAreasOpen && (
                        <div className="pl-3">
                          {serviceAreas.map((area) => (
                            <a key={area.slug} href={`/service-areas/${area.slug}`} className="block px-3 py-1.5 text-sm text-white/70 hover:text-white">{area.name}</a>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <a key={link.label} href={link.href} className={`block px-3 py-2.5 text-sm font-medium rounded-md ${isActive(link.href) ? 'text-gold' : 'text-white/90'}`}>
                      {link.label}
                    </a>
                  )
                )}
              </nav>

              <div className="mt-8 space-y-4">
                <a href="/contact" className="block w-full text-center px-5 py-3 bg-gold text-white text-sm font-semibold rounded-lg">Request a Bid</a>
                <a href="tel:8323603804" className="flex items-center justify-center gap-2 text-white/80 text-sm">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                  (832) 360-3804
                </a>
              </div>
            </div>
          </div>
          <style>{`
            @keyframes slideInRight {
              from { transform: translateX(100%); }
              to { transform: translateX(0); }
            }
          `}</style>
        </>
      )}
    </>
  );
}
