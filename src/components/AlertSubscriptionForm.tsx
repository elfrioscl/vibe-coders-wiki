import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

const emailSchema = z.string().email("Por favor ingresa un email válido");

interface AlertSubscriptionFormProps {
  defaultCourse?: string;
  compact?: boolean;
}

export function AlertSubscriptionForm({ defaultCourse = "todos", compact = false }: AlertSubscriptionFormProps) {
  const [email, setEmail] = useState("");
  const [temaInteres, setTemaInteres] = useState(defaultCourse);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from("suscripciones_alertas")
        .insert({ 
          email, 
          tema_interes: temaInteres 
        });

      if (error) {
        if (error.code === "23505") {
          toast.error("Este email ya está suscrito a las alertas");
        } else {
          toast.error("Hubo un error. Por favor intenta de nuevo.");
        }
        return;
      }

      toast.success("¡Te has suscrito correctamente!");
      navigate("/confirmacion-suscripcion");
    } catch {
      toast.error("Hubo un error. Por favor intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Input
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-10"
        />
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Suscribiendo..." : "Suscribirme"}
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="tema" className="text-sm font-medium text-foreground">
          ¿Qué tema te interesa más?
        </label>
        <Select value={temaInteres} onValueChange={setTemaInteres}>
          <SelectTrigger id="tema">
            <SelectValue placeholder="Selecciona un tema" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los temas</SelectItem>
            <SelectItem value="inicial">Nivel Inicial</SelectItem>
            <SelectItem value="intermedio">Nivel Intermedio</SelectItem>
            <SelectItem value="avanzado">Nivel Avanzado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Suscribiendo..." : "Suscribirme a alertas"}
      </Button>
    </form>
  );
}
