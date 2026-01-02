import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Linkedin, Check, Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useCanvasShare } from "@/hooks/useCanvasShare";

type Nivel = 'inicial' | 'intermedio' | 'avanzado' | 'expert';

interface ShareData {
  nivel: Nivel;
  porcentajeAciertos: number;
  tiempoMinutos: number;
  tiempoSegundos: number;
}

interface ShareLinkedInModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: ShareData;
}

export function ShareLinkedInModal({
  open,
  onOpenChange,
  data,
}: ShareLinkedInModalProps) {
  const [step1Completed, setStep1Completed] = useState(false);
  const [step2Completed, setStep2Completed] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const { downloadImage, copyTextToClipboard, openLinkedIn, getLinkedInText } = useCanvasShare();

  const handleDownload = async () => {
    setIsDownloading(true);
    await downloadImage(data);
    setIsDownloading(false);
    setStep1Completed(true);
    toast.success("Imagen descargada");
  };

  const handleOpenLinkedIn = async () => {
    const copied = await copyTextToClipboard(data);
    if (copied) {
      toast.success("Texto copiado al portapapeles");
    }
    openLinkedIn();
    setStep2Completed(true);
  };

  const handleCopyText = async () => {
    const copied = await copyTextToClipboard(data);
    if (copied) {
      toast.success("Texto copiado al portapapeles");
    }
  };

  const handleClose = (openState: boolean) => {
    if (!openState) {
      // Reset state when closing
      setStep1Completed(false);
      setStep2Completed(false);
    }
    onOpenChange(openState);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Linkedin className="h-5 w-5 text-[#0077B5]" />
            Compartir en LinkedIn
          </DialogTitle>
          <DialogDescription>
            Sigue estos pasos para compartir tu resultado
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {/* Paso 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${step1Completed ? 'bg-green-500 text-white' : 'bg-primary text-primary-foreground'}`}>
                {step1Completed ? <Check className="h-4 w-4" /> : '1'}
              </div>
              <span className="font-medium">Descarga tu imagen de resultado</span>
            </div>
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              variant={step1Completed ? "outline" : "default"}
              className="w-full gap-2"
            >
              {isDownloading ? (
                "Generando..."
              ) : step1Completed ? (
                <>
                  <Check className="h-4 w-4 text-green-500" />
                  Imagen descargada
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  Descargar imagen
                </>
              )}
            </Button>
          </div>

          {/* Paso 2 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${step2Completed ? 'bg-green-500 text-white' : step1Completed ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                {step2Completed ? <Check className="h-4 w-4" /> : '2'}
              </div>
              <span className={`font-medium ${!step1Completed ? 'text-muted-foreground' : ''}`}>
                Publica en LinkedIn
              </span>
            </div>
            <Button
              onClick={handleOpenLinkedIn}
              disabled={!step1Completed}
              className="w-full gap-2 bg-[#0077B5] hover:bg-[#005885] text-white"
            >
              <ExternalLink className="h-4 w-4" />
              Abrir LinkedIn
              <span className="text-xs opacity-80">(copia el texto)</span>
            </Button>
          </div>

          {/* Preview del texto */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Texto a publicar:</span>
              <Button variant="ghost" size="sm" onClick={handleCopyText} className="h-7 gap-1 text-xs">
                <Copy className="h-3 w-3" />
                Copiar
              </Button>
            </div>
            <div className="rounded-lg border border-border bg-muted/50 p-3 text-xs text-muted-foreground whitespace-pre-wrap">
              {getLinkedInText(data)}
            </div>
          </div>

          {/* Tip */}
          <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-3">
            <p className="text-xs text-blue-400">
              <strong>Tip:</strong> En LinkedIn, haz clic en "Crear publicación", pega el texto (Ctrl+V) y sube la imagen que descargaste.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

