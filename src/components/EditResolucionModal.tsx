import React, { useState } from 'react';
import { Edit3, CheckCircle, X, ShieldCheck, Sparkles } from 'lucide-react';
import { Resolucion, TipoResolucion } from '../types/judicial';

interface EditResolucionModalProps {
  isOpen: boolean;
  onClose: () => void;
  resolucion: Resolucion | null;
  onGuardar: (resActualizada: Resolucion) => void;
  nombreEditor: string;
}

export const EditResolucionModal: React.FC<EditResolucionModalProps> = ({
  isOpen,
  onClose,
  resolucion,
  onGuardar,
  nombreEditor,
}) => {
  if (!isOpen || !resolucion) return null;

  const [tipo, setTipo] = useState<TipoResolucion>(resolucion.tipo);
  const [titulo, setTitulo] = useState(resolucion.titulo);
  const [sumilla, setSumilla] = useState(resolucion.sumilla);
  const [contenidoCompleto, setContenidoCompleto] = useState(resolucion.contenidoCompleto);
  const [fojas, setFojas] = useState<string>(String(resolucion.fojas ?? ''));
  const [codigoBarras, setCodigoBarras] = useState(resolucion.codigoBarras || '');
  const [codigoQRData, setCodigoQRData] = useState(resolucion.codigoQRData || '');
  const [ccv, setCcv] = useState(resolucion.ccv || '');
  const [fechaResolucion, setFechaResolucion] = useState(resolucion.fechaResolucion);
  const [fechaNotificacion, setFechaNotificacion] = useState(resolucion.fechaNotificacion);
  const [tipoNotificacion, setTipoNotificacion] = useState<'fisica' | 'electronica'>(
    resolucion.tipoNotificacion || (resolucion.calculoPlazo?.tipoNotificacion as any) || 'electronica'
  );

  // Plain language summary edits
  const [enCristiano, setEnCristiano] = useState(resolucion.resumenSencillo.enCristiano);
  const [plazoAbierto, setPlazoAbierto] = useState(resolucion.resumenSencillo.plazoAbierto);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d+(-\d+)?$/.test(fojas.trim())) { alert('Ingrese una foja o un rango válido, por ejemplo 77 o 2-46.'); return; }

    const actualizada: Resolucion = {
      ...resolucion,
      tipo,
      titulo: titulo.trim(),
      sumilla: sumilla.trim(),
      contenidoCompleto: contenidoCompleto.trim(),
      fojas: fojas.trim(),
      codigoBarras: codigoBarras.trim(),
      codigoQRData: codigoQRData.trim(),
      ccv: ccv.trim(),
      fechaResolucion,
      fechaNotificacion,
      tipoNotificacion,
      resumenSencillo: {
        ...resolucion.resumenSencillo,
        enCristiano: enCristiano.trim(),
        plazoAbierto: plazoAbierto.trim(),
      },
    };

    onGuardar(actualizada);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col border border-slate-300 overflow-hidden font-arial" style={{ fontFamily: 'Arial, sans-serif' }}>
        {/* Header */}
        <div className="bg-[#0c4a6e] text-white px-5 py-4 flex items-center justify-between border-b border-sky-400/40 shrink-0">
          <div className="flex items-center gap-2.5">
            <Edit3 className="w-5 h-5 text-sky-300" />
            <div>
              <h3 className="font-bold text-base tracking-wide uppercase">
                EDITAR ACTUADO JUDICIAL N° {resolucion.numero}
              </h3>
              <p className="text-[11px] text-sky-200">
                Servidor Judicial Autorizado: {nombreEditor}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-sky-300 hover:text-white transition cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Tipo de Actuado:
              </label>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value as TipoResolucion)}
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-2 text-xs font-bold text-slate-900"
              >
                <option value="SENTENCIA">SENTENCIA</option>
                <option value="AUTO">AUTO</option>
                <option value="DECRETO">DECRETO</option>
                <option value="ESCRITO">ESCRITO</option>
                <option value="NOTIFICACION">RESOLUCIÓN / NOTIFICACIÓN</option>
                <option value="OFICIO">OFICIO</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Fojas del Documento:
              </label>
              <input
                type="text"
                value={fojas}
                onChange={(e) => setFojas(e.target.value.replace(/[^0-9-]/g, ""))}
                placeholder="Ej.: 77 o 2-46"
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-2 text-xs font-bold text-slate-900"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Fecha del Actuado:
              </label>
              <input
                type="date"
                value={fechaResolucion}
                onChange={(e) => setFechaResolucion(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Fecha de Notificación:
              </label>
              <input
                type="date"
                value={fechaNotificacion}
                onChange={(e) => setFechaNotificacion(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Modalidad de Notificación:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs font-bold cursor-pointer transition ${tipoNotificacion === 'electronica' ? 'bg-sky-50 border-[#0284c7] text-[#0369a1]' : 'border-slate-300 text-slate-700'}`}>
                <input
                  type="radio"
                  name="modalidadNotificacionEdit"
                  checked={tipoNotificacion === 'electronica'}
                  onChange={() => setTipoNotificacion('electronica')}
                  className="text-[#0284c7]"
                />
                <span>Notificación Electrónica (SINOE: +2 días adicionales)</span>
              </label>
              <label className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs font-bold cursor-pointer transition ${tipoNotificacion === 'fisica' ? 'bg-sky-50 border-[#0284c7] text-[#0369a1]' : 'border-slate-300 text-slate-700'}`}>
                <input
                  type="radio"
                  name="modalidadNotificacionEdit"
                  checked={tipoNotificacion === 'fisica'}
                  onChange={() => setTipoNotificacion('fisica')}
                  className="text-[#0284c7]"
                />
                <span>Notificación Física (Cédula: computa al día siguiente hábil)</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Título de la Resolución:
            </label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs sm:text-sm font-bold text-slate-900"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Código de barras:</label>
              <input type="text" value={codigoBarras} onChange={(e) => setCodigoBarras(e.target.value)} className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono text-slate-900" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Datos del código QR:</label>
              <textarea rows={2} value={codigoQRData} onChange={(e) => setCodigoQRData(e.target.value)} className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono text-slate-900" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">CCV:</label>
              <input type="text" value={ccv} onChange={(e) => setCcv(e.target.value)} placeholder="CCV del documento" className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono text-slate-900" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Sumilla Oficial:
            </label>
            <textarea
              rows={2}
              value={sumilla}
              onChange={(e) => setSumilla(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 font-sans"
              required
            />
          </div>

          {/* Plain Language Summary */}
          <div className="bg-sky-50/70 p-4 rounded-xl border border-sky-200 space-y-3">
            <h4 className="font-bold text-[#0369a1] text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#0284c7]" />
              <span>Síntesis Resolutiva en Lenguaje Claro:</span>
            </h4>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Síntesis Resolutiva del Actuado:
              </label>
              <textarea
                rows={3}
                value={enCristiano}
                onChange={(e) => setEnCristiano(e.target.value)}
                className="w-full bg-white border border-sky-300 rounded px-2.5 py-1.5 text-xs text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Texto Judicial Completo:
            </label>
            <textarea
              rows={5}
              value={contenidoCompleto}
              onChange={(e) => setContenidoCompleto(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono text-slate-800"
              required
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-lg transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 bg-[#0f223d] hover:bg-[#1b365d] text-white font-bold text-xs rounded-lg shadow-sm transition"
            >
              <CheckCircle className="w-4 h-4 text-amber-400" />
              <span>Guardar Modificaciones</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
