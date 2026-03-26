import { useState } from 'react';
import Head from 'next/head';
import { PlusCircle, Pencil, Trash2, Star, StarOff } from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import ProjectForm from '@/components/admin/ProjectForm';
import { supabase } from '@/lib/supabase';
import { getServerSession, supabaseAdmin } from '@/lib/supabaseAdmin';

export async function getServerSideProps(ctx) {
  const user = await getServerSession(ctx.req);

  if (!user) {
    return { redirect: { destination: '/admin/login', permanent: false } };
  }

  const { data: projects } = await supabaseAdmin
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true });

  return {
    props: {
      projects: projects ?? [],
    },
  };
}

export default function AdminProjects({ projects: initialProjects }) {
  const [projects, setProjects] = useState(initialProjects);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  // Create or update project
  const handleSubmit = async (formData) => {
    clearMessages();
    setLoading(true);

    try {
      if (editingProject) {
        // Update
        const { data, error: updateErr } = await supabase
          .from('projects')
          .update(formData)
          .eq('id', editingProject.id)
          .select()
          .single();

        if (updateErr) throw updateErr;

        setProjects((prev) =>
          prev.map((p) => (p.id === editingProject.id ? data : p))
        );
        setSuccess('Project updated successfully.');
      } else {
        // Create
        const { data, error: createErr } = await supabase
          .from('projects')
          .insert(formData)
          .select()
          .single();

        if (createErr) throw createErr;

        setProjects((prev) => [data, ...prev]);
        setSuccess('Project created successfully.');
      }

      setShowForm(false);
      setEditingProject(null);
    } catch (err) {
      setError(err.message || 'Failed to save project.');
    } finally {
      setLoading(false);
    }
  };

  // Delete project
  const handleDelete = async (project) => {
    if (!window.confirm(`Delete "${project.title}"? This cannot be undone.`)) {
      return;
    }

    clearMessages();

    const { error: deleteErr } = await supabase
      .from('projects')
      .delete()
      .eq('id', project.id);

    if (deleteErr) {
      setError('Failed to delete project: ' + deleteErr.message);
      return;
    }

    setProjects((prev) => prev.filter((p) => p.id !== project.id));
    setSuccess('Project deleted.');
  };

  // Toggle featured
  const handleToggleFeatured = async (project) => {
    clearMessages();

    const newFeatured = !project.featured;

    const { error: updateErr } = await supabase
      .from('projects')
      .update({ featured: newFeatured })
      .eq('id', project.id);

    if (updateErr) {
      setError('Failed to update featured status: ' + updateErr.message);
      return;
    }

    setProjects((prev) =>
      prev.map((p) =>
        p.id === project.id ? { ...p, featured: newFeatured } : p
      )
    );
  };

  // Open edit form
  const handleEdit = (project) => {
    clearMessages();
    setEditingProject(project);
    setShowForm(true);
  };

  // Open create form
  const handleAdd = () => {
    clearMessages();
    setEditingProject(null);
    setShowForm(true);
  };

  // Cancel form
  const handleCancel = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  return (
    <>
      <Head>
        <title>Projects | Saadi Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold text-charcoal">
              Projects
            </h1>
            <p className="mt-1 text-sm text-charcoal/60">
              Manage your construction portfolio.
            </p>
          </div>
          {!showForm && (
            <button
              type="button"
              onClick={handleAdd}
              className="inline-flex items-center gap-2 rounded-lg bg-navy px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy/90"
            >
              <PlusCircle className="h-4 w-4" />
              Add New Project
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

        {/* Form */}
        {showForm && (
          <div className="rounded-xl border border-mid-gray bg-light-gray p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-heading text-lg font-bold text-charcoal">
                {editingProject ? 'Edit Project' : 'New Project'}
              </h2>
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-lg border border-mid-gray px-4 py-2 text-sm font-medium text-charcoal/60 transition-colors hover:bg-white"
              >
                Cancel
              </button>
            </div>
            <ProjectForm
              project={editingProject}
              onSubmit={handleSubmit}
              loading={loading}
            />
          </div>
        )}

        {/* Projects Table */}
        {!showForm && (
          <div className="overflow-x-auto rounded-xl border border-mid-gray bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-mid-gray bg-light-gray">
                  <th className="whitespace-nowrap px-6 py-3 text-xs font-semibold uppercase tracking-wider text-charcoal/70">
                    Project
                  </th>
                  <th className="whitespace-nowrap px-6 py-3 text-xs font-semibold uppercase tracking-wider text-charcoal/70">
                    Location
                  </th>
                  <th className="whitespace-nowrap px-6 py-3 text-xs font-semibold uppercase tracking-wider text-charcoal/70">
                    Units
                  </th>
                  <th className="whitespace-nowrap px-6 py-3 text-xs font-semibold uppercase tracking-wider text-charcoal/70">
                    Scope
                  </th>
                  <th className="whitespace-nowrap px-6 py-3 text-xs font-semibold uppercase tracking-wider text-charcoal/70">
                    Featured
                  </th>
                  <th className="whitespace-nowrap px-6 py-3 text-xs font-semibold uppercase tracking-wider text-charcoal/70">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-mid-gray">
                {projects.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-charcoal/50"
                    >
                      No projects yet. Click &ldquo;Add New Project&rdquo; to
                      get started.
                    </td>
                  </tr>
                ) : (
                  projects.map((project) => (
                    <tr
                      key={project.id}
                      className="transition-colors hover:bg-light-gray/50"
                    >
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          {project.image_url && (
                            <img
                              src={project.image_url}
                              alt=""
                              className="h-10 w-14 rounded object-cover"
                            />
                          )}
                          <div>
                            <p className="font-medium text-charcoal">
                              {project.title}
                            </p>
                            <p className="text-xs text-charcoal/50">
                              /{project.slug}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-3 text-charcoal/70">
                        {project.city || project.location || '--'}
                      </td>
                      <td className="whitespace-nowrap px-6 py-3 text-center text-charcoal/70">
                        {project.unit_count ?? '--'}
                      </td>
                      <td className="whitespace-nowrap px-6 py-3 text-charcoal/70">
                        {project.scope_type || '--'}
                      </td>
                      <td className="whitespace-nowrap px-6 py-3">
                        <button
                          type="button"
                          onClick={() => handleToggleFeatured(project)}
                          className="transition-colors hover:text-gold"
                          title={
                            project.featured
                              ? 'Remove from featured'
                              : 'Mark as featured'
                          }
                        >
                          {project.featured ? (
                            <Star className="h-5 w-5 fill-gold text-gold" />
                          ) : (
                            <StarOff className="h-5 w-5 text-charcoal/30" />
                          )}
                        </button>
                      </td>
                      <td className="whitespace-nowrap px-6 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(project)}
                            className="rounded-lg p-2 text-charcoal/60 transition-colors hover:bg-navy/10 hover:text-navy"
                            title="Edit project"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(project)}
                            className="rounded-lg p-2 text-charcoal/60 transition-colors hover:bg-red-50 hover:text-red-600"
                            title="Delete project"
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

AdminProjects.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
