import React from 'react';
import { Scale, GraduationCap, Award, ShieldAlert } from 'lucide-react';
import { Idioma } from '../types/judicial';
import { DICCIONARIO } from '../utils/i18n';

interface FooterProps {
  idioma?: Idioma;
}

export const Footer: React.FC<FooterProps> = ({ idioma = 'es' }) => {
  const t = DICCIONARIO[idioma];

  return (
    <footer className="mt-16 bg-[#0c4a6e] text-white border-t-4 border-[#38bdf8] shadow-2xl font-arial text-xs" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Top Academic Attribution Ribbon */}
      <div className="bg-[#0369a1] py-5 px-4 border-b border-sky-400/40">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 text-sky-200 rounded-xl border border-sky-300/40 shrink-0">
              <GraduationCap className="w-8 h-8 text-sky-200" />
            </div>
            <div>
              <span className="text-[11px] tracking-widest text-sky-200 uppercase font-bold block mb-0.5">
                {t.gobiernoDigital}
              </span>
              <p className="text-sm sm:text-base font-bold text-white leading-snug">
                {t.trabajoPerteneciente}
                <span className="underline decoration-sky-300 decoration-2 underline-offset-4 text-sky-100">
                  Eduardo Luismario Medina Humpiri
                </span>
                {t.estudianteDe}
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 bg-[#0c4a6e] px-4 py-2 rounded-xl border border-sky-300/50 text-xs text-sky-100 font-bold shrink-0">
            <Award className="w-4 h-4 text-sky-300" />
            <span>UNA PUNO &bull; DERECHO</span>
          </div>
        </div>
      </div>

      {/* Main Legal Disclaimer */}
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <div className="bg-[#07334e] rounded-xl p-5 border border-sky-300/40 shadow-inner">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-sky-300 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold text-xs uppercase tracking-wider text-sky-200">
                {t.descargoTitulo}
              </h4>
              <p className="text-xs sm:text-sm text-sky-50 leading-relaxed font-medium">
                {t.disclaimer}
              </p>
              <p className="text-[11px] text-sky-200/80 leading-relaxed pt-1">
                {t.descripcionProyecto}
              </p>
            </div>
          </div>
        </div>

        {/* Identificación Institucional y Académica */}
        <div className="pt-2 border-t border-sky-800 text-center">
          <p className="text-xs text-sky-200 leading-relaxed">
            {t.identificacionInstitucional}
          </p>
        </div>

        {/* Bottom Credits */}
        <div className="pt-4 border-t border-sky-800 text-[11px] text-sky-300 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div>
            &copy; {new Date().getFullYear()} Sistema Judicial Digital &bull; Autor:{' '}
            <strong className="text-white">Eduardo Luismario Medina Humpiri</strong> (UNA Puno).
          </div>
          <div className="text-sky-200">
            {t.creditosAcademicos}
          </div>
        </div>
      </div>
    </footer>
  );
};
