import { useState } from 'react';
import Head from 'next/head';
import { PlusCircle, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import BlogEditor from '@/components/admin/BlogEditor';
import { supabase } from '@/lib/supabase';
import { getServerSession, supabaseAdmin } from '@/lib/supabaseAdmin';

export async function getServerSideProps(ctx) {
  const user = await getServerSession(ctx.req);

  if (!user) {
    return { redirect: { destination: '/admin/login', permanent: false } };
  }

  const { data: posts } = await supabaseAdmin
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  return {
    props: {
      posts: posts ?? [],
    },
  };
}

const STATUS_BADGE = {
  draft: 'bg-yellow-100 text-yellow-800',
  published: 'bg-green-100 text-green-800',
};

function formatDate(dateStr) {
  if (!dateStr) return '--';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function AdminBlog({ posts: initialPosts }) {
  const [posts, setPosts] = useState(initialPosts);
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  // Create or update post
  const handleSubmit = async (formData) => {
    clearMessages();
    setLoading(true);

    try {
      if (editingPost) {
        const { data, error: updateErr } = await supabase
          .from('posts')
          .update(formData)
          .eq('id', editingPost.id)
          .select()
          .single();

        if (updateErr) throw updateErr;

        setPosts((prev) =>
          prev.map((p) => (p.id === editingPost.id ? data : p))
        );
        setSuccess('Post updated successfully.');
      } else {
        const { data, error: createErr } = await supabase
          .from('posts')
          .insert(formData)
          .select()
          .single();

        if (createErr) throw createErr;

        setPosts((prev) => [data, ...prev]);
        setSuccess('Post created successfully.');
      }

      setShowEditor(false);
      setEditingPost(null);
    } catch (err) {
      setError(err.message || 'Failed to save post.');
    } finally {
      setLoading(false);
    }
  };

  // Delete post
  const handleDelete = async (post) => {
    if (!window.confirm(`Delete "${post.title}"? This cannot be undone.`)) {
      return;
    }

    clearMessages();

    const { error: deleteErr } = await supabase
      .from('posts')
      .delete()
      .eq('id', post.id);

    if (deleteErr) {
      setError('Failed to delete post: ' + deleteErr.message);
      return;
    }

    setPosts((prev) => prev.filter((p) => p.id !== post.id));
    setSuccess('Post deleted.');
  };

  // Toggle publish/unpublish
  const handleToggleStatus = async (post) => {
    clearMessages();

    const newStatus = post.status === 'published' ? 'draft' : 'published';

    const updateData = { status: newStatus };
    // Set published_at when publishing for the first time
    if (newStatus === 'published' && !post.published_at) {
      updateData.published_at = new Date().toISOString();
    }

    const { error: updateErr } = await supabase
      .from('posts')
      .update(updateData)
      .eq('id', post.id);

    if (updateErr) {
      setError('Failed to update status: ' + updateErr.message);
      return;
    }

    setPosts((prev) =>
      prev.map((p) =>
        p.id === post.id ? { ...p, ...updateData } : p
      )
    );
  };

  // Open edit form
  const handleEdit = (post) => {
    clearMessages();
    setEditingPost(post);
    setShowEditor(true);
  };

  // Open create form
  const handleAdd = () => {
    clearMessages();
    setEditingPost(null);
    setShowEditor(true);
  };

  // Cancel form
  const handleCancel = () => {
    setShowEditor(false);
    setEditingPost(null);
  };

  return (
    <>
      <Head>
        <title>Blog | Saadi Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold text-charcoal">
              Blog Posts
            </h1>
            <p className="mt-1 text-sm text-charcoal/60">
              Create and manage blog content.
            </p>
          </div>
          {!showEditor && (
            <button
              type="button"
              onClick={handleAdd}
              className="inline-flex items-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gold/90"
            >
              <PlusCircle className="h-4 w-4" />
              Write New Post
            </button>
          )}
        </div>

        {/* Feedback Messages */}
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}
        {success && (
          <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {success}
          </div>
        )}

        {/* Editor */}
        {showEditor && (
          <div className="rounded-xl border border-mid-gray bg-light-gray p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-heading text-lg font-bold text-charcoal">
                {editingPost ? 'Edit Post' : 'New Post'}
              </h2>
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-lg border border-mid-gray px-4 py-2 text-sm font-medium text-charcoal/60 transition-colors hover:bg-white"
              >
                Cancel
              </button>
            </div>
            <BlogEditor
              post={editingPost}
              onSubmit={handleSubmit}
              loading={loading}
            />
          </div>
        )}

        {/* Posts Table */}
        {!showEditor && (
          <div className="overflow-x-auto rounded-xl border border-mid-gray bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-mid-gray bg-light-gray">
                  <th className="whitespace-nowrap px-6 py-3 text-xs font-semibold uppercase tracking-wider text-charcoal/70">
                    Title
                  </th>
                  <th className="whitespace-nowrap px-6 py-3 text-xs font-semibold uppercase tracking-wider text-charcoal/70">
                    Category
                  </th>
                  <th className="whitespace-nowrap px-6 py-3 text-xs font-semibold uppercase tracking-wider text-charcoal/70">
                    Author
                  </th>
                  <th className="whitespace-nowrap px-6 py-3 text-xs font-semibold uppercase tracking-wider text-charcoal/70">
                    Date
                  </th>
                  <th className="whitespace-nowrap px-6 py-3 text-xs font-semibold uppercase tracking-wider text-charcoal/70">
                    Status
                  </th>
                  <th className="whitespace-nowrap px-6 py-3 text-xs font-semibold uppercase tracking-wider text-charcoal/70">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-mid-gray">
                {posts.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-charcoal/50"
                    >
                      No blog posts yet. Click &ldquo;Write New Post&rdquo; to
                      get started.
                    </td>
                  </tr>
                ) : (
                  posts.map((post) => (
                    <tr
                      key={post.id}
                      className="transition-colors hover:bg-light-gray/50"
                    >
                      <td className="px-6 py-3">
                        <div>
                          <p className="font-medium text-charcoal">
                            {post.title}
                          </p>
                          <p className="text-xs text-charcoal/50">
                            /blog/{post.slug}
                          </p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-3 text-charcoal/70">
                        {post.category || '--'}
                      </td>
                      <td className="whitespace-nowrap px-6 py-3 text-charcoal/70">
                        {post.author || '--'}
                      </td>
                      <td className="whitespace-nowrap px-6 py-3 text-charcoal/70">
                        {formatDate(post.created_at)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-3">
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
                            STATUS_BADGE[post.status] || STATUS_BADGE.draft
                          }`}
                        >
                          {post.status || 'draft'}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleToggleStatus(post)}
                            className={`rounded-lg p-2 transition-colors ${
                              post.status === 'published'
                                ? 'text-green-600 hover:bg-green-50'
                                : 'text-charcoal/60 hover:bg-yellow-50 hover:text-yellow-700'
                            }`}
                            title={
                              post.status === 'published'
                                ? 'Unpublish'
                                : 'Publish'
                            }
                          >
                            {post.status === 'published' ? (
                              <Eye className="h-4 w-4" />
                            ) : (
                              <EyeOff className="h-4 w-4" />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleEdit(post)}
                            className="rounded-lg p-2 text-charcoal/60 transition-colors hover:bg-navy/10 hover:text-navy"
                            title="Edit post"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(post)}
                            className="rounded-lg p-2 text-charcoal/60 transition-colors hover:bg-red-50 hover:text-red-600"
                            title="Delete post"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

AdminBlog.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
