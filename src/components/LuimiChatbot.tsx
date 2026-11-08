import React, { useMemo, useState } from 'react';
import { Bot, X, Send, Sparkles, MessageCircle, Scale, CalendarDays, FileSearch, Minimize2 } from 'lucide-react';

type Mensaje = { id: number; autor: 'luimi' | 'usuario'; texto: string };

const RESPUESTAS: { claves: string[]; respuesta: string }[] = [
  { claves: ['expediente', 'buscar', 'consulta', 'consultar'], respuesta: '¡Claro! En «Consulta de expedientes» puedes buscar por número de expediente y revisar sus datos generales, estado procesal, actuaciones y documentos asociados.' },
  { claves: ['agenda', 'audiencia', 'fecha', 'calendario', 'cita'], respuesta: 'La Agenda Judicial reúne las audiencias y diligencias programadas. Puedes cambiar de vista, revisar fechas y consultar las actividades registradas por magistrado.' },
  { claves: ['documento', 'pdf', 'archivo', 'escrito', 'actuado'], respuesta: 'Dentro de un expediente encontrarás las actuaciones procesales y los escritos presentados. En el modo de demostración también puedes probar la carga y visualización de archivos.' },
  { claves: ['plazo', 'calculadora', 'días', 'dias'], respuesta: 'La calculadora de plazos te ayuda a realizar ejercicios académicos de cómputo de fechas. Recuerda verificar siempre las reglas procesales aplicables al caso real.' },
  { claves: ['vip', 'administrar', 'editar', 'crear', 'subir'], respuesta: 'El modo VIP es un acceso de demostración académica que habilita las herramientas de edición, creación y administración disponibles en el simulador.' },
  { claves: ['juez', 'escucha', 'magistrado'], respuesta: 'En «El Juez te Escucha» puedes simular una solicitud de atención ciudadana, seleccionar un magistrado y revisar la disponibilidad de agenda.' },
  { claves: ['hola', 'buenas', 'hey', 'holi'], respuesta: '¡Holaaa! Soy Luimi, tu asistente de CEJ. ¿Qué necesitas encontrar hoy? Estoy aquí para orientarte.' },
  { claves: ['gracias', 'genial', 'perfecto'], respuesta: '¡De nada! Para eso estoy. Si te pierdes por CEJ, escríbeme y te echo una mano.' },
];

const sugerencias = ['¿Cómo consulto un expediente?', '¿Dónde veo la agenda?', '¿Cómo reviso los documentos?'];

function responder(pregunta: string): string {
  const texto = pregunta.toLocaleLowerCase('es');
  const coincidencia = RESPUESTAS.find(item => item.claves.some(clave => texto.includes(clave)));
  return coincidencia?.respuesta ?? 'Mmm, todavía estoy aprendiendo algunos detalles de esa consulta. Por ahora puedo orientarte sobre expedientes, agenda judicial, documentos, plazos y las funciones del simulador. ¿Probamos con alguno de esos temas?';
}

export const LuimiChatbot: React.FC = () => {
  const [abierto, setAbierto] = useState(false);
  const [entrada, setEntrada] = useState('');
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    { id: 1, autor: 'luimi', texto: '¡Hola! Soy Luimi, el asistente de CEJ. ✨\nPuedo ayudarte a recorrer la plataforma y explicarte sus herramientas. ¿Qué te gustaría hacer?' }
  ]);
  const contador = useMemo(() => mensajes.length + 1, [mensajes.length]);

  const enviar = (texto = entrada) => {
    const limpio = texto.trim();
    if (!limpio) return;
    setMensajes(actual => [
      ...actual,
      { id: contador, autor: 'usuario', texto: limpio },
      { id: contador + 1, autor: 'luimi', texto: responder(limpio) }
    ]);
    setEntrada('');
  };

  return (
    <div className="fixed bottom-5 right-5 z-[70] font-sans">
      {abierto && (
        <section className="mb-3 flex h-[min(590px,calc(100vh-110px))] w-[min(380px,calc(100vw-32px))] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,35,60,.24)]" aria-label="Chat con Luimi">
          <header className="relative overflow-hidden bg-gradient-to-br from-[#102b46] via-[#164766] to-[#1d7185] px-5 pb-5 pt-5 text-white">
            <div className="absolute -right-8 -top-10 h-36 w-36 rounded-full border border-white/10" />
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/15 shadow-inner"><Bot className="h-7 w-7" /></div>
                <div><div className="flex items-center gap-2"><h2 className="text-lg font-bold">Luimi</h2><span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-100">En línea</span></div><p className="text-xs text-sky-100">Asistente virtual de CEJ</p></div>
              </div>
              <button type="button" onClick={() => setAbierto(false)} className="rounded-full p-2 text-white/80 transition hover:bg-white/15 hover:text-white" aria-label="Cerrar chat"><X className="h-5 w-5" /></button>
            </div>
            <p className="relative mt-4 text-xs leading-relaxed text-sky-50/90">¡Pregúntame lo que quieras! Te ayudo a moverte por el simulador.</p>
          </header>
          <div className="flex-1 space-y-3 overflow-y-auto bg-[#f5f8fb] px-4 py-4">
            {mensajes.map(mensaje => (
              <div key={mensaje.id} className={mensaje.autor === 'usuario' ? 'flex justify-end' : 'flex justify-start'}>
                <div className={mensaje.autor === 'usuario' ? 'max-w-[86%] rounded-2xl rounded-br-md bg-[#176b87] px-3.5 py-3 text-sm leading-relaxed text-white shadow-sm' : 'max-w-[88%] rounded-2xl rounded-bl-md border border-slate-200 bg-white px-3.5 py-3 text-sm leading-relaxed text-slate-700 shadow-sm'}>
                  {mensaje.texto}
                </div>
              </div>
            ))}
            {mensajes.length === 1 && <div className="space-y-2 pt-2">{sugerencias.map(s => <button key={s} type="button" onClick={() => enviar(s)} className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-left text-xs font-semibold text-slate-600 transition hover:border-sky-300 hover:bg-sky-50">{s}</button>)}</div>}
          </div>
          <form onSubmit={e => { e.preventDefault(); enviar(); }} className="flex items-center gap-2 border-t border-slate-100 bg-white p-3">
            <input value={entrada} onChange={e => setEntrada(e.target.value)} placeholder="Escribe tu pregunta..." className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100" aria-label="Escribe tu pregunta a Luimi" />
            <button type="submit" disabled={!entrada.trim()} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#176b87] text-white transition hover:bg-[#102b46] disabled:cursor-not-allowed disabled:opacity-40" aria-label="Enviar mensaje"><Send className="h-4 w-4" /></button>
          </form>
          <div className="bg-white pb-3 text-center text-[9px] font-medium tracking-wide text-slate-400">LUIMI · ASISTENTE DE SIMULACIÓN ACADÉMICA</div>
        </section>
      )}
      <div className="flex justify-end">
        <button type="button" onClick={() => setAbierto(v => !v)} className="group flex items-center gap-3 rounded-full border border-white/20 bg-gradient-to-r from-[#102b46] to-[#176b87] py-2 pl-2 pr-5 text-white shadow-[0_12px_34px_rgba(16,43,70,.3)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(16,43,70,.38)]" aria-label={abierto ? 'Cerrar Luimi' : 'Abrir Luimi'}>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25"><Sparkles className="h-5 w-5" /></span>
          <span className="text-left"><span className="block text-sm font-bold">¿Necesitas ayuda?</span><span className="block text-[10px] text-sky-100">Conversa con Luimi</span></span>
          <MessageCircle className="h-4 w-4 text-sky-100 transition group-hover:scale-110" />
        </button>
      </div>
    </div>
  );
};
