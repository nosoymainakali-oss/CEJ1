import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, RefreshCw, Volume2, CheckCircle2, AlertCircle, Lock } from 'lucide-react';
import { speechService } from '../utils/speechSynthesis';

interface CaptchaModalProps {
  isOpen: boolean;
  onSuccess: () => void;
  onCancel?: () => void;
  motivo?: string;
}

export const CaptchaModal: React.FC<CaptchaModalProps> = ({
  isOpen,
  onSuccess,
  onCancel,
  motivo = 'Para consultar los expedientes judiciales del sistema CEJ, ingrese el código de seguridad de la imagen.',
}) => {
  const [captchaCode, setCaptchaCode] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [verificado, setVerificado] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Generate random 5-character alphanumeric captcha (avoid ambiguous letters like 0/O, 1/I)
  const generarNuevoCodigo = () => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    setInputCode('');
    setErrorMsg('');
  };

  useEffect(() => {
    if (isOpen) {
      generarNuevoCodigo();
      setVerificado(false);
    }
  }, [isOpen]);

  // Draw distorted captcha on canvas (CEJ style)
  useEffect(() => {
    if (!canvasRef.current || !captchaCode) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#f1f5f9';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid noise lines
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 15) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let j = 0; j < canvas.height; j += 15) {
      ctx.beginPath();
      ctx.moveTo(0, j);
      ctx.lineTo(canvas.width, j);
      ctx.stroke();
    }

    // Random wavy interference lines
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(0, Math.random() * canvas.height);
      ctx.bezierCurveTo(
        canvas.width * 0.3,
        Math.random() * canvas.height,
        canvas.width * 0.7,
        Math.random() * canvas.height,
        canvas.width,
        Math.random() * canvas.height
      );
      ctx.stroke();
    }

    // Draw characters with random angles & judicial navy/burgundy colors
    const colors = ['#0f223d', '#800020', '#1e3a8a', '#1e293b', '#475569'];
    ctx.font = 'bold 28px "Courier New", monospace';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < captchaCode.length; i++) {
      const char = captchaCode[i];
      const x = 20 + i * 28;
      const y = canvas.height / 2 + (Math.random() * 8 - 4);
      const angle = (Math.random() * 20 - 10) * (Math.PI / 180);

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillStyle = colors[i % colors.length];
      ctx.fillText(char, 0, 0);
      ctx.restore();
    }

    // Noise dots
    ctx.fillStyle = '#64748b';
    for (let i = 0; i < 40; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      ctx.fillRect(x, y, 2, 2);
    }
  }, [captchaCode]);

  const escucharCodigo = () => {
    if (!captchaCode) return;
    // Read aloud character by character for accessibility
    const spoken = captchaCode
      .split('')
      .map((c) => {
        if (!isNaN(Number(c))) return `Número ${c}`;
        return `Letra ${c}`;
      })
      .join(', ');
    speechService.speak(`Código de seguridad: ${spoken}`, 0.9);
  };

  const handleValidar = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim().toUpperCase() === captchaCode) {
      setVerificado(true);
      setErrorMsg('');
      setTimeout(() => {
        onSuccess();
      }, 500);
    } else {
      setErrorMsg('Código incorrecto. Por favor verifique los caracteres o genere uno nuevo.');
      generarNuevoCodigo();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border border-slate-300 overflow-hidden">
        {/* Institutional Modal Header */}
        <div className="bg-[#0f223d] text-white px-5 py-4 flex items-center justify-between border-b border-amber-600/40">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
            <div>
              <h2 className="font-serif font-bold text-base tracking-wide">
                VERIFICACIÓN DE SEGURIDAD CEJ
              </h2>
              <p className="text-[11px] text-slate-300">Poder Judicial del Perú &bull; Acceso Ciudadano</p>
            </div>
          </div>
          <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-500/30">
            CAPTCHA
          </span>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <p className="text-sm text-slate-700 mb-4 leading-relaxed">
            {motivo}
          </p>

          <form onSubmit={handleValidar} className="space-y-4">
            {/* Captcha Display & Tools */}
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="border-2 border-slate-300 rounded shadow-inner bg-slate-100 overflow-hidden">
                <canvas
                  ref={canvasRef}
                  width={170}
                  height={56}
                  className="block cursor-pointer"
                  title="Haga clic para refrescar código"
                  onClick={generarNuevoCodigo}
                />
              </div>

              <div className="flex sm:flex-col gap-2">
                <button
                  type="button"
                  onClick={generarNuevoCodigo}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded border border-slate-300 shadow-sm transition"
                  title="Generar nueva imagen"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-blue-700" />
                  <span>Cambiar</span>
                </button>
                <button
                  type="button"
                  onClick={escucharCodigo}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded border border-slate-300 shadow-sm transition"
                  title="Escuchar código de seguridad (Lectura accesible)"
                >
                  <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Escuchar</span>
                </button>
              </div>
            </div>

            {/* Input field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Ingrese el texto de la imagen:
              </label>
              <div className="relative">
                <input
                  type="text"
                  maxLength={5}
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                  placeholder="Ej: 8X9KP"
                  autoFocus
                  required
                  className="w-full uppercase text-center text-xl font-mono tracking-widest px-4 py-2.5 bg-white border-2 border-slate-300 rounded-lg focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500/20 font-bold"
                />
                {verificado && (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 absolute right-3 top-2.5 animate-in zoom-in" />
                )}
              </div>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="flex items-start gap-2 text-xs text-red-600 bg-red-50 p-2.5 rounded border border-red-200">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Buttons */}
            <div className="flex items-center justify-end gap-2 pt-2">
              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
                >
                  Cancelar
                </button>
              )}
              <button
                type="submit"
                disabled={verificado || inputCode.length < 3}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#0f223d] hover:bg-[#1a3860] disabled:bg-slate-400 text-white font-semibold text-sm rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
              >
                <Lock className="w-4 h-4 text-amber-400" />
                <span>{verificado ? 'Verificado...' : 'Verificar y Consultar'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Footer info */}
        <div className="bg-slate-100 px-6 py-2.5 border-t border-slate-200 text-center text-[11px] text-slate-500">
          Seguridad obligatoria conforme a la Directiva de Acceso a Servicios Judiciales Digitales del PJ.
        </div>
      </div>
    </div>
  );
};
