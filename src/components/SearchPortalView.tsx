import React, { useState } from 'react';
import { 
  Search, 
  FileText, 
  User, 
  ChevronRight, 
  AlertCircle, 
  FolderOpen,
  MessageCircle,
} from 'lucide-react';
import { Expediente, RolUsuario, Idioma } from '../types/judicial';
import { DICCIONARIO } from '../utils/i18n';

interface SearchPortalViewProps {
  expedientes: Expediente[];
  expedientePrincipal: Expediente;
  onSeleccionarExpediente: (exp: Expediente) => void;
  rol: RolUsuario;
  nombreUsuario: string;
  idioma: Idioma;
  onAbrirJuezTeEscucha: () => void;
}

export const SearchPortalView: React.FC<SearchPortalViewProps> = ({
  expedientes,
  expedientePrincipal,
  onSeleccionarExpediente,
  rol,
  nombreUsuario,
  idioma,
  onAbrirJuezTeEscucha,
}) => {
  const t = DICCIONARIO[idioma];

  // Three search modalities:
  // 1. 'nombre': Por Nombre de la Parte (3 casilleros)
  // 2. 'nomenclatura': Por Nomenclatura de Expediente (1 casillero)
  // 3. 'numero_anio': Por Número de Expediente y Año (2 casilleros)
  const [modalidadBusqueda, setModalidadBusqueda] = useState<'nombre' | 'nomenclatura' | 'numero_anio'>('nomenclatura');

  // Fields for 'nombre'
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [nombres, setNombres] = useState('');

  // Field for 'nomenclatura'
  const [nomenclaturaInput, setNomenclaturaInput] = useState('');

  // Fields for 'numero_anio'
  const [numeroExpInput, setNumeroExpInput] = useState('');
  const [anioExpInput, setAnioExpInput] = useState('');

  const [busquedaRealizada, setBusquedaRealizada] = useState(false);
  const [coincidencias, setCoincidencias] = useState<Expediente[]>([]);

  const handleBuscar = (e: React.FormEvent) => {
    e.preventDefault();
    setBusquedaRealizada(true);

    const lista = expedientes && expedientes.length > 0 ? expedientes : [expedientePrincipal];
    const encontrados: Expediente[] = [];

    for (const exp of lista) {
      let esCoincidente = false;

      if (modalidadBusqueda === 'nomenclatura') {
        const q = nomenclaturaInput.trim().toLowerCase();
        if (!q) continue;
        // Permite nomenclatura completa o coincidencia estricta en el identificador
        if (exp.nomenclaturaCompleta.toLowerCase().includes(q) || exp.numeroExpediente.toLowerCase().includes(q)) {
          esCoincidente = true;
        }
      } else if (modalidadBusqueda === 'numero_anio') {
        const numQ = numeroExpInput.trim();
        const anioQ = anioExpInput.trim();
        if (!numQ && !anioQ) continue;

        // Normalizamos los números (ej. '00140' -> 140, '140' -> 140)
        const numQNormalizado = numQ.replace(/^0+/, '');
        const expNumNormalizado = exp.numeroExpediente.split('-')[0].replace(/^0+/, '');
        const expAnio = exp.numeroExpediente.split('-')[1] || '';

        const coincideNumero = !numQ || expNumNormalizado === numQNormalizado || exp.numeroExpediente.includes(numQ);
        const coincideAnio = !anioQ || expAnio === anioQ || exp.nomenclaturaCompleta.includes(`-${anioQ}-`);

        if (coincideNumero && coincideAnio) {
          esCoincidente = true;
        }
      } else if (modalidadBusqueda === 'nombre') {
        const pat = apellidoPaterno.trim().toLowerCase();
        const mat = apellidoMaterno.trim().toLowerCase();
        const nom = nombres.trim().toLowerCase();

        if (!pat && !mat && !nom) continue;

        const dteCompleto = exp.demandante.toLowerCase();
        const ddoCompleto = exp.demandado.toLowerCase();

        const matchPaterno = !pat || dteCompleto.includes(pat) || ddoCompleto.includes(pat);
        const matchMaterno = !mat || dteCompleto.includes(mat) || ddoCompleto.includes(mat);
        const matchNombres = !nom || dteCompleto.includes(nom) || ddoCompleto.includes(nom);

        if (matchPaterno && matchMaterno && matchNombres) {
          esCoincidente = true;
        }
      }

      if (esCoincidente && !encontrados.some((x) => x.id === exp.id)) {
        encontrados.push(exp);
      }
    }

    setCoincidencias(encontrados);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 py-4 font-arial" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#0369a1] via-[#0284c7] to-[#0c4a6e] text-white p-6 sm:p-7 rounded-2xl shadow-lg border border-sky-300">
        <span className="text-xs font-bold text-sky-200 uppercase tracking-wider block mb-1">
          {t.institucion} &bull; {t.subtitulo}
        </span>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1.5">
          {t.tituloBusqueda}
        </h1>
        <p className="text-xs sm:text-sm text-sky-100">
          {t.bienvenido}, <strong className="text-white uppercase">{nombreUsuario}</strong>. {t.subtituloBusqueda}
        </p>
      </div>

      {/* Acceso independiente de atención ciudadana */}
      <section className="grid grid-cols-1 gap-4">
        <button type="button" onClick={onAbrirJuezTeEscucha} className="flex items-center gap-4 rounded-2xl border-2 border-sky-200 bg-white p-5 text-left shadow-sm transition hover:border-sky-500 hover:shadow-md">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-[#0369a1]"><MessageCircle className="h-6 w-6" /></span>
          <span className="min-w-0 flex-1"><strong className="block text-sm font-black text-slate-900">{t.accesoJuez}</strong><span className="mt-1 block text-xs leading-relaxed text-slate-600">{t.accesoJuezDesc}</span></span>
          <ChevronRight className="h-5 w-5 shrink-0 text-sky-700" />
        </button>
      </section>

      {/* Main Search Panel with 3 Tab Buttons */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-sky-200 shadow-md space-y-5">
        {/* The 3 Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 bg-sky-50 rounded-xl border border-sky-200">
          <button
            type="button"
            onClick={() => {
              setModalidadBusqueda('nombre');
              setBusquedaRealizada(false);
            }}
            className={`py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
              modalidadBusqueda === 'nombre'
                ? 'bg-[#0284c7] text-white shadow-sm'
                : 'text-slate-700 hover:text-[#0369a1] hover:bg-white'
            }`}
          >
            <User className="w-4 h-4" />
            <span>{t.buscarPorParte}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setModalidadBusqueda('nomenclatura');
              setBusquedaRealizada(false);
            }}
            className={`py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
              modalidadBusqueda === 'nomenclatura'
                ? 'bg-[#0284c7] text-white shadow-sm'
                : 'text-slate-700 hover:text-[#0369a1] hover:bg-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>{t.buscarPorNomenclatura}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setModalidadBusqueda('numero_anio');
              setBusquedaRealizada(false);
            }}
            className={`py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
              modalidadBusqueda === 'numero_anio'
                ? 'bg-[#0284c7] text-white shadow-sm'
                : 'text-slate-700 hover:text-[#0369a1] hover:bg-white'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>{t.buscarPorNumeroAnio}</span>
          </button>
        </div>

        {/* Dynamic Form depending on active tab */}
        <form onSubmit={handleBuscar} className="space-y-4 pt-1">
          {/* TAB 1: Por Nombre de la Parte (3 casilleros: Paterno, Materno, Nombres) */}
          {modalidadBusqueda === 'nombre' && (
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                {t.buscarPorParte}:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    {t.ingresePaterno}:
                  </label>
                  <input
                    type="text"
                    value={apellidoPaterno}
                    onChange={(e) => setApellidoPaterno(e.target.value)}
                    placeholder=""
                    className="w-full bg-slate-50 border-2 border-sky-200 focus:border-[#0284c7] rounded-lg px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400/20"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    {t.ingreseMaterno}:
                  </label>
                  <input
                    type="text"
                    value={apellidoMaterno}
                    onChange={(e) => setApellidoMaterno(e.target.value)}
                    placeholder=""
                    className="w-full bg-slate-50 border-2 border-sky-200 focus:border-[#0284c7] rounded-lg px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400/20"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    {t.ingreseNombres}:
                  </label>
                  <input
                    type="text"
                    value={nombres}
                    onChange={(e) => setNombres(e.target.value)}
                    placeholder=""
                    className="w-full bg-slate-50 border-2 border-sky-200 focus:border-[#0284c7] rounded-lg px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400/20"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Por Nomenclatura de Expediente */}
          {modalidadBusqueda === 'nomenclatura' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {t.ingreseNomenclatura}:
              </label>
              <input
                type="text"
                value={nomenclaturaInput}
                onChange={(e) => setNomenclaturaInput(e.target.value)}
                placeholder=""
                className="w-full bg-slate-50 border-2 border-sky-200 focus:border-[#0284c7] rounded-lg px-3.5 py-2.5 text-sm sm:text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400/20 font-mono"
                autoFocus
                required
              />
            </div>
          )}

          {/* TAB 3: Por Número de Expediente y Año */}
          {modalidadBusqueda === 'numero_anio' && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {t.ingreseNumExp}:
                  </label>
                  <input
                    type="text"
                    value={numeroExpInput}
                    onChange={(e) => setNumeroExpInput(e.target.value)}
                    placeholder=""
                    className="w-full bg-slate-50 border-2 border-sky-200 focus:border-[#0284c7] rounded-lg px-3.5 py-2.5 text-sm sm:text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400/20 font-mono"
                    autoFocus
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {t.ingreseAnio}:
                  </label>
                  <input
                    type="number"
                    value={anioExpInput}
                    onChange={(e) => setAnioExpInput(e.target.value)}
                    placeholder=""
                    className="w-full bg-slate-50 border-2 border-sky-200 focus:border-[#0284c7] rounded-lg px-3.5 py-2.5 text-sm sm:text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400/20 font-mono"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-8 py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-sm rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
            >
              <Search className="w-4 h-4 text-white" />
              <span>{t.btnConsultar}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Search Results Display */}
      {busquedaRealizada && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-600 font-bold uppercase tracking-wider px-1">
            <span>{t.resultados} ({coincidencias.length})</span>
            <span>{t.institucion}</span>
          </div>

          {coincidencias.length === 0 ? (
            <div className="bg-white p-8 rounded-xl border border-sky-200 text-center space-y-2 shadow-xs">
              <AlertCircle className="w-8 h-8 text-amber-600 mx-auto" />
              <h3 className="font-bold text-slate-800 text-sm">
                {t.sinResultados}
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                {t.sinResultadosDesc}
              </p>
            </div>
          ) : (
            coincidencias.map((exp) => (
              <div
                key={exp.id}
                className="bg-white rounded-2xl border-2 border-sky-300 hover:border-[#0284c7] shadow-lg transition-all overflow-hidden"
              >
                {/* Result Card Header */}
                <div className="bg-gradient-to-r from-[#0369a1] to-[#0284c7] text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-sky-200 uppercase tracking-widest block">
                      {t.nomenclaturaCompleta}:
                    </span>
                    <h2 className="text-lg sm:text-xl font-mono font-black text-white tracking-wide">
                      {exp.nomenclaturaCompleta}
                    </h2>
                  </div>

                  <span className="bg-white text-[#0369a1] text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm uppercase">
                    EXP. {exp.numeroExpediente}
                  </span>
                </div>

                {/* Result Card Body */}
                <div className="p-5 sm:p-6 space-y-4">
                  {/* DEMANDANTE */}
                  <div className="bg-sky-50/60 p-3.5 rounded-xl border border-sky-200">
                    <span className="text-xs font-bold text-[#0369a1] uppercase tracking-wider block mb-0.5">
                      {t.demandante}:
                    </span>
                    <div className="text-sm sm:text-base font-bold text-slate-900">
                      {exp.demandante}
                      <span className="text-xs font-normal text-slate-600 ml-2">
                        (DNI: <strong>{exp.dniDemandante}</strong>)
                      </span>
                    </div>
                  </div>

                  {/* DEMANDADO Y MATERIA */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-sky-50/60 p-3.5 rounded-xl border border-sky-200">
                      <span className="text-xs font-bold text-[#0369a1] uppercase tracking-wider block mb-0.5">
                        {t.demandado}:
                      </span>
                      <div className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                        {exp.demandado}
                      </div>
                    </div>

                    <div className="bg-sky-50/60 p-3.5 rounded-xl border border-sky-200">
                      <span className="text-xs font-bold text-[#0369a1] uppercase tracking-wider block mb-0.5">
                        {t.materia}:
                      </span>
                      <div className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                        {exp.materia}
                      </div>
                    </div>
                  </div>

                  {/* RESUMEN DEL ESTADÍO */}
                  <div className="bg-gradient-to-r from-blue-50 to-sky-100 p-4 rounded-xl border-2 border-sky-300">
                    <span className="text-xs font-black text-[#0c4a6e] uppercase tracking-wider block mb-1">
                      {t.resumenEstadio}:
                    </span>
                    <div className="text-sm sm:text-base font-bold text-[#0369a1] leading-relaxed">
                      {exp.estadoProcesal || 'APELACIÓN DE SENTENCIA Y ELEVACIÓN DEL EXPEDIENTE A LA SALA LABORAL MIXTA DE PUNO'}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => onSeleccionarExpediente(exp)}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#0c4a6e] hover:bg-[#0369a1] text-white font-bold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
                    >
                      <FolderOpen className="w-5 h-5 text-sky-300" />
                      <span>{t.btnIngresarExpediente}</span>
                      <ChevronRight className="w-5 h-5 text-sky-300" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
