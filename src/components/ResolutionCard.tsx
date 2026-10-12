import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  CalendarClock, 
  Paperclip, 
  Upload, 
  Trash2, 
  Edit3, 
  Globe, 
  Lock,
  Download,
  Eye,
  RefreshCw,
  HelpCircle
} from 'lucide-react';
import { Resolucion, RolUsuario, ArchivoAdjunto } from '../types/judicial';
import { BarcodeAndQr } from './BarcodeAndQr';

interface ResolutionCardProps {
  resolucion: Resolucion;
  expedienteNumero: string;
  materia: string;
  rol: RolUsuario;
  onEditarResolucion?: (res: Resolucion) => void;
  onEliminarResolucion?: (resId: string) => void;
  onSubirArchivo?: (resId: string) => void;
  onRenombrarArchivo?: (resId: string, archId: string, nuevoNombre: string) => void;
  onEliminarArchivo?: (resId: string, archId: string) => void;
  onReanalizarIA?: (res: Resolucion) => Promise<void>;
  onVerArchivo?: (archivo: ArchivoAdjunto) => void;
}

export const ResolutionCard: React.FC<ResolutionCardProps> = ({
  resolucion,
  expedienteNumero,
  materia,
  rol,
  onEditarResolucion,
  onEliminarResolucion,
  onSubirArchivo,
  onRenombrarArchivo,
  onEliminarArchivo,
  onReanalizarIA,
  onVerArchivo,
}) => {
  const [activeTab, setActiveTab] = useState<'resumen' | 'quechua' | 'aimara' | 'texto' | 'archivos'>('resumen');
  const [editandoArchivoId, setEditandoArchivoId] = useState<string | null>(null);
  const [nombreArchivoTemp, setNombreArchivoTemp] = useState<string>('');
  const [cargandoIA, setCargandoIA] = useState(false);

  const handleReanalizar = async () => {
    if (!onReanalizarIA) return;
    setCargandoIA(true);
    try {
      await onReanalizarIA(resolucion);
    } finally {
      setCargandoIA(false);
    }
  };

  const iniciarRenombrar = (arch: ArchivoAdjunto) => {
    setEditandoArchivoId(arch.id);
    setNombreArchivoTemp(arch.nombre);
  };

  const guardarNuevoNombre = (archId: string) => {
    if (onRenombrarArchivo && nombreArchivoTemp.trim()) {
      onRenombrarArchivo(resolucion.id, archId, nombreArchivoTemp.trim());
    }
    setEditandoArchivoId(null);
  };

  // Badge styling per resolution type
  const getBadgeStyle = () => {
    switch (resolucion.tipo) {
      case 'SENTENCIA':
        return 'bg-[#0369a1] text-white border-sky-600 shadow-sm';
      case 'AUTO':
        return 'bg-[#0284c7] text-white border-sky-500 shadow-sm';
      case 'DECRETO':
        return 'bg-[#0c4a6e] text-white border-sky-800 shadow-sm';
      default:
        return 'bg-[#0284c7] text-white border-sky-400 shadow-sm';
    }
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-sky-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden mb-6 font-arial" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Resolution Header */}
      <div className="bg-sky-50/80 px-4 sm:px-6 py-3.5 border-b border-sky-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center flex-wrap gap-2.5">
          <span className="font-bold text-sm sm:text-base text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-sky-300 shadow-2xs">
            ACTUADO N° {String(resolucion.numero).padStart(2, '0')}
          </span>

          <span className={`px-2.5 py-1 rounded-md text-xs font-bold tracking-wider uppercase border ${getBadgeStyle()}`}>
            {resolucion.tipo}
          </span>

          <span className="text-xs text-slate-600 font-medium">
            Fojas: <strong>{resolucion.fojas || '—'}</strong>
          </span>
        </div>

        {/* Date stamps */}
        <div className="flex items-center flex-wrap gap-2 text-xs">
          <div className="text-slate-600 bg-white px-2.5 py-1 rounded border border-slate-200 shadow-2xs">
            <span>Resolución: <strong>{resolucion.fechaResolucion}</strong></span>
          </div>

          <div className="text-[#0369a1] bg-sky-50 px-2.5 py-1 rounded border border-sky-200 font-semibold shadow-2xs flex items-center gap-1.5">
            <span>
              {resolucion.tipoNotificacion === 'fisica' ? 'Notif. Física (Cédula):' : 'Notif. Electrónica (SINOE):'}
            </span>
            <strong>{resolucion.fechaNotificacion}</strong>
          </div>
        </div>
      </div>

      {/* Sumilla / Official Title */}
      <div className="px-4 sm:px-6 py-3 bg-amber-50/40 border-b border-amber-100">
        <h3 className="font-serif font-bold text-sm sm:text-base text-slate-900 mb-1">
          {resolucion.titulo}
        </h3>
        <p className="text-xs text-slate-700 leading-relaxed font-sans mb-3">
          <strong>Sumilla oficial:</strong> {resolucion.sumilla}
        </p>

        {/* Automatic Barcode and QR Code generated for this Actuado */}
        {resolucion.ccv && (
          <div className="mb-3 flex flex-wrap items-center gap-2 rounded-lg border border-sky-200 bg-white px-3 py-2 text-xs">
            <span className="font-bold uppercase tracking-wide text-slate-600">CCV:</span>
            <span className="font-mono font-bold text-[#0c4a6e]">{resolucion.ccv}</span>
          </div>
        )}
        <BarcodeAndQr
          codigoTexto={resolucion.codigoBarras || `PJ-${expedienteNumero}-${String(resolucion.numero).padStart(3, '0')}`}
          qrData={
            resolucion.codigoQRData ||
            `PJ-PERU|EXP:${expedienteNumero}|ACTUADO:${resolucion.numero}|${resolucion.titulo}`
          }
          tituloActuado={resolucion.titulo}
        />
      </div>

      {/* Navigation Tabs */}
      <div className="bg-slate-100 px-4 sm:px-6 border-b border-slate-200 flex flex-wrap gap-1">
        <button
          onClick={() => setActiveTab('resumen')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold transition border-b-2 ${
            activeTab === 'resumen'
              ? 'border-[#0284c7] text-[#0369a1] bg-white'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#0284c7]" />
          <span>Resumen:</span>
        </button>

        <button
          onClick={() => setActiveTab('quechua')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold transition border-b-2 ${
            activeTab === 'quechua'
              ? 'border-[#0284c7] text-[#0369a1] bg-white'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Globe className="w-3.5 h-3.5 text-red-700" />
          <span>Quechua</span>
        </button>

        <button
          onClick={() => setActiveTab('aimara')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold transition border-b-2 ${
            activeTab === 'aimara'
              ? 'border-[#0284c7] text-[#0369a1] bg-white'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Globe className="w-3.5 h-3.5 text-emerald-700" />
          <span>Aimara</span>
        </button>

        <button
          onClick={() => setActiveTab('texto')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold transition border-b-2 ${
            activeTab === 'texto'
              ? 'border-[#0284c7] text-[#0369a1] bg-white'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileText className="w-3.5 h-3.5 text-slate-600" />
          <span>Texto Oficial</span>
        </button>

        <button
          onClick={() => setActiveTab('archivos')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold transition border-b-2 ${
            activeTab === 'archivos'
              ? 'border-[#0284c7] text-[#0369a1] bg-white'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Paperclip className="w-3.5 h-3.5 text-slate-600" />
          <span>Documentos</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="p-4 sm:p-6">
        {/* TAB 1: RESUMEN */}
        {activeTab === 'resumen' && (
          <div className="space-y-4 animate-in fade-in duration-150 font-arial">
            {/* Box: Resumen */}
            <div className="bg-sky-50/70 p-4 rounded-xl border border-sky-200">
              <h4 className="font-bold text-[#0369a1] text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0284c7]"></span>
                Resumen:
              </h4>
              <p className="text-sm text-slate-800 leading-relaxed">
                {resolucion.resumenSencillo.enCristiano}
              </p>
            </div>

            {/* Box: Términos jurídicos aclarados */}
            {resolucion.resumenSencillo.terminosExplicados?.length > 0 && (
              <div className="pt-1">
                <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-sky-700" />
                  <span>Definición de Conceptos Procesales:</span>
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {resolucion.resumenSencillo.terminosExplicados.map((item, i) => (
                    <div key={i} className="bg-white p-3 rounded-lg border border-sky-200 text-xs shadow-2xs">
                      <strong className="text-[#0369a1] block font-bold mb-0.5">{item.termino}:</strong>
                      <span className="text-slate-600">{item.significado}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Re-analyze trigger */}
            {onReanalizarIA && (
              <div className="pt-1 flex justify-end">
                <button
                  type="button"
                  onClick={handleReanalizar}
                  disabled={cargandoIA}
                  className="flex items-center gap-1.5 text-xs text-[#0369a1] hover:text-[#0c4a6e] font-bold bg-sky-50 hover:bg-sky-100 px-3 py-1.5 rounded-lg border border-sky-300 transition"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${cargandoIA ? 'animate-spin' : ''}`} />
                  <span>{cargandoIA ? 'Actualizando...' : 'Actualizar Síntesis'}</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: EXPLICACIÓN EN QUECHUA */}
        {activeTab === 'quechua' && (
          <div className="bg-red-50/40 p-5 rounded-xl border border-red-200 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-red-700" />
                <h4 className="font-serif font-bold text-red-950 text-base">
                  Runasimipi Willakuy (Explicación en Quechua)
                </h4>
              </div>
              <span className="text-xs text-red-800 bg-red-100 px-2 py-0.5 rounded font-semibold">
                Accesibilidad Lingüística
              </span>
            </div>

            <p className="text-sm sm:text-base text-slate-900 leading-relaxed font-sans bg-white p-4 rounded-lg border border-red-200 shadow-2xs">
              {resolucion.resumenSencillo.explicacionQuechua}
            </p>

            <div className="text-xs text-slate-600 bg-white/80 p-3 rounded-lg border border-red-100">
              <strong>Nota de inclusión:</strong> El Poder Judicial del Perú garantiza la justicia intercultural para comunidades quechuahablantes conforme al Convenio 169 de la OIT y la Ley de Lenguas Originarias.
            </div>
          </div>
        )}

        {/* TAB 3: EXPLICACIÓN EN AIMARA */}
        {activeTab === 'aimara' && (
          <div className="bg-emerald-50/40 p-5 rounded-xl border border-emerald-200 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-emerald-700" />
                <h4 className="font-serif font-bold text-emerald-950 text-base">
                  Aymar aruta yatiyawipa (Explicación en Aimara)
                </h4>
              </div>
              <span className="text-xs text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-semibold">
                Accesibilidad Lingüística
              </span>
            </div>

            <p className="text-sm sm:text-base text-slate-900 leading-relaxed font-sans bg-white p-4 rounded-lg border border-emerald-200 shadow-2xs">
              {resolucion.resumenSencillo.explicacionAimara}
            </p>

            <div className="text-xs text-slate-600 bg-white/80 p-3 rounded-lg border border-emerald-100">
              <strong>Nota de inclusión:</strong> Garantía de comprensión de actos resolutivos y plazos perentorios para la población de la región del Altiplano y aimarahablante.
            </div>
          </div>
        )}

        {/* TAB 4: TEXTO JUDICIAL OFICIAL */}
        {activeTab === 'texto' && (
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-300 space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-200 pb-2">
              <span>EXPEDIENTE: {expedienteNumero}</span>
              <span>MATERIA: {materia}</span>
            </div>
            <div className="font-mono text-xs sm:text-sm text-slate-800 whitespace-pre-wrap leading-relaxed bg-white p-4 rounded-lg border border-slate-200 shadow-inner max-h-96 overflow-y-auto">
              {resolucion.contenidoCompleto}
            </div>
          </div>
        )}

        {/* TAB 5: DOCUMENTOS Y ARCHIVOS ADJUNTOS */}
        {activeTab === 'archivos' && (
          <div className="space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between">
              <h4 className="font-serif font-bold text-slate-900 text-sm">
                Documentos Digitales del Proveído Judicial
              </h4>

              {/* EDITOR ONLY: Subir archivo */}
              {rol === 'editor' ? (
                <button
                  type="button"
                  onClick={() => onSubirArchivo && onSubirArchivo(resolucion.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg shadow-sm transition cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Subir PDF / Imagen</span>
                </button>
              ) : (
                <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-1 rounded border border-slate-200 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-slate-400" />
                  Solo Lectura (Modo Ciudadano)
                </span>
              )}
            </div>

            {resolucion.archivosAdjuntos.length === 0 ? (
              <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-slate-500 text-xs">
                No hay documentos adjuntos a esta resolución.
              </div>
            ) : (
              <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden bg-white">
                {resolucion.archivosAdjuntos.map((arch) => (
                  <div
                    key={arch.id}
                    className="p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-slate-50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-100 text-red-700 rounded-lg">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        {editandoArchivoId === arch.id ? (
                          <div className="flex items-center gap-1.5">
                            <input
                              type="text"
                              value={nombreArchivoTemp}
                              onChange={(e) => setNombreArchivoTemp(e.target.value)}
                              className="text-xs font-bold px-2 py-1 border border-amber-500 rounded bg-white"
                              autoFocus
                            />
                            <button
                              onClick={() => guardarNuevoNombre(arch.id)}
                              className="text-xs bg-emerald-600 text-white px-2 py-1 rounded font-bold"
                            >
                              Guardar
                            </button>
                            <button
                              onClick={() => setEditandoArchivoId(null)}
                              className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded"
                            >
                              Cancelar
                            </button>
                          </div>
                        ) : (
                          <h5 className="font-semibold text-xs sm:text-sm text-slate-900">
                            {arch.nombre}
                          </h5>
                        )}
                        <p className="text-[11px] text-slate-500">
                          {arch.tamano} &bull; Subido el: {arch.fechaSubida}
                          {arch.subidoPor && ` por ${arch.subidoPor}`}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1.5 self-end sm:self-center">
                      {/* View document button */}
                      <button
                        type="button"
                        onClick={() => onVerArchivo && onVerArchivo(arch)}
                        className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded border border-slate-300 transition"
                        title="Ver documento en pantalla"
                      >
                        <Eye className="w-3.5 h-3.5 text-blue-700" />
                        <span>Ver</span>
                      </button>

                      {/* Download */}
                      <a
                        href={arch.dataUrl || arch.url || '#'}
                        download={arch.nombre}
                        className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded border border-slate-300 transition"
                        title="Descargar archivo"
                      >
                        <Download className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Descargar</span>
                      </a>

                      {/* EDITOR ONLY: Rename & Delete */}
                      {rol === 'editor' && (
                        <>
                          <button
                            type="button"
                            onClick={() => iniciarRenombrar(arch)}
                            className="p-1.5 hover:bg-slate-200 text-slate-600 hover:text-amber-800 rounded transition"
                            title="Renombrar archivo (Editor)"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => onEliminarArchivo && onEliminarArchivo(resolucion.id, arch.id)}
                            className="p-1.5 hover:bg-red-100 text-slate-600 hover:text-red-700 rounded transition"
                            title="Eliminar archivo (Editor)"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Servidor Judicial Controls Footer */}
      {rol === 'editor' && (
        <div className="bg-sky-50/80 px-4 sm:px-6 py-2.5 border-t border-sky-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="text-[#0369a1] font-semibold flex items-center gap-1.5">
            <Edit3 className="w-3.5 h-3.5 text-[#0284c7]" />
            Acciones del Servidor Judicial
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onEditarResolucion && onEditarResolucion(resolucion)}
              className="px-3 py-1 bg-white hover:bg-slate-100 text-slate-800 font-semibold rounded border border-slate-300 shadow-2xs transition"
            >
              Editar Sumilla / Texto
            </button>

            <button
              type="button"
              onClick={() => onEliminarResolucion && onEliminarResolucion(resolucion.id)}
              className="px-3 py-1 bg-red-50 hover:bg-red-100 text-red-700 font-semibold rounded border border-red-200 shadow-2xs transition"
            >
              Eliminar Resolución
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
