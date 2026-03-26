import { useState, useEffect, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Link as LinkIcon,
  ImageIcon,
  Undo,
  Redo,
} from 'lucide-react';
import ImageUpload from '@/components/ui/ImageUpload';
import Spinner from '@/components/ui/Spinner';

const CATEGORIES = [
  'Industry Insights',
  'Project Updates',
  'Renovation Tips',
  'Market News',
  'Cost Guides',
];

const STATUSES = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
];

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

/* ────────────────────────────────────────────
   TipTap Toolbar
   ──────────────────────────────────────────── */

function ToolbarButton({ onClick, active, disabled, title, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`rounded p-1.5 transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
        active
          ? 'bg-navy text-white'
          : 'text-charcoal/70 hover:bg-light-gray hover:text-navy'
      }`}
    >
      {children}
    </button>
  );
}

function EditorToolbar({ editor }) {
  const setLink = useCallback(() => {
    if (!editor) return;

    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter URL', previousUrl || 'https://');

    // Cancelled
    if (url === null) return;

    // Empty — remove link
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    if (!editor) return;
    const url = window.prompt('Enter image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-mid-gray bg-light-gray px-2 py-1.5">
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive('bold')}
        title="Bold"
      >
        <Bold className="h-4 w-4" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive('italic')}
        title="Italic"
      >
        <Italic className="h-4 w-4" />
      </ToolbarButton>

      <div className="mx-1 h-5 w-px bg-mid-gray" />

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        active={editor.isActive('heading', { level: 1 })}
        title="Heading 1"
      >
        <Heading1 className="h-4 w-4" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        active={editor.isActive('heading', { level: 2 })}
        title="Heading 2"
      >
        <Heading2 className="h-4 w-4" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        active={editor.isActive('heading', { level: 3 })}
        title="Heading 3"
      >
        <Heading3 className="h-4 w-4" />
      </ToolbarButton>

      <div className="mx-1 h-5 w-px bg-mid-gray" />

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive('bulletList')}
        title="Bullet List"
      >
        <List className="h-4 w-4" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        active={editor.isActive('orderedList')}
        title="Ordered List"
      >
        <ListOrdered className="h-4 w-4" />
      </ToolbarButton>

      <div className="mx-1 h-5 w-px bg-mid-gray" />

      <ToolbarButton
        onClick={setLink}
        active={editor.isActive('link')}
        title="Insert Link"
      >
        <LinkIcon className="h-4 w-4" />
      </ToolbarButton>

      <ToolbarButton onClick={addImage} title="Insert Image">
        <ImageIcon className="h-4 w-4" />
      </ToolbarButton>

      <div className="mx-1 h-5 w-px bg-mid-gray" />

      <ToolbarButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        title="Undo"
      >
        <Undo className="h-4 w-4" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        title="Redo"
      >
        <Redo className="h-4 w-4" />
      </ToolbarButton>
    </div>
  );
}

/* ────────────────────────────────────────────
   Blog Editor
   ──────────────────────────────────────────── */

/**
 * Admin blog post editor with rich text (TipTap), cover image upload,
 * SEO fields, and slug auto-generation.
 *
 * @param {object}   props
 * @param {object}   [props.post]    - Existing post data (edit mode)
 * @param {Function} props.onSubmit  - Callback receiving form data object
 * @param {boolean}  props.loading   - Disables form and shows spinner on submit button
 */
export default function BlogEditor({ post, onSubmit, loading = false }) {
  const isEdit = Boolean(post?.id);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    category: CATEGORIES[0],
    status: 'draft',
    author: '',
    meta_title: '',
    meta_description: '',
    cover_image: '',
  });

  const [slugEdited, setSlugEdited] = useState(false);

  // TipTap editor
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-navy underline decoration-navy/30 hover:decoration-navy',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full mx-auto',
        },
      }),
    ],
    content: post?.body || '',
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose max-w-none px-4 py-3 min-h-[320px] focus:outline-none',
      },
    },
  });

  // Populate form when editing
  useEffect(() => {
    if (post) {
      setForm({
        title: post.title || '',
        slug: post.slug || '',
        excerpt: post.excerpt || '',
        category: post.category || CATEGORIES[0],
        status: post.status || 'draft',
        author: post.author || '',
        meta_title: post.meta_title || '',
        meta_description: post.meta_description || '',
        cover_image: post.cover_image || '',
      });
      setSlugEdited(true);

      if (editor && post.body) {
        editor.commands.setContent(post.body);
      }
    }
  }, [post, editor]);

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
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      body: editor?.getHTML() || '',
    });
  };

  const inputClasses =
    'w-full rounded-lg border border-mid-gray bg-white px-4 py-2.5 text-sm text-charcoal placeholder:text-charcoal/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold disabled:cursor-not-allowed disabled:bg-light-gray disabled:opacity-60';

  const labelClasses = 'block text-sm font-semibold text-charcoal mb-1.5';

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* ── Post Details ── */}
      <fieldset className="space-y-5 rounded-lg border border-mid-gray bg-white p-6">
        <legend className="px-2 text-sm font-semibold uppercase tracking-wider text-navy">
          Post Details
        </legend>

        {/* Title */}
        <div>
          <label htmlFor="blog-title" className={labelClasses}>
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="blog-title"
            name="title"
            type="text"
            required
            value={form.title}
            onChange={handleTitleChange}
            disabled={loading}
            placeholder="e.g. 5 Things to Know Before a Gut Rehab"
            className={inputClasses}
          />
        </div>

        {/* Slug */}
        <div>
          <label htmlFor="blog-slug" className={labelClasses}>
            Slug
          </label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-charcoal/50">/blog/</span>
            <input
              id="blog-slug"
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

        {/* Excerpt */}
        <div>
          <label htmlFor="blog-excerpt" className={labelClasses}>
            Excerpt
          </label>
          <textarea
            id="blog-excerpt"
            name="excerpt"
            rows={3}
            value={form.excerpt}
            onChange={handleChange}
            disabled={loading}
            placeholder="Brief summary shown in blog listing cards..."
            className={inputClasses}
          />
        </div>

        {/* Category + Status */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="blog-category" className={labelClasses}>
              Category
            </label>
            <select
              id="blog-category"
              name="category"
              value={form.category}
              onChange={handleChange}
              disabled={loading}
              className={inputClasses}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="blog-status" className={labelClasses}>
              Status
            </label>
            <select
              id="blog-status"
              name="status"
              value={form.status}
              onChange={handleChange}
              disabled={loading}
              className={inputClasses}
            >
              {STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Author */}
        <div>
          <label htmlFor="blog-author" className={labelClasses}>
            Author
          </label>
          <input
            id="blog-author"
            name="author"
            type="text"
            value={form.author}
            onChange={handleChange}
            disabled={loading}
            placeholder="e.g. Saadi Construction Team"
            className={inputClasses}
          />
        </div>
      </fieldset>

      {/* ── Cover Image ── */}
      <fieldset className="space-y-4 rounded-lg border border-mid-gray bg-white p-6">
        <legend className="px-2 text-sm font-semibold uppercase tracking-wider text-navy">
          Cover Image
        </legend>
        <ImageUpload
          currentImage={form.cover_image || undefined}
          onUpload={(url) =>
            setForm((prev) => ({ ...prev, cover_image: url || '' }))
          }
          folder="blog"
        />
      </fieldset>

      {/* ── Body — Rich Text Editor ── */}
      <fieldset className="space-y-4 rounded-lg border border-mid-gray bg-white p-6">
        <legend className="px-2 text-sm font-semibold uppercase tracking-wider text-navy">
          Body Content
        </legend>

        <div
          className={`overflow-hidden rounded-lg border border-mid-gray transition-colors focus-within:border-gold focus-within:ring-1 focus-within:ring-gold ${
            loading ? 'pointer-events-none opacity-60' : ''
          }`}
        >
          <EditorToolbar editor={editor} />
          <EditorContent editor={editor} />
        </div>

        <p className="text-xs text-charcoal/50">
          Use the toolbar to format text, add headings, lists, links, and images.
        </p>
      </fieldset>

      {/* ── SEO / Meta ── */}
      <fieldset className="space-y-5 rounded-lg border border-mid-gray bg-white p-6">
        <legend className="px-2 text-sm font-semibold uppercase tracking-wider text-navy">
          SEO / Meta
        </legend>

        {/* Meta Title */}
        <div>
          <label htmlFor="blog-meta-title" className={labelClasses}>
            Meta Title
          </label>
          <input
            id="blog-meta-title"
            name="meta_title"
            type="text"
            value={form.meta_title}
            onChange={handleChange}
            disabled={loading}
            placeholder="Custom title for search engines (defaults to post title)"
            className={inputClasses}
          />
          <p className="mt-1 text-xs text-charcoal/50">
            {form.meta_title.length}/60 characters recommended
          </p>
        </div>

        {/* Meta Description */}
        <div>
          <label htmlFor="blog-meta-desc" className={labelClasses}>
            Meta Description
          </label>
          <textarea
            id="blog-meta-desc"
            name="meta_description"
            rows={2}
            value={form.meta_description}
            onChange={handleChange}
            disabled={loading}
            placeholder="Brief description for search engine results..."
            className={inputClasses}
          />
          <p className="mt-1 text-xs text-charcoal/50">
            {form.meta_description.length}/160 characters recommended
          </p>
        </div>
      </fieldset>

      {/* ── Submit ── */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-gold/90 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading && <Spinner size="sm" />}
          {isEdit ? 'Update Post' : 'Publish Post'}
        </button>
      </div>
    </form>
  );
}
