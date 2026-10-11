import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  CalendarClock, 
  Tag, 
  MessageSquare, 
  Plus, 
  ChevronRight, 
  Bookmark
} from 'lucide-react';
import { Expediente, RolUsuario } from '../types/judicial';

interface MultiCaseDashboardProps {
  expedientes: Expediente[];
  onSeleccionarExpediente: (exp: Expediente) => void;
  rol: RolUsuario;
  onAgregarNota?: (expId: string, texto: string) => void;
  onAgregarEtiqueta?: (expId: string, etiqueta: string) => void;
  onEliminarEtiqueta?: (expId: string, etiqueta: string) => void;
  onNuevoExpediente?: () => void;
}

export const MultiCaseDashboard: React.FC<MultiCaseDashboardProps> = ({
  expedientes,
  onSeleccionarExpediente,
  rol,
  onAgregarNota,
  onAgregarEtiqueta,
  onEliminarEtiqueta,
  onNuevoExpediente,
}) => {
  const [busqueda, setBusqueda] = useState('');
  const [filtroEtiqueta, setFiltroEtiqueta] = useState<string>('todas');
  const [expedienteNotasAbierto, setExpedienteNotasAbierto] = useState<string | null>(null);
  const [nuevaNotaTexto, setNuevaNotaTexto] = useState<string>('');
  const [nuevaEtiquetaTexto, setNuevaEtiquetaTexto] = useState<string>('');
  const [etiquetaExpId, setEtiquetaExpId] = useState<string | null>(null);

  const todasLasEtiquetas = Array.from(
    new Set(expedientes.flatMap((e) => e.etiquetas || []))
  );

  const expedientesFiltrados = expedientes.filter((exp) => {
    const coincideTexto =
      exp.numeroExpediente.toLowerCase().includes(busqueda.toLowerCase()) ||
      exp.materia.toLowerCase().includes(busqueda.toLowerCase()) ||
      exp.demandante.toLowerCase().includes(busqueda.toLowerCase()) ||
      exp.demandado.toLowerCase().includes(busqueda.toLowerCase()) ||
      (exp.nomenclaturaCompleta && exp.nomenclaturaCompleta.toLowerCase().includes(busqueda.toLowerCase()));

    if (!coincideTexto) return false;
    if (filtroEtiqueta !== 'todas' && !exp.etiquetas.includes(filtroEtiqueta)) return false;
    return true;
  });

  const handleGuardarNota = (expId: string) => {
    if (!nuevaNotaTexto.trim() || !onAgregarNota) return;
    onAgregarNota(expId, nuevaNotaTexto.trim());
    setNuevaNotaTexto('');
  };

  const handleGuardarEtiqueta = (expId: string) => {
    if (!nuevaEtiquetaTexto.trim() || !onAgregarEtiqueta) return;
    onAgregarEtiqueta(expId, nuevaEtiquetaTexto.trim());
    setNuevaEtiquetaTexto('');
    setEtiquetaExpId(null);
  };

  return (
    <div className="space-y-6">
      {/* Title Bar */}
      <div className="bg-[#0f223d] text-white p-5 rounded-xl border border-slate-700 shadow-md flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-xl sm:text-2xl tracking-wide flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-amber-400" />
            <span>TABLERO DE EXPEDIENTES JUDICIALES</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Corte Superior de Justicia de Puno &bull; Consulta y gestión de causas
          </p>
        </div>

        {rol === 'editor' && onNuevoExpediente && (
          <button
            type="button"
            onClick={onNuevoExpediente}
            className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm rounded-lg shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            <span>Registrar Nuevo Expediente</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por N° expediente, materia, demandante o demandado..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
          />
        </div>

        {todasLasEtiquetas.length > 0 && (
          <div className="flex items-center flex-wrap gap-1.5 pt-2 border-t border-slate-100 text-xs">
            <span className="text-slate-400 font-medium mr-1 flex items-center gap-1">
              <Tag className="w-3 h-3" /> Filtrar por etiqueta:
            </span>
            <button
              onClick={() => setFiltroEtiqueta('todas')}
              className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                filtroEtiqueta === 'todas'
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Todas
            </button>
            {todasLasEtiquetas.map((tag) => (
              <button
                key={tag}
                onClick={() => setFiltroEtiqueta(tag)}
                className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  filtroEtiqueta === tag
                    ? 'bg-amber-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Cases List */}
      <div className="space-y-4">
        {expedientesFiltrados.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-xl border border-slate-300 text-slate-500 text-sm">
            No se encontraron expedientes que coincidan con la búsqueda.
          </div>
        ) : (
          expedientesFiltrados.map((exp) => {
            const ultimaResolucion = exp.resoluciones[exp.resoluciones.length - 1];

            return (
              <div
                key={exp.id}
                className="bg-white rounded-xl border border-slate-300 hover:border-amber-500 shadow-sm transition-all overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 border-b border-slate-100 pb-3 mb-3">
                    <div>
                      <div className="flex items-center flex-wrap gap-2 mb-1">
                        <span className="font-mono font-bold text-sm sm:text-base text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-300">
                          {exp.numeroExpediente}
                        </span>

                        <span className="font-mono text-xs text-slate-600">
                          {exp.nomenclaturaCompleta}
                        </span>

                        <span className="text-xs uppercase font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900">
                          {exp.especialidad}
                        </span>

                        <span className="text-xs font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">
                          {exp.estadoProcesal}
                        </span>
                      </div>

                      <h3 className="font-serif font-bold text-slate-900 text-sm sm:text-base">
                        {exp.materia}
                      </h3>
                      <p className="text-xs text-slate-500">{exp.instancia}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSeleccionarExpediente(exp)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-[#0f223d] hover:bg-[#1b365d] text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm transition self-stretch sm:self-auto justify-center"
                    >
                      <span>Ver Expediente y Actuados</span>
                      <ChevronRight className="w-4 h-4 text-amber-400" />
                    </button>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs mb-3">
                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      <span className="text-slate-500 block text-[10px] uppercase font-bold">Demandante:</span>
                      <strong className="text-slate-900 font-medium block">
                        {exp.demandante} (DNI: {exp.dniDemandante})
                      </strong>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      <span className="text-slate-500 block text-[10px] uppercase font-bold">Demandado:</span>
                      <strong className="text-slate-900 font-medium block truncate" title={exp.demandado}>
                        {exp.demandado}
                      </strong>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      <span className="text-slate-500 block text-[10px] uppercase font-bold">Último Actuado:</span>
                      <strong className="text-amber-900 font-semibold block">
                        Res N° {ultimaResolucion?.numero} ({ultimaResolucion?.fechaNotificacion || 'En trámite'})
                      </strong>
                    </div>
                  </div>

                  {/* Tags & Notes */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                    <div className="flex items-center flex-wrap gap-1.5">
                      {exp.etiquetas.map((t, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded text-[11px] font-medium"
                        >
                          <Tag className="w-2.5 h-2.5 text-amber-600" />
                          {t}
                          {rol === 'editor' && onEliminarEtiqueta && (
                            <button
                              type="button"
                              onClick={() => onEliminarEtiqueta(exp.id, t)}
                              className="text-amber-600 hover:text-red-700 ml-0.5"
                              title="Quitar etiqueta"
                            >
                              &times;
                            </button>
                          )}
                        </span>
                      ))}

                      {rol === 'editor' && onAgregarEtiqueta && (
                        etiquetaExpId === exp.id ? (
                          <div className="flex items-center gap-1">
                            <input
                              type="text"
                              value={nuevaEtiquetaTexto}
                              onChange={(e) => setNuevaEtiquetaTexto(e.target.value)}
                              placeholder="Nueva etiqueta..."
                              className="text-[11px] px-1.5 py-0.5 border border-amber-400 rounded bg-white w-28"
                              autoFocus
                            />
                            <button
                              type="button"
                              onClick={() => handleGuardarEtiqueta(exp.id)}
                              className="text-[11px] bg-amber-600 text-white px-1.5 py-0.5 rounded font-bold"
                            >
                              OK
                            </button>
                            <button
                              type="button"
                              onClick={() => setEtiquetaExpId(null)}
                              className="text-[11px] text-slate-500"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setEtiquetaExpId(exp.id)}
                            className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-amber-700 px-1.5 py-0.5 rounded border border-dashed border-slate-300 hover:border-amber-400"
                          >
                            <Plus className="w-2.5 h-2.5" />
                            <span>Etiqueta</span>
                          </button>
                        )
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setExpedienteNotasAbierto(
                          expedienteNotasAbierto === exp.id ? null : exp.id
                        )
                      }
                      className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 font-semibold"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
                      <span>Notas ({exp.notasInternas.length})</span>
                    </button>
                  </div>

                  {/* Notes Drawer */}
                  {expedienteNotasAbierto === exp.id && (
                    <div className="mt-4 p-4 bg-amber-50/40 rounded-xl border border-amber-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif font-bold text-amber-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
                          <Bookmark className="w-3.5 h-3.5 text-amber-700" />
                          <span>Notas Internas del Expediente</span>
                        </h4>
                      </div>

                      {exp.notasInternas.map((nota) => (
                        <div key={nota.id} className="bg-white p-3 rounded-lg border border-amber-200 text-xs shadow-2xs">
                          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                            <strong className="text-amber-900 font-bold">{nota.autor}</strong>
                            <span>{nota.fecha}</span>
                          </div>
                          <p className="text-slate-800 leading-relaxed font-sans">{nota.texto}</p>
                        </div>
                      ))}

                      {/* Add note */}
                      <div className="pt-2 flex gap-2">
                        <input
                          type="text"
                          value={nuevaNotaTexto}
                          onChange={(e) => setNuevaNotaTexto(e.target.value)}
                          placeholder="Escribir nota del expediente..."
                          className="flex-1 bg-white border border-amber-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                        />
                        <button
                          type="button"
                          onClick={() => handleGuardarNota(exp.id)}
                          className="px-3 py-1.5 bg-[#0f223d] hover:bg-[#1a3860] text-white text-xs font-bold rounded-lg shadow-sm"
                        >
                          Guardar Nota
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
