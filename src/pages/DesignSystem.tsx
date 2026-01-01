import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { CTASidebar } from "@/components/CTASidebar";
import { Bell, Target, ArrowRight, Github } from "lucide-react";

const DesignSystem = () => {
  return (
    <Layout>
      <div className="container py-16">
        <h1 className="mb-4 text-3xl font-semibold tracking-tight text-foreground">
          Design System
        </h1>
        <p className="mb-12 text-lg text-muted-foreground">
          Componentes reutilizables con CSS inline para copiar fácilmente.
        </p>

        {/* Buttons */}
        <section className="mb-16">
          <h2 className="mb-6 text-xl font-semibold text-foreground">Botones</h2>
          
          <div className="space-y-8">
            {/* Primary Button */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-4 font-medium text-foreground">Primary Button</h3>
              <div className="mb-4">
                <Button>Botón Primario</Button>
              </div>
              <pre className="overflow-x-auto rounded-lg bg-secondary p-4 text-sm">
{`<button style="
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  height: 2.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: 'DM Sans', system-ui, sans-serif;
  border-radius: 0.375rem;
  background-color: hsl(0 0% 9%);
  color: hsl(0 0% 99%);
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
">Botón Primario</button>`}
              </pre>
            </div>

            {/* Outline Button */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-4 font-medium text-foreground">Outline Button</h3>
              <div className="mb-4">
                <Button variant="outline">Botón Outline</Button>
              </div>
              <pre className="overflow-x-auto rounded-lg bg-secondary p-4 text-sm">
{`<button style="
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  height: 2.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: 'DM Sans', system-ui, sans-serif;
  border-radius: 0.375rem;
  background-color: hsl(0 0% 100%);
  color: hsl(0 0% 9%);
  border: 1px solid hsl(0 0% 90%);
  cursor: pointer;
  transition: background-color 0.2s;
">Botón Outline</button>`}
              </pre>
            </div>

            {/* Ghost Button */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-4 font-medium text-foreground">Ghost Button</h3>
              <div className="mb-4">
                <Button variant="ghost">Botón Ghost</Button>
              </div>
              <pre className="overflow-x-auto rounded-lg bg-secondary p-4 text-sm">
{`<button style="
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  height: 2.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: 'DM Sans', system-ui, sans-serif;
  border-radius: 0.375rem;
  background-color: transparent;
  color: hsl(0 0% 9%);
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
">Botón Ghost</button>`}
              </pre>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section className="mb-16">
          <h2 className="mb-6 text-xl font-semibold text-foreground">Cards</h2>
          
          <div className="space-y-8">
            {/* Standard Card */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-4 font-medium text-foreground">Card Estándar</h3>
              <div className="mb-4">
                <Card className="p-6">
                  <h4 className="mb-2 font-medium text-foreground">Título de la Card</h4>
                  <p className="text-sm text-muted-foreground">Descripción o contenido de la card.</p>
                </Card>
              </div>
              <pre className="overflow-x-auto rounded-lg bg-secondary p-4 text-sm">
{`<div style="
  padding: 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid hsl(0 0% 90%);
  background-color: hsl(0 0% 100%);
">
  <h4 style="
    margin-bottom: 0.5rem;
    font-weight: 500;
    font-family: 'DM Sans', system-ui, sans-serif;
    color: hsl(0 0% 9%);
  ">Título de la Card</h4>
  <p style="
    font-size: 0.875rem;
    font-family: 'DM Sans', system-ui, sans-serif;
    color: hsl(0 0% 45%);
  ">Descripción o contenido de la card.</p>
</div>`}
              </pre>
            </div>

            {/* Link Card */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-4 font-medium text-foreground">Card con Link</h3>
              <div className="mb-4">
                <a href="#" className="block rounded-xl border border-border bg-card p-6 transition-all hover:border-foreground/20">
                  <div className="mb-4 inline-flex rounded-lg bg-accent/10 p-3">
                    <Target className="h-5 w-5 text-accent" />
                  </div>
                  <h4 className="mb-2 font-medium text-foreground">Título con ícono</h4>
                  <p className="text-sm text-muted-foreground">Descripción de la card con link.</p>
                </a>
              </div>
              <pre className="overflow-x-auto rounded-lg bg-secondary p-4 text-sm">
{`<a href="#" style="
  display: block;
  padding: 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid hsl(0 0% 90%);
  background-color: hsl(0 0% 100%);
  text-decoration: none;
  transition: border-color 0.2s;
">
  <div style="
    display: inline-flex;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border-radius: 0.5rem;
    background-color: hsla(142 71% 45% / 0.1);
  ">
    <!-- Icon SVG here -->
  </div>
  <h4 style="
    margin-bottom: 0.5rem;
    font-weight: 500;
    font-family: 'DM Sans', system-ui, sans-serif;
    color: hsl(0 0% 9%);
  ">Título con ícono</h4>
  <p style="
    font-size: 0.875rem;
    font-family: 'DM Sans', system-ui, sans-serif;
    color: hsl(0 0% 45%);
  ">Descripción de la card con link.</p>
</a>`}
              </pre>
            </div>
          </div>
        </section>

        {/* Forms */}
        <section className="mb-16">
          <h2 className="mb-6 text-xl font-semibold text-foreground">Forms</h2>
          
          <div className="space-y-8">
            {/* Input */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-4 font-medium text-foreground">Input</h3>
              <div className="mb-4 max-w-sm">
                <Input type="email" placeholder="tu@email.com" />
              </div>
              <pre className="overflow-x-auto rounded-lg bg-secondary p-4 text-sm">
{`<input type="email" placeholder="tu@email.com" style="
  display: flex;
  width: 100%;
  height: 2.5rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-family: 'DM Sans', system-ui, sans-serif;
  border-radius: 0.375rem;
  border: 1px solid hsl(0 0% 90%);
  background-color: transparent;
  color: hsl(0 0% 9%);
  outline: none;
" />`}
              </pre>
            </div>

            {/* Form Inline */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-4 font-medium text-foreground">Form Inline (Waitlist)</h3>
              <div className="mb-4 max-w-md">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Input type="email" placeholder="tu@email.com" className="flex-1" />
                  <Button>Suscribirme</Button>
                </div>
              </div>
              <pre className="overflow-x-auto rounded-lg bg-secondary p-4 text-sm">
{`<form style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
  <input type="email" placeholder="tu@email.com" style="
    flex: 1;
    min-width: 200px;
    height: 2.5rem;
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    font-family: 'DM Sans', system-ui, sans-serif;
    border-radius: 0.375rem;
    border: 1px solid hsl(0 0% 90%);
    background-color: transparent;
    color: hsl(0 0% 9%);
  " />
  <button style="
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    height: 2.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    font-family: 'DM Sans', system-ui, sans-serif;
    border-radius: 0.375rem;
    background-color: hsl(0 0% 9%);
    color: hsl(0 0% 99%);
    border: none;
    cursor: pointer;
  ">Suscribirme</button>
</form>`}
              </pre>
            </div>
          </div>
        </section>

        {/* CTAs */}
        <section className="mb-16">
          <h2 className="mb-6 text-xl font-semibold text-foreground">CTAs (Call to Action)</h2>
          
          <div className="space-y-8">
            {/* CTA Sidebar Component */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-4 font-medium text-foreground">CTA Sidebar (2 Cards)</h3>
              <div className="mb-4 max-w-sm">
                <CTASidebar defaultCourse="inicial" />
              </div>
              <p className="text-sm text-muted-foreground">
                Componente: <code className="rounded bg-secondary px-2 py-0.5">&lt;CTASidebar defaultCourse="inicial" /&gt;</code>
              </p>
            </div>

            {/* CTA Primary Button */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-4 font-medium text-foreground">CTA con Botón Primario</h3>
              <div className="mb-4">
                <Button className="gap-2">
                  <Target className="h-4 w-4" />
                  Mide tu nivel de vibe coding
                </Button>
              </div>
              <pre className="overflow-x-auto rounded-lg bg-secondary p-4 text-sm">
{`<button style="
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  height: 2.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: 'DM Sans', system-ui, sans-serif;
  border-radius: 0.375rem;
  background-color: hsl(0 0% 9%);
  color: hsl(0 0% 99%);
  border: none;
  cursor: pointer;
">
  <!-- Icon SVG -->
  Mide tu nivel de vibe coding
</button>`}
              </pre>
            </div>

            {/* CTA Outline Button */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-4 font-medium text-foreground">CTA con Botón Outline</h3>
              <div className="mb-4">
                <Button variant="outline" className="gap-2">
                  <Bell className="h-4 w-4" />
                  Avísame cuando haya novedades
                </Button>
              </div>
              <pre className="overflow-x-auto rounded-lg bg-secondary p-4 text-sm">
{`<button style="
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  height: 2.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: 'DM Sans', system-ui, sans-serif;
  border-radius: 0.375rem;
  background-color: hsl(0 0% 100%);
  color: hsl(0 0% 9%);
  border: 1px solid hsl(0 0% 90%);
  cursor: pointer;
">
  <!-- Icon SVG -->
  Avísame cuando haya novedades
</button>`}
              </pre>
            </div>
          </div>
        </section>

        {/* Colors */}
        <section className="mb-16">
          <h2 className="mb-6 text-xl font-semibold text-foreground">Colores</h2>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="mb-3 h-16 rounded-lg bg-primary"></div>
              <p className="text-sm font-medium">Primary</p>
              <code className="text-xs text-muted-foreground">hsl(0 0% 9%)</code>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="mb-3 h-16 rounded-lg bg-secondary"></div>
              <p className="text-sm font-medium">Secondary</p>
              <code className="text-xs text-muted-foreground">hsl(0 0% 96%)</code>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="mb-3 h-16 rounded-lg bg-accent"></div>
              <p className="text-sm font-medium">Accent</p>
              <code className="text-xs text-muted-foreground">hsl(142 71% 45%)</code>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="mb-3 h-16 rounded-lg bg-muted"></div>
              <p className="text-sm font-medium">Muted</p>
              <code className="text-xs text-muted-foreground">hsl(0 0% 96%)</code>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="mb-3 h-16 rounded-lg border border-border bg-card"></div>
              <p className="text-sm font-medium">Card</p>
              <code className="text-xs text-muted-foreground">hsl(0 0% 100%)</code>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="mb-3 h-16 rounded-lg bg-destructive"></div>
              <p className="text-sm font-medium">Destructive</p>
              <code className="text-xs text-muted-foreground">hsl(0 84% 60%)</code>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="mb-16">
          <h2 className="mb-6 text-xl font-semibold text-foreground">Tipografía</h2>
          
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="space-y-4">
              <div>
                <h1 className="text-4xl font-semibold">Heading 1 (text-4xl)</h1>
                <code className="text-xs text-muted-foreground">font-family: 'DM Sans'; font-size: 2.25rem; font-weight: 600</code>
              </div>
              <div>
                <h2 className="text-3xl font-semibold">Heading 2 (text-3xl)</h2>
                <code className="text-xs text-muted-foreground">font-family: 'DM Sans'; font-size: 1.875rem; font-weight: 600</code>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Heading 3 (text-xl)</h3>
                <code className="text-xs text-muted-foreground">font-family: 'DM Sans'; font-size: 1.25rem; font-weight: 600</code>
              </div>
              <div>
                <p className="text-lg text-muted-foreground">Paragraph large (text-lg)</p>
                <code className="text-xs text-muted-foreground">font-family: 'DM Sans'; font-size: 1.125rem</code>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Paragraph small (text-sm)</p>
                <code className="text-xs text-muted-foreground">font-family: 'DM Sans'; font-size: 0.875rem</code>
              </div>
              <div>
                <code className="rounded bg-secondary px-2 py-1 font-mono text-sm">Code (font-mono)</code>
                <br />
                <code className="text-xs text-muted-foreground">font-family: 'JetBrains Mono'</code>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default DesignSystem;
