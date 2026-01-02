import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { CTASidebar } from "@/components/CTASidebar";
import { TipCard } from "@/components/TipCard";
import { ResourceCard } from "@/components/ResourceCard";
import { CourseCard } from "@/components/CourseCard";
import { ModuleAccordion } from "@/components/ModuleAccordion";
import { cursoInicial } from "@/data/curriculum";
import { Bell, Target, ArrowRight, BookOpen, Lightbulb, FileText, CheckCircle, Clock, ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";

/**
 * DESIGN SYSTEM - SEO para Growth Marketers
 * 
 * Este documento sirve como referencia visual para personas de producto
 * y como fuente de especificaciones CSS para LLMs.
 * 
 * Las especificaciones están embebidas en atributos data-* de cada componente.
 * 
 * COLORES PRINCIPALES (HSL):
 * - Primary: hsl(0, 0%, 9%) - Negro principal
 * - Secondary: hsl(0, 0%, 96%) - Gris claro
 * - Accent: hsl(142, 71%, 45%) - Verde vibrante
 * - Background: hsl(0, 0%, 100%) - Blanco
 * - Foreground: hsl(0, 0%, 9%) - Negro texto
 * - Muted: hsl(0, 0%, 45%) - Gris texto secundario
 * - Card: hsl(0, 0%, 100%) - Blanco
 * - Border: hsl(0, 0%, 90%) - Gris borde
 * 
 * TIPOGRAFÍA:
 * - Font Family: DM Sans, system-ui, sans-serif
 * - Heading: font-weight 600-700
 * - Body: font-weight 400-500
 * 
 * ESPACIADO BASE: 4px (0.25rem)
 * BORDER RADIUS: 0.75rem (cards), 9999px (badges), 0.375rem (buttons)
 */

// Sample data for component previews
const sampleTip = {
  id: "sample",
  title: "Usa 'Dime qué entendiste' antes de ejecutar",
  description: "Antes de pedirle a la IA que haga cambios, pídele que te explique qué entendió. Esto evita malentendidos costosos.",
  category: "prompts" as const,
  level: "basico" as const,
  images: []
};

const sampleResource = {
  id: "sample",
  name: "Lovable Docs",
  description: "Documentación oficial de Lovable para aprender a usar la plataforma.",
  url: "https://docs.lovable.dev",
  category: "vibe-coding" as const
};

const DesignSystem = () => {
  return (
    <Layout>
      <div className="container py-16">
        {/* HEADER */}
        <header 
          data-component="page-header"
          data-css="padding: 4rem 0 3rem; border-bottom: none;"
        >
          <h1 
            className="mb-4 text-3xl font-semibold tracking-tight text-foreground"
            data-css="font-size: 1.875rem; font-weight: 600; letter-spacing: -0.025em; color: hsl(0, 0%, 9%);"
          >
            Design System
          </h1>
          <p 
            className="mb-12 text-lg text-muted-foreground"
            data-css="font-size: 1.125rem; color: hsl(0, 0%, 45%);"
          >
            Guía visual de componentes y estilos
          </p>
        </header>

        {/* === SECCIÓN: BADGES DE NIVEL === */}
        {/* 
          COMPONENTE: Badges de Nivel
          USO: Indicar nivel de dificultad en tips, cursos y recursos
          VARIANTES: Básico (verde), Intermedio (amarillo), Avanzado (rojo)
        */}
        <section 
          className="mb-16"
          data-section="badges"
          data-description="Badges para indicar niveles de dificultad en contenido educativo"
        >
          <h2 className="mb-6 text-xl font-semibold text-foreground">Badges de Nivel</h2>
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex flex-wrap gap-3">
              <span 
                data-component="badge-basico"
                data-css="display: inline-block; padding: 2px 8px; font-size: 12px; font-weight: 500; border-radius: 9999px; background: rgba(34, 197, 94, 0.1); color: rgb(22, 163, 74);"
                data-usage="Contenido para principiantes"
                className="inline-block rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-600 dark:text-green-400"
              >
                Básico
              </span>
              <span 
                data-component="badge-intermedio"
                data-css="display: inline-block; padding: 2px 8px; font-size: 12px; font-weight: 500; border-radius: 9999px; background: rgba(234, 179, 8, 0.1); color: rgb(202, 138, 4);"
                data-usage="Contenido para usuarios con conocimientos previos"
                className="inline-block rounded-full bg-yellow-500/10 px-2 py-0.5 text-xs font-medium text-yellow-600 dark:text-yellow-400"
              >
                Intermedio
              </span>
              <span 
                data-component="badge-avanzado"
                data-css="display: inline-block; padding: 2px 8px; font-size: 12px; font-weight: 500; border-radius: 9999px; background: rgba(239, 68, 68, 0.1); color: rgb(220, 38, 38);"
                data-usage="Contenido para expertos"
                className="inline-block rounded-full bg-red-500/10 px-2 py-0.5 text-xs font-medium text-red-600 dark:text-red-400"
              >
                Avanzado
              </span>
            </div>
          </div>
        </section>

        {/* === SECCIÓN: COMPONENTES DE CONTENIDO === */}
        {/*
          COMPONENTES: TipCard, ResourceCard, CourseCard, ModuleAccordion
          USO: Mostrar tips, recursos externos, cursos y módulos de curso
        */}
        <section 
          className="mb-16"
          data-section="content-components"
          data-description="Componentes para mostrar contenido educativo"
        >
          <h2 className="mb-6 text-xl font-semibold text-foreground">Componentes de Contenido</h2>
          
          <div className="space-y-8">
            {/* TipCard */}
            <div 
              className="rounded-xl border border-border bg-card p-6"
              data-component="tip-card"
              data-usage="Mostrar tips con badge de nivel, descripción y botón copiar"
              data-props="tip: Tip, index: number"
            >
              <h3 className="mb-4 font-medium text-foreground">TipCard</h3>
              <div className="max-w-md">
                <TipCard tip={sampleTip} index={0} />
              </div>
            </div>

            {/* ResourceCard */}
            <div 
              className="rounded-xl border border-border bg-card p-6"
              data-component="resource-card"
              data-usage="Mostrar recurso externo como link con descripción"
              data-props="resource: Resource, index: number"
            >
              <h3 className="mb-4 font-medium text-foreground">ResourceCard</h3>
              <div className="max-w-md">
                <ResourceCard resource={sampleResource} index={0} />
              </div>
            </div>

            {/* CourseCard */}
            <div 
              className="rounded-xl border border-border bg-card p-6"
              data-component="course-card"
              data-usage="Mostrar curso con nivel, cantidad de módulos y temas"
              data-props="course: Course"
            >
              <h3 className="mb-4 font-medium text-foreground">CourseCard</h3>
              <div className="max-w-md">
                <CourseCard course={cursoInicial} />
              </div>
            </div>

            {/* ModuleAccordion */}
            <div 
              className="rounded-xl border border-border bg-card p-6"
              data-component="module-accordion"
              data-usage="Mostrar módulo de curso con objetivo, resultado y accordion de temas"
              data-props="module: Module"
            >
              <h3 className="mb-4 font-medium text-foreground">ModuleAccordion</h3>
              <div className="max-w-xl">
                <ModuleAccordion module={cursoInicial.modules[0]} />
              </div>
            </div>
          </div>
        </section>

        {/* === SECCIÓN: BOTONES === */}
        {/*
          COMPONENTE: Botones
          USO: Acciones principales y secundarias en la interfaz
          VARIANTES: Default, Outline, Ghost
        */}
        <section 
          className="mb-16"
          data-section="buttons"
          data-description="Botones para acciones en la interfaz"
        >
          <h2 className="mb-6 text-xl font-semibold text-foreground">Botones</h2>
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 text-sm font-medium text-muted-foreground">Variantes</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button 
                data-component="button-primary"
                data-css="display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.5rem 1rem; height: 2.5rem; font-size: 0.875rem; font-weight: 500; font-family: 'DM Sans', system-ui, sans-serif; border-radius: 0.375rem; background-color: hsl(0 0% 9%); color: hsl(0 0% 99%); border: none; cursor: pointer; transition: background-color 0.2s;"
                data-usage="Acciones principales, CTAs"
              >
                Primario
              </Button>
              <Button 
                variant="outline"
                data-component="button-outline"
                data-css="display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.5rem 1rem; height: 2.5rem; font-size: 0.875rem; font-weight: 500; font-family: 'DM Sans', system-ui, sans-serif; border-radius: 0.375rem; background-color: hsl(0 0% 100%); color: hsl(0 0% 9%); border: 1px solid hsl(0 0% 90%); cursor: pointer; transition: background-color 0.2s;"
                data-usage="Acciones secundarias, menos énfasis"
              >
                Outline
              </Button>
              <Button 
                variant="ghost"
                data-component="button-ghost"
                data-css="display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.5rem 1rem; height: 2.5rem; font-size: 0.875rem; font-weight: 500; font-family: 'DM Sans', system-ui, sans-serif; border-radius: 0.375rem; background-color: transparent; color: hsl(0 0% 9%); border: none; cursor: pointer; transition: background-color 0.2s;"
                data-usage="Acciones sutiles, navegación"
              >
                Ghost
              </Button>
            </div>
            
            <Separator className="my-6" />
            
            <h3 className="mb-4 text-sm font-medium text-muted-foreground">Con Iconos</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button 
                className="gap-2"
                data-component="button-with-icon"
                data-css="gap: 0.5rem;"
                data-usage="CTAs con indicador de acción"
              >
                <Target className="h-4 w-4" />
                Mide tu nivel
              </Button>
              <Button 
                variant="outline"
                className="gap-2"
                data-component="button-outline-icon"
              >
                <Bell className="h-4 w-4" />
                Avísame
              </Button>
              <Button 
                className="gap-2"
                data-component="button-arrow"
              >
                Siguiente <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* === SECCIÓN: CARDS === */}
        {/*
          COMPONENTE: Cards
          USO: Contenedores de contenido
          VARIANTES: Estándar, Con link, Con icono
        */}
        <section 
          className="mb-16"
          data-section="cards"
          data-description="Tarjetas contenedoras para distintos tipos de contenido"
        >
          <h2 className="mb-6 text-xl font-semibold text-foreground">Cards</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card 
              className="p-6"
              data-component="card-standard"
              data-css="padding: 1.5rem; border-radius: 0.75rem; border: 1px solid hsl(0 0% 90%); background-color: hsl(0 0% 100%);"
              data-usage="Contenedor general de contenido"
            >
              <h4 className="mb-2 font-medium text-foreground">Card Estándar</h4>
              <p className="text-sm text-muted-foreground">Descripción o contenido de la card.</p>
            </Card>

            <a 
              href="#" 
              className="block rounded-xl border border-border bg-card p-6 transition-all hover:border-foreground/20"
              data-component="card-link"
              data-css="display: block; padding: 1.5rem; border-radius: 0.75rem; border: 1px solid hsl(0 0% 90%); background-color: hsl(0 0% 100%); text-decoration: none; transition: border-color 0.2s;"
              data-usage="Cards clickeables, items de lista"
            >
              <div className="mb-4 inline-flex rounded-lg bg-accent/10 p-3">
                <Target className="h-5 w-5 text-accent" />
              </div>
              <h4 className="mb-2 font-medium text-foreground">Card con Link</h4>
              <p className="text-sm text-muted-foreground">Card interactiva con hover.</p>
            </a>
          </div>
        </section>

        {/* === SECCIÓN: FORMULARIOS === */}
        {/*
          COMPONENTE: Form Elements
          USO: Inputs y formularios de suscripción
        */}
        <section 
          className="mb-16"
          data-section="forms"
          data-description="Elementos de formulario para entrada de datos"
        >
          <h2 className="mb-6 text-xl font-semibold text-foreground">Formularios</h2>
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="space-y-6">
              <div 
                data-component="input-default"
                data-css="display: flex; width: 100%; height: 2.5rem; padding: 0.5rem 0.75rem; font-size: 0.875rem; font-family: 'DM Sans', system-ui, sans-serif; border-radius: 0.375rem; border: 1px solid hsl(0 0% 90%); background-color: transparent; color: hsl(0 0% 9%); outline: none;"
              >
                <label className="mb-2 block text-sm font-medium text-foreground">Input de texto</label>
                <Input type="email" placeholder="tu@email.com" className="max-w-sm" />
              </div>
              
              <div 
                data-component="form-inline"
                data-css="display: flex; gap: 0.75rem; flex-wrap: wrap;"
                data-usage="Formulario de suscripción inline"
              >
                <label className="mb-2 block text-sm font-medium text-foreground">Form Inline</label>
                <div className="flex flex-col gap-3 sm:flex-row max-w-md">
                  <Input type="email" placeholder="tu@email.com" className="flex-1" />
                  <Button>Suscribirme</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* === SECCIÓN: CTAs === */}
        {/*
          COMPONENTE: CTA Sidebar
          USO: Call to actions en sidebar de páginas de contenido
        */}
        <section 
          className="mb-16"
          data-section="ctas"
          data-description="Componentes de Call to Action"
        >
          <h2 className="mb-6 text-xl font-semibold text-foreground">CTAs (Call to Action)</h2>
          <div 
            className="rounded-xl border border-border bg-card p-6"
            data-component="cta-sidebar"
            data-usage="CTA Sidebar con 2 cards: test de nivel y suscripción a alertas"
            data-props="defaultCourse: 'inicial' | 'intermedio' | 'avanzado'"
          >
            <h3 className="mb-4 font-medium text-foreground">CTA Sidebar</h3>
            <div className="max-w-sm">
              <CTASidebar defaultCourse="inicial" />
            </div>
          </div>
        </section>

        {/* === SECCIÓN: ICONOS === */}
        {/*
          COMPONENTE: Iconos
          LIBRERÍA: Lucide React
          TAMAÑOS: 16px (h-4 w-4), 20px (h-5 w-5), 24px (h-6 w-6)
        */}
        <section 
          className="mb-16"
          data-section="icons"
          data-description="Sistema de iconos usando Lucide React"
          data-library="lucide-react"
        >
          <h2 className="mb-6 text-xl font-semibold text-foreground">Iconos</h2>
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex flex-wrap gap-6">
              <div 
                className="flex flex-col items-center gap-2"
                data-component="icon-curso"
                data-icon="BookOpen"
                data-usage="Representar cursos y contenido educativo"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground">Cursos</span>
              </div>
              
              <div 
                className="flex flex-col items-center gap-2"
                data-component="icon-tip"
                data-icon="Lightbulb"
                data-usage="Representar tips y consejos"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-500/10">
                  <Lightbulb className="h-6 w-6 text-yellow-600" />
                </div>
                <span className="text-xs text-muted-foreground">Tips</span>
              </div>
              
              <div 
                className="flex flex-col items-center gap-2"
                data-component="icon-recurso"
                data-icon="FileText"
                data-usage="Representar recursos y documentos"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-xs text-muted-foreground">Recursos</span>
              </div>
              
              <div 
                className="flex flex-col items-center gap-2"
                data-component="icon-completado"
                data-icon="CheckCircle"
                data-usage="Indicar estado completado o éxito"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <span className="text-xs text-muted-foreground">Completado</span>
              </div>
              
              <div 
                className="flex flex-col items-center gap-2"
                data-component="icon-tiempo"
                data-icon="Clock"
                data-usage="Indicar duración o tiempo"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <span className="text-xs text-muted-foreground">Tiempo</span>
              </div>
              
              <div 
                className="flex flex-col items-center gap-2"
                data-component="icon-externo"
                data-icon="ExternalLink"
                data-usage="Indicar link externo"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <ExternalLink className="h-6 w-6 text-accent" />
                </div>
                <span className="text-xs text-muted-foreground">Externo</span>
              </div>
            </div>
          </div>
        </section>

        {/* === SECCIÓN: TIPOGRAFÍA === */}
        {/*
          COMPONENTE: Tipografía
          FONT-FAMILY: DM Sans, system-ui, sans-serif
          ESCALA: 0.75rem - 2.25rem
        */}
        <section 
          className="mb-16"
          data-section="typography"
          data-description="Sistema tipográfico basado en DM Sans"
          data-font-family="DM Sans, system-ui, sans-serif"
        >
          <h2 className="mb-6 text-xl font-semibold text-foreground">Tipografía</h2>
          <div className="rounded-xl border border-border bg-card p-6 space-y-6">
            <div 
              data-component="heading-h1"
              data-css="font-size: 2.25rem; line-height: 2.5rem; font-weight: 700; letter-spacing: -0.025em; color: hsl(0, 0%, 9%);"
            >
              <span className="text-xs text-muted-foreground uppercase tracking-wider">H1</span>
              <h1 className="text-4xl font-bold tracking-tight text-foreground">Título Principal</h1>
            </div>
            
            <div 
              data-component="heading-h2"
              data-css="font-size: 1.875rem; line-height: 2.25rem; font-weight: 600; color: hsl(0, 0%, 9%);"
            >
              <span className="text-xs text-muted-foreground uppercase tracking-wider">H2</span>
              <h2 className="text-3xl font-semibold text-foreground">Título Secundario</h2>
            </div>
            
            <div 
              data-component="heading-h3"
              data-css="font-size: 1.5rem; line-height: 2rem; font-weight: 600; color: hsl(0, 0%, 9%);"
            >
              <span className="text-xs text-muted-foreground uppercase tracking-wider">H3</span>
              <h3 className="text-2xl font-semibold text-foreground">Subtítulo</h3>
            </div>
            
            <Separator />
            
            <div 
              data-component="body-large"
              data-css="font-size: 1.125rem; line-height: 1.75rem; font-weight: 400; color: hsl(0, 0%, 9%);"
            >
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Body Large</span>
              <p className="text-lg text-foreground">Texto de párrafo grande para introducciones.</p>
            </div>
            
            <div 
              data-component="body-default"
              data-css="font-size: 1rem; line-height: 1.5rem; font-weight: 400; color: hsl(0, 0%, 9%);"
            >
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Body</span>
              <p className="text-base text-foreground">Texto de párrafo estándar para contenido general.</p>
            </div>
            
            <div 
              data-component="body-small"
              data-css="font-size: 0.875rem; line-height: 1.25rem; font-weight: 400; color: hsl(0, 0%, 45%);"
            >
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Body Small</span>
              <p className="text-sm text-muted-foreground">Texto pequeño para descripciones y metadatos.</p>
            </div>
          </div>
        </section>

        {/* === SECCIÓN: COLORES === */}
        {/*
          COMPONENTE: Paleta de Colores
          FORMATO: HSL
        */}
        <section 
          className="mb-16"
          data-section="colors"
          data-description="Paleta de colores del sistema de diseño"
        >
          <h2 className="mb-6 text-xl font-semibold text-foreground">Colores</h2>
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 text-sm font-medium text-muted-foreground">Colores Base</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
              <div 
                data-component="color-primary"
                data-hsl="0, 0%, 9%"
                data-usage="Texto principal, botones primarios"
              >
                <div className="mb-2 h-16 rounded-lg bg-primary"></div>
                <p className="text-sm font-medium">Primary</p>
                <p className="text-xs text-muted-foreground">hsl(0, 0%, 9%)</p>
              </div>
              
              <div 
                data-component="color-secondary"
                data-hsl="0, 0%, 96%"
                data-usage="Fondos secundarios, estados hover"
              >
                <div className="mb-2 h-16 rounded-lg bg-secondary border border-border"></div>
                <p className="text-sm font-medium">Secondary</p>
                <p className="text-xs text-muted-foreground">hsl(0, 0%, 96%)</p>
              </div>
              
              <div 
                data-component="color-accent"
                data-hsl="142, 71%, 45%"
                data-usage="Acentos, highlights, links"
              >
                <div className="mb-2 h-16 rounded-lg bg-accent"></div>
                <p className="text-sm font-medium">Accent</p>
                <p className="text-xs text-muted-foreground">hsl(142, 71%, 45%)</p>
              </div>
              
              <div 
                data-component="color-muted"
                data-hsl="0, 0%, 45%"
                data-usage="Texto secundario, descripciones"
              >
                <div className="mb-2 h-16 rounded-lg bg-muted-foreground"></div>
                <p className="text-sm font-medium">Muted</p>
                <p className="text-xs text-muted-foreground">hsl(0, 0%, 45%)</p>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <h3 className="mb-4 text-sm font-medium text-muted-foreground">Colores Semánticos (Niveles)</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <div 
                data-component="color-basico"
                data-usage="Nivel básico"
              >
                <div className="mb-2 h-12 rounded-lg bg-green-500"></div>
                <p className="text-sm font-medium">Básico (Verde)</p>
              </div>
              
              <div 
                data-component="color-intermedio"
                data-usage="Nivel intermedio"
              >
                <div className="mb-2 h-12 rounded-lg bg-yellow-500"></div>
                <p className="text-sm font-medium">Intermedio (Amarillo)</p>
              </div>
              
              <div 
                data-component="color-avanzado"
                data-usage="Nivel avanzado"
              >
                <div className="mb-2 h-12 rounded-lg bg-red-500"></div>
                <p className="text-sm font-medium">Avanzado (Rojo)</p>
              </div>
            </div>
          </div>
        </section>

        {/* === SECCIÓN: ESPACIADO === */}
        {/*
          COMPONENTE: Sistema de Espaciado
          BASE: 4px (0.25rem)
          ESCALA: 4, 8, 12, 16, 24, 32, 48, 64
        */}
        <section 
          className="mb-16"
          data-section="spacing"
          data-description="Sistema de espaciado basado en 4px"
          data-base="4px (0.25rem)"
        >
          <h2 className="mb-6 text-xl font-semibold text-foreground">Espaciado</h2>
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4" data-spacing="4px" data-tailwind="1">
                <div className="h-4 w-1 bg-primary"></div>
                <span className="text-sm">4px (p-1, m-1, gap-1)</span>
              </div>
              <div className="flex items-center gap-4" data-spacing="8px" data-tailwind="2">
                <div className="h-4 w-2 bg-primary"></div>
                <span className="text-sm">8px (p-2, m-2, gap-2)</span>
              </div>
              <div className="flex items-center gap-4" data-spacing="16px" data-tailwind="4">
                <div className="h-4 w-4 bg-primary"></div>
                <span className="text-sm">16px (p-4, m-4, gap-4)</span>
              </div>
              <div className="flex items-center gap-4" data-spacing="24px" data-tailwind="6">
                <div className="h-4 w-6 bg-primary"></div>
                <span className="text-sm">24px (p-6, m-6, gap-6)</span>
              </div>
              <div className="flex items-center gap-4" data-spacing="32px" data-tailwind="8">
                <div className="h-4 w-8 bg-primary"></div>
                <span className="text-sm">32px (p-8, m-8, gap-8)</span>
              </div>
              <div className="flex items-center gap-4" data-spacing="48px" data-tailwind="12">
                <div className="h-4 w-12 bg-primary"></div>
                <span className="text-sm">48px (p-12, m-12, gap-12)</span>
              </div>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default DesignSystem;
