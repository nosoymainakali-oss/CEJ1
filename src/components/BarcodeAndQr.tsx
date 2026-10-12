import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { QrCode, Barcode as BarcodeIcon, ShieldCheck } from 'lucide-react';

interface BarcodeAndQrProps {
  codigoTexto: string; // Text for barcode
  qrData: string; // Content for QR code
  codigoBarrasImagen?: string;
  tituloActuado?: string;
}

export const BarcodeAndQr: React.FC<BarcodeAndQrProps> = ({
  codigoTexto,
  qrData,
  codigoBarrasImagen,
  tituloActuado = 'Actuado Judicial',
}) => {
  const [qrUrl, setQrUrl] = useState<string>('');

  useEffect(() => {
    QRCode.toDataURL(qrData, {
      width: 130,
      margin: 1,
      color: {
        dark: '#0f223d',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'M',
    })
      .then((url) => setQrUrl(url))
      .catch((err) => console.error('Error generating QR:', err));
  }, [qrData]);

  // Generate deterministic barcode bars from code string
  const renderBarcodeBars = () => {
    const bars: Array<{ width: number; isBlack: boolean }> = [];
    // Start pattern
    bars.push({ width: 2, isBlack: true });
    bars.push({ width: 1, isBlack: false });
    bars.push({ width: 2, isBlack: true });

    // Pattern for characters
    for (let i = 0; i < codigoTexto.length; i++) {
      const code = codigoTexto.charCodeAt(i);
      const b1 = (code % 3) + 1;
      const b2 = ((code >> 1) % 2) + 1;
      const b3 = ((code >> 2) % 3) + 1;

      bars.push({ width: b1, isBlack: true });
      bars.push({ width: b2, isBlack: false });
      bars.push({ width: b3, isBlack: true });
      bars.push({ width: 1, isBlack: false });
    }

    // Stop pattern
    bars.push({ width: 3, isBlack: true });
    bars.push({ width: 1, isBlack: false });
    bars.push({ width: 2, isBlack: true });

    let currentX = 10;
    return (
      <svg width="220" height="42" className="overflow-visible">
        {bars.map((bar, idx) => {
          const x = currentX;
          currentX += bar.width * 1.6;
          if (!bar.isBlack) return null;
          return (
            <rect
              key={idx}
              x={x}
              y={2}
              width={bar.width * 1.5}
              height={32}
              fill="#0f223d"
            />
          );
        })}
      </svg>
    );
  };

  return (
    <div className="bg-slate-50 border border-slate-300 rounded-lg p-3 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
      {/* Barcode section */}
      <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">
          <BarcodeIcon className="w-3.5 h-3.5 text-slate-700" />
          <span>CÓDIGO DE BARRAS</span>
        </div>
        <div className="bg-white px-2 py-1 border border-slate-200 rounded shadow-inner flex flex-col items-center">
          {codigoBarrasImagen ? (
            <img src={codigoBarrasImagen} alt={`Imagen de código de barras ${codigoTexto}`} className="max-w-[220px] max-h-[64px] object-contain" />
          ) : renderBarcodeBars()}
          <span className="font-mono text-[10px] text-slate-800 font-bold tracking-widest mt-0.5">
            *{codigoTexto}*
          </span>
        </div>
        <span className="text-[9px] text-slate-400 mt-0.5">Identificador Único Digital de Actuado</span>
      </div>

      {/* QR Code section */}
      <div className="flex flex-col items-center shrink-0">
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">
          <QrCode className="w-3.5 h-3.5 text-amber-700" />
          <span>VALIDACIÓN QR</span>
        </div>
        {qrUrl ? (
          <div className="bg-white p-1 rounded border border-slate-300 shadow-2xs">
            <img
              src={qrUrl}
              alt="Código QR de Verificación Judicial"
              className="w-20 h-20 block"
              title="Escanea el código QR para abrir los datos configurados"
            />
          </div>
        ) : (
          <div className="w-20 h-20 bg-slate-200 animate-pulse rounded"></div>
        )}
        <span className="text-[9px] text-emerald-800 font-semibold mt-0.5 flex items-center gap-0.5">
          <ShieldCheck className="w-2.5 h-2.5" /> Escanear en Celular
        </span>
      </div>
    </div>
  );
};
