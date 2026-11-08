import React, { useState } from 'react';
import { Bot, X, Send, Sparkles, MessageCircle, Search, CalendarDays, Calculator, Headphones, ArrowUpRight } from 'lucide-react';

type VistaCEJ = 'busqueda' | 'calculadora' | 'juez_te_escucha' | 'agenda_judicial';
type AccionLuimi = { etiqueta: string; vista: VistaCEJ };
type Mensaje = { id: number; autor: 'luimi' | 'usuario'; texto: string; accion?: AccionLuimi };

interface LuimiChatbotProps {
  onNavigate?: (vista: VistaCEJ) => void;
}

const ACCESOS: { etiqueta: string; descripcion: string; vista: VistaCEJ; icono: React.ReactNode }[] = [
  { etiqueta: 'Consultar expedientes', descripcion: 'Buscar por número o por las partes', vista: 'busqueda', icono: <Search className="h-4 w-4" /> },
  { etiqueta: 'Agenda judicial', descripcion: 'Revisar audiencias y diligencias', vista: 'agenda_judicial', icono: <CalendarDays className="h-4 w-4" /> },
  { etiqueta: 'Calcular un plazo', descripcion: 'Abrir la herramienta de cómputo', vista: 'calculadora', icono: <Calculator className="h-4 w-4" /> },
  { etiqueta: 'Atención ciudadana', descripcion: 'Ir a El Juez te Escucha', vista: 'juez_te_escucha', icono: <Headphones className="h-4 w-4" /> },
];

function responder(pregunta: string): { texto: string; accion?: AccionLuimi } {
  const q = pregunta.toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if (/\b(hola|buenas|hey|holi|que tal)\b/.test(q)) {
    return { texto: '¡Hola! Qué gusto tenerte por aquí. Soy Luimi y puedo acompañarte por CEJ. Dime qué estás buscando y lo vemos paso a paso.' };
  }
  if (/\b(agenda|audiencia|diligencia|calendario|fecha)\b/.test(q)) {
    return { texto: '¡Vamos a la agenda! Allí puedes cambiar de mes, filtrar por magistrado y seleccionar un día para revisar las audiencias y diligencias registradas.', accion: { etiqueta: 'Abrir agenda judicial', vista: 'agenda_judicial' } };
  }
  if (/\b(plazo|plazos|dias habiles|dias calendario|vencimiento|computo)\b/.test(q)) {
    return { texto: 'Te acompaño con eso. La calculadora permite realizar ejercicios de cómputo de plazos. Si el caso es real, contrasta el resultado con la norma procesal aplicable y el calendario oficial.', accion: { etiqueta: 'Abrir calculadora de plazos', vista: 'calculadora' } };
  }
  if (/\b(juez|escucha|atencion ciudadana|cita|magistrado)\b/.test(q)) {
    return { texto: 'En «El Juez te Escucha» puedes simular una solicitud de atención ciudadana, identificar al solicitante y revisar la disponibilidad registrada para los magistrados.', accion: { etiqueta: 'Ir a atención ciudadana', vista: 'juez_te_escucha' } };
  }
  if (/\b(expediente|buscar|consulta|consultar|demandante|demandado|nomenclatura)\b/.test(q)) {
    return { texto: 'Desde la consulta puedes buscar por nomenclatura, número y año, o por los datos de las partes. Al abrir un resultado tendrás acceso a sus datos generales y actuaciones.', accion: { etiqueta: 'Ir a consulta de expedientes', vista: 'busqueda' } };
  }
  if (/\b(documento|documentos|pdf|archivo|escrito|actuado|resolucion)\b/.test(q)) {
    return { texto: 'Los documentos se consultan desde el expediente correspondiente. Abre primero un resultado de búsqueda y luego revisa las pestañas de actuaciones procesales y escritos presentados. En modo editor también puedes probar las opciones de carga y gestión.' , accion: { etiqueta: 'Buscar un expediente', vista: 'busqueda' } };
  }
  if (/\b(vip|editar|crear|administrar|permisos)\b/.test(q)) {
    return { texto: 'El acceso VIP es una modalidad de demostración académica que habilita funciones de edición. Las opciones de administración aparecen según el rol de la sesión; evita utilizar este modo con datos personales o expedientes reales.' };
  }
  if (/\b(gracias|genial|perfecto|listo)\b/.test(q)) {
    return { texto: '¡Con gusto! Para eso estoy. Si necesitas encontrar otra herramienta, dime qué quieres hacer y te llevo hasta allí.' };
  }
  return { texto: 'Te leo. Puedo orientarte sobre búsqueda de expedientes, documentos, agenda judicial, cómputo de plazos y atención ciudadana. Si me cuentas qué quieres hacer, te indico el camino más corto.' };
}

export const LuimiChatbot: React.FC<LuimiChatbotProps> = ({ onNavigate }) => {
  const [abierto, setAbierto] = useState(false);
  const [entrada, setEntrada] = useState('');
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    { id: 1, autor: 'luimi', texto: '¡Hola! Soy Luimi, tu compañero de ruta en CEJ. Puedo explicarte las herramientas y llevarte directamente a cada módulo. ¿Qué necesitas hacer hoy?' }
  ]);

  const navegar = (vista: VistaCEJ) => {
    onNavigate?.(vista);
    setAbierto(false);
  };

  const enviar = (texto = entrada) => {
    const limpio = texto.trim();
    if (!limpio) return;
    const respuesta = responder(limpio);
    setMensajes(actual => [
      ...actual,
      { id: actual.length + 1, autor: 'usuario', texto: limpio },
      { id: actual.length + 2, autor: 'luimi', texto: respuesta.texto, accion: respuesta.accion }
    ]);
    setEntrada('');
  };

  return (
    <div className="cej-luimi fixed bottom-5 right-5 z-[70] font-sans">
      {abierto && (
        <section className="mb-3 flex h-[min(620px,calc(100vh-110px))] w-[min(390px,calc(100vw-32px))] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,35,60,.24)]" aria-label="Chat con Luimi">
          <header className="relative overflow-hidden bg-[#172b45] px-5 pb-5 pt-5 text-white">
            <div className="absolute -right-8 -top-10 h-36 w-36 rounded-full border border-white/10" />
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10"><Bot className="h-7 w-7" /></div>
                <div>
                  <div className="flex items-center gap-2"><h2 className="text-lg font-bold">Luimi</h2><span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-100">Disponible</span></div>
                  <p className="text-xs text-slate-300">Asistente de Consulta de Expedientes</p>
                </div>
              </div>
              <button type="button" onClick={() => setAbierto(false)} className="rounded-full p-2 text-white/80 transition hover:bg-white/15 hover:text-white" aria-label="Cerrar chat"><X className="h-5 w-5" /></button>
            </div>
            <p className="relative mt-4 text-xs leading-relaxed text-slate-200">Pregunta con confianza. Puedo orientarte y abrir el módulo que necesitas.</p>
          </header>
          <div className="flex-1 space-y-3 overflow-y-auto bg-[#f5f6f8] px-4 py-4" aria-live="polite">
            {mensajes.map(mensaje => (
              <div key={mensaje.id} className={mensaje.autor === 'usuario' ? 'flex justify-end' : 'flex justify-start'}>
                <div className="max-w-[90%]">
                  <div className={mensaje.autor === 'usuario' ? 'rounded-2xl rounded-br-md bg-[#263f5d] px-3.5 py-3 text-sm leading-relaxed text-white shadow-sm' : 'rounded-2xl rounded-bl-md border border-slate-200 bg-white px-3.5 py-3 text-sm leading-relaxed text-slate-700 shadow-sm'}>
                    {mensaje.texto}
                  </div>
                  {mensaje.accion && <button type="button" onClick={() => navegar(mensaje.accion!.vista)} className="mt-2 inline-flex items-center gap-2 rounded-xl border border-[#9b3445]/25 bg-white px-3 py-2 text-xs font-bold text-[#812b3b] shadow-sm transition hover:bg-[#fbf4f5]">{mensaje.accion.etiqueta}<ArrowUpRight className="h-3.5 w-3.5" /></button>}
                </div>
              </div>
            ))}
            {mensajes.length === 1 && (
              <div className="space-y-2 pt-2">
                <p className="px-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">Accesos rápidos</p>
                {ACCESOS.map(acceso => (
                  <button key={acceso.vista} type="button" onClick={() => navegar(acceso.vista)} className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-3 text-left transition hover:border-[#9b3445]/40 hover:bg-[#fbf7f7]">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f3e9eb] text-[#812b3b]">{acceso.icono}</span>
                    <span className="min-w-0 flex-1"><span className="block text-xs font-bold text-slate-800">{acceso.etiqueta}</span><span className="mt-0.5 block text-[10px] text-slate-500">{acceso.descripcion}</span></span>
                    <ArrowUpRight className="h-4 w-4 text-slate-400" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <form onSubmit={e => { e.preventDefault(); enviar(); }} className="flex items-center gap-2 border-t border-slate-100 bg-white p-3">
            <input value={entrada} onChange={e => setEntrada(e.target.value)} placeholder="Escribe tu consulta..." className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-800 outline-none transition focus:border-[#812b3b] focus:ring-2 focus:ring-rose-100" aria-label="Escribe tu pregunta a Luimi" />
            <button type="submit" disabled={!entrada.trim()} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#812b3b] text-white transition hover:bg-[#68202e] disabled:cursor-not-allowed disabled:opacity-40" aria-label="Enviar mensaje"><Send className="h-4 w-4" /></button>
          </form>
          <div className="bg-white pb-3 text-center text-[9px] font-medium tracking-wide text-slate-400">LUIMI · ASISTENTE DE SIMULACIÓN ACADÉMICA</div>
        </section>
      )}
      <div className="flex justify-end">
        <button type="button" onClick={() => setAbierto(v => !v)} className="group flex items-center gap-3 rounded-full border border-white/20 bg-[#172b45] py-2 pl-2 pr-5 text-white shadow-[0_12px_34px_rgba(16,43,70,.3)] transition duration-300 hover:-translate-y-1 hover:bg-[#263f5d]" aria-label={abierto ? 'Cerrar Luimi' : 'Abrir Luimi'}>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20"><Sparkles className="h-5 w-5" /></span>
          <span className="text-left"><span className="block text-sm font-bold">¿Te ayudo?</span><span className="block text-[10px] text-slate-300">Conversa con Luimi</span></span>
          <MessageCircle className="h-4 w-4 text-slate-300 transition group-hover:scale-110" />
        </button>
      </div>
    </div>
  );
};
