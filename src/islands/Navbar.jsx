import { useState, useRef, useEffect } from 'react';
import { serviceCategories } from '@/data/services';

export default function Navbar({ pathname = '/' }) {
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaRef = useRef(null);

  useEffect(() => {
    const h = (e) => { if (megaRef.current && !megaRef.current.contains(e.target)) setMegaOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const active = (href) => href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-gold/20">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-3">
            <span className="font-heading font-black text-2xl tracking-[0.15em] text-charcoal">MRS</span>
            <span className="hidden md:block text-[10px] font-semibold tracking-[0.3em] uppercase text-gold border-l-2 border-gold/30 pl-3">Multifamily Rehab Specialists</span>
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {[
              { label: 'Services', href: '/services', mega: true },
              { label: 'Service Areas', href: '/service-areas' },
              { label: 'Projects', href: '/projects' },
              { label: 'About', href: '/about' },
            ].map((link) => link.mega ? (
              <div key="svc" ref={megaRef} className="relative">
                <button onClick={() => setMegaOpen(v => !v)} className={`px-4 py-2 text-sm font-semibold transition-colors ${active(link.href) ? 'text-gold' : 'text-gray-500 hover:text-charcoal'}`}>
                  Services {megaOpen ? '▲' : '▼'}
                </button>
                {megaOpen && (
                  <div className="absolute top-full left-0 mt-2 bg-white border-2 border-gold/20 shadow-xl p-8 w-[600px]">
                    <div className="grid grid-cols-3 gap-6">
                      {serviceCategories.map(cat => (
                        <div key={cat.slug}>
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gold mb-3">{cat.name}</p>
                          <ul className="space-y-2">
                            {cat.services.map(s => (
                              <li key={s.slug}><a href={`/services/${s.slug}`} className="text-sm text-gray-500 hover:text-gold transition-colors" onClick={() => setMegaOpen(false)}>{s.name}</a></li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 pt-4 border-t border-mid-gray">
                      <a href="/services" className="label-tag hover:underline" onClick={() => setMegaOpen(false)}>View All Services →</a>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <a key={link.href} href={link.href} className={`px-4 py-2 text-sm font-semibold transition-colors ${active(link.href) ? 'text-gold' : 'text-gray-500 hover:text-charcoal'}`}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="tel:8323603804" className="hidden xl:block text-sm font-semibold text-gray-400 hover:text-gold transition-colors">(832) 360-3804</a>
            <a href="/contact" className="hidden lg:flex bg-gold text-white text-xs font-black uppercase tracking-[0.2em] px-6 py-3 hover:bg-emerald-700 transition-colors">
              Get a Bid
            </a>
            <button onClick={() => setOpen(v => !v)} className="lg:hidden p-2 text-charcoal">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {open ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col lg:hidden">
          <div className="flex items-center justify-between px-6 h-16 border-b-2 border-gold/20">
            <span className="font-heading font-black text-2xl tracking-[0.15em] text-charcoal">MRS</span>
            <button onClick={() => setOpen(false)} className="p-2 text-gray-400"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
          </div>
          <nav className="flex-1 flex flex-col justify-center px-8 gap-1">
            {[['Services', '/services'], ['Service Areas', '/service-areas'], ['Projects', '/projects'], ['About', '/about'], ['Contact', '/contact']].map(([label, href]) => (
              <a key={href} href={href} className="font-heading text-3xl font-bold text-charcoal hover:text-gold py-3 border-b border-mid-gray transition-colors">{label}</a>
            ))}
          </nav>
          <div className="px-8 pb-10">
            <a href="/contact" className="block w-full text-center bg-gold text-white py-4 text-xs font-black uppercase tracking-[0.25em] hover:bg-emerald-700 transition-colors">Get a Bid →</a>
          </div>
        </div>
      )}
    </>
  );
}
