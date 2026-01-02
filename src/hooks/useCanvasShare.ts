type Nivel = 'inicial' | 'intermedio' | 'avanzado' | 'expert';

// Colores del Design System
const dsColors = {
  bg: '#171717',      // --foreground (negro hsl 0 0% 9%)
  accent: '#3d8b4f'   // --accent (verde hsl 142 45% 35%)
};

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

export const useCanvasShare = () => {
  const createResultImage = async (data: ShareData): Promise<Blob | null> => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return null;

    // Background gradient con colores del DS
    const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
    gradient.addColorStop(0, dsColors.bg);
    gradient.addColorStop(0.5, '#1a1a1a');
    gradient.addColorStop(1, dsColors.bg);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 630);

    // Decorative circles con verde accent
    ctx.beginPath();
    ctx.arc(100, 100, 200, 0, Math.PI * 2);
    ctx.fillStyle = `${dsColors.accent}15`;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(1100, 530, 250, 0, Math.PI * 2);
    ctx.fillStyle = `${dsColors.accent}10`;
    ctx.fill();

    // Header text
    ctx.fillStyle = '#ffffff80';
    ctx.font = '600 24px "DM Sans", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('MI RESULTADO EN EL TEST DE', 600, 120);

    // Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 48px "DM Sans", system-ui, sans-serif';
    ctx.fillText('VIBE CODING', 600, 180);

    // Trophy emoji
    ctx.font = '80px system-ui';
    ctx.fillText('🏆', 600, 290);

    // Level badge con verde accent del DS (centrado verticalmente)
    ctx.fillStyle = dsColors.accent;
    ctx.font = 'bold 72px "DM Sans", system-ui, sans-serif';
    ctx.fillText(`NIVEL ${nivelTitulos[data.nivel]}`, 600, 420);

    // Footer / URL
    ctx.fillStyle = '#ffffff60';
    ctx.font = '22px "DM Sans", system-ui, sans-serif';
    ctx.fillText('Descubre tu nivel → vibe-coders.es/test-nivel', 600, 590);

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/png', 1.0);
    });
  };

  const downloadImage = async (data: ShareData) => {
    const blob = await createResultImage(data);
    if (!blob) return;

    // Detect iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    if (isIOS && navigator.share && navigator.canShare) {
      const file = new File([blob], `vibe-coding-nivel-${data.nivel}.png`, { type: 'image/png' });
      const shareData = { files: [file] };
      
      if (navigator.canShare(shareData)) {
        try {
          await navigator.share(shareData);
          return;
        } catch {
          // User cancelled or error, continue with fallback
        }
      }
      
      // iOS fallback: open in new tab for manual save
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
      return;
    }

    // Normal download (Android/Desktop)
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vibe-coding-nivel-${data.nivel}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getLinkedInText = (data: ShareData): string => {
    return `🏆 Acabo de completar el Test de Vibe Coding y soy nivel ${nivelTitulos[data.nivel]} con ${data.porcentajeAciertos}% de aciertos!\n\n¿Quieres saber tu nivel? 👉 vibe-coders.es/test-nivel\n\n#VibeCoding #NoCode #AI #Desarrollo`;
  };

  const copyTextToClipboard = async (data: ShareData): Promise<boolean> => {
    const text = getLinkedInText(data);
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  };

  const openLinkedIn = () => {
    window.open('https://www.linkedin.com/feed/', '_blank');
  };

  return {
    createResultImage,
    downloadImage,
    getLinkedInText,
    copyTextToClipboard,
    openLinkedIn
  };
};
