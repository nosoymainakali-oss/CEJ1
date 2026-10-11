import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit3, 
  X, 
  Check, 
  Scale, 
  Eye, 
  FileText, 
  Building2, 
  User, 
  Calendar,
  Sparkles
} from 'lucide-react';
import { Expediente, Idioma } from '../types/judicial';
import { DICCIONARIO } from '../utils/i18n';

interface LiveExpedienteEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  expedienteInicial?: Expediente | null;
  modo: 'crear' | 'editar';
  onGuardar: (exp: Expediente) => void;
  idioma: Idioma;
}

export const LiveExpedienteEditorModal: React.FC<LiveExpedienteEditorModalProps> = ({
  isOpen,
  onClose,
  expedienteInicial,
  modo,
  onGuardar,
  idioma,
}) => {
  const t = DICCIONARIO[idioma];

  // Editable fields with live state
  const [numeroExpediente, setNumeroExpediente] = useState('');
  const [nomenclaturaCompleta, setNomenclaturaCompleta] = useState('');
  const [distritoJudicial, setDistritoJudicial] = useState('PUNO');
  const [instancia, setInstancia] = useState('');
  const [juez, setJuez] = useState('');
  const [secretario, setSecretario] = useState('');
  const [especialidad, setEspecialidad] = useState('LABORAL - CONTENCIOSO ADMINISTRATIVO');
  const [materia, setMateria] = useState('');
  const [estadoProcesal, setEstadoProcesal] = useState('ELEVADO A LA SALA LABORAL MIXTA DE PUNO');
  const [demandante, setDemandante] = useState('');
  const [dniDemandante, setDniDemandante] = useState('');
  const [demandado, setDemandado] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (modo === 'editar' && expedienteInicial) {
        setNumeroExpediente(expedienteInicial.numeroExpediente);
        setNomenclaturaCompleta(expedienteInicial.nomenclaturaCompleta);
        setDistritoJudicial(expedienteInicial.distritoJudicial || 'PUNO');
        setInstancia(expedienteInicial.instancia);
        setJuez(expedienteInicial.juez);
        setSecretario(expedienteInicial.secretario);
        setEspecialidad(expedienteInicial.especialidad);
        setMateria(expedienteInicial.materia);
        setEstadoProcesal(expedienteInicial.estadoProcesal);
        setDemandante(expedienteInicial.demandante);
        setDniDemandante(expedienteInicial.dniDemandante);
        setDemandado(expedienteInicial.demandado);
        setFechaInicio(expedienteInicial.fechaInicio);
      } else {
        // Defaults for creating a new case
        setNumeroExpediente('00185-2026');
        setNomenclaturaCompleta('00185-2026-0-2111-JR-LA-01');
        setDistritoJudicial('PUNO');
        setInstancia('1er JUZGADO DE TRABAJO - SEDE JULIACA');
        setJuez('ROSA LUZ CONDORI MAMANI');
        setSecretario('CARLOS ALBERTO APAZA QUISPE');
        setEspecialidad('LABORAL - CONTENCIOSO ADMINISTRATIVO');
        setMateria('RECONOCIMIENTO DE VÍNCULO LABORAL A PLAZO INDETERMINADO Y PAGO DE BENEFICIOS SOCIALES');
        setEstadoProcesal('EN TRÁMITE - AUDIENCIA ÚNICA PROGRAMADA');
        setDemandante('JUAN CARLOS MAMANI QUISPE');
        setDniDemandante('45892147');
        setDemandado('GOBIERNO REGIONAL DE PUNO, REPRESENTADO POR SU PROCURADOR PÚBLICO');
        setFechaInicio('15/03/2026');
      }
    }
  }, [isOpen, modo, expedienteInicial]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const expFinal: Expediente = {
      id: expedienteInicial?.id || `exp-${Date.now()}`,
      numeroExpediente: numeroExpediente.trim() || '00140-2026',
      nomenclaturaCompleta: nomenclaturaCompleta.trim() || '00140-2026-0-2111-JR-LA-02',
      distritoJudicial: distritoJudicial.trim() || 'PUNO',
      instancia: instancia.trim() || '2do JUZGADO DE TRABAJO ZONA NORTE - JULIACA',
      juez: juez.trim() || 'LEYDI KAREN QUISPE ROJAS',
      secretario: secretario.trim() || 'WILMER LIZARDO JORGE HUARACHA',
      especialidad: especialidad.trim() || 'LABORAL - CONTENCIOSO ADMINISTRATIVO',
      materia: materia.trim(),
      estadoProcesal: estadoProcesal.trim() || 'ELEVADO A LA SALA LABORAL MIXTA DE PUNO',
      demandante: demandante.trim(),
      dniDemandante: dniDemandante.trim(),
      demandado: demandado.trim(),
      fechaInicio: fechaInicio.trim() || '11/02/2026',
      etiquetas: expedienteInicial?.etiquetas || ['Proceso Judicial', 'Laboral'],
      notasInternas: expedienteInicial?.notasInternas || [],
      lineaTiempo: expedienteInicial?.lineaTiempo || [
        {
          id: `hito-${Date.now()}`,
          titulo: 'Ingreso de Demanda',
          fecha: fechaInicio || '2026-02-11',
          descripcion: 'Presentación formal de la demanda.',
          estado: 'completado',
          orden: 1,
        }
      ],
      resoluciones: expedienteInicial?.resoluciones || [],
    };

    onGuardar(expFinal);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto font-arial" style={{ fontFamily: 'Arial, sans-serif' }}>
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[92vh] flex flex-col shadow-2xl border-2 border-sky-300 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0369a1] via-[#0284c7] to-[#0c4a6e] text-white p-4 sm:p-5 flex items-center justify-between border-b border-sky-400/40">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl border border-white/20">
              {modo === 'crear' ? <Plus className="w-6 h-6 text-white" /> : <Edit3 className="w-6 h-6 text-white" />}
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg tracking-wide text-white">
                {modo === 'crear' ? 'Añadir Nuevo Expediente Judicial' : 'Editar Datos del Expediente'}
              </h3>
              <p className="text-xs text-sky-100">
                Servidor Judicial &bull; Vista previa en tiempo real mientras edita
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-sky-200 hover:text-white hover:bg-white/10 transition cursor-pointer"
            title="Cerrar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body: Split into Form (Left) and Live Preview (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          {/* Left Column: Edit Form (7 cols) */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 p-5 sm:p-6 space-y-4 border-r border-sky-200 overflow-y-auto">
            <div className="bg-sky-50/80 p-3 rounded-xl border border-sky-200 text-xs text-sky-950 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#0284c7] shrink-0" />
              <span>Los cambios que realice en estos campos se reflejan <strong>en vivo</strong> en la vista previa a la derecha.</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Nomenclatura Completa:
                </label>
                <input
                  type="text"
                  value={nomenclaturaCompleta}
                  onChange={(e) => setNomenclaturaCompleta(e.target.value)}
                  placeholder="00140-2026-0-2111-JR-LA-02"
                  className="w-full bg-white border border-sky-300 rounded-lg px-3 py-2 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Número y Año (Expediente):
                </label>
                <input
                  type="text"
                  value={numeroExpediente}
                  onChange={(e) => setNumeroExpediente(e.target.value)}
                  placeholder="00140-2026"
                  className="w-full bg-white border border-sky-300 rounded-lg px-3 py-2 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                  required
                />
              </div>
            </div>

            {/* Demandante y DNI */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Demandante (Nombres y Apellidos):
                </label>
                <input
                  type="text"
                  value={demandante}
                  onChange={(e) => setDemandante(e.target.value)}
                  placeholder="EDUARDO LUISMARIO MEDINA HUMPIRI"
                  className="w-full bg-white border border-sky-300 rounded-lg px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  DNI Demandante:
                </label>
                <input
                  type="text"
                  maxLength={8}
                  value={dniDemandante}
                  onChange={(e) => setDniDemandante(e.target.value)}
                  placeholder="75412933"
                  className="w-full bg-white border border-sky-300 rounded-lg px-3 py-2 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                  required
                />
              </div>
            </div>

            {/* Demandado */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Demandado:
              </label>
              <textarea
                rows={2}
                value={demandado}
                onChange={(e) => setDemandado(e.target.value)}
                placeholder="MUNICIPALIDAD PROVINCIAL DE SAN ROMAN, REPRESENTADO POR SU PROCURADOR PÚBLICO"
                className="w-full bg-white border border-sky-300 rounded-lg px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                required
              />
            </div>

            {/* Materia */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Materia Demandada:
              </label>
              <textarea
                rows={2}
                value={materia}
                onChange={(e) => setMateria(e.target.value)}
                placeholder="INVALIDEZ DE CONTRATO CAS, RECONOCIMIENTO COMO TRABAJADOR..."
                className="w-full bg-white border border-sky-300 rounded-lg px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                required
              />
            </div>

            {/* Estado Procesal */}
            <div>
              <label className="block text-xs font-bold text-[#0c4a6e] uppercase tracking-wider mb-1">
                Estado Procesal del Expediente:
              </label>
              <input
                type="text"
                value={estadoProcesal}
                onChange={(e) => setEstadoProcesal(e.target.value)}
                placeholder="ELEVADO A LA SALA LABORAL MIXTA DE PUNO"
                className="w-full bg-white border-2 border-sky-400 rounded-lg px-3 py-2 text-xs font-bold text-[#0369a1] focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                required
              />
            </div>

            {/* Juzgado / Magistrados */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Juzgado / Instancia:
                </label>
                <input
                  type="text"
                  value={instancia}
                  onChange={(e) => setInstancia(e.target.value)}
                  placeholder="2do JUZGADO DE TRABAJO ZONA NORTE - JULIACA"
                  className="w-full bg-white border border-sky-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Fecha de Inicio:
                </label>
                <input
                  type="text"
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                  placeholder="11/02/2026"
                  className="w-full bg-white border border-sky-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Jueza / Juez:
                </label>
                <input
                  type="text"
                  value={juez}
                  onChange={(e) => setJuez(e.target.value)}
                  placeholder="LEYDI KAREN QUISPE ROJAS"
                  className="w-full bg-white border border-sky-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Especialista Legal:
                </label>
                <input
                  type="text"
                  value={secretario}
                  onChange={(e) => setSecretario(e.target.value)}
                  placeholder="WILMER LIZARDO JORGE HUARACHA"
                  className="w-full bg-white border border-sky-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                  required
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-sky-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-6 py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs rounded-lg shadow-md transition cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>{modo === 'crear' ? 'Crear y Guardar Expediente' : 'Guardar Modificaciones'}</span>
              </button>
            </div>
          </form>

          {/* Right Column: LIVE PREVIEW (5 cols) */}
          <div className="lg:col-span-5 bg-sky-50/50 p-5 sm:p-6 space-y-4 overflow-y-auto">
            <div className="flex items-center justify-between text-xs font-bold text-[#0369a1] uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <Eye className="w-4 h-4" />
                <span>Vista Previa en Vivo</span>
              </span>
              <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-sky-200 text-sky-800">
                Actualizado al instante
              </span>
            </div>

            {/* Preview Case Card */}
            <div className="bg-white rounded-2xl border-2 border-sky-300 shadow-md overflow-hidden">
              {/* Card Banner */}
              <div className="bg-gradient-to-r from-[#0369a1] via-[#0284c7] to-[#0c4a6e] text-white p-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 bg-white text-[#0284c7] rounded-lg flex items-center justify-center shadow-xs shrink-0">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-sky-200 font-bold uppercase tracking-wider block">
                      PODER JUDICIAL DEL PERÚ
                    </span>
                    <h4 className="font-mono font-black text-sm text-white tracking-wide truncate">
                      {nomenclaturaCompleta || '00140-2026-0-2111-JR-LA-02'}
                    </h4>
                  </div>
                </div>

                {/* State Badge with requested "Estado: " prefix */}
                <div className="mt-3 pt-2.5 border-t border-sky-400/40">
                  <span className="text-xs font-bold bg-white text-[#0369a1] px-3 py-1 rounded-md shadow-2xs block truncate">
                    Estado: {estadoProcesal || 'ELEVADO A LA SALA LABORAL MIXTA DE PUNO'}
                  </span>
                </div>
              </div>

              {/* Card Metadata */}
              <div className="p-4 space-y-3 text-xs">
                {/* Demandante */}
                <div className="bg-sky-50/80 p-2.5 rounded-lg border border-sky-200">
                  <span className="text-[10px] font-bold text-[#0369a1] uppercase block mb-0.5">
                    DEMANDANTE:
                  </span>
                  <div className="font-bold text-slate-900 text-xs">
                    {demandante || 'NOMBRE DEL DEMANDANTE'}
                    <span className="text-slate-500 font-normal ml-1">
                      (DNI: {dniDemandante || '--------'})
                    </span>
                  </div>
                </div>

                {/* Demandado */}
                <div className="bg-sky-50/80 p-2.5 rounded-lg border border-sky-200">
                  <span className="text-[10px] font-bold text-[#0369a1] uppercase block mb-0.5">
                    DEMANDADO:
                  </span>
                  <div className="font-bold text-slate-900 text-xs leading-snug">
                    {demandado || 'ENTIDAD O PARTE DEMANDADA'}
                  </div>
                </div>

                {/* Materia */}
                <div className="bg-sky-50/80 p-2.5 rounded-lg border border-sky-200">
                  <span className="text-[10px] font-bold text-[#0369a1] uppercase block mb-0.5">
                    MATERIA:
                  </span>
                  <div className="font-bold text-slate-900 text-xs leading-snug">
                    {materia || 'DESCRIPCIÓN DE LA MATERIA DEMANDADA'}
                  </div>
                </div>

                {/* Instancia / Juez */}
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1 text-[11px] text-slate-700">
                  <div>
                    <strong>Juzgado:</strong> {instancia || 'Juzgado de Trabajo'}
                  </div>
                  <div>
                    <strong>Magistrada:</strong> {juez || 'Juez asignado'}
                  </div>
                  <div>
                    <strong>Especialista:</strong> {secretario || 'Especialista legal'}
                  </div>
                  <div>
                    <strong>Fecha Inicio:</strong> {fechaInicio || '11/02/2026'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
