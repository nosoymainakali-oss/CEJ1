import React, { useState, useRef } from 'react';
import { Upload, FileText, Image, CheckCircle, AlertCircle, X, ShieldCheck } from 'lucide-react';
import { ArchivoAdjunto } from '../types/judicial';

interface UploadDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGuardar: (nuevoArchivo: ArchivoAdjunto) => void;
  resolucionTitulo?: string;
  nombreEditor: string;
  expedienteId: string;
  resolucionId: string;
}

export const UploadDocumentModal: React.FC<UploadDocumentModalProps> = ({
  isOpen,
  onClose,
  onGuardar,
  resolucionTitulo = 'Resolución Judicial',
  nombreEditor,
  expedienteId,
  resolucionId,
}) => {
  const [nombreArchivo, setNombreArchivo] = useState('');
  const [archivoSeleccionado, setArchivoSeleccionado] = useState<File | null>(null);
  const [tipoArchivo, setTipoArchivo] = useState<'pdf' | 'imagen' | 'doc'>('pdf');
  const [dataUrl, setDataUrl] = useState<string>('');
  const [tamanoTexto, setTamanoTexto] = useState<string>('0 KB');
  const [cargando, setCargando] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setArchivoSeleccionado(file);
    // Suggest clean name based on file
    if (!nombreArchivo) {
      setNombreArchivo(file.name);
    }

    // Determine type
    if (file.type.includes('image')) {
      setTipoArchivo('imagen');
    } else if (file.type.includes('pdf')) {
      setTipoArchivo('pdf');
    } else {
      setTipoArchivo('doc');
    }

    // Size
    const mb = file.size / (1024 * 1024);
    if (mb >= 1) {
      setTamanoTexto(`${mb.toFixed(1)} MB`);
    } else {
      setTamanoTexto(`${Math.round(file.size / 1024)} KB`);
    }

    // Read as Data URL for in-browser viewing
    const reader = new FileReader();
    reader.onload = (event) => {
      setDataUrl((event.target?.result as string) || '');
    };
    reader.readAsDataURL(file);
  };


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!nombreArchivo.trim()) {
    alert('Escribe un nombre para el documento.');
    return;
  }

  if (!archivoSeleccionado) {
    alert('Selecciona un archivo PDF.');
    return;
  }

  if (archivoSeleccionado.type !== 'application/pdf') {
    alert('Por ahora, el sistema solo admite archivos PDF.');
    return;
  }

  if (!expedienteId || !resolucionId) {
    alert('No se pudo identificar el expediente o la resolución.');
    return;
  }

  setCargando(true);

  try {
    const formulario = new FormData();

    formulario.append('archivo', archivoSeleccionado);
    formulario.append('expedienteId', expedienteId);
    formulario.append('resolucionId', resolucionId);
    formulario.append('nombre', nombreArchivo.trim());
    formulario.append('subidoPor', nombreEditor);

    const respuesta = await fetch('/api/documentos', {
      method: 'POST',
      body: formulario,
    });

    const resultado = await respuesta.json();

    if (!respuesta.ok) {
      throw new Error(
        resultado.error || 'No se pudo subir el documento.'
      );
    }

    const nuevo: ArchivoAdjunto = {
      id: resultado.id,
      nombre: resultado.nombre,
      tamano: resultado.tamano,
      tipo: 'pdf',
      dataUrl: resultado.dataUrl,
      fechaSubida: resultado.fechaSubida,
      subidoPor: resultado.subidoPor,
    };

    onGuardar(nuevo);
    setNombreArchivo('');
    setArchivoSeleccionado(null);
    setDataUrl('');
    setTamanoTexto('0 KB');

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    onClose();
  } catch (error) {
    console.error('Error al subir el documento:', error);

    alert(
      error instanceof Error
        ? error.message
        : 'Ocurrió un error al subir el documento.'
    );
  } finally {
    setCargando(false);
  }
};
if (!isOpen) return null;

return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full border border-slate-300 overflow-hidden">
        {/* Modal Header */}
        <div className="bg-[#0f223d] text-white px-5 py-4 flex items-center justify-between border-b border-amber-600/40">
          <div className="flex items-center gap-2.5">
            <Upload className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-serif font-bold text-base tracking-wide">
                SUBIR NUEVO DOCUMENTO JUDICIAL
              </h3>
              <p className="text-[11px] text-slate-300">
                Módulo exclusivo para el Editor: {nombreEditor}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="text-xs text-slate-600 bg-amber-50/70 p-2.5 rounded-lg border border-amber-200 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              Vinculando documento a: <strong>{resolucionTitulo}</strong>
            </span>
          </div>

          {/* File Picker Box */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Seleccionar Archivo (PDF o Imagen de Cédula/Resolución):
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-xl p-5 text-center bg-slate-50 hover:bg-amber-50/20 cursor-pointer transition"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="flex flex-col items-center gap-2">
                <div className="p-3 bg-white rounded-full border border-slate-200 shadow-2xs text-amber-600">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-800">
                    {archivoSeleccionado ? archivoSeleccionado.name : 'Haz clic para explorar o arrastra aquí tu archivo'}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Soporta PDFs judiciales, imágenes PNG/JPG de cédulas y cargos de notificación
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Custom File Name Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Nombre personalizado para el archivo:
            </label>
            <input
              type="text"
              value={nombreArchivo}
              onChange={(e) => setNombreArchivo(e.target.value)}
              placeholder="Ej: Cedula_Notificacion_Sentencia_SINOE.pdf"
              required
              className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              Puedes asignarle el nombre exacto que desees para organizar tu expediente.
            </span>
          </div>

          {/* Document Type Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Tipo de Documento:
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setTipoArchivo('pdf')}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border text-xs font-bold transition ${
                  tipoArchivo === 'pdf'
                    ? 'bg-red-50 border-red-500 text-red-800 shadow-xs'
                    : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-red-600" />
                <span>PDF Judicial</span>
              </button>

              <button
                type="button"
                onClick={() => setTipoArchivo('imagen')}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border text-xs font-bold transition ${
                  tipoArchivo === 'imagen'
                    ? 'bg-blue-50 border-blue-500 text-blue-800 shadow-xs'
                    : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Image className="w-3.5 h-3.5 text-blue-600" />
                <span>Imagen Cédula</span>
              </button>

              <button
                type="button"
                onClick={() => setTipoArchivo('doc')}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border text-xs font-bold transition ${
                  tipoArchivo === 'doc'
                    ? 'bg-slate-100 border-slate-600 text-slate-900 shadow-xs'
                    : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-slate-600" />
                <span>Escrito / Word</span>
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={cargando || !nombreArchivo.trim()}
              className="flex items-center gap-2 px-5 py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-slate-400 text-white font-bold text-xs rounded-lg shadow-sm transition"
            >
              <CheckCircle className="w-4 h-4" />
              <span>{cargando ? 'Subiendo...' : 'Adjuntar Documento'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
