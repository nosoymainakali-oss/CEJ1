import React, { useState } from 'react';
import { Plus, X, Briefcase, CheckCircle } from 'lucide-react';
import { Expediente } from '../types/judicial';

interface NewExpedienteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCrear: (nuevoExp: Expediente) => void;
  nombreEditor: string;
}

export const NewExpedienteModal: React.FC<NewExpedienteModalProps> = ({
  isOpen,
  onClose,
  onCrear,
  nombreEditor,
}) => {
  if (!isOpen) return null;

  const [numeroExpediente, setNumeroExpediente] = useState('00140-2026');
  const [nomenclaturaCompleta, setNomenclaturaCompleta] = useState('00140-2026-0-2111-JR-LA-02');
  const [distritoJudicial, setDistritoJudicial] = useState('PUNO');
  const [instancia, setInstancia] = useState('2do JUZGADO DE TRABAJO ZONA NORTE - JULIACA');
  const [materia, setMateria] = useState('INVALIDEZ DE CONTRATO CAS, RECONOCIMIENTO COMO TRABAJADOR D.LEG. 728');
  const [especialidad, setEspecialidad] = useState('LABORAL - CONTENCIOSO ADMINISTRATIVO');
  const [juez, setJuez] = useState('LEYDI KAREN QUISPE ROJAS');
  const [secretario, setSecretario] = useState('WILMER LIZARDO JORGE HUARACHA');
  const [demandante, setDemandante] = useState('EDUARDO LUISMARIO MEDINA HUMPIRI');
  const [dniDemandante, setDniDemandante] = useState('75412933');
  const [demandado, setDemandado] = useState('MUNICIPALIDAD PROVINCIAL DE SAN ROMAN, REPRESENTADO POR SU PROCURADOR PÚBLICO');
  const [estadoProcesal, setEstadoProcesal] = useState('ELEVADO A LA SALA LABORAL MIXTA DE PUNO');
  const [etiquetasStr, setEtiquetasStr] = useState('Laboral 728, Juliaca, Puno');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const etiquetas = etiquetasStr
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const nuevo: Expediente = {
      id: `exp-${Date.now()}`,
      numeroExpediente: numeroExpediente.trim(),
      nomenclaturaCompleta: nomenclaturaCompleta.trim(),
      distritoJudicial,
      instancia,
      juez,
      secretario,
      especialidad,
      materia: materia.trim().toUpperCase(),
      estadoProcesal,
      demandante: demandante.trim(),
      dniDemandante: dniDemandante.trim(),
      demandado: demandado.trim(),
      fechaInicio: new Date().toISOString().split('T')[0],
      etiquetas,
      notasInternas: [
        {
          id: `n-${Date.now()}`,
          fecha: new Date().toISOString().split('T')[0],
          autor: nombreEditor,
          texto: 'Expediente incorporado al sistema por el editor.',
        },
      ],
      lineaTiempo: [
        {
          id: `hito-${Date.now()}`,
          titulo: 'Ingreso al Sistema',
          fecha: new Date().toISOString().split('T')[0],
          descripcion: 'Registro inicial de la causa.',
          estado: 'en_proceso',
          orden: 1,
        },
      ],
      resoluciones: [],
    };

    onCrear(nuevo);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col border border-slate-300 overflow-hidden">
        {/* Header */}
        <div className="bg-[#0f223d] text-white px-5 py-4 flex items-center justify-between border-b border-amber-600/40 shrink-0">
          <div className="flex items-center gap-2.5">
            <Briefcase className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-serif font-bold text-base tracking-wide">
                REGISTRAR NUEVO EXPEDIENTE JUDICIAL
              </h3>
              <p className="text-[11px] text-slate-300">
                Creado por Editor: {nombreEditor}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Número de Expediente:
              </label>
              <input
                type="text"
                value={numeroExpediente}
                onChange={(e) => setNumeroExpediente(e.target.value)}
                placeholder="00140-2026"
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono font-bold text-slate-900"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Nomenclatura Completa:
              </label>
              <input
                type="text"
                value={nomenclaturaCompleta}
                onChange={(e) => setNomenclaturaCompleta(e.target.value)}
                placeholder="00140-2026-0-2111-JR-LA-02"
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono font-bold text-slate-900"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Distrito Judicial:
              </label>
              <input
                type="text"
                value={distritoJudicial}
                onChange={(e) => setDistritoJudicial(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium text-slate-900"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Órgano Jurisdiccional / Juzgado:
              </label>
              <input
                type="text"
                value={instancia}
                onChange={(e) => setInstancia(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Materia Procesal:
            </label>
            <input
              type="text"
              value={materia}
              onChange={(e) => setMateria(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Juez:
              </label>
              <input
                type="text"
                value={juez}
                onChange={(e) => setJuez(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Especialista / Secretario:
              </label>
              <input
                type="text"
                value={secretario}
                onChange={(e) => setSecretario(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Demandante:
              </label>
              <input
                type="text"
                value={demandante}
                onChange={(e) => setDemandante(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                DNI Demandante:
              </label>
              <input
                type="text"
                value={dniDemandante}
                onChange={(e) => setDniDemandante(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono text-slate-900"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Demandado:
            </label>
            <input
              type="text"
              value={demandado}
              onChange={(e) => setDemandado(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Estado Procesal:
              </label>
              <input
                type="text"
                value={estadoProcesal}
                onChange={(e) => setEstadoProcesal(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Etiquetas (separadas por coma):
              </label>
              <input
                type="text"
                value={etiquetasStr}
                onChange={(e) => setEtiquetasStr(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900"
              />
            </div>
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
              className="flex items-center gap-1.5 px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-lg shadow-sm transition"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Registrar Expediente</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
