import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "Student" },
  { to: "/instructor", label: "Instructor" },
  { to: "/admin", label: "Admin" },
  { to: "/parent", label: "Parent" },
];

export function Header() {
  const location = useLocation();
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-background/70">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-primary to-secondary" />
          <span className="text-lg font-extrabold tracking-tight">AdeptLearn</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-accent hover:text-accent-foreground",
                  isActive && "bg-primary text-primary-foreground hover:bg-primary/90",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink
            to="/discussions"
            className={({ isActive }) =>
              cn(
                "rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-accent hover:text-accent-foreground",
                isActive && "bg-primary text-primary-foreground hover:bg-primary/90",
              )
            }
          >
            Discussions
          </NavLink>
          <NavLink
            to="/study-groups"
            className={({ isActive }) =>
              cn(
                "rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-accent hover:text-accent-foreground",
                isActive && "bg-primary text-primary-foreground hover:bg-primary/90",
              )
            }
          >
            Study Groups
          </NavLink>
          <NavLink
            to="/gamification"
            className={({ isActive }) =>
              cn(
                "rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-accent hover:text-accent-foreground",
                isActive && "bg-primary text-primary-foreground hover:bg-primary/90",
              )
            }
          >
            Gamification
          </NavLink>
          <NavLink
            to="/calendar"
            className={({ isActive }) =>
              cn(
                "rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-accent hover:text-accent-foreground",
                isActive && "bg-primary text-primary-foreground hover:bg-primary/90",
              )
            }
          >
            Calendar
          </NavLink>
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-3 md:flex">
            <span className="text-sm text-muted-foreground">{/* placeholder for role */}</span>
          </div>
          <AuthControls />
        </div>
      </div>
    </header>
  );
}

function AccessibilityControls() {
  const [large, setLarge] = useState(() => localStorage.getItem('a11y-large') === '1');
  const [highContrast, setHighContrast] = useState(() => localStorage.getItem('a11y-contrast') === '1');

  useEffect(() => {
    const el = document.documentElement;
    if (large) el.classList.add('a11y-large'); else el.classList.remove('a11y-large');
    if (highContrast) el.classList.add('a11y-contrast'); else el.classList.remove('a11y-contrast');
    localStorage.setItem('a11y-large', large ? '1' : '0');
    localStorage.setItem('a11y-contrast', highContrast ? '1' : '0');
  }, [large, highContrast]);

  return (
    <div className="flex items-center gap-2">
      <button
        aria-pressed={large}
        onClick={() => setLarge((s) => !s)}
        className="rounded-md border px-2 py-1 text-sm"
        title="Toggle larger text"
      >
        A+
      </button>
      <button
        aria-pressed={highContrast}
        onClick={() => setHighContrast((s) => !s)}
        className="rounded-md border px-2 py-1 text-sm"
        title="Toggle high contrast"
      >
        HC
      </button>
    </div>
  );
}

function AuthControls() {
  const { user, logout } = useAuth();
  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link to="/login" className="text-sm text-foreground/80 hover:underline">Sign In</Link>
        <Link to="/register" className="rounded-md bg-primary px-3 py-1.5 text-primary-foreground">Sign Up</Link>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium">{user.name}</span>
      <button onClick={() => logout()} className="text-sm text-muted-foreground hover:text-foreground">Logout</button>
    </div>
  );
}
