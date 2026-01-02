import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface PromptPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  prompt: string;
}

export function PromptPreviewDialog({
  open,
  onOpenChange,
  title,
  prompt,
}: PromptPreviewDialogProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    toast.success("Prompt copiado - pégalo en tu IA favorita");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg">Prompt para: {title}</DialogTitle>
          <DialogDescription>
            Pega este texto en tu IA favorita (ChatGPT, Claude, Gemini, etc.)
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <div className="max-h-[400px] overflow-y-auto rounded-lg border border-border bg-muted/50 p-4">
            <pre className="whitespace-pre-wrap text-sm text-foreground font-sans leading-relaxed">
              {prompt}
            </pre>
          </div>

          <div className="mt-4 flex justify-end">
            <Button onClick={handleCopy} className="gap-2">
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copiado
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copiar prompt
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
