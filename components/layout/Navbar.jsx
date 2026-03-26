import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { serviceCategories } from '@/data/services';
import { serviceAreas } from '@/data/serviceAreas';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services', hasMega: true },
  { label: 'Service Areas', href: '/service-areas' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
];

export default function Navbar() {
  const scrollY = useScrollPosition();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileAreasOpen, setMobileAreasOpen] = useState(false);
  const megaRef = useRef(null);
  const scrolled = scrollY > 40;

  useEffect(() => { setMobileOpen(false); }, [router.asPath]);

  useEffect(() => {
    const handleClick = (e) => {
      if (megaRef.current && !megaRef.current.contains(e.target)) setMegaOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const isActive = (href) => {
    if (href === '/') return router.asPath === '/';
    return router.asPath.startsWith(href);
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
            {/* Logo */}
            <Link href="/" className="flex items-baseline gap-1.5 text-white">
              <span className="font-heading text-2xl font-bold tracking-tight">SAADI</span>
              <span className="font-heading text-sm font-medium tracking-wide opacity-90">CONSTRUCTION GROUP</span>
            </Link>

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
                      <ChevronDown className={`w-4 h-4 transition-transform ${megaOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {megaOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[720px] bg-white rounded-xl shadow-2xl border border-mid-gray p-6"
                        >
                          <div className="grid grid-cols-3 gap-6">
                            {serviceCategories.map((cat) => (
                              <div key={cat.slug}>
                                <h4 className="font-heading text-sm font-semibold text-navy mb-3 pb-2 border-b border-mid-gray">
                                  {cat.name}
                                </h4>
                                <ul className="space-y-1.5">
                                  {cat.services.map((s) => (
                                    <li key={s.slug}>
                                      <Link
                                        href={`/services/${s.slug}`}
                                        className="text-sm text-charcoal/80 hover:text-gold transition-colors block py-0.5"
                                        onClick={() => setMegaOpen(false)}
                                      >
                                        {s.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                          <div className="mt-5 pt-4 border-t border-mid-gray text-center">
                            <Link
                              href="/services"
                              className="text-sm font-semibold text-navy hover:text-gold transition-colors"
                              onClick={() => setMegaOpen(false)}
                            >
                              View All Services &rarr;
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive(link.href) ? 'text-gold' : 'text-white/90 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                className="hidden lg:inline-flex items-center px-5 py-2.5 bg-gold text-white text-sm font-semibold rounded-lg hover:bg-gold/90 transition-colors"
              >
                Request a Bid
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden text-white p-2"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-navy z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <span className="font-heading text-xl font-bold text-white">SAADI</span>
                  <button onClick={() => setMobileOpen(false)} className="text-white p-1">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <nav className="space-y-1">
                  {navLinks.map((link) =>
                    link.hasMega ? (
                      <div key={link.label}>
                        <button
                          onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                          className={`flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium rounded-md ${
                            isActive(link.href) ? 'text-gold' : 'text-white/90'
                          }`}
                        >
                          {link.label}
                          <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {mobileServicesOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden pl-3"
                            >
                              {serviceCategories.map((cat) => (
                                <div key={cat.slug} className="mb-3">
                                  <p className="text-xs font-semibold text-gold/80 uppercase tracking-wider px-3 py-1">{cat.name}</p>
                                  {cat.services.map((s) => (
                                    <Link key={s.slug} href={`/services/${s.slug}`} className="block px-3 py-1.5 text-sm text-white/70 hover:text-white">
                                      {s.name}
                                    </Link>
                                  ))}
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : link.label === 'Service Areas' ? (
                      <div key={link.label}>
                        <button
                          onClick={() => setMobileAreasOpen(!mobileAreasOpen)}
                          className={`flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium rounded-md ${
                            isActive(link.href) ? 'text-gold' : 'text-white/90'
                          }`}
                        >
                          {link.label}
                          <ChevronDown className={`w-4 h-4 transition-transform ${mobileAreasOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {mobileAreasOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden pl-3"
                            >
                              {serviceAreas.map((area) => (
                                <Link key={area.slug} href={`/service-areas/${area.slug}`} className="block px-3 py-1.5 text-sm text-white/70 hover:text-white">
                                  {area.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        key={link.label}
                        href={link.href}
                        className={`block px-3 py-2.5 text-sm font-medium rounded-md ${
                          isActive(link.href) ? 'text-gold' : 'text-white/90'
                        }`}
                      >
                        {link.label}
                      </Link>
                    )
                  )}
                </nav>

                <div className="mt-8 space-y-4">
                  <Link href="/contact" className="block w-full text-center px-5 py-3 bg-gold text-white text-sm font-semibold rounded-lg">
                    Request a Bid
                  </Link>
                  <a href="tel:5129629856" className="flex items-center justify-center gap-2 text-white/80 text-sm">
                    <Phone className="w-4 h-4" /> (512) 962-9856
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
