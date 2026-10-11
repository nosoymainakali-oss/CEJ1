import React, { useState } from 'react';
import { 
  CheckCircle, 
  Clock, 
  Circle, 
  Plus, 
  Edit3, 
  Trash2, 
  Calendar, 
  Save, 
  X, 
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { HitoLineaTiempo, RolUsuario } from '../types/judicial';

interface TimelineProcessProps {
  hitos: HitoLineaTiempo[];
  rol: RolUsuario;
  onActualizarHitos: (nuevosHitos: HitoLineaTiempo[]) => void;
  nombreEditor: string;
}

export const TimelineProcess: React.FC<TimelineProcessProps> = ({
  hitos,
  rol,
  onActualizarHitos,
  nombreEditor,
}) => {
  const [modalNuevoHito, setModalNuevoHito] = useState(false);
  const [hitoEnEdicion, setHitoEnEdicion] = useState<HitoLineaTiempo | null>(null);

  // Form states for new milestone
  const [nuevoTitulo, setNuevoTitulo] = useState('');
  const [nuevaFecha, setNuevaFecha] = useState(new Date().toISOString().split('T')[0]);
  const [nuevaDescripcion, setNuevaDescripcion] = useState('');
  const [nuevoEstado, setNuevoEstado] = useState<'completado' | 'en_proceso' | 'pendiente'>('en_proceso');

  const handleCrearHito = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoTitulo.trim()) return;

    const nuevo: HitoLineaTiempo = {
      id: `hito-${Date.now()}`,
      titulo: nuevoTitulo.trim(),
      fecha: nuevaFecha,
      descripcion: nuevaDescripcion.trim(),
      estado: nuevoEstado,
      orden: hitos.length + 1,
    };

    onActualizarHitos([...hitos, nuevo]);
    setNuevoTitulo('');
    setNuevaDescripcion('');
    setModalNuevoHito(false);
  };

  const handleGuardarEdicion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hitoEnEdicion) return;

    onActualizarHitos(
      hitos.map((h) => (h.id === hitoEnEdicion.id ? hitoEnEdicion : h))
    );
    setHitoEnEdicion(null);
  };

  const handleEliminarHito = (id: string) => {
    if (!window.confirm('¿Está seguro de eliminar este hito de la línea de tiempo?')) return;
    onActualizarHitos(hitos.filter((h) => h.id !== id));
  };

  const handleCambiarEstado = (id: string, nuevoEstado: 'completado' | 'en_proceso' | 'pendiente') => {
    onActualizarHitos(
      hitos.map((h) => (h.id === id ? { ...h, estado: nuevoEstado } : h))
    );
  };

  const handleMoverHito = (index: number, direccion: 'arriba' | 'abajo') => {
    const nuevos = [...hitos];
    const targetIdx = direccion === 'arriba' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= nuevos.length) return;

    const temp = nuevos[index];
    nuevos[index] = nuevos[targetIdx];
    nuevos[targetIdx] = temp;

    // reindex orden
    nuevos.forEach((h, i) => (h.orden = i + 1));
    onActualizarHitos(nuevos);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-300 shadow-sm overflow-hidden mb-6">
      {/* Header */}
      <div className="bg-[#0f223d] text-white px-5 py-4 flex flex-wrap items-center justify-between gap-3 border-b border-amber-600/40">
        <div>
          <h2 className="font-serif font-bold text-base sm:text-lg tracking-wide flex items-center gap-2">
            <span>LÍNEA DE TIEMPO DEL PROCESO</span>
          </h2>
          <p className="text-xs text-slate-300">
            Secuencia cronológica de actuados y avances del expediente judicial.
          </p>
        </div>

        {rol === 'editor' && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30 font-medium hidden sm:inline">
              Editable por: {nombreEditor}
            </span>
            <button
              type="button"
              onClick={() => setModalNuevoHito(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-lg shadow-sm transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Añadir Hito a la Línea de Tiempo</span>
            </button>
          </div>
        )}
      </div>

      {/* Timeline Content */}
      <div className="p-5 sm:p-7 bg-slate-50/50">
        {hitos.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-xs">
            No hay hitos registrados en la línea de tiempo. Como editor puedes agregar los hitos que consideres pertinentes.
          </div>
        ) : (
          <div className="relative border-l-2 border-amber-600/40 ml-4 sm:ml-6 space-y-6">
            {hitos.map((hito, idx) => {
              const esCompletado = hito.estado === 'completado';
              const esEnProceso = hito.estado === 'en_proceso';

              return (
                <div key={hito.id} className="relative pl-6 sm:pl-8 group">
                  {/* Timeline Node Icon */}
                  <span
                    className={`absolute -left-[17px] top-1.5 w-8 h-8 rounded-full flex items-center justify-center border-2 bg-white shadow-sm transition ${
                      esCompletado
                        ? 'border-emerald-600 text-emerald-600'
                        : esEnProceso
                        ? 'border-amber-600 text-amber-600 ring-4 ring-amber-400/20 animate-pulse'
                        : 'border-slate-400 text-slate-400'
                    }`}
                  >
                    {esCompletado ? (
                      <CheckCircle className="w-4 h-4 fill-emerald-100" />
                    ) : esEnProceso ? (
                      <Clock className="w-4 h-4" />
                    ) : (
                      <Circle className="w-3 h-3" />
                    )}
                  </span>

                  {/* Card Content */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-amber-400 transition">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-sm sm:text-base text-slate-900">
                          {hito.titulo}
                        </span>

                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            esCompletado
                              ? 'bg-emerald-100 text-emerald-800'
                              : esEnProceso
                              ? 'bg-amber-100 text-amber-900 font-extrabold'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {esCompletado
                            ? 'Completado'
                            : esEnProceso
                            ? 'En Trámite'
                            : 'Pendiente'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                        <span className="flex items-center gap-1 font-mono">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          {hito.fecha}
                        </span>

                        {/* Editor Controls for this Milestone */}
                        {rol === 'editor' && (
                          <div className="flex items-center gap-1 pl-2 border-l border-slate-200">
                            {/* Reorder */}
                            <button
                              onClick={() => handleMoverHito(idx, 'arriba')}
                              disabled={idx === 0}
                              className="p-1 hover:bg-slate-100 text-slate-500 disabled:opacity-30"
                              title="Subir"
                            >
                              <ChevronUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleMoverHito(idx, 'abajo')}
                              disabled={idx === hitos.length - 1}
                              className="p-1 hover:bg-slate-100 text-slate-500 disabled:opacity-30"
                              title="Bajar"
                            >
                              <ChevronDown className="w-3.5 h-3.5" />
                            </button>

                            {/* Edit */}
                            <button
                              onClick={() => setHitoEnEdicion(hito)}
                              className="p-1 hover:bg-slate-100 text-slate-700"
                              title="Editar este hito"
                            >
                              <Edit3 className="w-3.5 h-3.5 text-blue-700" />
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() => handleEliminarHito(hito.id)}
                              className="p-1 hover:bg-red-50 text-red-600"
                              title="Eliminar este hito"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                      {hito.descripcion}
                    </p>

                    {/* Quick status toggle for Editor */}
                    {rol === 'editor' && (
                      <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center gap-2 text-[11px]">
                        <span className="text-slate-400 font-medium">Cambiar estado:</span>
                        <button
                          onClick={() => handleCambiarEstado(hito.id, 'completado')}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            hito.estado === 'completado'
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          Completado
                        </button>
                        <button
                          onClick={() => handleCambiarEstado(hito.id, 'en_proceso')}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            hito.estado === 'en_proceso'
                              ? 'bg-amber-600 text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          En Trámite
                        </button>
                        <button
                          onClick={() => handleCambiarEstado(hito.id, 'pendiente')}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            hito.estado === 'pendiente'
                              ? 'bg-slate-700 text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          Pendiente
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* MODAL: Nuevo Hito */}
      {modalNuevoHito && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border border-slate-300 overflow-hidden">
            <div className="bg-[#0f223d] text-white px-5 py-4 flex items-center justify-between">
              <h3 className="font-serif font-bold text-sm">AÑADIR HITO A LA LÍNEA DE TIEMPO</h3>
              <button onClick={() => setModalNuevoHito(false)}>
                <X className="w-5 h-5 text-slate-400 hover:text-white" />
              </button>
            </div>
            <form onSubmit={handleCrearHito} className="p-5 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Título del Hito Procesal:
                </label>
                <input
                  type="text"
                  value={nuevoTitulo}
                  onChange={(e) => setNuevoTitulo(e.target.value)}
                  placeholder="Ej: Elevación a Sala Laboral Mixta de Puno"
                  className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs font-bold text-slate-900"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Fecha:
                  </label>
                  <input
                    type="date"
                    value={nuevaFecha}
                    onChange={(e) => setNuevaFecha(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs font-medium text-slate-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Estado:
                  </label>
                  <select
                    value={nuevoEstado}
                    onChange={(e) => setNuevoEstado(e.target.value as any)}
                    className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs font-semibold text-slate-900"
                  >
                    <option value="completado">Completado</option>
                    <option value="en_proceso">En Trámite</option>
                    <option value="pendiente">Pendiente</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Descripción o Actuado:
                </label>
                <textarea
                  rows={3}
                  value={nuevaDescripcion}
                  onChange={(e) => setNuevaDescripcion(e.target.value)}
                  placeholder="Detalle de la actuación procesal..."
                  className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs text-slate-900"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setModalNuevoHito(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded shadow-xs"
                >
                  Guardar Hito
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Editar Hito */}
      {hitoEnEdicion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border border-slate-300 overflow-hidden">
            <div className="bg-[#0f223d] text-white px-5 py-4 flex items-center justify-between">
              <h3 className="font-serif font-bold text-sm">EDITAR HITO DE LA LÍNEA DE TIEMPO</h3>
              <button onClick={() => setHitoEnEdicion(null)}>
                <X className="w-5 h-5 text-slate-400 hover:text-white" />
              </button>
            </div>
            <form onSubmit={handleGuardarEdicion} className="p-5 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Título:
                </label>
                <input
                  type="text"
                  value={hitoEnEdicion.titulo}
                  onChange={(e) =>
                    setHitoEnEdicion({ ...hitoEnEdicion, titulo: e.target.value })
                  }
                  className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs font-bold text-slate-900"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Fecha:
                  </label>
                  <input
                    type="date"
                    value={hitoEnEdicion.fecha}
                    onChange={(e) =>
                      setHitoEnEdicion({ ...hitoEnEdicion, fecha: e.target.value })
                    }
                    className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs font-medium text-slate-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Estado:
                  </label>
                  <select
                    value={hitoEnEdicion.estado}
                    onChange={(e) =>
                      setHitoEnEdicion({
                        ...hitoEnEdicion,
                        estado: e.target.value as any,
                      })
                    }
                    className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs font-semibold text-slate-900"
                  >
                    <option value="completado">Completado</option>
                    <option value="en_proceso">En Trámite</option>
                    <option value="pendiente">Pendiente</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Descripción:
                </label>
                <textarea
                  rows={3}
                  value={hitoEnEdicion.descripcion}
                  onChange={(e) =>
                    setHitoEnEdicion({
                      ...hitoEnEdicion,
                      descripcion: e.target.value,
                    })
                  }
                  className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs text-slate-900"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setHitoEnEdicion(null)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#0f223d] hover:bg-[#1a3860] text-white font-bold text-xs rounded shadow-xs"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
