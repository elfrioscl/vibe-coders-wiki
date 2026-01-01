import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Tips from "./pages/Tips";
import Recursos from "./pages/Recursos";
import NotFound from "./pages/NotFound";
import CursoLanding from "./pages/CursoLanding";
import CursoInicial from "./pages/CursoInicial";
import CursoIntermedio from "./pages/CursoIntermedio";
import CursoAvanzado from "./pages/CursoAvanzado";
import CursoGracias from "./pages/CursoGracias";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/curso-vibe-coding" element={<CursoLanding />} />
          <Route path="/curso-vibe-coding/inicial" element={<CursoInicial />} />
          <Route path="/curso-vibe-coding/intermedio" element={<CursoIntermedio />} />
          <Route path="/curso-vibe-coding/avanzado" element={<CursoAvanzado />} />
          <Route path="/curso-vibe-coding/gracias" element={<CursoGracias />} />
          <Route path="/tips" element={<Tips />} />
          <Route path="/recursos" element={<Recursos />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
