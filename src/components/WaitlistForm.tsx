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

const emailSchema = z.string().email("Ingresa un email válido");

interface WaitlistFormProps {
  defaultCourse?: string;
  compact?: boolean;
}

export function WaitlistForm({ defaultCourse = "todos", compact = false }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [cursoInteres, setCursoInteres] = useState(defaultCourse);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = emailSchema.safeParse(email);
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.from("waitlist").insert({
        email: email.trim().toLowerCase(),
        curso_interes: cursoInteres,
      });

      if (error) {
        if (error.code === "23505") {
          toast.error("Este email ya está registrado en el waitlist");
        } else {
          toast.error("Hubo un error. Intenta de nuevo.");
        }
        return;
      }

      navigate("/guias-cursos-vibe-coding/gracias");
    } catch {
      toast.error("Hubo un error. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1"
          required
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Enviando..." : "Unirme al waitlist"}
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
        <label htmlFor="curso" className="text-sm font-medium text-foreground">
          ¿Qué guía te interesa?
        </label>
        <Select value={cursoInteres} onValueChange={setCursoInteres}>
          <SelectTrigger id="curso">
            <SelectValue placeholder="Selecciona una guía" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todas las guías</SelectItem>
            <SelectItem value="inicial">Guía Inicial</SelectItem>
            <SelectItem value="intermedio">Guía Intermedia</SelectItem>
            <SelectItem value="avanzado">Guía Avanzada</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Enviando..." : "Unirme al waitlist"}
      </Button>
    </form>
  );
}
