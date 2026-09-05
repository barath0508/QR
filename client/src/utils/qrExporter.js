import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';

/**
 * Downloads a canvas element as a PNG image with high-DPI scaling option
 */
export function downloadCanvasAsPNG(sourceCanvas, filename = 'qr-code.png', multiplier = 2) {
  if (!sourceCanvas) return;

  const targetCanvas = document.createElement('canvas');
  targetCanvas.width = sourceCanvas.width * multiplier;
  targetCanvas.height = sourceCanvas.height * multiplier;
  const ctx = targetCanvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(sourceCanvas, 0, 0, targetCanvas.width, targetCanvas.height);

  const dataUrl = targetCanvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = filename.endsWith('.png') ? filename : `${filename}.png`;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

import { generateStyledSVG } from './qrRenderer';

/**
 * Generates and downloads a styled SVG vector file matching the user's custom design
 */
export async function downloadSVG(text, styleConfig = {}, filename = 'qr-code.svg') {
  try {
    const svgString = generateStyledSVG(text || 'https://qrloop.io', styleConfig);

    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename.endsWith('.svg') ? filename : `${filename}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Failed to export SVG:', err);
  }
}

/**
 * Creates an elegant printable PDF standee/flyer with the QR code
 */
export function downloadPrintPDF(sourceCanvas, info = {}, filename = 'qr-code-flyer.pdf') {
  if (!sourceCanvas) return;

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;

  // Background subtle dark or light theme
  pdf.setFillColor(248, 250, 252);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');

  // Decorative header band
  pdf.setFillColor(16, 185, 129); // Emerald brand
  pdf.rect(0, 0, pageWidth, 8, 'F');

  // Title
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(26);
  pdf.setTextColor(15, 23, 42); // Dark slate
  const title = info.title || 'Scan Me';
  pdf.text(title, pageWidth / 2, 45, { align: 'center' });

  // Subtitle / Prompt
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(14);
  pdf.setTextColor(100, 116, 139);
  const subtitle = info.subtitle || 'Point your smartphone camera to scan this QR code';
  pdf.text(subtitle, pageWidth / 2, 55, { align: 'center' });

  // Card background for QR code
  const cardWidth = 140;
  const cardHeight = 150;
  const cardX = (pageWidth - cardWidth) / 2;
  const cardY = 70;

  pdf.setFillColor(255, 255, 255);
  pdf.roundedRect(cardX, cardY, cardWidth, cardHeight, 6, 6, 'FD');
  pdf.setDrawColor(226, 232, 240);
  pdf.setLineWidth(0.5);
  pdf.roundedRect(cardX, cardY, cardWidth, cardHeight, 6, 6, 'S');

  // QR Code Image
  const qrImgData = sourceCanvas.toDataURL('image/png');
  const qrSize = 110;
  const qrX = (pageWidth - qrSize) / 2;
  const qrY = cardY + 12;
  pdf.addImage(qrImgData, 'PNG', qrX, qrY, qrSize, qrSize);

  // Short URL or destination beneath QR
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(11);
  pdf.setTextColor(16, 185, 129);
  const displayUrl = info.shortUrl || info.destinationUrl || 'Powered by QRLoop';
  pdf.text(displayUrl, pageWidth / 2, cardY + qrSize + 22, { align: 'center' });

  // Scan instruction footer
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  pdf.setTextColor(148, 163, 184);
  pdf.text('No special app required. Compatible with iOS & Android cameras.', pageWidth / 2, 245, { align: 'center' });

  // Footer branding
  pdf.setFontSize(9);
  pdf.setTextColor(100, 116, 139);
  pdf.text('Generated with QRLoop - The Modern Dynamic QR Platform', pageWidth / 2, 280, { align: 'center' });

  pdf.save(filename.endsWith('.pdf') ? filename : `${filename}.pdf`);
}

/**
 * Copies the canvas directly to clipboard as PNG
 */
export async function copyCanvasToClipboard(sourceCanvas) {
  if (!sourceCanvas || !navigator.clipboard || !window.ClipboardItem) {
    throw new Error('Clipboard API not supported in this browser');
  }

  return new Promise((resolve, reject) => {
    sourceCanvas.toBlob(async (blob) => {
      if (!blob) return reject(new Error('Failed to create blob'));
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        resolve(true);
      } catch (err) {
        reject(err);
      }
    }, 'image/png');
  });
}
