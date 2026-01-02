const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Colores del Design System (tema claro)
const dsColors = {
  bg: '#fcfcfc',
  bgAlt: '#f5f5f5',
  foreground: '#171717',
  muted: '#737373',
  border: '#e5e5e5',
  accent: '#3d8b4f'
};

const nivelTitulos = {
  inicial: 'INICIAL',
  intermedio: 'INTERMEDIO',
  avanzado: 'AVANZADO',
  expert: 'EXPERT'
};

const niveles = ['inicial', 'intermedio', 'avanzado', 'expert'];

// Dibujar íconos estilo Lucide
function drawIcon(ctx, nivel, centerX, centerY, iconSize) {
  const bgRadius = iconSize * 1.4;
  
  // Círculo de fondo (estilo bg-accent/10)
  ctx.beginPath();
  ctx.arc(centerX, centerY, bgRadius, 0, Math.PI * 2);
  ctx.fillStyle = dsColors.accent + '1a';
  ctx.fill();
  
  // Configuración del ícono
  ctx.strokeStyle = dsColors.accent;
  ctx.fillStyle = dsColors.accent;
  ctx.lineWidth = iconSize * 0.12;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  
  const s = iconSize;
  const x = centerX;
  const y = centerY;
  
  switch (nivel) {
    case 'inicial':
      // Seedling/Sprout - Planta emergiendo
      // Tallo principal
      ctx.beginPath();
      ctx.moveTo(x, y + s * 0.5);
      ctx.lineTo(x, y - s * 0.1);
      ctx.stroke();
      
      // Hoja izquierda (curva hacia arriba-izquierda)
      ctx.beginPath();
      ctx.moveTo(x, y + s * 0.1);
      ctx.bezierCurveTo(
        x - s * 0.5, y,
        x - s * 0.5, y - s * 0.4,
        x - s * 0.2, y - s * 0.5
      );
      ctx.stroke();
      
      // Hoja derecha (curva hacia arriba-derecha)
      ctx.beginPath();
      ctx.moveTo(x, y - s * 0.1);
      ctx.bezierCurveTo(
        x + s * 0.4, y - s * 0.2,
        x + s * 0.4, y - s * 0.5,
        x + s * 0.15, y - s * 0.65
      );
      ctx.stroke();
      break;
      
    case 'intermedio':
      // Rocket - Cohete estilo Lucide
      ctx.beginPath();
      // Cuerpo del cohete (forma de bala/cohete)
      ctx.moveTo(x, y - s * 0.7);
      ctx.bezierCurveTo(
        x + s * 0.35, y - s * 0.5,
        x + s * 0.35, y + s * 0.2,
        x + s * 0.2, y + s * 0.4
      );
      ctx.lineTo(x - s * 0.2, y + s * 0.4);
      ctx.bezierCurveTo(
        x - s * 0.35, y + s * 0.2,
        x - s * 0.35, y - s * 0.5,
        x, y - s * 0.7
      );
      ctx.stroke();
      
      // Ventana circular
      ctx.beginPath();
      ctx.arc(x, y - s * 0.2, s * 0.15, 0, Math.PI * 2);
      ctx.stroke();
      
      // Aletas laterales
      ctx.beginPath();
      ctx.moveTo(x - s * 0.2, y + s * 0.25);
      ctx.lineTo(x - s * 0.4, y + s * 0.55);
      ctx.lineTo(x - s * 0.2, y + s * 0.4);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(x + s * 0.2, y + s * 0.25);
      ctx.lineTo(x + s * 0.4, y + s * 0.55);
      ctx.lineTo(x + s * 0.2, y + s * 0.4);
      ctx.stroke();
      
      // Llama
      ctx.beginPath();
      ctx.moveTo(x - s * 0.1, y + s * 0.4);
      ctx.lineTo(x, y + s * 0.65);
      ctx.lineTo(x + s * 0.1, y + s * 0.4);
      ctx.stroke();
      break;
      
    case 'avanzado':
      // Zap - Rayo estilo Lucide
      ctx.beginPath();
      ctx.moveTo(x + s * 0.15, y - s * 0.65);
      ctx.lineTo(x - s * 0.25, y + s * 0.05);
      ctx.lineTo(x + s * 0.05, y + s * 0.05);
      ctx.lineTo(x - s * 0.15, y + s * 0.65);
      ctx.lineTo(x + s * 0.25, y - s * 0.05);
      ctx.lineTo(x - s * 0.05, y - s * 0.05);
      ctx.closePath();
      ctx.fill();
      break;
      
    case 'expert':
      // Trophy - Trofeo estilo Lucide
      // Copa principal
      ctx.beginPath();
      ctx.moveTo(x - s * 0.35, y - s * 0.5);
      ctx.lineTo(x + s * 0.35, y - s * 0.5);
      ctx.bezierCurveTo(
        x + s * 0.35, y + s * 0.1,
        x + s * 0.15, y + s * 0.2,
        x, y + s * 0.2
      );
      ctx.bezierCurveTo(
        x - s * 0.15, y + s * 0.2,
        x - s * 0.35, y + s * 0.1,
        x - s * 0.35, y - s * 0.5
      );
      ctx.stroke();
      
      // Asa izquierda
      ctx.beginPath();
      ctx.moveTo(x - s * 0.35, y - s * 0.35);
      ctx.bezierCurveTo(
        x - s * 0.55, y - s * 0.35,
        x - s * 0.55, y - s * 0.05,
        x - s * 0.35, y - s * 0.05
      );
      ctx.stroke();
      
      // Asa derecha
      ctx.beginPath();
      ctx.moveTo(x + s * 0.35, y - s * 0.35);
      ctx.bezierCurveTo(
        x + s * 0.55, y - s * 0.35,
        x + s * 0.55, y - s * 0.05,
        x + s * 0.35, y - s * 0.05
      );
      ctx.stroke();
      
      // Tallo
      ctx.beginPath();
      ctx.moveTo(x, y + s * 0.2);
      ctx.lineTo(x, y + s * 0.45);
      ctx.stroke();
      
      // Base
      ctx.beginPath();
      ctx.moveTo(x - s * 0.25, y + s * 0.45);
      ctx.lineTo(x + s * 0.25, y + s * 0.45);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(x - s * 0.3, y + s * 0.55);
      ctx.lineTo(x + s * 0.3, y + s * 0.55);
      ctx.stroke();
      break;
  }
}

function createResultImage(nivel) {
  const canvas = createCanvas(1200, 630);
  const ctx = canvas.getContext('2d');

  // Fondo blanco con gradiente sutil
  const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
  gradient.addColorStop(0, dsColors.bg);
  gradient.addColorStop(0.5, dsColors.bgAlt);
  gradient.addColorStop(1, dsColors.bg);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1200, 630);

  // Borde sutil
  ctx.strokeStyle = dsColors.border;
  ctx.lineWidth = 2;
  ctx.strokeRect(1, 1, 1198, 628);

  // Círculos decorativos verdes suaves
  ctx.beginPath();
  ctx.arc(100, 100, 200, 0, Math.PI * 2);
  ctx.fillStyle = dsColors.accent + '1a';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(1100, 530, 250, 0, Math.PI * 2);
  ctx.fillStyle = dsColors.accent + '12';
  ctx.fill();

  // Ícono del nivel (centrado arriba)
  drawIcon(ctx, nivel, 600, 115, 45);

  ctx.textAlign = 'center';

  // Título línea 1: "NIVEL [X]" en verde
  ctx.fillStyle = dsColors.accent;
  ctx.font = 'bold 85px sans-serif';
  ctx.fillText(`NIVEL ${nivelTitulos[nivel]}`, 600, 280);

  // Título línea 2: "DE VIBE CODING" en texto oscuro
  ctx.fillStyle = dsColors.foreground;
  ctx.font = 'bold 48px sans-serif';
  ctx.fillText('DE VIBE CODING', 600, 355);

  // Línea decorativa verde
  ctx.beginPath();
  ctx.moveTo(480, 410);
  ctx.lineTo(720, 410);
  ctx.strokeStyle = dsColors.accent;
  ctx.lineWidth = 4;
  ctx.stroke();

  // CTA: "Descubre tu nivel" en gris
  ctx.fillStyle = dsColors.muted;
  ctx.font = '34px sans-serif';
  ctx.fillText('Descubre tu nivel', 600, 480);

  // URL prominente en verde
  ctx.fillStyle = dsColors.accent;
  ctx.font = 'bold 30px sans-serif';
  ctx.fillText('vibe-coders.es/test-nivel', 600, 540);

  return canvas.toBuffer('image/png');
}

// Crear directorio si no existe
const outputDir = path.join(__dirname, '..', 'public', 'images', 'share');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generar las 4 imágenes
niveles.forEach(nivel => {
  const buffer = createResultImage(nivel);
  const filePath = path.join(outputDir, `nivel-${nivel}.png`);
  fs.writeFileSync(filePath, buffer);
  console.log(`✓ Generado: ${filePath}`);
});

console.log('\n¡Listo! Las 4 imágenes han sido generadas con íconos estilo Lucide.');
