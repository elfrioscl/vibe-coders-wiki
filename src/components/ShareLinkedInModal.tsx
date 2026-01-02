import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Linkedin, Copy, ExternalLink, Link2, Share2 } from "lucide-react";
import { toast } from "sonner";
import { useCanvasShare } from "@/hooks/useCanvasShare";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";

type Nivel = 'inicial' | 'intermedio' | 'avanzado' | 'expert';

const nivelTitulos: Record<Nivel, string> = {
  inicial: 'INICIAL',
  intermedio: 'INTERMEDIO',
  avanzado: 'AVANZADO',
  expert: 'EXPERT'
};

interface ShareData {
  nivel: Nivel;
  porcentajeAciertos: number;
  tiempoMinutos: number;
  tiempoSegundos: number;
}

interface ShareLinkedInModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shareId: string | null;
  data: ShareData;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

export function ShareLinkedInModal({
  open,
  onOpenChange,
  shareId,
  data,
}: ShareLinkedInModalProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const { downloadImage, getLinkedInText, copyTextToClipboard } = useCanvasShare();
  const isMobile = useIsMobile();

  const sharePageUrl = shareId 
    ? `${SUPABASE_URL}/functions/v1/share-page?id=${shareId}`
    : null;

  // Check if Web Share API is available (mainly mobile)
  const canNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

  const handleNativeShare = async () => {
    if (!sharePageUrl || !shareId) {
      toast.error("No se pudo generar el enlace para compartir");
      return;
    }
    
    // Mark as shared (fire and forget)
    supabase.functions.invoke('mark-shared', {
      body: { share_id: shareId }
    }).catch(console.error);
    
    const shareData = {
      title: `Soy nivel ${nivelTitulos[data.nivel]} en Vibe Coding!`,
      text: `Completé el test con ${data.porcentajeAciertos}% de aciertos. ¿Cuál es tu nivel?`,
      url: sharePageUrl,
    };
    
    try {
      await navigator.share(shareData);
      toast.success("Compartido con éxito");
    } catch (err) {
      // User cancelled - do nothing
      if ((err as Error).name !== 'AbortError') {
        // Fallback to share-offsite if native share fails
        handleShareLinkedIn();
      }
    }
  };

  const handleShareLinkedIn = () => {
    if (!sharePageUrl || !shareId) {
      toast.error("No se pudo generar el enlace para compartir");
      return;
    }
    
    // Mark as shared (fire and forget, don't block UI)
    supabase.functions.invoke('mark-shared', {
      body: { share_id: shareId }
    }).catch(console.error);
    
    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(sharePageUrl)}`;
    window.open(linkedInShareUrl, '_blank', 'noopener,noreferrer');
    toast.success("Abriendo LinkedIn...");
  };

  const handleCopyUrl = async () => {
    if (!sharePageUrl) {
      toast.error("No hay URL para copiar");
      return;
    }
    
    try {
      await navigator.clipboard.writeText(sharePageUrl);
      toast.success("URL copiada al portapapeles");
    } catch {
      toast.error("No se pudo copiar la URL");
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    await downloadImage(data);
    setIsDownloading(false);
    toast.success("Imagen descargada");
  };

  const handleCopyText = async () => {
    const copied = await copyTextToClipboard(data);
    if (copied) {
      toast.success("Texto copiado al portapapeles");
    }
  };

  // Use native share on mobile, LinkedIn direct on desktop
  const showNativeShare = isMobile && canNativeShare;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            {showNativeShare ? (
              <>
                <Share2 className="h-5 w-5 text-accent" />
                Compartir resultado
              </>
            ) : (
              <>
                <Linkedin className="h-5 w-5 text-[#0077B5]" />
                Compartir en LinkedIn
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {showNativeShare 
              ? "Comparte tu resultado en LinkedIn u otras redes"
              : "Comparte tu resultado con tu red profesional"
            }
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {/* Main Share Button */}
          {sharePageUrl ? (
            <div className="space-y-3">
              {showNativeShare ? (
                <Button
                  onClick={handleNativeShare}
                  className="w-full gap-2 bg-accent hover:bg-accent/90 text-accent-foreground h-12"
                  size="lg"
                >
                  <Share2 className="h-5 w-5" />
                  Compartir
                </Button>
              ) : (
                <Button
                  onClick={handleShareLinkedIn}
                  className="w-full gap-2 bg-[#0077B5] hover:bg-[#005885] text-white h-12"
                  size="lg"
                >
                  <ExternalLink className="h-5 w-5" />
                  Compartir en LinkedIn
                </Button>
              )}
              
              <div className="flex gap-2">
                <Button
                  onClick={handleCopyUrl}
                  variant="outline"
                  className="flex-1 gap-2"
                  size="sm"
                >
                  <Link2 className="h-4 w-4" />
                  Copiar enlace
                </Button>
                <Button
                  onClick={handleCopyText}
                  variant="outline"
                  className="flex-1 gap-2"
                  size="sm"
                >
                  <Copy className="h-4 w-4" />
                  Copiar texto
                </Button>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-4 text-center">
              <p className="text-sm text-yellow-400">
                El enlace de compartir no está disponible. Puedes descargar la imagen y subirla manualmente.
              </p>
            </div>
          )}

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                o descarga la imagen
              </span>
            </div>
          </div>

          {/* Download Section */}
          <div className="space-y-3">
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              variant="outline"
              className="w-full gap-2"
            >
              <Download className="h-4 w-4" />
              {isDownloading ? "Generando..." : "Descargar imagen"}
            </Button>
            
            <p className="text-xs text-muted-foreground text-center">
              Descarga la imagen para subirla manualmente a LinkedIn
            </p>
          </div>

          {/* Preview del texto */}
          <div className="space-y-2">
            <span className="text-sm text-muted-foreground">Texto sugerido:</span>
            <div className="rounded-lg border border-border bg-muted/50 p-3 text-xs text-muted-foreground whitespace-pre-wrap">
              {getLinkedInText(data)}
            </div>
          </div>

          {/* Info tip */}
          {sharePageUrl && (
            <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-3">
              <p className="text-xs text-blue-400">
                <strong>Tip:</strong> {showNativeShare 
                  ? "Selecciona LinkedIn en el menú para compartir directamente en la app."
                  : "Al compartir, LinkedIn mostrará automáticamente una vista previa con tu resultado."
                }
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
