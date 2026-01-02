import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cookie, Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useCookieConsent, CookiePreferences } from "@/hooks/useCookieConsent";
import { cn } from "@/lib/utils";

export function CookieConsent() {
  const {
    hasConsent,
    preferences,
    isLoading,
    isSettingsOpen,
    acceptAll,
    acceptEssentialOnly,
    savePreferences,
    closeSettings,
  } = useCookieConsent();

  const [showSettings, setShowSettings] = useState(false);
  const [tempPreferences, setTempPreferences] = useState<CookiePreferences>(preferences);

  // Sync tempPreferences when preferences change or settings open
  useEffect(() => {
    setTempPreferences(preferences);
  }, [preferences, isSettingsOpen]);

  // When opening from footer, show settings view directly
  useEffect(() => {
    if (isSettingsOpen) {
      setShowSettings(true);
    }
  }, [isSettingsOpen]);

  // Show banner if: loading=false AND (no consent OR settings opened from footer)
  const shouldShow = !isLoading && (!hasConsent || isSettingsOpen);

  if (!shouldShow) {
    return null;
  }

  const handleSaveCustom = () => {
    savePreferences(tempPreferences);
    setShowSettings(false);
    closeSettings();
  };

  const handleAcceptAll = () => {
    acceptAll();
    closeSettings();
  };

  const handleAcceptEssential = () => {
    acceptEssentialOnly();
    closeSettings();
  };

  const handleClose = () => {
    setShowSettings(false);
    closeSettings();
  };

  const handleToggle = (key: keyof CookiePreferences) => {
    if (key === "essential") return; // Can't toggle essential
    setTempPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-[100] animate-fade-in",
        "p-4 md:p-6"
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-2xl rounded-xl border border-border",
          "bg-card/95 backdrop-blur-md shadow-lg",
          "p-5 md:p-6"
        )}
      >
        {!showSettings ? (
          // Main banner view
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Cookie className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">
                  Usamos cookies
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Utilizamos cookies para mejorar tu experiencia en nuestro sitio.
                  Las cookies esenciales son necesarias para el funcionamiento básico.
                  Puedes aceptar todas o solo las esenciales.
                </p>
                <Link
                  to="/politica-privacidad"
                  className="mt-2 inline-block text-sm text-primary hover:underline"
                >
                  Política de Privacidad
                </Link>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
              <button
                onClick={() => setShowSettings(true)}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Settings className="h-4 w-4" />
                Personalizar
              </button>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleAcceptEssential}
                  className="flex-1 sm:flex-none"
                >
                  Solo esenciales
                </Button>
                <Button
                  onClick={handleAcceptAll}
                  className="flex-1 sm:flex-none"
                >
                  Aceptar todas
                </Button>
              </div>
            </div>
          </div>
        ) : (
          // Settings view
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">
                Configurar cookies
              </h3>
              <button
                onClick={handleClose}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3">
              {/* Essential cookies */}
              <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3">
                <div className="flex-1">
                  <Label className="font-medium text-foreground">
                    Esenciales
                  </Label>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Necesarias para el funcionamiento del sitio. No se pueden desactivar.
                  </p>
                </div>
                <Switch checked disabled className="opacity-50" />
              </div>

              {/* Analytics cookies */}
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div className="flex-1">
                  <Label
                    htmlFor="analytics"
                    className="font-medium text-foreground cursor-pointer"
                  >
                    Analíticas
                  </Label>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Nos ayudan a entender cómo usas el sitio para mejorarlo.
                  </p>
                </div>
                <Switch
                  id="analytics"
                  checked={tempPreferences.analytics}
                  onCheckedChange={() => handleToggle("analytics")}
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                onClick={handleClose}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button onClick={handleSaveCustom} className="flex-1">
                Guardar preferencias
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
