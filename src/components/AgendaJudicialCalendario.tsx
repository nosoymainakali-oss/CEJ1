import React, { useMemo, useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, Settings2 } from 'lucide-react';
import { DiligenciaAgenda, Idioma } from '../types/judicial';
import { DICCIONARIO } from '../utils/i18n';

interface Props {
  agenda: DiligenciaAgenda[];
  idioma: Idioma;
  esEditor?: boolean;
  onAdministrar?: () => void;
}

const textos = {
  es: { todos: 'Todos los magistrados', magistrado: 'Magistrado', hoy: 'Hoy', anterior: 'Mes anterior', siguiente: 'Mes siguiente', elegirDia: 'Seleccione un día para ver su detalle.', delMes: 'Diligencias del mes', expediente: 'Expediente', mas: 'más', leyenda: 'Magistrados' },
  en: { todos: 'All judges', magistrado: 'Judge', hoy: 'Today', anterior: 'Previous month', siguiente: 'Next month', elegirDia: 'Select a day to see its details.', delMes: 'Events this month', expediente: 'Case', mas: 'more', leyenda: 'Judges' },
  de: { todos: 'Alle Richter', magistrado: 'Richter/in', hoy: 'Heute', anterior: 'Vorheriger Monat', siguiente: 'Nächster Monat', elegirDia: 'Wählen Sie einen Tag für Details.', delMes: 'Termine des Monats', expediente: 'Aktenzeichen', mas: 'mehr', leyenda: 'Richter' },
  fr: { todos: 'Tous les magistrats', magistrado: 'Magistrat', hoy: 'Aujourd’hui', anterior: 'Mois précédent', siguiente: 'Mois suivant', elegirDia: 'Sélectionnez un jour pour voir le détail.', delMes: 'Événements du mois', expediente: 'Dossier', mas: 'de plus', leyenda: 'Magistrats' },
} as const;

const LOCALES: Record<Idioma, string> = { es: 'es-PE', qu: 'es-PE', ay: 'es-PE', en: 'en-US', de: 'de-DE', fr: 'fr-FR' } as Record<Idioma, string>;

// Un color por magistrado, para distinguir su agenda dentro del calendario.
const COLORES = [
  { chip: 'bg-red-100 text-red-900 border-red-300', punto: 'bg-red-600' },
  { chip: 'bg-sky-100 text-sky-900 border-sky-300', punto: 'bg-sky-600' },
  { chip: 'bg-emerald-100 text-emerald-900 border-emerald-300', punto: 'bg-emerald-600' },
  { chip: 'bg-amber-100 text-amber-900 border-amber-300', punto: 'bg-amber-600' },
  { chip: 'bg-violet-100 text-violet-900 border-violet-300', punto: 'bg-violet-600' },
  { chip: 'bg-teal-100 text-teal-900 border-teal-300', punto: 'bg-teal-600' },
] as const;

const pad = (n: number) => String(n).padStart(2, '0');
const clave = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`;
const hoyClave = () => new Date().toLocaleDateString('en-CA');
const ordenar = (a: DiligenciaAgenda, b: DiligenciaAgenda) => a.fecha.localeCompare(b.fecha) || a.hora.localeCompare(b.hora);
const capitalizar = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const AgendaJudicialCalendario: React.FC<Props> = ({ agenda, idioma, esEditor = false, onAdministrar }) => {
  const t = DICCIONARIO[idioma];
  const x = textos[idioma as keyof typeof textos] || textos.es;
  const locale = LOCALES[idioma] || 'es-PE';

  const [mes, setMes] = useState(() => {
    const hoy = hoyClave();
    const proxima = [...agenda].filter((d) => d.fecha >= hoy).sort(ordenar)[0];
    const base = proxima ? proxima.fecha : hoy;
    const [y, m] = base.split('-').map(Number);
    return { y, m: m - 1 };
  });
  const [filtro, setFiltro] = useState('');
  const [diaSel, setDiaSel] = useState<string | null>(null);

  const magistrados = useMemo(
    () => Array.from(new Set(agenda.map((d) => d.magistrado).filter(Boolean))).sort((a, b) => a.localeCompare(b)),
    [agenda]
  );
  const colorDe = (nombre: string) => COLORES[Math.max(0, magistrados.indexOf(nombre)) % COLORES.length];

  const visibles = useMemo(
    () => agenda.filter((d) => d.fecha && (!filtro || d.magistrado === filtro)).sort(ordenar),
    [agenda, filtro]
  );
  const porDia = useMemo(() => {
    const mapa: Record<string, DiligenciaAgenda[]> = {};
    for (const d of visibles) (mapa[d.fecha] ||= []).push(d);
    return mapa;
  }, [visibles]);

  const primerDia = new Date(mes.y, mes.m, 1);
  const desfase = (primerDia.getDay() + 6) % 7; // la semana empieza el lunes
  const diasDelMes = new Date(mes.y, mes.m + 1, 0).getDate();
  const total = Math.ceil((desfase + diasDelMes) / 7) * 7;
  const celdas: Array<number | null> = Array.from({ length: total }, (_, i) => {
    const d = i - desfase + 1;
    return d >= 1 && d <= diasDelMes ? d : null;
  });

  const nombreMes = capitalizar(new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(primerDia));
  const diasSemana = Array.from({ length: 7 }, (_, i) =>
    capitalizar(new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(new Date(2024, 0, 1 + i))).replace('.', '')
  );

  const cambiarMes = (delta: number) => {
    const f = new Date(mes.y, mes.m + delta, 1);
    setMes({ y: f.getFullYear(), m: f.getMonth() });
    setDiaSel(null);
  };
  const irAHoy = () => {
    const f = new Date();
    setMes({ y: f.getFullYear(), m: f.getMonth() });
    setDiaSel(hoyClave());
  };

  const hoy = hoyClave();
  const prefijoMes = `${mes.y}-${pad(mes.m + 1)}-`;
  const delMes = visibles.filter((d) => d.fecha.startsWith(prefijoMes));
  const detalle = diaSel ? porDia[diaSel] || [] : delMes;
  const tituloDetalle = diaSel
    ? capitalizar(new Intl.DateTimeFormat(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${diaSel}T12:00:00`)))
    : x.delMes;

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <section className="overflow-hidden rounded-2xl border-2 border-red-300 bg-white shadow-md">
        {/* Encabezado */}
        <header className="flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-red-800 to-red-600 px-5 py-4 text-white">
          <div className="flex items-center gap-3">
            <span className="rounded-lg bg-white/15 p-2"><CalendarDays className="h-6 w-6" /></span>
            <div>
              <h1 className="text-lg font-black uppercase tracking-wide sm:text-xl">{t.agendaJudicial}</h1>
              <p className="text-xs text-red-100">{t.agendaProgramadas}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-lg bg-white/15 px-3 py-1 text-xs font-bold">{visibles.length} {t.registros}</span>
            {esEditor && onAdministrar && (
              <button type="button" onClick={onAdministrar} className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-bold text-red-800 hover:bg-red-50">
                <Settings2 className="h-4 w-4" />{t.administrarAgenda}
              </button>
            )}
          </div>
        </header>

        {/* Controles: mes y filtro por magistrado */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-red-100 bg-red-50/60 px-4 py-3">
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => cambiarMes(-1)} aria-label={x.anterior} title={x.anterior} className="rounded-lg border border-red-200 bg-white p-2 text-red-800 hover:bg-red-100"><ChevronLeft className="h-4 w-4" /></button>
            <h2 className="min-w-[10rem] text-center text-base font-black text-slate-900 sm:text-lg">{nombreMes}</h2>
            <button type="button" onClick={() => cambiarMes(1)} aria-label={x.siguiente} title={x.siguiente} className="rounded-lg border border-red-200 bg-white p-2 text-red-800 hover:bg-red-100"><ChevronRight className="h-4 w-4" /></button>
            <button type="button" onClick={irAHoy} className="ml-1 rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-bold text-red-800 hover:bg-red-100">{x.hoy}</button>
          </div>
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-700">
            <span>{x.magistrado}:</span>
            <select value={filtro} onChange={(e) => { setFiltro(e.target.value); setDiaSel(null); }} className="max-w-[16rem] rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-semibold normal-case text-slate-900 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-100">
              <option value="">{x.todos}</option>
              {magistrados.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </label>
        </div>

        {/* Calendario */}
        <div className="p-2 sm:p-4">
          <div className="grid grid-cols-7 gap-px overflow-hidden rounded-xl border border-red-200 bg-red-200">
            {diasSemana.map((d, i) => (
              <div key={i} className="bg-red-700 py-2 text-center text-[11px] font-black uppercase tracking-wide text-white sm:text-xs">{d}</div>
            ))}
            {celdas.map((dia, i) => {
              if (dia === null) return <div key={i} className="min-h-[3.5rem] bg-slate-50 sm:min-h-[9.5rem]" />;
              const k = clave(mes.y, mes.m, dia);
              const eventos = porDia[k] || [];
              const esHoy = k === hoy;
              const seleccionado = k === diaSel;
              return (
                <button
                  type="button"
                  key={i}
                  onClick={() => setDiaSel(seleccionado ? null : k)}
                  className={`flex min-h-[3.5rem] flex-col items-stretch gap-1 bg-white p-1 text-left transition hover:bg-red-50 sm:min-h-[9.5rem] sm:p-1.5 ${seleccionado ? 'ring-2 ring-inset ring-red-600' : ''}`}
                >
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold sm:text-sm ${esHoy ? 'bg-red-700 text-white' : 'text-slate-800'}`}>{dia}</span>
                  {/* Móvil: puntos de color; escritorio: etiquetas con hora */}
                  <span className="flex flex-wrap gap-0.5 sm:hidden">
                    {eventos.slice(0, 4).map((e) => <span key={e.id} className={`h-2 w-2 rounded-full ${colorDe(e.magistrado).punto}`} />)}
                  </span>
                  <span className="hidden flex-col gap-1 sm:flex">
                    {eventos.slice(0, 2).map((e) => (
                      <span key={e.id} className={`rounded border px-1.5 py-1 leading-tight ${colorDe(e.magistrado).chip}`} title={`${e.hora} · ${e.magistrado}`}>
                        <span className="block text-[11px] font-semibold">{e.hora}</span>
                        <span className="block break-words text-xs font-black">{e.magistrado}</span>
                      </span>
                    ))}
                    {eventos.length > 2 && <span className="text-xs font-black text-red-800">+{eventos.length - 2} {x.mas}</span>}
                  </span>
                </button>
              );
            })}
          </div>

          {magistrados.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-800">
              <span className="font-black uppercase tracking-wide">{x.leyenda}:</span>
              {magistrados.map((m) => (
                <span key={m} className="flex items-center gap-2 font-bold"><span className={`h-3.5 w-3.5 rounded-full ${colorDe(m).punto}`} />{m}</span>
              ))}
            </div>
          )}
        </div>

        {/* Detalle del día seleccionado o del mes */}
        <div className="border-t border-red-100 bg-red-50/40 p-4 sm:p-5">
          <h3 className="mb-3 text-sm font-black uppercase tracking-wide text-red-900">{tituloDetalle}</h3>
          {!diaSel && delMes.length > 0 && <p className="mb-3 text-xs text-slate-600">{x.elegirDia}</p>}
          {detalle.length === 0 ? (
            <p className="text-sm text-slate-500">{t.sinDiligencias}</p>
          ) : (
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              {detalle.map((d) => (
                <article key={d.id} className="rounded-xl border border-red-200 bg-white p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-red-700">{d.tipo.replace(/_/g, ' ')}</p>
                      <h4 className="mt-1 text-base font-black text-slate-900 sm:text-lg">{d.magistrado}</h4>
                    </div>
                    <span className={`rounded-lg border px-2.5 py-1 text-xs font-bold ${colorDe(d.magistrado).chip}`}>
                      {d.fecha.split('-').reverse().join('/')} · {d.hora}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-700">{d.descripcion}</p>
                  {d.expedienteNomenclatura && (
                    <p className="mt-2 text-[11px] text-slate-500">{x.expediente}: <span className="font-mono">{d.expedienteNomenclatura}</span></p>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
