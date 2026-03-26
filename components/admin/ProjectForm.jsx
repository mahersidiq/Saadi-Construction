import { useState, useEffect } from 'react';
import { Trash2, GripVertical } from 'lucide-react';
import ImageUpload from '@/components/ui/ImageUpload';
import Spinner from '@/components/ui/Spinner';

const SCOPE_TYPES = ['Gut Rehab', 'Interior', 'Common Areas', 'Exterior'];

/**
 * Converts a title string into a URL-safe slug.
 */
function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Admin form for creating / editing projects.
 *
 * @param {object}   props
 * @param {object}   [props.project]  - Existing project data (edit mode)
 * @param {Function} props.onSubmit   - Callback receiving form data object
 * @param {boolean}  props.loading    - Disables form and shows spinner on submit button
 */
export default function ProjectForm({ project, onSubmit, loading = false }) {
  const isEdit = Boolean(project?.id);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    location: '',
    city: '',
    unit_count: '',
    scope_type: SCOPE_TYPES[0],
    description: '',
    body: '',
    featured: false,
    sort_order: 0,
    image_url: '',
    gallery: [],
  });

  const [slugEdited, setSlugEdited] = useState(false);

  // Populate form when editing
  useEffect(() => {
    if (project) {
      setForm({
        title: project.title || '',
        slug: project.slug || '',
        location: project.location || '',
        city: project.city || '',
        unit_count: project.unit_count ?? '',
        scope_type: project.scope_type || SCOPE_TYPES[0],
        description: project.description || '',
        body: project.body || '',
        featured: project.featured || false,
        sort_order: project.sort_order ?? 0,
        image_url: project.image_url || '',
        gallery: project.gallery || [],
      });
      setSlugEdited(true);
    }
  }, [project]);

  // Auto-generate slug from title (unless manually edited)
  const handleTitleChange = (e) => {
    const title = e.target.value;
    setForm((prev) => ({
      ...prev,
      title,
      ...(!slugEdited ? { slug: slugify(title) } : {}),
    }));
  };

  const handleSlugChange = (e) => {
    setSlugEdited(true);
    setForm((prev) => ({ ...prev, slug: slugify(e.target.value) }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Gallery management
  const handleGalleryUpload = (url) => {
    if (url) {
      setForm((prev) => ({ ...prev, gallery: [...prev.gallery, url] }));
    }
  };

  const removeGalleryImage = (index) => {
    setForm((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      unit_count: form.unit_count ? Number(form.unit_count) : null,
      sort_order: Number(form.sort_order) || 0,
    });
  };

  const inputClasses =
    'w-full rounded-lg border border-mid-gray bg-white px-4 py-2.5 text-sm text-charcoal placeholder:text-charcoal/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold disabled:cursor-not-allowed disabled:bg-light-gray disabled:opacity-60';

  const labelClasses = 'block text-sm font-semibold text-charcoal mb-1.5';

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* ── Basic Info ── */}
      <fieldset className="space-y-5 rounded-lg border border-mid-gray bg-white p-6">
        <legend className="px-2 text-sm font-semibold uppercase tracking-wider text-navy">
          Project Details
        </legend>

        {/* Title */}
        <div>
          <label htmlFor="title" className={labelClasses}>
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            value={form.title}
            onChange={handleTitleChange}
            disabled={loading}
            placeholder="e.g. 4820 S Michigan Ave"
            className={inputClasses}
          />
        </div>

        {/* Slug */}
        <div>
          <label htmlFor="slug" className={labelClasses}>
            Slug
          </label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-charcoal/50">/projects/</span>
            <input
              id="slug"
              name="slug"
              type="text"
              value={form.slug}
              onChange={handleSlugChange}
              disabled={loading}
              placeholder="auto-generated-from-title"
              className={inputClasses}
            />
          </div>
        </div>

        {/* Location + City */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="location" className={labelClasses}>
              Location / Address
            </label>
            <input
              id="location"
              name="location"
              type="text"
              value={form.location}
              onChange={handleChange}
              disabled={loading}
              placeholder="Full address"
              className={inputClasses}
            />
          </div>
          <div>
            <label htmlFor="city" className={labelClasses}>
              City
            </label>
            <input
              id="city"
              name="city"
              type="text"
              value={form.city}
              onChange={handleChange}
              disabled={loading}
              placeholder="e.g. Chicago"
              className={inputClasses}
            />
          </div>
        </div>

        {/* Unit Count + Scope Type */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="unit_count" className={labelClasses}>
              Unit Count
            </label>
            <input
              id="unit_count"
              name="unit_count"
              type="number"
              min="0"
              value={form.unit_count}
              onChange={handleChange}
              disabled={loading}
              placeholder="e.g. 24"
              className={inputClasses}
            />
          </div>
          <div>
            <label htmlFor="scope_type" className={labelClasses}>
              Scope Type
            </label>
            <select
              id="scope_type"
              name="scope_type"
              value={form.scope_type}
              onChange={handleChange}
              disabled={loading}
              className={inputClasses}
            >
              {SCOPE_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className={labelClasses}>
            Short Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={form.description}
            onChange={handleChange}
            disabled={loading}
            placeholder="Brief summary shown in project cards..."
            className={inputClasses}
          />
        </div>

        {/* Body */}
        <div>
          <label htmlFor="body" className={labelClasses}>
            Full Description
          </label>
          <textarea
            id="body"
            name="body"
            rows={8}
            value={form.body}
            onChange={handleChange}
            disabled={loading}
            placeholder="Detailed project write-up..."
            className={inputClasses}
          />
        </div>

        {/* Featured + Sort Order */}
        <div className="flex flex-wrap items-center gap-8">
          {/* Featured toggle */}
          <label className="flex items-center gap-3 text-sm font-medium text-charcoal">
            <button
              type="button"
              role="switch"
              aria-checked={form.featured}
              disabled={loading}
              onClick={() =>
                setForm((prev) => ({ ...prev, featured: !prev.featured }))
              }
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${
                form.featured ? 'bg-gold' : 'bg-mid-gray'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                  form.featured ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            Featured Project
          </label>

          {/* Sort order */}
          <div className="flex items-center gap-2">
            <label htmlFor="sort_order" className="text-sm font-medium text-charcoal">
              Sort Order
            </label>
            <input
              id="sort_order"
              name="sort_order"
              type="number"
              min="0"
              value={form.sort_order}
              onChange={handleChange}
              disabled={loading}
              className="w-20 rounded-lg border border-mid-gray bg-white px-3 py-2 text-center text-sm text-charcoal focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>
        </div>
      </fieldset>

      {/* ── Main Image ── */}
      <fieldset className="space-y-4 rounded-lg border border-mid-gray bg-white p-6">
        <legend className="px-2 text-sm font-semibold uppercase tracking-wider text-navy">
          Main Image
        </legend>
        <ImageUpload
          currentImage={form.image_url || undefined}
          onUpload={(url) => setForm((prev) => ({ ...prev, image_url: url || '' }))}
          folder="projects"
        />
      </fieldset>

      {/* ── Gallery ── */}
      <fieldset className="space-y-4 rounded-lg border border-mid-gray bg-white p-6">
        <legend className="px-2 text-sm font-semibold uppercase tracking-wider text-navy">
          Gallery Images
        </legend>

        {/* Existing gallery thumbnails */}
        {form.gallery.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {form.gallery.map((url, idx) => (
              <div
                key={`${url}-${idx}`}
                className="group relative aspect-video overflow-hidden rounded-lg border border-mid-gray"
              >
                <img
                  src={url}
                  alt={`Gallery image ${idx + 1}`}
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeGalleryImage(idx)}
                  className="absolute right-1.5 top-1.5 rounded-lg bg-charcoal/70 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-600"
                  aria-label={`Remove gallery image ${idx + 1}`}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add gallery image */}
        <ImageUpload
          onUpload={handleGalleryUpload}
          folder="projects"
        />
      </fieldset>

      {/* ── Submit ── */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-gold/90 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading && <Spinner size="sm" />}
          {isEdit ? 'Update Project' : 'Create Project'}
        </button>
      </div>
    </form>
  );
}
