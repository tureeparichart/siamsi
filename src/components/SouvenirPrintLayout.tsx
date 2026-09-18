import React from 'react';
import { Fortune } from '../types';
import { PrintMode } from './PrintOptions';
import {
  SangkhalokFish,
  SukhothaiLotus,
  SukhothaiChediMotif,
  OrdainedElephantMotif,
  SukhothaiTinChokBorder,
} from './SukhothaiMotifs';
import { SiamSiLogo } from './SiamSiLogo';

interface SouvenirPrintLayoutProps {
  fortune: Fortune;
  fullName: string;
  printMode: PrintMode;
  cardBgImage?: string | null;
}

// Single card template formatted specifically for physical printing
const PrintedCard: React.FC<{
  fortune: Fortune;
  fullName: string;
  cardBgImage?: string | null;
}> = ({
  fortune,
  fullName,
  cardBgImage = '/assets/sukhothai-card-bg.svg',
}) => {
  const displayName = fullName.trim() || 'ชื่อ นามสกุล ของท่าน';
  const activeBg = cardBgImage || '/assets/sukhothai-card-bg.svg';

  // Dynamic font sizing for print (2 lines) - enlarged for prominence and clarity
  const getPhoKhunRamFontSize = (len: number) => {
    if (len > 32) return '9pt';
    if (len > 22) return '11pt';
    if (len > 14) return '13pt';
    return '15.5pt';
  };

  const getRegularFontSize = (len: number) => {
    if (len > 32) return '6.5pt';
    if (len > 22) return '8pt';
    if (len > 14) return '9.5pt';
    return '11pt';
  };

  const phoKhunRamSize = getPhoKhunRamFontSize(displayName.length);
  const regularSize = getRegularFontSize(displayName.length);

  return (
    <div
      style={{
        width: '88mm',
        height: '54mm',
        boxSizing: 'border-box',
        backgroundColor: '#fdfbf4',
        backgroundImage: activeBg ? `url(${activeBg})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        border: '1.2mm solid #8c6d23',
        position: 'relative',
        padding: '1.5mm 2.2mm',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        color: '#2a160d',
        fontFamily: "'Bai Jamjuree', sans-serif",
      }}
    >
      {/* Top and Bottom Tin Chok borders */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2mm', opacity: 0.75, pointerEvents: 'none', zIndex: 1 }}>
        <SukhothaiTinChokBorder height={8} className="w-full text-[#8c6d23]" />
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2mm', opacity: 0.75, pointerEvents: 'none', zIndex: 1 }}>
        <SukhothaiTinChokBorder height={8} className="w-full text-[#8c6d23]" />
      </div>

      {/* Background tint for readability when image is present */}
      {cardBgImage && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(255, 252, 244, 0.45)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Inner thin border */}
      <div
        style={{
          position: 'absolute',
          top: '0.8mm',
          left: '0.8mm',
          right: '0.8mm',
          bottom: '0.8mm',
          border: '0.25mm solid rgba(140, 109, 35, 0.4)',
          pointerEvents: 'none',
        }}
      />

      {/* Background Heritage Watermark */}
      {!cardBgImage && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.06,
            pointerEvents: 'none',
            gap: '8mm',
          }}
        >
          <SukhothaiChediMotif className="w-16 h-16 text-[#8c6d23]" />
          <SangkhalokFish className="w-24 h-24 text-[#8c6d23]" />
          <OrdainedElephantMotif className="w-16 h-16 text-[#8c6d23]" />
        </div>
      )}

      {/* 1. Header:
          - ด้านบนซ้ายใส่โลโก้เว็บไซต์
          - หัวข้อตรงกลางใส่ข้อความว่า เซียมซีแห่งกาลเวลา
      */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '0.25mm solid rgba(140, 109, 35, 0.35)',
          paddingBottom: '0.6mm',
          marginTop: '0.6mm',
        }}
      >
        <div style={{ width: '25%', display: 'flex', alignItems: 'center' }}>
          <SiamSiLogo size={18} showTextGlow={false} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1mm', justifyContent: 'center', flex: 1 }}>
          <SukhothaiLotus className="w-2.5 h-2.5 text-[#8c6d23]" />
          <span
            style={{
              fontFamily: "'Noto Serif Thai', serif",
              fontSize: '8.2pt',
              fontWeight: 800,
              color: '#422411',
              letterSpacing: '0.2mm',
              whiteSpace: 'nowrap',
            }}
          >
            เซียมซีแห่งกาลเวลา
          </span>
          <SukhothaiLotus className="w-2.5 h-2.5 text-[#8c6d23]" />
        </div>
        <div style={{ width: '25%' }} />
      </div>

      {/* 2. Middle Body:
          - เซียมซีที่ 01   ดวงนักปราชญ์
          - คำทำนาย "ปัญญานำทาง"
          - ชื่อบรรทัดที่ 1 ฟอนต์ลายสือไท (PhoKhunRam)
          - ชื่อบรรทัดที่ 2 ฟอนต์ธรรมดา
          - “คุณเป็นผู้มีสายตาแหลมคม รักการแสวงหาความจริง และมีพลังแห่งการเรียนรู้ ปัญญาและ ความคิดไตร่ตรองจะเป็นเข็มทิศนำทางสู่ความสำเร็จในทุกการตัดสินใจ”
      */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '0.6mm',
          margin: 'auto 0',
        }}
      >
        {/* บรรทัดที่ 1: เซียมซีที่ {numberStr}   {name} */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2mm' }}>
          <span
            style={{
              fontFamily: "'Noto Serif Thai', serif",
              fontSize: '7pt',
              fontWeight: 700,
              color: '#5a3511',
            }}
          >
            เซียมซีที่ {fortune.numberStr}
          </span>
          <span style={{ fontSize: '6pt', color: 'rgba(140, 109, 35, 0.5)' }}>|</span>
          <span
            style={{
              fontFamily: "'Noto Serif Thai', serif",
              fontSize: '8.5pt',
              fontWeight: 800,
              color: '#7a2a1b',
            }}
          >
            {fortune.name}
          </span>
        </div>

        {/* บรรทัดที่ 2: คำทำนาย "{blessing}" */}
        <div>
          <span
            style={{
              fontFamily: "'Noto Serif Thai', serif",
              fontSize: '7pt',
              fontWeight: 700,
              color: '#8a5818',
            }}
          >
            คำทำนาย &ldquo;{fortune.blessing}&rdquo;
          </span>
        </div>

        {/* บรรทัดที่ 3 และ 4: ชื่อผู้เสี่ยงทาย 2 บรรทัด */}
        <div
          style={{
            width: '95%',
            backgroundColor: '#f8f1de',
            border: '0.25mm solid rgba(140, 109, 35, 0.4)',
            borderRadius: '1.2mm',
            padding: '1mm 2mm',
            boxSizing: 'border-box',
          }}
        >
          {/* ชื่อบรรทัดที่ 1: ฟอนต์ลายสือไท (PhoKhunRam) */}
          <div
            className="souvenir-name font-lai-sue-thai font-phokhunram"
            style={{
              fontFamily: "'PhoKhunRam', 'Charm', 'Noto Serif Thai', serif",
              fontSize: phoKhunRamSize,
              color: '#311b0e',
              fontWeight: 700,
              lineHeight: 1.15,
              wordBreak: 'break-word',
              textAlign: 'center',
            }}
          >
            {displayName}
          </div>
          {/* ชื่อบรรทัดที่ 2: ฟอนต์ธรรมดา */}
          <div
            style={{
              fontFamily: "'Bai Jamjuree', 'Sarabun', sans-serif",
              fontSize: regularSize,
              color: '#533825',
              fontWeight: 600,
              lineHeight: 1.15,
              wordBreak: 'break-word',
              textAlign: 'center',
              marginTop: '0.2mm',
            }}
          >
            {displayName}
          </div>
        </div>

        {/* บรรทัดที่ 5: เนื้อหาคำทำนายเต็ม */}
        <div
          style={{
            fontSize: '5.2pt',
            fontStyle: 'italic',
            color: '#553e2d',
            maxWidth: '96%',
            lineHeight: 1.25,
            textAlign: 'center',
            fontFamily: "'Noto Serif Thai', serif",
          }}
        >
          &ldquo;{fortune.fortuneReading}&rdquo;
        </div>
      </div>

    </div>
  );
};

export const SouvenirPrintLayout: React.FC<SouvenirPrintLayoutProps> = ({
  fortune,
  fullName,
  printMode,
  cardBgImage,
}) => {
  return (
    <>
      {/* Target for Single Card Printing */}
      <div id="print-target-single" className="print-only-target">
        <PrintedCard
          fortune={fortune}
          fullName={fullName}
          cardBgImage={cardBgImage}
        />
      </div>

      {/* Target for Multi-card A4 Printing (8 cards layout on A4 with cut lines) */}
      <div id="print-target-a4" className="print-only-target">
        <div
          style={{
            width: '190mm',
            margin: '0 auto',
            textAlign: 'center',
            marginBottom: '4mm',
          }}
        >
          <div
            style={{
              fontFamily: "'Noto Serif Thai', serif",
              fontSize: '11pt',
              fontWeight: 800,
              color: '#3d2513',
            }}
          >
            เซียมซีแห่งกาลเวลา : เปิดร่องรอยอดีตสุโขทัย • การ์ดที่ระลึกส่วนบุคคล
          </div>
          <div style={{ fontSize: '7.5pt', color: '#666' }}>
            จากตำนาน สู่หลักฐาน จากอดีต สู่การเรียนรู้ด้วย AI • ตัดตามรอยเส้นประ (ขนาดการ์ด 8.8 × 5.4 ซม.)
          </div>
        </div>

        {/* 2 columns × 4 rows = 8 cards on standard A4 page */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 88mm)',
            gap: '4mm',
            justifyContent: 'center',
          }}
        >
          {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
            <div
              key={index}
              style={{
                position: 'relative',
                border: '0.4mm dashed #999',
                padding: '1mm',
                backgroundColor: '#fff',
              }}
            >
              <PrintedCard
                fortune={fortune}
                fullName={fullName}
                cardBgImage={cardBgImage}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
