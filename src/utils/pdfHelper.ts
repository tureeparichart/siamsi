import { jsPDF } from 'jspdf';
import { toPng } from 'html-to-image';

// Cached CSS to embed fonts
let cachedFontEmbedCSS: string | null = null;

async function getCardFontEmbedCSS(): Promise<string> {
  if (cachedFontEmbedCSS !== null) return cachedFontEmbedCSS;
  try {
    const base = import.meta.env.BASE_URL || './';
    const fontPath = `${base.endsWith('/') ? base : base + '/'}fonts/PhoKhunRam.ttf`;
    const res = await fetch(fontPath);
    if (!res.ok) throw new Error('Failed to fetch font');
    const blob = await res.blob();
    const base64 = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
    cachedFontEmbedCSS = `
      @font-face {
        font-family: 'PhoKhunRam';
        src: url('${base64}') format('truetype');
        font-weight: normal;
        font-style: normal;
      }
    `;
    return cachedFontEmbedCSS;
  } catch (e) {
    console.warn('Could not load base64 font for export:', e);
    cachedFontEmbedCSS = ' ';
    return cachedFontEmbedCSS;
  }
}

/**
 * Capture card preview element into a high-res PNG data URL
 */
export async function captureCardDataUrl(cardElement: HTMLElement): Promise<string> {
  const fontEmbedCSS = await getCardFontEmbedCSS();
  return await toPng(cardElement, {
    cacheBust: true,
    pixelRatio: 3,
    backgroundColor: '#fdfaf2',
    fontEmbedCSS: fontEmbedCSS || ' ',
    skipFonts: true,
  });
}

/**
 * Generate and download a print-ready PDF document (A4 8-card sheet or Single card)
 */
export async function downloadPrintablePDF(
  cardElement: HTMLElement,
  printMode: 'single' | 'a4',
  fortuneNumber: string,
  fullName: string
): Promise<void> {
  const cardDataUrl = await captureCardDataUrl(cardElement);
  const sanitizedName = fullName
    ? fullName.replace(/[^a-zA-Z0-9ก-๙_-]/g, '_').substring(0, 30)
    : 'ผู้เข้าชม';

  if (printMode === 'single') {
    // Single Card: exact 88mm x 54mm landscape PDF
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [54, 88],
    });

    doc.addImage(cardDataUrl, 'PNG', 0, 0, 88, 54, undefined, 'FAST');
    doc.save(`Sukhothai-Card-${fortuneNumber}-${sanitizedName}.pdf`);
  } else {
    // A4 Multi-card: 8 cards arranged on A4 (2 columns x 4 rows)
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // Header title
    doc.setFontSize(11);
    doc.setTextColor(60, 35, 15);
    doc.text(
      'เซียมซีแห่งกาลเวลา : เปิดร่องรอยอดีตสุโขทัย • การ์ดที่ระลึกส่วนบุคคล (ขนาด 8.8 × 5.4 ซม.)',
      105,
      12,
      { align: 'center' }
    );

    doc.setFontSize(8);
    doc.setTextColor(120, 100, 85);
    doc.text(
      'จากตำนาน สู่หลักฐาน จากอดีต สู่การเรียนรู้ด้วย AI • ตัดตามรอยเส้นประเพื่อนำไปใช้งานหรือใส่กระเป๋าสตางค์',
      105,
      16.5,
      { align: 'center' }
    );

    // 2 columns (x: 12mm, 110mm) and 4 rows (y: 20mm, 82mm, 144mm, 206mm)
    const colX = [12, 110];
    const rowY = [21, 83, 145, 207];

    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 2; c++) {
        const x = colX[c];
        const y = rowY[r];

        // Draw subtle cutting guideline border around each card
        doc.setDrawColor(180, 170, 150);
        doc.setLineWidth(0.3);
        doc.setLineDashPattern([2, 2], 0);
        doc.rect(x - 0.5, y - 0.5, 89, 55);

        // Place high-res card
        doc.addImage(cardDataUrl, 'PNG', x, y, 88, 54, undefined, 'FAST');
      }
    }

    // Bottom note
    doc.setFontSize(7.5);
    doc.setTextColor(140, 120, 100);
    doc.text(
      'อุทยานประวัติศาสตร์สุโขทัย • มรดกโลกทางวัฒนธรรม UNESCO',
      105,
      272,
      { align: 'center' }
    );

    doc.save(`Sukhothai-Cards-A4-${fortuneNumber}-${sanitizedName}.pdf`);
  }
}
