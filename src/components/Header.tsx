import React from 'react';
import { 
  Scale, 
  Eye, 
  ShieldCheck, 
  User, 
  LogOut, 
  CalendarClock, 
  Search,
  Globe,
  Plus
} from 'lucide-react';
import { RolUsuario, Idioma } from '../types/judicial';
import { DICCIONARIO } from '../utils/i18n';

interface HeaderProps {
  rol: RolUsuario;
  nombreUsuario: string;
  dniUsuario: string;
  onCerrarSesion: () => void;
  altoContraste: boolean;
  onToggleAltoContraste: () => void;
  vistaActual: 'busqueda' | 'expediente' | 'calculadora' | 'juez_te_escucha';
  onChangeVista: (vista: 'busqueda' | 'expediente' | 'calculadora' | 'juez_te_escucha') => void;
  expedienteSeleccionado: boolean;
  idioma: Idioma;
  onChangeIdioma: (idioma: Idioma) => void;
  onAbrirCrearExpediente?: () => void;
  onAbrirJuezTeEscucha?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  rol,
  nombreUsuario,
  dniUsuario,
  onCerrarSesion,
  altoContraste,
  onToggleAltoContraste,
  vistaActual,
  onChangeVista,
  expedienteSeleccionado,
  idioma,
  onChangeIdioma,
  onAbrirCrearExpediente,
}) => {
  const t = DICCIONARIO[idioma];

  return (
    <header className="border-b border-sky-300 bg-[#0c4a6e] text-white shadow-md sticky top-0 z-40 transition-colors font-arial" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Top Utility Bar */}
      <div className="bg-[#07334e] text-sky-100 text-xs px-4 py-1.5 border-b border-sky-900/60">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-bold tracking-wide">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse"></span>
            <span>Poder Judicial del Perú &bull; Plataforma Oficial de Consulta Judicial &bull; Perú</span>
          </div>

          <div className="flex items-center flex-wrap gap-2 sm:gap-3">
            {/* Language selector */}
            <div className="flex items-center bg-[#0c4a6e] rounded-lg p-0.5 border border-sky-600/60 shadow-2xs">
              <Globe className="w-3.5 h-3.5 text-sky-300 ml-1.5 mr-1" />
              <button
                type="button"
                onClick={() => onChangeIdioma('es')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition cursor-pointer ${
                  idioma === 'es'
                    ? 'bg-white text-[#0c4a6e] shadow-2xs'
                    : 'text-sky-200 hover:text-white'
                }`}
                title="Español"
              >
                ES
              </button>
              <button
                type="button"
                onClick={() => onChangeIdioma('qu')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition cursor-pointer ${
                  idioma === 'qu'
                    ? 'bg-white text-[#0c4a6e] shadow-2xs'
                    : 'text-sky-200 hover:text-white'
                }`}
                title="Quechua (Runasimi)"
              >
                QU
              </button>
              <button
                type="button"
                onClick={() => onChangeIdioma('ay')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition cursor-pointer ${
                  idioma === 'ay'
                    ? 'bg-white text-[#0c4a6e] shadow-2xs'
                    : 'text-sky-200 hover:text-white'
                }`}
                title="Aimara (Aymar aru)"
              >
                AY
              </button>
              <button type="button" onClick={() => onChangeIdioma('en')} title="English" className={`px-2 py-0.5 rounded text-[11px] font-bold transition cursor-pointer ${idioma === 'en' ? 'bg-white text-[#0c4a6e] shadow-2xs' : 'text-sky-200 hover:text-white'}`}>EN</button>
              <button type="button" onClick={() => onChangeIdioma('de')} title="Deutsch" className={`px-2 py-0.5 rounded text-[11px] font-bold transition cursor-pointer ${idioma === 'de' ? 'bg-white text-[#0c4a6e] shadow-2xs' : 'text-sky-200 hover:text-white'}`}>DE</button>
              <button type="button" onClick={() => onChangeIdioma('fr')} title="Français" className={`px-2 py-0.5 rounded text-[11px] font-bold transition cursor-pointer ${idioma === 'fr' ? 'bg-white text-[#0c4a6e] shadow-2xs' : 'text-sky-200 hover:text-white'}`}>FR</button>
            </div>

            {/* High Contrast */}
            <button
              onClick={onToggleAltoContraste}
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-semibold transition border cursor-pointer ${
                altoContraste
                  ? 'bg-yellow-400 text-slate-950 border-yellow-300 font-black'
                  : 'bg-[#0c4a6e] hover:bg-[#0369a1] text-sky-100 border-sky-600'
              }`}
              title={t.altoContraste}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{t.altoContraste}</span>
            </button>

            {/* Session Info */}
            <div className="flex items-center gap-2 pl-2 border-l border-sky-700">
              <span className="text-xs font-semibold text-sky-200 flex items-center gap-1.5">
                {rol === 'editor' ? (
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <User className="w-3.5 h-3.5 text-sky-300" />
                )}
                <span>
                  {rol === 'editor' ? t.servidorJudicialLabel : t.usuarioLabel}
                </span>
                <strong className="text-white uppercase truncate max-w-[180px] sm:max-w-none">{nombreUsuario}</strong>
              </span>

              <button
                onClick={onCerrarSesion}
                className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-2 py-0.5 rounded text-xs font-bold transition ml-1 cursor-pointer"
                title={t.salir}
              >
                <LogOut className="w-3 h-3" />
                <span>{t.salir}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-md border-2 border-slate-200 shrink-0 p-1.5" aria-label="Logotipo del Poder Judicial del Perú">
            <div className="w-full h-full border-2 border-[#8f1838] rounded-md flex flex-col items-center justify-center text-[#8f1838] leading-none">
              <span className="text-xl font-black tracking-tight">PJ</span>
              <span className="text-[5px] font-bold tracking-tight text-center mt-0.5">PODER JUDICIAL</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-xl font-bold tracking-tight text-white uppercase">
                {t.institucion}
              </h1>
              <span className="bg-[#38bdf8] text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded uppercase">
                DIGITAL
              </span>
            </div>
            <p className="text-xs text-sky-100 font-medium">
              {t.subtitulo} &bull; {t.institucion}
            </p>
          </div>
        </div>

        {/* Navigation Tabs and Case Actions */}
        <div className="flex items-center flex-wrap gap-2">
          {rol === 'editor' && onAbrirCrearExpediente && (
            <button
              onClick={onAbrirCrearExpediente}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 shadow transition cursor-pointer border border-amber-300"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t.btnCrearExpediente}</span>
            </button>
          )}

          <nav className="flex items-center flex-wrap gap-1.5 bg-[#07334e] p-1 rounded-xl border border-sky-500/40 shadow-inner">
            <button
              onClick={() => onChangeVista('busqueda')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                vistaActual === 'busqueda'
                  ? 'bg-[#0284c7] text-white shadow'
                  : 'text-sky-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>{t.pestanaBusqueda}</span>
            </button>

            {expedienteSeleccionado && (
              <button
                onClick={() => onChangeVista('expediente')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  vistaActual === 'expediente'
                    ? 'bg-[#0284c7] text-white shadow'
                    : 'text-sky-100 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{t.pestanaExpediente}</span>
              </button>
            )}

            <button
              onClick={() => onChangeVista('calculadora')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                vistaActual === 'calculadora'
                  ? 'bg-[#0284c7] text-white shadow'
                  : 'text-sky-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <CalendarClock className="w-3.5 h-3.5" />
              <span>{t.pestanaCalculadora}</span>
            </button>

            {/* Pestaña ciudadana: EL JUEZ TE ESCUCHA */}
            {rol !== 'editor' && (
              <button
                onClick={() => onChangeVista('juez_te_escucha')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer border ${
                  vistaActual === 'juez_te_escucha'
                    ? 'bg-[#881337] text-white shadow border-rose-300 font-black'
                    : 'bg-[#881337]/80 hover:bg-[#881337] text-rose-100 border-rose-400/50'
                }`}
                title="Sacar cita con el Juez - Módulo El Juez Te Escucha"
              >
                <Scale className="w-3.5 h-3.5 text-rose-200" />
                <span className="uppercase tracking-wider">EL JUEZ TE ESCUCHA</span>
              </button>
            )}

          </nav>
        </div>
      </div>
    </header>
  );
};
