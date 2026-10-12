import React, { useState } from 'react';
import { Calendar, Clock, Plus, X, Scale, CheckCircle2 } from 'lucide-react';
import { DiligenciaAgenda } from '../types/judicial';
import { JUECES_PERMITIDOS } from './ElJuezTeEscucha';

interface AgendarAudienciaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAgregarDiligencia: (diligencia: DiligenciaAgenda) => void;
  expedienteNomenclatura: string;
  juezPorDefecto?: string;
  nombreEditor: string;
}

export const AgendarAudienciaModal: React.FC<AgendarAudienciaModalProps> = ({
  isOpen,
  onClose,
  onAgregarDiligencia,
  expedienteNomenclatura,
  juezPorDefecto = 'LEYDI KAREN QUISPE ROJAS',
  nombreEditor,
}) => {
  if (!isOpen) return null;

  // Match default judge with JUECES_PERMITIDOS
  const juezInicial = JUECES_PERMITIDOS.find(
    j => j.toLowerCase() === juezPorDefecto.toLowerCase()
  ) || JUECES_PERMITIDOS[1]; // Default Leydi Karen Quispe Rojas

  const [magistrado, setMagistrado] = useState(juezInicial);
  const fechaActual = new Date();
  const hoy = `${fechaActual.getFullYear()}-${String(fechaActual.getMonth()+1).padStart(2,'0')}-${String(fechaActual.getDate()).padStart(2,'0')}`;
  const [fecha, setFecha] = useState(hoy);
  const [hora, setHora] = useState('10:00');
  const [tipo, setTipo] = useState('AUDIENCIA ÚNICA DE JUZGAMIENTO');
  const [descripcion, setDescripcion] = useState(
    ''
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fecha < hoy) { alert('Seleccione una fecha actual o futura.'); return; }

    const nueva: DiligenciaAgenda = {
      id: `aud-${Date.now()}`,
      magistrado,
      expedienteNomenclatura,
      fecha,
      hora,
      tipo,
      descripcion: descripcion.trim(),
    };

    onAgregarDiligencia(nueva);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in font-arial" style={{ fontFamily: 'Arial, sans-serif' }}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-300 overflow-hidden">
        {/* Header */}
        <div className="bg-[#0c4a6e] text-white px-5 py-4 flex items-center justify-between border-b border-sky-400/40">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-sky-300" />
            <div>
              <h3 className="font-bold text-base uppercase">
                Fijar Audiencia / Diligencia en Agenda del Juez
              </h3>
              <p className="text-[11px] text-sky-200">
                Se sincronizará con el módulo «El Juez Te Escucha» &bull; {nombreEditor}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-sky-300 hover:text-white transition cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Magistrado Titular:
            </label>
            <select
              value={magistrado}
              onChange={(e) => setMagistrado(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-bold text-slate-900"
            >
              {JUECES_PERMITIDOS.map((juez) => (
                <option key={juez} value={juez}>
                  {juez}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Fecha de la Audiencia:
              </label>
              <input
                type="date"
                min={hoy}
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-bold text-slate-900"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Hora:
              </label>
              <input
                type="time"
                value={hora}
                onChange={(e) => setHora(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-bold text-slate-900"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Tipo de Diligencia:
            </label>
            <input
              type="text"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              placeholder="Ej.: AUDIENCIA ÚNICA, VISTA DE LA CAUSA, INSPECCIÓN JUDICIAL..."
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-bold text-slate-900"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Descripción de la Audiencia / Diligencia:
            </label>
            <textarea
              rows={2}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900"
              required
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold rounded-xl text-xs uppercase transition shadow cursor-pointer flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Guardar en la Agenda Oficial del Juez</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
