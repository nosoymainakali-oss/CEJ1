import React, { useState } from 'react';
import { Accessibility, BookOpen, FileText, LockKeyhole, X } from 'lucide-react';

type Seccion = 'privacidad' | 'accesibilidad' | 'normativa' | 'condiciones';

const SECCIONES: { id: Seccion; titulo: string; icono: React.ReactNode }[] = [
  { id: 'privacidad', titulo: 'Privacidad y datos', icono: <LockKeyhole className="h-4 w-4" /> },
  { id: 'accesibilidad', titulo: 'Accesibilidad', icono: <Accessibility className="h-4 w-4" /> },
  { id: 'normativa', titulo: 'Marco normativo', icono: <BookOpen className="h-4 w-4" /> },
  { id: 'condiciones', titulo: 'Condiciones de uso', icono: <FileText className="h-4 w-4" /> },
];

export const LegalTransparencyPanel: React.FC = () => {
  const [abierto, setAbierto] = useState(false);
  const [seccion, setSeccion] = useState<Seccion>('privacidad');

  return (
    <>
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 border-t border-white/15 pt-4 text-[11px]">
        <button type="button" onClick={() => { setSeccion('privacidad'); setAbierto(true); }} className="underline underline-offset-4 hover:text-amber-200">Privacidad y datos</button>
        <button type="button" onClick={() => { setSeccion('accesibilidad'); setAbierto(true); }} className="underline underline-offset-4 hover:text-amber-200">Accesibilidad</button>
        <button type="button" onClick={() => { setSeccion('normativa'); setAbierto(true); }} className="underline underline-offset-4 hover:text-amber-200">Marco normativo</button>
        <button type="button" onClick={() => { setSeccion('condiciones'); setAbierto(true); }} className="underline underline-offset-4 hover:text-amber-200">Condiciones de uso</button>
      </div>

      {abierto && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-3 sm:p-6" onMouseDown={(e) => { if (e.target === e.currentTarget) setAbierto(false); }}>
          <section role="dialog" aria-modal="true" aria-labelledby="cej-legal-title" className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-800 shadow-2xl">
            <header className="flex items-start justify-between gap-4 bg-[#172b45] px-5 py-4 text-white sm:px-7">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.18em] text-amber-200">CEJ · Simulador académico independiente</p>
                <h2 id="cej-legal-title" className="mt-1 text-lg font-bold sm:text-xl">Transparencia, privacidad y uso responsable</h2>
              </div>
              <button type="button" onClick={() => setAbierto(false)} aria-label="Cerrar información legal" className="rounded-lg p-2 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300"><X className="h-5 w-5" /></button>
            </header>
            <div className="grid min-h-0 flex-1 md:grid-cols-[220px_1fr]">
              <nav aria-label="Secciones de información legal" className="flex gap-2 overflow-x-auto border-b border-slate-200 bg-slate-50 p-3 md:flex-col md:border-b-0 md:border-r">
                {SECCIONES.map(item => (
                  <button key={item.id} type="button" onClick={() => setSeccion(item.id)} aria-current={seccion === item.id ? 'page' : undefined} className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs font-semibold transition ${seccion === item.id ? 'bg-[#172b45] text-white' : 'text-slate-600 hover:bg-slate-200'}`}>
                    {item.icono}<span>{item.titulo}</span>
                  </button>
                ))}
              </nav>
              <div className="overflow-y-auto p-5 text-sm leading-7 sm:p-7">
                {seccion === 'privacidad' && (
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-slate-900">Aviso de privacidad y tratamiento de información</h3>
                    <p><strong>Naturaleza del entorno.</strong> CEJ es un prototipo académico independiente. No pertenece al Poder Judicial, no cuenta con autorización institucional y no está conectado al SIJ, EJE, CEJ oficial, RENIEC, PIDE, ID GOB.PE ni a casillas electrónicas estatales.</p>
                    <p><strong>Datos de prueba.</strong> Los expedientes, nombres, documentos, magistrados, audiencias y demás registros mostrados son ficticios y se utilizan únicamente para demostración. No ingreses DNI, nombres, domicilios, teléfonos, datos sensibles, escritos, resoluciones ni información de expedientes reales.</p>
                    <p><strong>Almacenamiento y servicios externos.</strong> La aplicación puede conservar preferencias y datos de demostración en el almacenamiento del navegador y sincronizar el estado de prueba con una base de datos alojada en Supabase. Si se utiliza la función de explicación mediante IA, el texto enviado se transmite al proveedor de IA configurado (Google Gemini) para generar una respuesta. Por ello, no cargues documentos ni información personal o reservada.</p>
                    <p><strong>Retención y control.</strong> Los datos de demostración pueden permanecer en el navegador o en los servicios técnicos mientras el entorno esté habilitado. Los documentos de prueba se alojan en Supabase Storage y la aplicación genera enlaces para visualizarlos. Puedes borrar los datos locales desde la configuración de tu navegador. La eliminación local no borra copias que ya hubieran sido sincronizadas en el servidor.</p>
                    <p><strong>Derechos sobre datos personales.</strong> Este prototipo no es un canal institucional para ejercer los derechos de acceso, rectificación, cancelación u oposición. No se ha habilitado una mesa de partes ni un canal oficial de privacidad. Si necesitas realizar una solicitud sobre datos reales, utiliza los canales oficiales de la entidad responsable y no este simulador.</p>
                    <p className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-xs font-semibold leading-5 text-amber-950">Regla esencial: utiliza exclusivamente información ficticia. Las rutas de demostración no implementan autenticación institucional ni controles de acceso aptos para producción. El simulador no ofrece garantías de confidencialidad, reserva judicial ni seguridad para documentos reales.</p>
                  </div>
                )}
                {seccion === 'accesibilidad' && (
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-slate-900">Accesibilidad digital</h3>
                    <p>El prototipo incorpora medidas de accesibilidad: navegación mediante controles nativos, etiquetas en formularios, estados de foco visibles, diseño adaptable a pantallas pequeñas, opción de alto contraste y respeto por la preferencia del sistema de movimiento reducido.</p>
                    <p>Estas medidas constituyen una implementación progresiva y no una certificación de conformidad con WCAG ni una auditoría de accesibilidad. Si encuentras una barrera, puedes reportarla en el repositorio del proyecto, evitando incluir datos personales en el reporte.</p>
                    <p>La información esencial del simulador se ofrece en español. Las traducciones a quechua, aimara y otros idiomas son de apoyo y pueden requerir revisión lingüística.</p>
                  </div>
                )}
                {seccion === 'normativa' && (
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-slate-900">Referencias normativas de diseño</h3>
                    <p>El proyecto toma como referencia académica los principios y materias regulados por las siguientes disposiciones. Su mención no significa que el prototipo sea un servicio digital estatal ni que haya obtenido una certificación de cumplimiento.</p>
                    <ul className="list-disc space-y-2 pl-5">
                      <li><a className="font-semibold text-[#812b3b] underline" href="https://www.leyes.congreso.gob.pe/DetLeyNume_1p.aspx?xNorma=3&xNumero=1412&xTipoNorma=3" target="_blank" rel="noreferrer">Decreto Legislativo N.° 1412</a>, Ley de Gobierno Digital: identidad digital, servicios digitales, interoperabilidad, arquitectura digital, seguridad digital y datos.</li>
                      <li><a className="font-semibold text-[#812b3b] underline" href="https://www.gob.pe/institucion/pcm/normas-legales/1705101-029-2021-pcm" target="_blank" rel="noreferrer">Decreto Supremo N.° 029-2021-PCM</a>, Reglamento de la Ley de Gobierno Digital.</li>
                      <li><a className="font-semibold text-[#812b3b] underline" href="https://busquedas.elperuano.pe/dispositivo/NL/2189166-1" target="_blank" rel="noreferrer">Decreto Supremo N.° 075-2023-PCM</a>, modificatoria del Reglamento.</li>
                      <li><a className="font-semibold text-[#812b3b] underline" href="https://busquedas.elperuano.pe/dispositivo/NL/2423580-2" target="_blank" rel="noreferrer">Decreto Supremo N.° 098-2025-PCM</a>, modificatoria sobre identidad digital, interoperabilidad, datos y documentos electrónicos.</li>
                      <li><a className="font-semibold text-[#812b3b] underline" href="https://www.gob.pe/institucion/anpd/normas-legales/6554453-n-016-2024-jus" target="_blank" rel="noreferrer">Decreto Supremo N.° 016-2024-JUS</a>, Reglamento vigente de la Ley N.° 29733, Ley de Protección de Datos Personales.</li>
                      <li>Texto Único Ordenado de la Ley N.° 27444, Ley del Procedimiento Administrativo General, en lo pertinente al uso de medios y documentos electrónicos por entidades públicas.</li>
                    </ul>
                    <p>Las obligaciones legales concretas dependen de la naturaleza de la entidad, del servicio y del tratamiento de datos. La adecuación de una plataforma estatal requiere evaluación institucional, técnica, de seguridad y de protección de datos.</p>
                  </div>
                )}
                {seccion === 'condiciones' && (
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-slate-900">Condiciones de uso del simulador</h3>
                    <ul className="list-disc space-y-2 pl-5">
                      <li>Uso exclusivamente educativo, demostrativo y de evaluación académica.</li>
                      <li>Los resultados, estados, documentos, plazos y agendas son simulados y no producen efectos procesales ni administrativos.</li>
                      <li>No constituye una mesa de partes, casilla electrónica, sistema de notificaciones, registro oficial ni canal de atención del Poder Judicial.</li>
                      <li>No uses el contenido generado por IA como asesoramiento jurídico, resolución oficial ni cálculo definitivo de un plazo procesal.</li>
                      <li>El acceso «SOY VIP» habilita un rol de editor dentro de la demostración; no acredita identidad, cargo, vínculo laboral ni autorización de servidor público.</li>
                      <li>Queda prohibido cargar información real, reservada, confidencial o protegida por secreto profesional.</li>
                    </ul>
                    <p className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs leading-5">Responsable académico indicado en el proyecto: Eduardo Luismario Medina Humpiri, estudiante de Derecho de la Universidad Nacional del Altiplano de Puno. La Universidad y el Poder Judicial no se presentan como titulares ni patrocinadores institucionales de esta plataforma.</p>
                  </div>
                )}
              </div>
            </div>
            <footer className="flex justify-end border-t border-slate-200 bg-slate-50 px-5 py-3">
              <button type="button" onClick={() => setAbierto(false)} className="rounded-lg bg-[#172b45] px-4 py-2 text-xs font-bold text-white hover:bg-[#294866] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500">Cerrar</button>
            </footer>
          </section>
        </div>
      )}
    </>
  );
};
