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

export const useCanvasShare = () => {
  // Descarga la imagen estática pre-generada desde public/images/share/
  const downloadImage = async (data: ShareData) => {
    const imageUrl = `/images/share/nivel-${data.nivel}.png`;
    
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      
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
        window.open(imageUrl, '_blank');
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
    } catch (error) {
      console.error('Error downloading image:', error);
      // Fallback: open image in new tab
      window.open(imageUrl, '_blank');
    }
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
    downloadImage,
    getLinkedInText,
    copyTextToClipboard,
    openLinkedIn
  };
};
