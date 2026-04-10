import { useState, useRef } from 'react';
import { serviceCategories } from '@/data/services';
import { serviceAreas } from '@/data/serviceAreas';

const navLinks = [
  { label: 'Services', href: '/services', hasMega: true },
  { label: 'Service Areas', href: '/service-areas' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
];

export default function Navbar({ pathname = '/' }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileAreasOpen, setMobileAreasOpen] = useState(false);
  const megaRef = useRef(null);

  const isActive = (href) => pathname.startsWith(href);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-mid-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <a href="/" className="flex items-center gap-3">
              <span className="font-heading text-2xl font-black tracking-widest text-charcoal">SCG</span>
              <span className="hidden sm:block w-px h-5 bg-mid-gray"></span>
              <span className="hidden sm:block font-body text-xs font-medium tracking-[0.15em] uppercase text-gray-400">Construction</span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0">
              {navLinks.map((link) =>
                link.hasMega ? (
                  <div key={link.label} ref={megaRef} className="relative">
                    <button
                      onClick={() => setMegaOpen(!megaOpen)}
                      className={`flex items-center gap-1 px-4 py-5 text-sm font-medium border-b-2 transition-colors ${
                        isActive(link.href)
                          ? 'border-gold text-charcoal'
                          : 'border-transparent text-gray-500 hover:text-charcoal'
                      }`}
                    >
                      {link.label}
                      <svg className={`w-3.5 h-3.5 transition-transform ${megaOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {megaOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-[700px] bg-white border border-mid-gray shadow-xl p-6 animate-fade-in-up" style={{ animationDuration: '0.15s' }}>
                        <div className="grid grid-cols-3 gap-6">
                          {serviceCategories.map((cat) => (
                            <div key={cat.slug}>
                              <p className="text-xs font-bold uppercase tracking-widest text-gold mb-3">{cat.name}</p>
                              <ul className="space-y-2">
                                {cat.services.map((s) => (
                                  <li key={s.slug}>
                                    <a href={`/services/${s.slug}`} className="text-sm text-gray-600 hover:text-charcoal hover:font-medium transition-colors block" onClick={() => setMegaOpen(false)}>
                                      {s.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                        <div className="mt-5 pt-4 border-t border-mid-gray">
                          <a href="/services" className="text-xs font-bold uppercase tracking-widest text-gold hover:underline" onClick={() => setMegaOpen(false)}>
                            View All Services →
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className={`px-4 py-5 text-sm font-medium border-b-2 transition-colors ${
                      isActive(link.href)
                        ? 'border-gold text-charcoal'
                        : 'border-transparent text-gray-500 hover:text-charcoal'
                    }`}
                  >
                    {link.label}
                  </a>
                )
              )}
            </nav>

            {/* CTA */}
            <div className="flex items-center gap-3">
              <a href="tel:8323603804" className="hidden lg:block text-sm font-medium text-gray-500 hover:text-charcoal transition-colors">
                (832) 360-3804
              </a>
              <a href="/contact" className="hidden lg:inline-flex items-center px-5 py-2 bg-charcoal text-white text-sm font-semibold hover:bg-gold transition-colors duration-200">
                Request a Bid
              </a>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-charcoal" aria-label="Toggle menu">
                {mobileOpen ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
          <div className="fixed top-0 right-0 bottom-0 w-80 max-w-[90vw] bg-white z-50 lg:hidden overflow-y-auto" style={{ animation: 'slideInRight 0.25s ease-out' }}>
            <div className="p-6 border-b border-mid-gray flex justify-between items-center">
              <span className="font-heading text-xl font-black tracking-widest text-charcoal">SCG</span>
              <button onClick={() => setMobileOpen(false)} className="p-1 text-gray-500">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <nav className="p-4 space-y-1">
              {navLinks.map((link) =>
                link.hasMega ? (
                  <div key={link.label}>
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium text-charcoal"
                    >
                      {link.label}
                      <svg className={`w-4 h-4 transition-transform text-gray-400 ${mobileServicesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    {mobileServicesOpen && (
                      <div className="pl-3 mt-1 mb-2">
                        {serviceCategories.map((cat) => (
                          <div key={cat.slug} className="mb-3">
                            <p className="text-xs font-bold uppercase tracking-widest text-gold px-3 py-1">{cat.name}</p>
                            {cat.services.map((s) => (
                              <a key={s.slug} href={`/services/${s.slug}`} className="block px-3 py-1.5 text-sm text-gray-500 hover:text-charcoal">{s.name}</a>
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
                      className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium text-charcoal"
                    >
                      {link.label}
                      <svg className={`w-4 h-4 transition-transform text-gray-400 ${mobileAreasOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    {mobileAreasOpen && (
                      <div className="pl-3 grid grid-cols-2 gap-x-2 mt-1 mb-2">
                        {serviceAreas.map((area) => (
                          <a key={area.slug} href={`/service-areas/${area.slug}`} className="block px-3 py-1.5 text-sm text-gray-500 hover:text-charcoal">{area.name}</a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a key={link.label} href={link.href} className="block px-3 py-2.5 text-sm font-medium text-charcoal">
                    {link.label}
                  </a>
                )
              )}
            </nav>

            <div className="p-4 border-t border-mid-gray space-y-3">
              <a href="/contact" className="block w-full text-center py-3 bg-charcoal text-white text-sm font-semibold hover:bg-gold transition-colors">
                Request a Bid
              </a>
              <a href="tel:8323603804" className="flex items-center justify-center gap-2 text-sm text-gray-500">
                (832) 360-3804
              </a>
            </div>
          </div>
          <style>{`@keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>
        </>
      )}
    </>
  );
}
