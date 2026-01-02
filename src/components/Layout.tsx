import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, Cookie } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCookieConsent } from "@/hooks/useCookieConsent";

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
  const [open, setOpen] = useState(false);
  const { openSettings } = useCookieConsent();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <nav className="container flex h-14 items-center justify-between">
          <Link to="/" className="flex flex-col leading-tight">
            <span className="font-semibold text-foreground">Vibe Coding</span>
            <span className="text-xs text-muted-foreground">en Español</span>
          </Link>
          
          {/* Desktop menu */}
          <div className="hidden items-center gap-6 md:flex">
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

          {/* Mobile hamburger menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <nav className="flex flex-col gap-4 pt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "text-lg transition-colors hover:text-foreground",
                      location.pathname === item.href
                        ? "text-foreground font-medium"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="border-t border-border bg-background py-6 sm:py-8">
        <div className="container flex flex-col items-center gap-4 text-center text-sm text-muted-foreground sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-2">
            <span>Creado con</span>
            <a href="https://lovable.dev" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70">
              <img src="/images/lovable-logo.svg" alt="Lovable" className="h-5" />
            </a>
            <span>&</span>
            <a href="https://cursor.com" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70">
              <img src="/images/cursor-logo.svg" alt="Cursor" className="h-5" />
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 sm:justify-end">
            <button
              onClick={openSettings}
              className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
            >
              <Cookie className="h-3.5 w-3.5" />
              Ajustes de cookies
            </button>
            <span className="text-border hidden sm:inline">|</span>
            <Link
              to="/politica-privacidad"
              className="transition-colors hover:text-foreground"
            >
              Política de Privacidad
            </Link>
            <span className="text-border hidden sm:inline">|</span>
            <Link
              to="/terminos-condiciones"
              className="transition-colors hover:text-foreground"
            >
              Términos y Condiciones
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
