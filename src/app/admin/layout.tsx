import React from "react";
import { checkAuth, logout } from "@/app/actions/auth";
import Link from "next/link";
import { LayoutDashboard, CalendarDays, Scissors, Clock, CalendarOff, Settings, LogOut } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Enforce auth check. 
  // Next.js layouts run on every navigation to their subpages.
  // Note: For full protection, middleware is better, but this works for server components.
  await checkAuth();

  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Agendamentos", href: "/admin/appointments", icon: CalendarDays },
    { name: "Funcionamento", href: "/admin/settings/hours", icon: Clock },
  ];

  return (
    <div className="flex h-screen bg-background-deep text-white font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-surface border-r border-border/20 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-border/20">
          <h2 className="text-xl font-serif text-gold-soft">Neew Era</h2>
          <p className="text-xs text-muted uppercase tracking-wider mt-1">Admin Panel</p>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
          {menuItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border/20">
          <form action={logout}>
            <button type="submit" className="flex items-center gap-3 px-3 py-3 w-full rounded-lg text-red-400 hover:bg-red-400/10 transition-colors">
              <LogOut className="w-5 h-5" />
              <span className="font-medium text-sm">Sair</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto custom-scrollbar relative pb-20 md:pb-0">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-gold-soft/5 to-transparent pointer-events-none" />
        <div className="p-4 md:p-8 max-w-7xl mx-auto relative z-10">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface border-t border-border/20 flex items-center justify-around px-2 py-3 z-50">
        {menuItems.slice(0, 4).map((item) => (
          <Link 
            key={item.href} 
            href={item.href}
            className="flex flex-col items-center gap-1 p-2 text-white/70 hover:text-gold-soft transition-colors"
          >
            <item.icon className="w-6 h-6" />
            <span className="text-[10px] font-medium">{item.name === "Funcionamento" ? "Horários" : item.name}</span>
          </Link>
        ))}
        <form action={logout}>
          <button type="submit" className="flex flex-col items-center gap-1 p-2 text-red-400 hover:text-red-300 transition-colors">
            <LogOut className="w-6 h-6" />
            <span className="text-[10px] font-medium">Sair</span>
          </button>
        </form>
      </nav>
    </div>
  );
}
