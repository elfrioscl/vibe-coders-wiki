import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Guías", href: "/guias-cursos-vibe-coding" },
  { name: "Tips", href: "/tips" },
  { name: "Recursos", href: "/recursos" },
];

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <nav className="container flex h-14 items-center justify-between">
          <Link to="/" className="font-semibold text-foreground">
            Vibe Coding en Español
          </Link>
          <div className="flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "text-sm transition-colors hover:text-foreground",
                  location.pathname === item.href
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
