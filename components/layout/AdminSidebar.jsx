import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  FileText,
  Settings,
  LogOut,
} from 'lucide-react';

const links = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Leads', href: '/admin/leads', icon: Users },
  { label: 'Projects', href: '/admin/projects', icon: FolderKanban },
  { label: 'Blog', href: '/admin/blog', icon: FileText },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar() {
  const router = useRouter();

  const isActive = (href) => {
    if (href === '/admin') return router.asPath === '/admin';
    return router.asPath.startsWith(href);
  };

  const handleSignOut = async () => {
    // Clear auth state and redirect to login
    router.push('/admin/login');
  };

  return (
    <aside className="w-64 min-h-screen bg-navy flex flex-col">
      {/* Brand */}
      <div className="px-6 py-6 border-b border-white/10">
        <Link href="/admin" className="block">
          <span className="font-heading text-xl font-bold text-white tracking-tight">SAADI</span>
          <span className="font-heading text-xs font-medium text-white/70 block tracking-wide">
            ADMIN PANEL
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
              isActive(href)
                ? 'bg-white/10 text-gold'
                : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Icon className="w-5 h-5" />
            {label}
          </Link>
        ))}
      </nav>

      {/* Sign Out */}
      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-white/60 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
