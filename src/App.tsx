import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CookieConsent } from "@/components/CookieConsent";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Tips from "./pages/Tips";
import Recursos from "./pages/Recursos";
import NotFound from "./pages/NotFound";
import CursoLanding from "./pages/CursoLanding";
import CursoInicial from "./pages/CursoInicial";
import CursoIntermedio from "./pages/CursoIntermedio";
import CursoAvanzado from "./pages/CursoAvanzado";
import CursoGracias from "./pages/CursoGracias";
import TestNivel from "./pages/TestNivel";
import DesignSystem from "./pages/DesignSystem";
import PoliticaPrivacidad from "./pages/PoliticaPrivacidad";
import TerminosCondiciones from "./pages/TerminosCondiciones";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/guias-cursos-vibe-coding" element={<CursoLanding />} />
          <Route path="/guias-cursos-vibe-coding/inicial" element={<CursoInicial />} />
          <Route path="/guias-cursos-vibe-coding/intermedio" element={<CursoIntermedio />} />
          <Route path="/guias-cursos-vibe-coding/avanzado" element={<CursoAvanzado />} />
          <Route path="/confirmacion-suscripcion" element={<CursoGracias />} />
          <Route path="/test-nivel" element={<TestNivel />} />
          <Route path="/tips" element={<Tips />} />
          <Route path="/recursos" element={<Recursos />} />
          <Route path="/design-system" element={<DesignSystem />} />
          <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
          <Route path="/terminos-condiciones" element={<TerminosCondiciones />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CookieConsent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
