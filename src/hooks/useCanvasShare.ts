type Nivel = 'inicial' | 'intermedio' | 'avanzado' | 'expert';

const nivelColors: Record<Nivel, { bg: string; accent: string }> = {
  inicial: { bg: '#166534', accent: '#4ade80' },      // Green
  intermedio: { bg: '#854d0e', accent: '#facc15' },   // Yellow
  avanzado: { bg: '#6b21a8', accent: '#c084fc' },     // Purple
  expert: { bg: '#92400e', accent: '#fbbf24' }        // Amber/Gold
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

    const colors = nivelColors[data.nivel];

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
    gradient.addColorStop(0, '#0f0f1a');
    gradient.addColorStop(0.5, colors.bg);
    gradient.addColorStop(1, '#0f0f1a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 630);

    // Decorative circles
    ctx.beginPath();
    ctx.arc(100, 100, 200, 0, Math.PI * 2);
    ctx.fillStyle = `${colors.accent}15`;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(1100, 530, 250, 0, Math.PI * 2);
    ctx.fillStyle = `${colors.accent}10`;
    ctx.fill();

    // Header text
    ctx.fillStyle = '#ffffff80';
    ctx.font = '600 24px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('MI RESULTADO EN EL TEST DE', 600, 120);

    // Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 48px system-ui, -apple-system, sans-serif';
    ctx.fillText('VIBE CODING', 600, 180);

    // Trophy emoji
    ctx.font = '80px system-ui';
    ctx.fillText('🏆', 600, 290);

    // Level badge
    ctx.fillStyle = colors.accent;
    ctx.font = 'bold 64px system-ui, -apple-system, sans-serif';
    ctx.fillText(`NIVEL ${nivelTitulos[data.nivel]}`, 600, 380);

    // Percentage
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 72px system-ui, -apple-system, sans-serif';
    ctx.fillText(`${data.porcentajeAciertos}%`, 600, 470);
    
    ctx.fillStyle = '#ffffff99';
    ctx.font = '28px system-ui, -apple-system, sans-serif';
    ctx.fillText('de aciertos', 600, 510);

    // Footer / URL
    ctx.fillStyle = '#ffffff60';
    ctx.font = '22px system-ui, -apple-system, sans-serif';
    ctx.fillText('Descubre tu nivel → vibecodingacademy.com/test-nivel', 600, 590);

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/png', 1.0);
    });
  };

  const downloadImage = async (data: ShareData) => {
    const blob = await createResultImage(data);
    if (!blob) return;

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vibe-coding-nivel-${data.nivel}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const shareToLinkedIn = (data: ShareData) => {
    const text = `🏆 Acabo de completar el Test de Vibe Coding y soy nivel ${nivelTitulos[data.nivel]} con ${data.porcentajeAciertos}% de aciertos!\n\n¿Quieres saber tu nivel? 👉 vibecodingacademy.com/test-nivel\n\n#VibeCoding #NoCode #AI #Desarrollo`;
    
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://vibecodingacademy.com/test-nivel')}&text=${encodeURIComponent(text)}`;
    
    window.open(linkedInUrl, '_blank', 'width=600,height=600');
  };

  return {
    createResultImage,
    downloadImage,
    shareToLinkedIn
  };
};
