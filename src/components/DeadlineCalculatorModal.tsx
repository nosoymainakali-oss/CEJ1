import React, { useState } from 'react';
import { 
  CalendarClock, 
  Calendar, 
  Clock, 
  Share2, 
  Copy, 
  Check, 
  AlertCircle, 
  Info,
  CheckCircle2
} from 'lucide-react';
import { calcularPlazoConReglas, formatoFechaCorta, generarMensajeWhatsApp } from '../utils/peruLegalDeadlines';

interface DeadlineCalculatorModalProps {
  expedienteNumero?: string;
  materia?: string;
  fechaInicial?: string;
  diasIniciales?: number;
  tipoInicial?: 'fisica' | 'electronica';
}

export const DeadlineCalculatorModal: React.FC<DeadlineCalculatorModalProps> = ({
  expedienteNumero = '00140-2026-0-2111-JR-LA-02',
  materia = 'INVALIDEZ DE CONTRATO CAS, RECONOCIMIENTO COMO TRABAJADOR D.LEG. 728',
  fechaInicial,
  diasIniciales = 5,
  tipoInicial = 'electronica',
}) => {
  const hoyStr = formatoFechaCorta(new Date());

  const [fechaNotif, setFechaNotif] = useState<string>(fechaInicial || hoyStr);
  const [diasOtorgados, setDiasOtorgados] = useState<number>(diasIniciales || 5);
  const [tipoNotificacion, setTipoNotificacion] = useState<'fisica' | 'electronica'>(tipoInicial);
  const [copiado, setCopiado] = useState(false);

  const resultado = calcularPlazoConReglas(
    fechaNotif,
    Math.max(1, diasOtorgados),
    tipoNotificacion
  );

  const mensajeWhatsApp = generarMensajeWhatsApp(
    expedienteNumero,
    materia,
    tipoNotificacion,
    diasOtorgados,
    resultado.fechaVencimiento
  );

  const handleCopiar = () => {
    navigator.clipboard.writeText(mensajeWhatsApp);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 3000);
  };

  const handleWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(mensajeWhatsApp)}`, '_blank');
  };

  return (
    <div className="bg-white rounded-xl border border-slate-300 shadow-md overflow-hidden my-6">
      {/* Header */}
      <div className="bg-[#0f223d] text-white px-5 py-4 border-b border-amber-600/40">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-600 rounded-lg shadow-sm">
            <CalendarClock className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-lg sm:text-xl tracking-wide">
              CALCULADORA DE PLAZOS JUDICIALES (DÍAS HÁBILES)
            </h2>
            <p className="text-xs text-slate-300">
              Cómputo exacto con calendario judicial del Perú. Descuenta sábados, domingos y feriados.
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-7">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Column (5 cols) */}
          <div className="lg:col-span-5 space-y-5 bg-slate-50 p-5 rounded-xl border border-slate-200">
            {/* 1. Ubicar Fecha en Calendario */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-amber-700" />
                <span>1. Ubica la Fecha de Notificación en el Calendario:</span>
              </label>
              <input
                type="date"
                value={fechaNotif}
                onChange={(e) => setFechaNotif(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 shadow-2xs"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Selecciona en el calendario el día en que se entregó la cédula física o se depositó en la casilla.
              </span>
            </div>

            {/* 2. Plazo que se ha otorgado */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-700" />
                <span>2. Plazo Otorgado por el Juzgado (en días hábiles):</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  max={120}
                  value={diasOtorgados}
                  onChange={(e) => setDiasOtorgados(parseInt(e.target.value, 10) || 1)}
                  className="w-28 bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600"
                />
                <span className="text-xs font-semibold text-slate-600">días hábiles</span>
              </div>

              {/* Botones rápidos de plazos comunes */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {[3, 5, 10, 15, 30].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDiasOtorgados(d)}
                    className={`px-2.5 py-1 text-xs rounded font-bold transition border ${
                      diasOtorgados === d
                        ? 'bg-amber-600 text-white border-amber-600'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                    }`}
                  >
                    {d} días
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Modalidad: Física vs Electrónica */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                3. Modalidad de Notificación:
              </label>
              <div className="space-y-2">
                {/* Opción Notificación Física */}
                <label
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition ${
                    tipoNotificacion === 'fisica'
                      ? 'bg-amber-50/80 border-amber-600 shadow-2xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="tipoNotif"
                    value="fisica"
                    checked={tipoNotificacion === 'fisica'}
                    onChange={() => setTipoNotificacion('fisica')}
                    className="mt-1 text-amber-600 focus:ring-amber-500"
                  />
                  <div>
                    <strong className="text-xs text-slate-900 block font-serif">
                      Notificación Física (Cédula en papel / domicilio real)
                    </strong>
                    <span className="text-[11px] text-slate-600 block mt-0.5 leading-snug">
                      El plazo comienza a partir del día siguiente hábil de la notificación.
                    </span>
                  </div>
                </label>

                {/* Opción Notificación Electrónica */}
                <label
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition ${
                    tipoNotificacion === 'electronica'
                      ? 'bg-amber-50/80 border-amber-600 shadow-2xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="tipoNotif"
                    value="electronica"
                    checked={tipoNotificacion === 'electronica'}
                    onChange={() => setTipoNotificacion('electronica')}
                    className="mt-1 text-amber-600 focus:ring-amber-500"
                  />
                  <div>
                    <strong className="text-xs text-slate-900 block font-serif">
                      Notificación Electrónica (Casilla SINOE)
                    </strong>
                    <span className="text-[11px] text-slate-600 block mt-0.5 leading-snug">
                      Se le agregan dos días más al plazo (días hábiles adicionales de perfeccionamiento antes de computar el plazo otorgado).
                    </span>
                  </div>
                </label>
              </div>
            </div>

            <div className="p-3 bg-blue-50/70 rounded-lg border border-blue-200/80 text-[11px] text-blue-900">
              <strong>Regla procesal aplicada:</strong> En notificación física se computa a partir del día hábil siguiente ({diasOtorgados} días). En electrónica se agregan 2 días hábiles adicionales ({diasOtorgados} + 2 = {resultado.diasTotalesEfectivos} días hábiles en total).
            </div>
          </div>

          {/* Results Column (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Big Result Card */}
            <div className="bg-gradient-to-br from-[#0c192c] to-[#15345b] text-white p-5 sm:p-6 rounded-xl shadow-md border-2 border-amber-500/50">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-xs uppercase tracking-wider text-amber-300 font-bold">
                  FECHA FINAL DE VENCIMIENTO DEL PLAZO
                </span>

                <span
                  className={`text-xs font-black uppercase px-2.5 py-0.5 rounded ${
                    resultado.estado === 'urgente'
                      ? 'bg-red-600 text-white animate-pulse'
                      : resultado.estado === 'vencido'
                      ? 'bg-slate-700 text-slate-300'
                      : 'bg-emerald-600 text-white'
                  }`}
                >
                  {resultado.estado === 'urgente'
                    ? '⚠️ PLAZO URGENTE'
                    : resultado.estado === 'vencido'
                    ? 'VENCIDO'
                    : 'EN PLAZO HÁBIL'}
                </span>
              </div>

              <div className="text-3xl sm:text-4xl font-serif font-black text-amber-400 tracking-tight my-2">
                {resultado.fechaVencimiento}
              </div>

              <p className="text-xs text-slate-200 flex items-center gap-1.5 font-medium">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Hasta las 23:59 horas en la Mesa de Partes Virtual (MPV) del Poder Judicial</span>
              </p>

              <div className="mt-4 pt-3 border-t border-slate-700 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300">
                <div>
                  <strong>Modalidad:</strong> {tipoNotificacion === 'electronica' ? 'Electrónica (+2 días)' : 'Física'}
                </div>
                <div>
                  <strong>Días computados:</strong> {resultado.diasTotalesEfectivos} días hábiles
                </div>
                <div className="text-amber-300 font-bold">
                  {resultado.horasRestantesTexto}
                </div>
              </div>
            </div>

            {/* WhatsApp Notification Share */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Enviar Alerta de Vencimiento
                </h4>
                <p className="text-[11px] text-slate-500">
                  Notifica inmediatamente por WhatsApp el vencimiento de este plazo.
                </p>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm transition"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopiar}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 transition"
                >
                  {copiado ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-600" />}
                  <span>{copiado ? 'Copiado' : 'Copiar'}</span>
                </button>
              </div>
            </div>

            {/* Day-by-Day Calendar Audit Table */}
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Desglose Día por Día en el Calendario Judicial:
              </h4>

              <div className="max-h-60 overflow-y-auto border border-slate-200 rounded-lg shadow-inner bg-white">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px] sticky top-0 border-b border-slate-200">
                    <tr>
                      <th className="px-3 py-2">Fecha</th>
                      <th className="px-3 py-2">Día</th>
                      <th className="px-3 py-2">Condición</th>
                      <th className="px-3 py-2 text-right">Cómputo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {resultado.detalleDias.map((d, i) => (
                      <tr
                        key={i}
                        className={
                          d.numeroDiaHabil === resultado.diasTotalesEfectivos
                            ? 'bg-amber-100 font-bold text-amber-950'
                            : !d.esHabil
                            ? 'bg-slate-50 text-slate-400'
                            : d.esDiasAdicionalesSinoe
                            ? 'bg-blue-50/60 text-blue-900'
                            : 'text-slate-800'
                        }
                      >
                        <td className="px-3 py-1.5 font-mono">{d.fecha}</td>
                        <td className="px-3 py-1.5">{d.diaSemana}</td>
                        <td className="px-3 py-1.5">
                          {d.esHabil ? (
                            <span className="inline-flex items-center gap-1 font-semibold">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                              {d.esDiasAdicionalesSinoe
                                ? `Día Adicional Electrónico SINOE (${d.numeroDiaHabil} de 2)`
                                : 'Día Hábil Judicial'}
                            </span>
                          ) : (
                            <span className="italic">{d.motivoNoHabil}</span>
                          )}
                        </td>
                        <td className="px-3 py-1.5 text-right font-bold">
                          {d.numeroDiaHabil ? (
                            <span
                              className={`px-1.5 py-0.5 rounded text-[10px] ${
                                d.numeroDiaHabil === resultado.diasTotalesEfectivos
                                  ? 'bg-amber-600 text-white'
                                  : 'bg-slate-200 text-slate-700'
                              }`}
                            >
                              Día {d.numeroDiaHabil}
                              {d.numeroDiaHabil === resultado.diasTotalesEfectivos && ' (VENCE)'}
                            </span>
                          ) : (
                            <span>-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
