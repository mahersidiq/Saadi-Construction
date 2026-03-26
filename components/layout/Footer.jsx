import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import { serviceCategories } from '@/data/services';
import { serviceAreas } from '@/data/serviceAreas';

const unitServices = serviceCategories.find((c) => c.slug === 'unit-renovation')?.services || [];
const propertyServices = serviceCategories.find((c) => c.slug === 'property-wide')?.services || [];
const managementServices = serviceCategories.find((c) => c.slug === 'management')?.services || [];

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Logo & Contact */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <span className="font-heading text-2xl font-bold tracking-tight">SAADI</span>
              <span className="font-heading text-sm font-medium tracking-wide block opacity-90">CONSTRUCTION GROUP</span>
            </Link>
            <p className="text-white/70 text-sm mb-6">
              Houston&apos;s Apartment Renovation Specialists
            </p>
            <div className="space-y-3 text-sm">
              <a href="tel:5129629856" className="flex items-center gap-2 text-white/80 hover:text-gold transition-colors">
                <Phone className="w-4 h-4 shrink-0" />
                (512) 962-9856
              </a>
              <a href="mailto:Maher@saadi-construction.com" className="flex items-center gap-2 text-white/80 hover:text-gold transition-colors">
                <Mail className="w-4 h-4 shrink-0" />
                Maher@saadi-construction.com
              </a>
              <p className="flex items-start gap-2 text-white/60">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                Serving Houston and Surrounding Areas
              </p>
            </div>
          </div>

          {/* Column 2: Unit Renovation Services */}
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-gold mb-4">
              Unit Renovation Services
            </h4>
            <ul className="space-y-2">
              {unitServices.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-sm text-white/70 hover:text-white transition-colors">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Property-Wide Services */}
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-gold mb-4">
              Property-Wide Services
            </h4>
            <ul className="space-y-2">
              {propertyServices.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-sm text-white/70 hover:text-white transition-colors">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Management + Areas + Quick Links */}
          <div className="space-y-6">
            <div>
              <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-gold mb-4">
                Management Services
              </h4>
              <ul className="space-y-2">
                {managementServices.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="text-sm text-white/70 hover:text-white transition-colors">
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-gold mb-4">
                Service Areas
              </h4>
              <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                {serviceAreas.map((area) => (
                  <li key={area.slug}>
                    <Link href={`/service-areas/${area.slug}`} className="text-sm text-white/70 hover:text-white transition-colors">
                      {area.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-gold mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-sm text-white/70 hover:text-white transition-colors">About</Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-white/70 hover:text-white transition-colors">Blog</Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-white/70 hover:text-white transition-colors">Contact</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-white/50">
            <p>
              Licensed General Contractor | Houston, Texas | Serving Harris, Fort Bend, Montgomery, Brazoria and Galveston Counties
            </p>
            <p>&copy; 2025 Saadi Construction Group</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
