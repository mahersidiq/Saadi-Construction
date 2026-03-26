import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import { serviceAreas } from '@/data/serviceAreas';
import { serviceCategories } from '@/data/services';
import { useToastContext } from '@/contexts/ToastContext';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const timelineOptions = [
  'ASAP',
  '1-3 Months',
  '3-6 Months',
  '6-12 Months',
  'Just Exploring',
];

const sourceOptions = [
  'Google Search',
  'LinkedIn',
  'Referral',
  'Texas Apartment Association',
  'Other',
];

const allServiceNames = serviceCategories.flatMap((cat) =>
  cat.services.map((s) => s.name)
);

const inputClasses =
  'w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-charcoal placeholder:text-gray-400 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors';

const labelClasses = 'block text-sm font-semibold text-charcoal mb-1.5';

export default function ContactPage() {
  const { addToast } = useToastContext();

  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    propertyAddress: '',
    city: '',
    unitCount: '',
    projectType: '',
    timeline: '',
    source: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = 'Full name is required.';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^[\d\s()+-]{7,20}$/.test(form.phone)) {
      newErrors.phone = 'Please enter a valid phone number.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      setSubmitted(true);
      addToast('Your bid request has been submitted. We will be in touch within 24 hours.', 'success');
      setForm({
        name: '',
        company: '',
        email: '',
        phone: '',
        propertyAddress: '',
        city: '',
        unitCount: '',
        projectType: '',
        timeline: '',
        source: '',
        message: '',
      });
    } catch (err) {
      addToast(err.message || 'Failed to submit. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Request an Apartment Renovation Bid | Saadi Construction Group | Houston, TX"
        description="Request a bid for your apartment renovation project in Houston and surrounding areas. We respond within 24 hours. Full gut rehabs, unit remodels, and property-wide programs."
        keywords="apartment renovation bid Houston, multifamily renovation estimate, apartment rehab quote Houston TX"
        canonicalUrl="https://saadiconstructiongroup.com/contact"
      />

      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center bg-gradient-to-br from-navy via-[#14304d] to-charcoal overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,149,42,0.08),transparent_60%)]" />
        <div className="relative z-10 container-main px-4 py-20 md:py-28 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight"
          >
            Request an Apartment Renovation Bid
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Serving Houston and surrounding areas. We respond within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="section-padding bg-white">
        <div className="container-main px-4">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Form */}
            <motion.div {...fadeInUp} className="lg:col-span-2">
              {submitted ? (
                <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
                  <svg
                    className="mx-auto h-16 w-16 text-green-500 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h2 className="font-heading text-2xl font-bold text-charcoal mb-2">
                    Bid Request Received
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Thank you for reaching out. We will review your project details and respond within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="btn-primary px-6 py-3"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid gap-6 sm:grid-cols-2">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="name" className={labelClasses}>
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Smith"
                        className={`${inputClasses} ${errors.name ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : ''}`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                      )}
                    </div>

                    {/* Company */}
                    <div>
                      <label htmlFor="company" className={labelClasses}>
                        Company
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Property management company"
                        className={inputClasses}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className={labelClasses}>
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={`${inputClasses} ${errors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : ''}`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className={labelClasses}>
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="(555) 123-4567"
                        className={`${inputClasses} ${errors.phone ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : ''}`}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                      )}
                    </div>

                    {/* Property Address */}
                    <div className="sm:col-span-2">
                      <label htmlFor="propertyAddress" className={labelClasses}>
                        Property Address
                      </label>
                      <input
                        id="propertyAddress"
                        name="propertyAddress"
                        type="text"
                        value={form.propertyAddress}
                        onChange={handleChange}
                        placeholder="123 Main St, Houston, TX 77001"
                        className={inputClasses}
                      />
                    </div>

                    {/* City/Area */}
                    <div>
                      <label htmlFor="city" className={labelClasses}>
                        City / Area
                      </label>
                      <select
                        id="city"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        className={inputClasses}
                      >
                        <option value="">Select area</option>
                        {serviceAreas.map((area) => (
                          <option key={area.slug} value={area.name}>
                            {area.name}
                          </option>
                        ))}
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Number of Units */}
                    <div>
                      <label htmlFor="unitCount" className={labelClasses}>
                        Number of Units
                      </label>
                      <input
                        id="unitCount"
                        name="unitCount"
                        type="text"
                        value={form.unitCount}
                        onChange={handleChange}
                        placeholder="e.g. 50, 100, 250"
                        className={inputClasses}
                      />
                    </div>

                    {/* Project Type */}
                    <div>
                      <label htmlFor="projectType" className={labelClasses}>
                        Project Type
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={form.projectType}
                        onChange={handleChange}
                        className={inputClasses}
                      >
                        <option value="">Select service</option>
                        {allServiceNames.map((name) => (
                          <option key={name} value={name}>
                            {name}
                          </option>
                        ))}
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Timeline */}
                    <div>
                      <label htmlFor="timeline" className={labelClasses}>
                        Timeline
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={form.timeline}
                        onChange={handleChange}
                        className={inputClasses}
                      >
                        <option value="">Select timeline</option>
                        {timelineOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Source */}
                    <div className="sm:col-span-2">
                      <label htmlFor="source" className={labelClasses}>
                        How did you hear about us?
                      </label>
                      <select
                        id="source"
                        name="source"
                        value={form.source}
                        onChange={handleChange}
                        className={inputClasses}
                      >
                        <option value="">Select one</option>
                        {sourceOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div className="sm:col-span-2">
                      <label htmlFor="message" className={labelClasses}>
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project, scope of work, or any specific requirements..."
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full sm:w-auto px-10 py-4 text-lg font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg
                            className="h-5 w-5 animate-spin"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        'Submit Bid Request'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>

            {/* Sidebar Info */}
            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Contact Info */}
              <div className="rounded-xl bg-light-gray p-6 border border-gray-200">
                <h3 className="font-heading text-lg font-bold text-charcoal mb-4">
                  Contact Information
                </h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <svg
                      className="h-5 w-5 mt-0.5 text-gold flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
                    <div>
                      <p className="font-semibold text-charcoal">Phone</p>
                      <a
                        href="tel:+15129629856"
                        className="text-gold hover:underline"
                      >
                        (512) 962-9856
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg
                      className="h-5 w-5 mt-0.5 text-gold flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                    <div>
                      <p className="font-semibold text-charcoal">Email</p>
                      <a
                        href="mailto:Maher@saadi-construction.com"
                        className="text-gold hover:underline break-all"
                      >
                        Maher@saadi-construction.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg
                      className="h-5 w-5 mt-0.5 text-gold flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                    <div>
                      <p className="font-semibold text-charcoal">Office</p>
                      <p className="text-gray-600">
                        801 Travis St Suite 2101
                        <br />
                        Houston, TX 77002
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Maps */}
              <div className="rounded-xl overflow-hidden border border-gray-200">
                <iframe
                  title="Saadi Construction Group - Houston Office"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3463.9!2d-95.3698!3d29.7604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDQ1JzM3LjQiTiA5NcKwMjInMTEuMyJX!5e0!3m2!1sen!2sus!4v1700000000000"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Service Areas */}
              <div className="rounded-xl bg-light-gray p-6 border border-gray-200">
                <h3 className="font-heading text-lg font-bold text-charcoal mb-4">
                  Service Areas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {serviceAreas.map((area) => (
                    <Link
                      key={area.slug}
                      href={`/service-areas/${area.slug}`}
                      className="px-3 py-1.5 text-xs font-medium rounded-full bg-white border border-gray-200 text-charcoal hover:border-gold/50 hover:text-navy transition-colors"
                    >
                      {area.name}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
