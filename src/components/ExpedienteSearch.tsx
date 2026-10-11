import React, { useState } from 'react';
import { 
  Search, 
  FileText, 
  User, 
  CreditCard, 
  HelpCircle, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { Expediente, RolUsuario } from '../types/judicial';

interface ExpedienteSearchProps {
  expedientes: Expediente[];
  onSeleccionarExpediente: (exp: Expediente) => void;
  rol: RolUsuario;
  onPedirCaptcha: (callback: () => void) => void;
}

export const ExpedienteSearch: React.FC<ExpedienteSearchProps> = ({
  expedientes,
  onSeleccionarExpediente,
  rol,
  onPedirCaptcha,
}) => {
  const [criterio, setCriterio] = useState<'numero_anio' | 'nombre_dni'>('numero_anio');
  
  // Criteria 1: Número y Año
  const [numeroExp, setNumeroExp] = useState('00140');
  const [anioExp, setAnioExp] = useState('2026');

  // Criteria 2: Nombres, Apellidos o DNI
  const [nombreODni, setNombreODni] = useState('');

  const [errorBusqueda, setErrorBusqueda] = useState('');

  const buscarExpediente = () => {
    let encontrado: Expediente | undefined;

    if (criterio === 'numero_anio') {
      const numClean = numeroExp.trim().replace(/^0+/, ''); // remove leading zeros for flexible search
      const anioClean = anioExp.trim();

      encontrado = expedientes.find((exp) => {
        const expNumClean = exp.numeroExpediente.replace(/^0+/, '');
        const matchNum = expNumClean.includes(numClean) || exp.nomenclaturaCompleta.includes(numeroExp.trim());
        const matchAnio = exp.numeroExpediente.includes(anioClean) || exp.nomenclaturaCompleta.includes(anioClean);
        return matchNum && matchAnio;
      });
    } else {
      const texto = nombreODni.trim().toLowerCase();
      encontrado = expedientes.find((exp) => {
        const matchDemandante = exp.demandante.toLowerCase().includes(texto);
        const matchDni = exp.dniDemandante.includes(texto);
        const matchDemandado = exp.demandado.toLowerCase().includes(texto);
        return matchDemandante || matchDni || matchDemandado;
      });
    }

    if (encontrado) {
      setErrorBusqueda('');
      onSeleccionarExpediente(encontrado);
    } else {
      setErrorBusqueda(
        'No se encontró ningún expediente judicial con los datos ingresados. Verifique el número/año o los apellidos/DNI.'
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rol === 'consultor') {
      onPedirCaptcha(() => {
        buscarExpediente();
      });
    } else {
      buscarExpediente();
    }
  };

  const seleccionarCasoRapido = (exp: Expediente) => {
    if (rol === 'consultor') {
      onPedirCaptcha(() => onSeleccionarExpediente(exp));
    } else {
      onSeleccionarExpediente(exp);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-300 shadow-sm overflow-hidden mb-6">
      {/* Institutional CEJ Citizen Search Header */}
      <div className="bg-[#0f223d] text-white px-5 py-4 border-b border-amber-600/40">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-serif font-bold text-base sm:text-lg tracking-wide flex items-center gap-2">
              <Search className="w-5 h-5 text-amber-400" />
              <span>CONSULTA DE EXPEDIENTES JUDICIALES PARA EL CIUDADANO (CEJ)</span>
            </h2>
            <p className="text-xs text-slate-300">
              Corte Superior de Justicia de Puno &bull; Sistema Integrado de Justicia
            </p>
          </div>

          {/* Search mode tabs */}
          <div className="flex items-center gap-1.5 bg-[#162a45] p-1 rounded-lg border border-slate-700 text-xs">
            <button
              type="button"
              onClick={() => setCriterio('numero_anio')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-semibold transition ${
                criterio === 'numero_anio'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Por Número y Año</span>
            </button>

            <button
              type="button"
              onClick={() => setCriterio('nombre_dni')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-semibold transition ${
                criterio === 'nombre_dni'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Por Apellidos y Nombres / DNI</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search Form Body */}
      <div className="p-5 sm:p-6 bg-slate-50/60">
        <form onSubmit={handleSubmit} className="space-y-4">
          {criterio === 'numero_anio' ? (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-7">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Número de Expediente:
                  </label>
                  <input
                    type="text"
                    value={numeroExp}
                    onChange={(e) => setNumeroExp(e.target.value)}
                    placeholder="Ej: 00140 (o 00140-2026)"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600"
                    required
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Ingresa el número de tu caso (ej. 00140).
                  </span>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Año del Expediente:
                  </label>
                  <input
                    type="number"
                    value={anioExp}
                    onChange={(e) => setAnioExp(e.target.value)}
                    placeholder="2026"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600"
                    required
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Año de inicio (ej. 2026).
                  </span>
                </div>

                <div className="sm:col-span-2 flex items-end">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#0f223d] hover:bg-[#1a3860] text-white font-bold text-xs sm:text-sm rounded-lg shadow-sm transition h-[42px]"
                  >
                    <Search className="w-4 h-4 text-amber-400" />
                    <span>Buscar</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Apellidos y Nombres o Número de DNI del Ciudadano / Parte:
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={nombreODni}
                  onChange={(e) => setNombreODni(e.target.value)}
                  placeholder="Ej: Eduardo Luismario Medina Humpiri (o DNI 75412933)"
                  className="flex-1 bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600"
                  required
                />
                <button
                  type="submit"
                  className="flex items-center justify-center gap-1.5 px-6 py-2.5 bg-[#0f223d] hover:bg-[#1a3860] text-white font-bold text-xs sm:text-sm rounded-lg shadow-sm transition"
                >
                  <Search className="w-4 h-4 text-amber-400" />
                  <span>Consultar</span>
                </button>
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                Cualquier ciudadano puede ingresar su nombre, sus apellidos o su número de DNI para encontrar su proceso judicial.
              </span>
            </div>
          )}

          {errorBusqueda && (
            <div className="text-xs text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
              {errorBusqueda}
            </div>
          )}
        </form>

        {/* Direct Case Card Button for Eduardo's case */}
        <div className="mt-4 pt-4 border-t border-slate-200">
          <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-2">
            Expediente Principal Registrado:
          </span>

          <div className="grid grid-cols-1 gap-2">
            {expedientes.map((exp) => (
              <button
                key={exp.id}
                type="button"
                onClick={() => seleccionarCasoRapido(exp)}
                className="text-left p-3 rounded-lg bg-white hover:bg-amber-50/70 border border-slate-300 hover:border-amber-500 transition shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group"
              >
                <div>
                  <div className="flex items-center flex-wrap gap-2 mb-1">
                    <span className="font-mono text-slate-900 font-black text-sm bg-slate-100 px-2 py-0.5 rounded border border-slate-300 group-hover:border-amber-400">
                      EXP. {exp.numeroExpediente}
                    </span>
                    <span className="font-mono text-xs text-slate-600">
                      {exp.nomenclaturaCompleta}
                    </span>
                    <span className="text-[11px] uppercase font-bold bg-blue-100 text-blue-900 px-2 py-0.5 rounded">
                      {exp.especialidad}
                    </span>
                  </div>
                  <div className="text-xs font-serif font-bold text-slate-900 line-clamp-1">
                    {exp.materia}
                  </div>
                  <div className="text-[11px] text-slate-600 mt-0.5">
                    <strong>Demandante:</strong> {exp.demandante} (DNI: {exp.dniDemandante}) &bull; <strong>Juzgado:</strong> {exp.instancia}
                  </div>
                </div>

                <div className="shrink-0 self-end sm:self-center">
                  <span className="text-xs text-amber-700 font-bold group-hover:underline flex items-center gap-1">
                    <span>Ver Expediente Completo</span> &rarr;
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
