import { useState } from 'react';

const propertyTypeOptions = ['Garden-Style Apartment', 'Mid-Rise', 'High-Rise', 'Mixed-Use', 'Other'];
const unitCountOptions = ['1-50 units', '51-150 units', '151-300 units', '300+ units'];
const scopeOptions = ['Full Gut Rehab', 'Unit Interior Renovation', 'Common Area & Amenity', 'Exterior & Curb Appeal', 'Value-Add Program', 'Construction Management', 'Not Sure Yet'];
const timelineOptions = ['Immediately', '1-3 months', '3-6 months', '6+ months'];

const inputClasses = 'w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-charcoal placeholder:text-gray-400 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors';
const labelClasses = 'block text-sm font-semibold text-charcoal mb-1.5';

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', unitCount: '', projectType: '', timeline: '', message: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Full name is required.';
    if (!form.email.trim()) newErrors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Please enter a valid email address.';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required.';
    else if (!/^[\d\s()+-]{7,20}$/.test(form.phone)) newErrors.phone = 'Please enter a valid phone number.';
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
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');
      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', company: '', unitCount: '', projectType: '', timeline: '', message: '' });
    } catch (err) {
      alert(err.message || 'Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <svg className="mx-auto h-16 w-16 text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="font-heading text-2xl font-bold text-charcoal mb-2">Bid Request Received</h2>
        <p className="text-gray-600 mb-6">Thank you for reaching out. We will review your project details and respond within 24 hours.</p>
        <button type="button" onClick={() => setSubmitted(false)} className="btn-primary px-6 py-3">Submit Another Request</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClasses}>Full Name <span className="text-red-500">*</span></label>
          <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} placeholder="John Smith" className={`${inputClasses} ${errors.name ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : ''}`} />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>Email <span className="text-red-500">*</span></label>
          <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="john@example.com" className={`${inputClasses} ${errors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : ''}`} />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone" className={labelClasses}>Phone Number <span className="text-red-500">*</span></label>
          <input id="phone" name="phone" type="tel" required value={form.phone} onChange={handleChange} placeholder="(832) 360-3804" className={`${inputClasses} ${errors.phone ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : ''}`} />
          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="company" className={labelClasses}>Property Type</label>
          <select id="company" name="company" value={form.company} onChange={handleChange} className={inputClasses}>
            <option value="">Select property type</option>
            {propertyTypeOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="unitCount" className={labelClasses}>Number of Units</label>
          <select id="unitCount" name="unitCount" value={form.unitCount} onChange={handleChange} className={inputClasses}>
            <option value="">Select range</option>
            {unitCountOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="projectType" className={labelClasses}>Scope of Work</label>
          <select id="projectType" name="projectType" value={form.projectType} onChange={handleChange} className={inputClasses}>
            <option value="">Select scope</option>
            {scopeOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="timeline" className={labelClasses}>Desired Start Timeline</label>
          <select id="timeline" name="timeline" value={form.timeline} onChange={handleChange} className={inputClasses}>
            <option value="">Select timeline</option>
            {timelineOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelClasses}>Project Details</label>
          <textarea id="message" name="message" rows={5} value={form.message} onChange={handleChange} placeholder="Tell us about your property, scope of work, or any specific requirements..." className={inputClasses} />
        </div>
      </div>
      <div className="pt-2">
        <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto px-10 py-4 text-lg font-semibold disabled:opacity-60 disabled:cursor-not-allowed">
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
              Submitting...
            </span>
          ) : 'Submit Bid Request'}
        </button>
      </div>
    </form>
  );
}
