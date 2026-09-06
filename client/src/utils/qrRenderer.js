import QRCode from 'qrcode';

/**
 * Robust cross-browser rounded rectangle fill
 * Uses native roundRect when available, with arcTo fallback for older engines
 */
export function fillRoundedRect(ctx, x, y, w, h, radius) {
  const r = Math.max(0, Math.min(radius, w / 2, h / 2));
  if (r <= 0) {
    ctx.fillRect(x, y, w, h);
    return;
  }
  ctx.beginPath();
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(x, y, w, h, r);
  } else {
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  ctx.fill();
}

/**
 * Checks if a matrix coordinate belongs to one of the three 7x7 corner eye finder patterns
 */
export function isFinderPattern(r, c, size) {
  if (r <= 6 && c <= 6) return true; // Top-left
  if (r <= 6 && c >= size - 7) return true; // Top-right
  if (r >= size - 7 && c <= 6) return true; // Bottom-left
  return false;
}

/**
 * Checks if a coordinate is within the central logo exclusion zone
 */
export function isLogoZone(r, c, size, hasLogo) {
  if (!hasLogo) return false;
  const center = Math.floor(size / 2);
  const radius = Math.floor(size * 0.16);
  return Math.abs(r - center) <= radius && Math.abs(c - center) <= radius;
}

/**
 * Draws a styled corner finder eye with custom outer frame and inner pupil
 */
export function drawCornerEye(ctx, x, y, cellSize, outerColor, innerColor, bgColor, style) {
  const eyeSize = 7 * cellSize;

  // 1. Outer Ring Frame
  ctx.fillStyle = outerColor;
  if (style === 'circle') {
    const radius = eyeSize / 2;
    ctx.beginPath();
    ctx.arc(x + radius, y + radius, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = bgColor;
    ctx.beginPath();
    ctx.arc(x + radius, y + radius, radius - cellSize, 0, Math.PI * 2);
    ctx.fill();
  } else if (style === 'rounded') {
    const rad = cellSize * 2;
    fillRoundedRect(ctx, x, y, eyeSize, eyeSize, rad);

    ctx.fillStyle = bgColor;
    fillRoundedRect(ctx, x + cellSize, y + cellSize, 5 * cellSize, 5 * cellSize, rad * 0.7);
  } else {
    // Square
    ctx.fillRect(x, y, eyeSize, eyeSize);
    ctx.fillStyle = bgColor;
    ctx.fillRect(x + cellSize, y + cellSize, 5 * cellSize, 5 * cellSize);
  }

  // 2. Inner Pupil
  ctx.fillStyle = innerColor;
  const centerOffset = 2 * cellSize;
  const centerSize = 3 * cellSize;

  if (style === 'circle') {
    const centerRadius = centerSize / 2;
    ctx.beginPath();
    ctx.arc(x + centerOffset + centerRadius, y + centerOffset + centerRadius, centerRadius, 0, Math.PI * 2);
    ctx.fill();
  } else if (style === 'rounded') {
    fillRoundedRect(ctx, x + centerOffset, y + centerOffset, centerSize, centerSize, cellSize * 0.8);
  } else {
    // Square
    ctx.fillRect(x + centerOffset, y + centerOffset, centerSize, centerSize);
  }
}

/**
 * Loads an image from a data URL or path asynchronously
 */
export function loadImageAsync(src) {
  return new Promise((resolve) => {
    if (!src) return resolve(null);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

/**
 * Universal styled QR code canvas drawing function
 * Renders dots, rounded squares, custom corner eyes, colors, and badge icons
 */
export async function drawStyledQRCode(canvas, textToEncode, rawStyleConfig = {}, canvasDim = 640, logoImage = null) {
  if (!canvas) return;

  // Parse config safely
  let style = rawStyleConfig || {};
  if (typeof style === 'string') {
    try {
      style = JSON.parse(style);
    } catch (e) {
      style = {};
    }
  }

  const fgColor = style.fgColor || '#0F172A';
  const bgColor = style.bgColor || '#FFFFFF';
  const dotStyle = style.dotStyle || 'rounded';
  const eyeStyle = style.eyeStyle || 'rounded';
  const useSeparateEyeColors = style.useSeparateEyeColors !== false;
  const effectiveOuterEye = useSeparateEyeColors && style.eyeOuterColor ? style.eyeOuterColor : fgColor;
  const effectiveInnerEye = useSeparateEyeColors && style.eyeInnerColor ? style.eyeInnerColor : fgColor;
  const errorCorrection = style.errorCorrection || 'H';
  const logoPreset = style.logoPreset || null;
  const logoShape = style.logoShape || 'circle';
  const logoPadding = style.logoPadding ?? 6;

  // If no in-memory logo image is provided, attempt to load from style.logoDataUrl
  let activeLogoImg = logoImage;
  if (!activeLogoImg && style.logoDataUrl) {
    activeLogoImg = await loadImageAsync(style.logoDataUrl);
  }

  const hasLogo = !!(activeLogoImg || logoPreset);

  try {
    const qr = QRCode.create(textToEncode || 'https://qrloop.io', {
      errorCorrectionLevel: errorCorrection,
    });

    const modules = qr.modules;
    const size = modules.size;

    canvas.width = canvasDim;
    canvas.height = canvasDim;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvasDim, canvasDim);

    // Background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvasDim, canvasDim);

    const marginCells = 2;
    const totalCells = size + marginCells * 2;
    const cellSize = canvasDim / totalCells;

    ctx.fillStyle = fgColor;

    // Draw Modules
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (isFinderPattern(r, c, size)) continue;
        if (isLogoZone(r, c, size, hasLogo)) continue;

        if (modules.get(r, c)) {
          const x = (c + marginCells) * cellSize;
          const y = (r + marginCells) * cellSize;

          if (dotStyle === 'dots') {
            const radius = (cellSize * 0.85) / 2;
            ctx.beginPath();
            ctx.arc(x + cellSize / 2, y + cellSize / 2, radius, 0, Math.PI * 2);
            ctx.fill();
          } else if (dotStyle === 'rounded') {
            const radius = cellSize * 0.35;
            fillRoundedRect(ctx, x + 0.5, y + 0.5, cellSize - 1, cellSize - 1, radius);
          } else if (dotStyle === 'smooth') {
            const radius = cellSize * 0.45;
            fillRoundedRect(ctx, x, y, cellSize, cellSize, radius);
          } else {
            // Square
            ctx.fillRect(x, y, cellSize, cellSize);
          }
        }
      }
    }

    // Draw the 3 Corner Eye Finder Patterns
    drawCornerEye(ctx, marginCells * cellSize, marginCells * cellSize, cellSize, effectiveOuterEye, effectiveInnerEye, bgColor, eyeStyle);
    drawCornerEye(ctx, (size - 7 + marginCells) * cellSize, marginCells * cellSize, cellSize, effectiveOuterEye, effectiveInnerEye, bgColor, eyeStyle);
    drawCornerEye(ctx, marginCells * cellSize, (size - 7 + marginCells) * cellSize, cellSize, effectiveOuterEye, effectiveInnerEye, bgColor, eyeStyle);

    // Draw Logo / Preset Badge if configured
    if (hasLogo) {
      const logoSizePx = canvasDim * 0.2;
      const logoCenter = canvasDim / 2;
      const logoX = logoCenter - logoSizePx / 2;
      const logoY = logoCenter - logoSizePx / 2;
      const badgePadding = Math.max(logoPadding, canvasDim * 0.012);
      const badgeSize = logoSizePx + badgePadding * 2;
      const badgeX = logoCenter - badgeSize / 2;
      const badgeY = logoCenter - badgeSize / 2;
      const badgeRadius = logoShape === 'circle' ? badgeSize / 2 : Math.min(badgeSize * 0.2, 18);

      ctx.save();
      ctx.fillStyle = bgColor;
      ctx.shadowColor = 'rgba(15, 23, 42, 0.18)';
      ctx.shadowBlur = canvasDim * 0.012;
      if (logoShape === 'circle') {
        ctx.beginPath();
        ctx.arc(logoCenter, logoCenter, badgeSize / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        fillRoundedRect(ctx, badgeX, badgeY, badgeSize, badgeSize, badgeRadius);
      }
      ctx.shadowBlur = 0;
      ctx.strokeStyle = effectiveOuterEye;
      ctx.lineWidth = Math.max(1, canvasDim * 0.002);
      if (logoShape === 'circle') {
        ctx.beginPath();
        ctx.arc(logoCenter, logoCenter, badgeSize / 2, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        ctx.beginPath();
        if (typeof ctx.roundRect === 'function') {
          ctx.roundRect(badgeX, badgeY, badgeSize, badgeSize, badgeRadius);
        } else {
          ctx.rect(badgeX, badgeY, badgeSize, badgeSize);
        }
        ctx.stroke();
      }

      if (activeLogoImg) {
        const imageRatio = activeLogoImg.width / activeLogoImg.height || 1;
        const imageSize = logoSizePx * 0.88;
        const imageWidth = imageRatio >= 1 ? imageSize : imageSize * imageRatio;
        const imageHeight = imageRatio >= 1 ? imageSize / imageRatio : imageSize;
        const imageX = logoCenter - imageWidth / 2;
        const imageY = logoCenter - imageHeight / 2;

        ctx.save();
        ctx.beginPath();
        if (logoShape === 'circle') {
          ctx.arc(logoCenter, logoCenter, imageSize / 2, 0, Math.PI * 2);
        } else if (typeof ctx.roundRect === 'function') {
          ctx.roundRect(logoCenter - imageSize / 2, logoCenter - imageSize / 2, imageSize, imageSize, Math.min(imageSize * 0.2, 12));
        } else {
          ctx.rect(logoCenter - imageSize / 2, logoCenter - imageSize / 2, imageSize, imageSize);
        }
        ctx.clip();
        ctx.drawImage(activeLogoImg, imageX, imageY, imageWidth, imageHeight);
        ctx.restore();
      } else if (logoPreset) {
        ctx.fillStyle = fgColor;
        ctx.font = `bold ${logoSizePx * 0.6}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const iconChar = logoPreset === 'globe' ? '🌐' : logoPreset === 'wifi' ? '📶' : logoPreset === 'user' ? '👤' : '✨';
        ctx.fillText(iconChar, logoCenter, logoCenter + 2);
      }
      ctx.restore();
    }
  } catch (err) {
    console.error('Error drawing styled QR code:', err);
  }
}

/**
 * Generates high-fidelity styled SVG string supporting dot patterns, corner eye shapes, and colors
 */
export function generateStyledSVG(textToEncode, rawStyleConfig = {}) {
  let style = rawStyleConfig || {};
  if (typeof style === 'string') {
    try { style = JSON.parse(style); } catch (e) { style = {}; }
  }

  const fgColor = style.fgColor || '#0F172A';
  const bgColor = style.bgColor || '#FFFFFF';
  const dotStyle = style.dotStyle || 'rounded';
  const eyeStyle = style.eyeStyle || 'rounded';
  const useSeparateEyeColors = style.useSeparateEyeColors !== false;
  const effectiveOuterEye = useSeparateEyeColors && style.eyeOuterColor ? style.eyeOuterColor : fgColor;
  const effectiveInnerEye = useSeparateEyeColors && style.eyeInnerColor ? style.eyeInnerColor : fgColor;
  const errorCorrection = style.errorCorrection || 'H';
  const logoPreset = style.logoPreset || null;
  const logoDataUrl = style.logoDataUrl || null;
  const hasLogo = !!(logoPreset || logoDataUrl);

  const qr = QRCode.create(textToEncode || 'https://qrloop.io', {
    errorCorrectionLevel: errorCorrection,
  });

  const modules = qr.modules;
  const size = modules.size;
  const margin = 2;
  const totalCells = size + margin * 2;
  const cellSize = 10;
  const svgDim = totalCells * cellSize;

  let elements = [];

  // Background
  elements.push(`<rect width="${svgDim}" height="${svgDim}" fill="${bgColor}" />`);

  // Draw modules
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (isFinderPattern(r, c, size)) continue;
      if (isLogoZone(r, c, size, hasLogo)) continue;

      if (modules.get(r, c)) {
        const x = (c + margin) * cellSize;
        const y = (r + margin) * cellSize;

        if (dotStyle === 'dots') {
          const cx = x + cellSize / 2;
          const cy = y + cellSize / 2;
          const radius = (cellSize * 0.85) / 2;
          elements.push(`<circle cx="${cx}" cy="${cy}" r="${radius}" fill="${fgColor}" />`);
        } else if (dotStyle === 'rounded') {
          elements.push(`<rect x="${x + 0.5}" y="${y + 0.5}" width="${cellSize - 1}" height="${cellSize - 1}" rx="${cellSize * 0.35}" fill="${fgColor}" />`);
        } else if (dotStyle === 'smooth') {
          elements.push(`<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" rx="${cellSize * 0.45}" fill="${fgColor}" />`);
        } else {
          elements.push(`<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="${fgColor}" />`);
        }
      }
    }
  }

  // Draw 3 corner eyes
  const drawEyeSVG = (originX, originY) => {
    const eyeSize = 7 * cellSize;
    if (eyeStyle === 'circle') {
      const radius = eyeSize / 2;
      elements.push(`<circle cx="${originX + radius}" cy="${originY + radius}" r="${radius}" fill="${effectiveOuterEye}" />`);
      elements.push(`<circle cx="${originX + radius}" cy="${originY + radius}" r="${radius - cellSize}" fill="${bgColor}" />`);
      const centerRadius = (3 * cellSize) / 2;
      elements.push(`<circle cx="${originX + radius}" cy="${originY + radius}" r="${centerRadius}" fill="${effectiveInnerEye}" />`);
    } else if (eyeStyle === 'rounded') {
      const rad = cellSize * 2;
      elements.push(`<rect x="${originX}" y="${originY}" width="${eyeSize}" height="${eyeSize}" rx="${rad}" fill="${effectiveOuterEye}" />`);
      elements.push(`<rect x="${originX + cellSize}" y="${originY + cellSize}" width="${5 * cellSize}" height="${5 * cellSize}" rx="${rad * 0.7}" fill="${bgColor}" />`);
      elements.push(`<rect x="${originX + 2 * cellSize}" y="${originY + 2 * cellSize}" width="${3 * cellSize}" height="${3 * cellSize}" rx="${cellSize * 0.8}" fill="${effectiveInnerEye}" />`);
    } else {
      elements.push(`<rect x="${originX}" y="${originY}" width="${eyeSize}" height="${eyeSize}" fill="${effectiveOuterEye}" />`);
      elements.push(`<rect x="${originX + cellSize}" y="${originY + cellSize}" width="${5 * cellSize}" height="${5 * cellSize}" fill="${bgColor}" />`);
      elements.push(`<rect x="${originX + 2 * cellSize}" y="${originY + 2 * cellSize}" width="${3 * cellSize}" height="${3 * cellSize}" fill="${effectiveInnerEye}" />`);
    }
  };

  drawEyeSVG(margin * cellSize, margin * cellSize);
  drawEyeSVG((size - 7 + margin) * cellSize, margin * cellSize);
  drawEyeSVG(margin * cellSize, (size - 7 + margin) * cellSize);

  // Logo Badge in center
  if (hasLogo) {
    const logoSize = svgDim * 0.2;
    const center = svgDim / 2;
    const padding = Math.max(style.logoPadding ?? 6, svgDim * 0.012);
    const badgeSize = logoSize + padding * 2;
    const badgeRadius = Math.min(badgeSize * 0.2, 18);
    const clipId = `qr-logo-clip-${Math.round(svgDim)}`;
    const shape = style.logoShape === 'square'
      ? `<rect x="${center - logoSize / 2}" y="${center - logoSize / 2}" width="${logoSize}" height="${logoSize}" rx="${badgeRadius}" />`
      : `<circle cx="${center}" cy="${center}" r="${logoSize / 2}" />`;
    const badge = style.logoShape === 'square'
      ? `<rect x="${center - badgeSize / 2}" y="${center - badgeSize / 2}" width="${badgeSize}" height="${badgeSize}" rx="${badgeRadius}" fill="${bgColor}" stroke="${effectiveOuterEye}" stroke-width="1" />`
      : `<circle cx="${center}" cy="${center}" r="${badgeSize / 2}" fill="${bgColor}" stroke="${effectiveOuterEye}" stroke-width="1" />`;
    elements.push(`<defs><clipPath id="${clipId}">${shape}</clipPath></defs>`);
    elements.push(badge);
    if (logoDataUrl) {
      elements.push(`<image href="${logoDataUrl}" x="${center - logoSize / 2}" y="${center - logoSize / 2}" width="${logoSize}" height="${logoSize}" preserveAspectRatio="xMidYMid meet" clip-path="url(#${clipId})" />`);
    } else if (logoPreset) {
      const iconChar = logoPreset === 'globe' ? '🌐' : logoPreset === 'wifi' ? '📶' : logoPreset === 'user' ? '👤' : '✨';
      elements.push(`<text x="${center}" y="${center + 5}" font-size="${logoSize * 0.55}" text-anchor="middle" dominant-baseline="central">${iconChar}</text>`);
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgDim} ${svgDim}" width="${svgDim}" height="${svgDim}">
    ${elements.join('\n')}
  </svg>`;
}
