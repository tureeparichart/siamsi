/**
 * Print Helper for Sukhothai Souvenir Cards
 * Provides multiple rock-solid printing fallbacks for iframe and standalone environments
 */

export function isRunningInIframe(): boolean {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}

export function triggerDirectPrint(printMode: 'single' | 'a4'): boolean {
  try {
    document.body.classList.remove('print-mode-single', 'print-mode-a4');
    document.body.classList.add(printMode === 'single' ? 'print-mode-single' : 'print-mode-a4');

    const handleAfterPrint = () => {
      document.body.classList.remove('print-mode-single', 'print-mode-a4');
      window.removeEventListener('afterprint', handleAfterPrint);
    };
    window.addEventListener('afterprint', handleAfterPrint);

    window.print();
    return true;
  } catch (err) {
    console.warn('Direct window.print() failed:', err);
    return false;
  }
}

export function openPrintInNewTab(printMode: 'single' | 'a4') {
  const targetId = printMode === 'single' ? 'print-target-single' : 'print-target-a4';
  const element = document.getElementById(targetId);
  if (!element) {
    console.error('Target element not found:', targetId);
    return;
  }

  const isA4 = printMode === 'a4';

  const html = `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="utf-8">
  <title>พิมพ์การ์ดที่ระลึกสุโขทัย ${isA4 ? '(ชุด 8 ใบบน A4)' : '(ขนาดจริง 8.8 × 5.4 ซม.)'}</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@400;600;700&family=Charm:wght@400;700&family=Noto+Serif+Thai:wght@400;600;700;800&family=Sarabun:wght@400;600&display=swap">
  <style>
    @font-face {
      font-family: 'PhoKhunRam';
      src: url('/fonts/PhoKhunRam.ttf') format('truetype');
      font-weight: normal;
      font-style: normal;
    }
    .font-phokhunram, .font-lai-sue-thai, .souvenir-name {
      font-family: 'PhoKhunRam', 'Charm', 'Noto Serif Thai', serif !important;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      margin: 0;
      padding: 24px;
      background: #f4efe6;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-family: 'Noto Serif Thai', 'Bai Jamjuree', serif;
    }
    .action-header {
      background: #241710;
      color: #f7e0a3;
      padding: 14px 24px;
      border-radius: 12px;
      margin-bottom: 24px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      width: 100%;
      max-width: ${isA4 ? '210mm' : '400px'};
      box-shadow: 0 4px 15px rgba(0,0,0,0.15);
      border: 1px solid #8c6d23;
    }
    .print-btn {
      background: linear-gradient(135deg, #e7cb76, #cba34f);
      color: #1a0f08;
      border: 1px solid #fff0ba;
      padding: 10px 22px;
      font-size: 15px;
      font-weight: bold;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s;
    }
    .print-btn:hover {
      filter: brightness(1.1);
      transform: scale(1.02);
    }
    .card-wrapper {
      box-shadow: 0 10px 30px rgba(0,0,0,0.15);
      border-radius: ${isA4 ? '0' : '4px'};
      overflow: hidden;
      background: #fff;
    }
    @page {
      margin: ${isA4 ? '6mm' : '0'};
      size: auto;
    }
    @media print {
      body {
        padding: 0 !important;
        background: #ffffff !important;
      }
      .action-header {
        display: none !important;
      }
      .card-wrapper {
        box-shadow: none !important;
      }
    }
  </style>
</head>
<body>
  <div class="action-header">
    <div>
      <div style="font-weight: bold; font-size: 16px; color: #fff;">🖨️ หน้าพิมพ์การ์ดที่ระลึกสุโขทัย</div>
      <div style="font-size: 12px; color: #d8c5b0; margin-top: 2px;">
        ${isA4 ? 'รูปแบบ 8 ใบบนกระดาษ A4 (ตัดตามรอยเส้นประ)' : 'ขนาดมาตรฐาน 8.8 × 5.4 ซม.'}
      </div>
    </div>
    <button class="print-btn" onclick="window.print()">
      🖨️ สั่งพิมพ์ (Print)
    </button>
  </div>

  <div class="card-wrapper">
    ${element.innerHTML}
  </div>

  <script>
    window.onload = function() {
      // Automatic trigger after webfonts render
      setTimeout(function() {
        try {
          window.print();
        } catch (e) {
          console.log('Auto print prevented by browser policy, please click button');
        }
      }, 700);
    };
  </script>
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
}
