import React, { useState } from 'react';
import { Plus, X, FileText, CheckCircle, QrCode, Barcode, Sparkles } from 'lucide-react';
import { Resolucion, TipoResolucion } from '../types/judicial';
import { calcularPlazoConReglas } from '../utils/peruLegalDeadlines';

interface NewActuadoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCrear: (nuevoActuado: Resolucion) => void;
  numeroSiguiente: number;
  expedienteNomenclatura: string;
  nombreEditor: string;
  dniDemandante: string;
}

export const NewActuadoModal: React.FC<NewActuadoModalProps> = ({
  isOpen,
  onClose,
  onCrear,
  numeroSiguiente,
  expedienteNomenclatura,
  nombreEditor,
  dniDemandante,
}) => {
  if (!isOpen) return null;

  const fechaActual = new Date();
  const hoyStr = `${fechaActual.getFullYear()}-${String(fechaActual.getMonth()+1).padStart(2,'0')}-${String(fechaActual.getDate()).padStart(2,'0')}`;

  const [tipo, setTipo] = useState<TipoResolucion>('AUTO');
  const [titulo, setTitulo] = useState(`RESOLUCIÓN N° ${String(numeroSiguiente).padStart(2, '0')}`);
  const [fechaResolucion, setFechaResolucion] = useState(hoyStr);
  const [fechaNotificacion, setFechaNotificacion] = useState(hoyStr);
  const [fojas, setFojas] = useState('');
  const [sumilla, setSumilla] = useState('');
  const [contenidoCompleto, setContenidoCompleto] = useState('');
  const [ccv, setCcv] = useState('');
  
  // Deadlines
  const [abrePlazo, setAbrePlazo] = useState(true);
  const [diasOtorgados, setDiasOtorgados] = useState(5);
  const [modalidadNotif, setModalidadNotif] = useState<'fisica' | 'electronica'>('electronica');

  // Plain language summary
  const [enCristiano, setEnCristiano] = useState('');
  const [plazoAbiertoTexto, setPlazoAbiertoTexto] = useState('');

  // Automatic code generated
  const codigoBarrasGenerado = `PJ-${expedienteNomenclatura}-${String(numeroSiguiente).padStart(3, '0')}`;
  const codigoQRGenerado = `PJ-PERU|EXP:${expedienteNomenclatura}|ACTUADO:${numeroSiguiente}|${tipo}|${titulo}|FECHA:${fechaNotificacion}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d+(-\d+)?$/.test(fojas.trim())) { alert('Ingrese una foja o un rango válido, por ejemplo 77 o 2-46.'); return; }

    const nuevo: Resolucion = {
      id: `res-${Date.now()}`,
      numero: numeroSiguiente,
      tipo,
      titulo: titulo.trim(),
      fechaResolucion,
      fechaNotificacion,
      tipoNotificacion: modalidadNotif,
      fojas: fojas.trim(),
      sumilla: sumilla.trim(),
      contenidoCompleto: contenidoCompleto.trim(),
      codigoBarras: codigoBarrasGenerado,
      codigoQRData: codigoQRGenerado,
      ccv: ccv.trim(),
      archivosAdjuntos: [
        {
          id: `arch-${Date.now()}`,
          nombre: `${tipo}_N${numeroSiguiente}_${fechaNotificacion}.pdf`,
          tamano: '850 KB',
          tipo: 'pdf',
          fechaSubida: fechaNotificacion,
          subidoPor: nombreEditor,
        },
      ],
      resumenSencillo: {
        enCristiano:
          enCristiano.trim() ||
          `El juzgado emitió la presente resolución de tipo ${tipo}. Las partes procesales han sido notificadas para su estricto cumplimiento o absolución.`,
        plazoAbierto:
          plazoAbiertoTexto.trim() ||
          (abrePlazo
            ? `Abre un plazo de ${diasOtorgados} días hábiles ${modalidadNotif === 'electronica' ? '(+2 días hábiles adicionales SINOE)' : ''}.`
            : 'Sin plazo perentorio abierto.'),
        queHacer: [
          'Revisar el proveído notificado en la casilla judicial SINOE.',
          'Presentar escrito dentro del plazo si corresponde formular defensa o recurso.',
        ],
        terminosExplicados: [
          { termino: tipo, significado: 'Naturaleza formal del acto procesal emitido.' },
        ],
        explicacionQuechua:
          'Juzgadomanta mosoq resolución lluqsimun. Lliw runakunam kamachisqata hunt’ananku.',
        explicacionAimara:
          'Juzgadota machaq qillqata mistuni. Juchanchatanakampi demandantempi phuqhapxañapawa.',
      },
      calculoPlazo: abrePlazo
        ? calcularPlazoConReglas(fechaNotificacion, diasOtorgados, modalidadNotif)
        : undefined,
    };

    onCrear(nuevo);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col border border-slate-300 overflow-hidden">
        {/* Header */}
        <div className="bg-[#0f223d] text-white px-5 py-4 flex items-center justify-between border-b border-amber-600/40 shrink-0">
          <div className="flex items-center gap-2.5">
            <Plus className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-serif font-bold text-base tracking-wide">
                AÑADIR ACTUADO JUDICIAL AL EXPEDIENTE
              </h3>
              <p className="text-[11px] text-slate-300">
                Se generará automáticamente su Código de Barras y Código QR &bull; Editor: {nombreEditor}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Automatic barcode preview ribbon */}
        <div className="bg-amber-50 px-5 py-2.5 border-b border-amber-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-amber-900 font-mono font-bold">
            <Barcode className="w-4 h-4 text-amber-700" />
            <span>Código de Barras asignado: *{codigoBarrasGenerado}*</span>
          </div>
          <div className="flex items-center gap-1 text-emerald-800 font-semibold text-[11px]">
            <QrCode className="w-3.5 h-3.5" />
            <span>QR Autogenerado</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Tipo de Actuado:
              </label>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value as TipoResolucion)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-bold text-slate-900"
              >
                <option value="AUTO">AUTO</option>
                <option value="DECRETO">DECRETO</option>
                <option value="SENTENCIA">SENTENCIA</option>
                <option value="ESCRITO">ESCRITO</option>
                <option value="NOTIFICACION">NOTIFICACIÓN</option>
                <option value="OFICIO">OFICIO</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Fecha del Acto:
              </label>
              <input
                type="date"
                value={fechaResolucion}
                onChange={(e) => setFechaResolucion(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium text-slate-900"
                required
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
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium text-slate-900"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Título del Actuado:
              </label>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ej: AUTO QUE CONCEDE APELACIÓN"
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs sm:text-sm font-bold text-slate-900"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Fojas:
              </label>
              <input
                type="text"
                value={fojas}
                onChange={(e) => setFojas(e.target.value.replace(/[^0-9-]/g, ""))}
                placeholder="Ej.: 77 o 2-46"
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-bold text-slate-900"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">CCV:</label>
            <input
              type="text"
              value={ccv}
              onChange={(e) => setCcv(e.target.value)}
              placeholder="Ingrese el CCV del documento, si corresponde"
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Sumilla Oficial:
            </label>
            <textarea
              rows={2}
              value={sumilla}
              onChange={(e) => setSumilla(e.target.value)}
              placeholder="Resumen formal del proveído judicial..."
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900"
              required
            />
          </div>

          {/* Plazo judicial del actuado */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={abrePlazo}
                  onChange={(e) => setAbrePlazo(e.target.checked)}
                  className="w-4 h-4 text-amber-600 rounded"
                />
                <span>Este actuado abre plazo procesal legal</span>
              </label>
            </div>

            {abrePlazo && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Días hábiles otorgados:
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={diasOtorgados}
                    onChange={(e) => setDiasOtorgados(parseInt(e.target.value, 10) || 1)}
                    className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Modalidad:
                  </label>
                  <select
                    value={modalidadNotif}
                    onChange={(e) => setModalidadNotif(e.target.value as any)}
                    className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs font-semibold text-slate-900"
                  >
                    <option value="electronica">Electrónica SINOE (+2 días adicionales)</option>
                    <option value="fisica">Física (Día siguiente hábil)</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Plain language explanation */}
          <div className="bg-sky-50/70 p-3.5 rounded-xl border border-sky-200 space-y-2">
            <span className="text-xs font-bold text-[#0369a1] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#0284c7]" />
              <span>Síntesis Resolutiva para el Ciudadano:</span>
            </span>
            <textarea
              rows={2}
              value={enCristiano}
              onChange={(e) => setEnCristiano(e.target.value)}
              placeholder="Síntesis formal y clara de la decisión judicial adoptada..."
              className="w-full bg-white border border-sky-300 rounded px-3 py-1.5 text-xs text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Texto Judicial Completo del Proveído:
            </label>
            <textarea
              rows={4}
              value={contenidoCompleto}
              onChange={(e) => setContenidoCompleto(e.target.value)}
              placeholder="Contenido íntegro del proveído o auto..."
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono text-slate-800"
              required
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-lg shadow-sm transition"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Añadir Actuado con Barcode y QR</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
