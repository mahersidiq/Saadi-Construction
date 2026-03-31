import { useState } from 'react';

function PostCard({ post }) {
  const { slug, title, excerpt, cover_image_url, category, published_at } = post;
  const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

  return (
    <a href={`/blog/${slug}`} className="group block rounded-xl overflow-hidden bg-white border border-gray-200 hover:border-gold/50 shadow-sm hover:shadow-xl transition-all duration-300 h-full">
      <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-navy to-charcoal">
        {cover_image_url ? (
          <img src={cover_image_url} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="h-14 w-14 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5" />
            </svg>
          </div>
        )}
        {category && <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-full bg-gold/90 text-white">{category}</span>}
      </div>
      <div className="p-5">
        {published_at && <time className="text-xs text-gray-400 uppercase tracking-wide">{formatDate(published_at)}</time>}
        <h3 className="mt-2 font-heading text-lg font-bold text-charcoal group-hover:text-navy transition-colors line-clamp-2">{title}</h3>
        {excerpt && <p className="mt-2 text-sm text-gray-600 leading-relaxed line-clamp-3">{excerpt}</p>}
        <span className="inline-flex items-center mt-4 text-sm font-semibold text-gold">
          Read More
          <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        </span>
      </div>
    </a>
  );
}

const categories = ['All', 'Industry Insights', 'Project Updates', 'Renovation Tips', 'Market News', 'Cost Guides'];

export default function BlogFilter({ posts = [] }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const filtered = activeCategory === 'All' ? posts : posts.filter((p) => p.category === activeCategory);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeCategory === cat ? 'bg-gold text-white shadow-md' : 'bg-light-gray text-charcoal hover:bg-gray-200 border border-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => <PostCard key={post.slug} post={post} />)}
        </div>
      ) : (
        <div className="text-center py-16">
          <svg className="mx-auto h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5" />
          </svg>
          <h2 className="font-heading text-2xl font-bold text-charcoal mb-2">No Posts Yet</h2>
          <p className="text-gray-500 max-w-md mx-auto">
            {activeCategory !== 'All'
              ? `No articles in "${activeCategory}" yet. Check back soon or browse all categories.`
              : 'We are working on new content. Check back soon for apartment renovation insights and updates.'}
          </p>
        </div>
      )}
    </>
  );
}
