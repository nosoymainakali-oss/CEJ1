import React from 'react';
import { X, Download, FileText, ExternalLink, Printer, Scale, CheckCircle } from 'lucide-react';
import { ArchivoAdjunto } from '../types/judicial';

interface ViewDocumentModalProps {
  archivo: ArchivoAdjunto | null;
  onClose: () => void;
  expedienteNumero?: string;
}

export const ViewDocumentModal: React.FC<ViewDocumentModalProps> = ({
  archivo,
  onClose,
  expedienteNumero = '01420-2024-0-1801-JR-CI-05',
}) => {
  if (!archivo) return null;

  const esImagen = archivo.tipo === 'imagen' || archivo.nombre.match(/\.(jpg|jpeg|png|webp|gif)$/i);
  const esPdf = archivo.tipo === 'pdf' || archivo.nombre.endsWith('.pdf');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full h-[90vh] flex flex-col border border-slate-300 overflow-hidden">
        {/* Header */}
        <div className="bg-[#0f223d] text-white px-5 py-3.5 flex items-center justify-between border-b border-amber-600/40 shrink-0">
          <div className="flex items-center gap-2.5 truncate">
            <div className="p-1.5 bg-amber-600 rounded">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <div className="truncate">
              <h3 className="font-serif font-bold text-sm sm:text-base tracking-wide truncate">
                {archivo.nombre}
              </h3>
              <p className="text-[11px] text-slate-300">
                Expediente: {expedienteNumero} &bull; {archivo.tamano}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={archivo.dataUrl || '#'}
              download={archivo.nombre}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded shadow-sm transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Descargar</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-300 hover:text-white rounded hover:bg-slate-800 transition"
              title="Cerrar visor"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Viewer Content */}
        <div className="flex-1 bg-slate-100 overflow-auto p-4 flex items-center justify-center">
          {archivo.dataUrl ? (
            esImagen ? (
              <img
                src={archivo.dataUrl}
                alt={archivo.nombre}
                className="max-w-full max-h-full object-contain rounded-lg shadow-md border border-slate-300 bg-white"
              />
            ) : (
              <iframe
                src={archivo.dataUrl}
                title={archivo.nombre}
                className="w-full h-full rounded-lg border border-slate-300 bg-white"
              />
            )
          ) : (
            // Realistic Formal Judicial Document Viewport
            <div className="bg-white max-w-2xl w-full p-8 sm:p-12 shadow-lg border border-slate-300 rounded-lg text-slate-900 font-serif leading-relaxed text-sm space-y-6">
              {/* Judicial Header of Document */}
              <div className="text-center border-b-2 border-slate-800 pb-4 space-y-1">
                <div className="flex justify-center mb-1">
                  <div className="w-10 h-10 rounded-full border-2 border-amber-700 flex items-center justify-center text-amber-800">
                    <Scale className="w-6 h-6" />
                  </div>
                </div>
                <h4 className="font-serif font-black text-base uppercase tracking-widest text-slate-900">
                  PODER JUDICIAL DEL PERÚ
                </h4>
                <p className="text-xs uppercase tracking-wider text-slate-700 font-sans">
                  CORTE SUPERIOR DE JUSTICIA DE LIMA &bull; EXP. {expedienteNumero}
                </p>
                <div className="text-[11px] font-sans text-slate-500 font-mono">
                  DOCUMENTO JUDICIAL ELECTRÓNICO FIRMADO DIGITALMENTE
                </div>
              </div>

              {/* Title & Document Meta */}
              <div className="bg-slate-50 p-3 rounded border border-slate-200 text-xs font-sans space-y-1">
                <div className="flex justify-between">
                  <span className="font-bold text-slate-700">DOCUMENTO:</span>
                  <span className="font-mono text-slate-900 font-bold">{archivo.nombre}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-700">FECHA DE REGISTRO:</span>
                  <span className="text-slate-900">{archivo.fechaSubida}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-700">ESTADO DE CERTIFICACIÓN:</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Firma Digital Validada (RENIEC / PJ)
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="font-serif text-slate-800 space-y-4 text-justify text-xs sm:text-sm">
                <p>
                  <strong>CERTIFICACIÓN DE INGRESO AL EXPEDIENTE JUDICIAL ELECTRÓNICO:</strong>
                </p>
                <p>
                  Doy fe que el presente documento digitalizado corresponde fielmente al proveído recaído en el proceso principal, habiéndose verificado la integridad de los metadatos y la foliatura respectiva en el Sistema Integrado de Justicia (SIJ).
                </p>
                <p>
                  La cédula de notificación electrónica y sus anexos han sido remitidos válidamente a las casillas electrónicas designadas por los letrados apersonados, computándose los plazos de conformidad con el Art. 155-C del Texto Único Ordenado de la Ley Orgánica del Poder Judicial.
                </p>
              </div>

              {/* Digital Signature Seal */}
              <div className="pt-6 border-t border-slate-300 flex flex-col sm:flex-row items-center justify-between text-xs font-sans gap-4">
                <div className="border border-emerald-500 bg-emerald-50/50 p-2.5 rounded text-[11px] text-emerald-950 w-full sm:w-auto">
                  <div className="font-bold text-emerald-900 mb-0.5">🔒 FIRMA DIGITAL VÁLIDA</div>
                  <div>Secretario Judicial &bull; Mesa de Partes Electrónica</div>
                  <div className="font-mono text-[9px] text-slate-500">Hash: 8A7B9F12DE09AC33458F...</div>
                </div>

                <div className="text-center sm:text-right">
                  <div className="font-serif font-bold text-slate-800">Corte Superior de Justicia</div>
                  <div className="text-[10px] text-slate-500">República del Perú</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-200 px-5 py-2.5 border-t border-slate-300 flex items-center justify-between text-xs text-slate-600 shrink-0">
          <span>Visor de Documentos Oficiales del Sistema CEJ</span>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1 text-slate-700 hover:text-slate-900 font-medium"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir Vista</span>
          </button>
        </div>
      </div>
    </div>
  );
};
