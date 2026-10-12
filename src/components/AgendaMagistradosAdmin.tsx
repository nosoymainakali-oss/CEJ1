import React, { useMemo, useState } from 'react';
import { ArrowLeft, CalendarDays, Pencil, Plus, Save, Trash2, X } from 'lucide-react';
import { DiligenciaAgenda, Idioma } from '../types/judicial';

interface Props {
  agenda: DiligenciaAgenda[];
  idioma: Idioma;
  onVolver: () => void;
  onGuardar: (agenda: DiligenciaAgenda[]) => void;
}

type Formulario = Omit<DiligenciaAgenda, 'id'>;

const textos = {
  es: { title: 'Administración de Agenda de Magistrados', desc: 'Registre y mantenga las diligencias programadas por magistrado.', add: 'Nueva diligencia', edit: 'Editar diligencia', judge: 'Magistrado', caseNo: 'Expediente (opcional)', date: 'Fecha', time: 'Hora', type: 'Tipo de diligencia', description: 'Descripción', save: 'Guardar diligencia', cancel: 'Cancelar', back: 'Volver al inicio', empty: 'No hay diligencias registradas.', change: 'Editar', remove: 'Eliminar', confirm: '¿Desea eliminar esta diligencia?', count: 'registros', required: 'Complete magistrado, fecha, hora, tipo y descripción.' },
  en: { title: 'Judge Calendar Administration', desc: 'Create and maintain hearings and events by judge.', add: 'New event', edit: 'Edit event', judge: 'Judge', caseNo: 'Case number (optional)', date: 'Date', time: 'Time', type: 'Event type', description: 'Description', save: 'Save event', cancel: 'Cancel', back: 'Back to home', empty: 'No events have been registered.', change: 'Edit', remove: 'Delete', confirm: 'Delete this event?', count: 'records', required: 'Complete judge, date, time, type and description.' },
  de: { title: 'Verwaltung des Richterkalenders', desc: 'Termine und Verhandlungen nach Richter verwalten.', add: 'Neuer Termin', edit: 'Termin bearbeiten', judge: 'Richter/in', caseNo: 'Aktenzeichen (optional)', date: 'Datum', time: 'Uhrzeit', type: 'Terminart', description: 'Beschreibung', save: 'Termin speichern', cancel: 'Abbrechen', back: 'Zurück zur Startseite', empty: 'Keine Termine eingetragen.', change: 'Bearbeiten', remove: 'Löschen', confirm: 'Diesen Termin löschen?', count: 'Einträge', required: 'Bitte Richter, Datum, Uhrzeit, Art und Beschreibung ausfüllen.' },
  fr: { title: 'Gestion de l’agenda des magistrats', desc: 'Enregistrez et gérez les audiences par magistrat.', add: 'Nouvel événement', edit: 'Modifier', judge: 'Magistrat', caseNo: 'Dossier (facultatif)', date: 'Date', time: 'Heure', type: 'Type d’événement', description: 'Description', save: 'Enregistrer', cancel: 'Annuler', back: 'Retour à l’accueil', empty: 'Aucun événement enregistré.', change: 'Modifier', remove: 'Supprimer', confirm: 'Supprimer cet événement ?', count: 'entrées', required: 'Renseignez le magistrat, la date, l’heure, le type et la description.' },
  qu: { title: 'Kamachiqkunapa p’unchaw ruraykuna kamachiy', desc: 'Kamachiqkunapa audienciankunata qillqay hinaspa allichay.', add: 'Musuq ruray', edit: 'Rurayta allichay', judge: 'Kamachiq', caseNo: 'Expediente (munaspa)', date: 'P’unchaw', time: 'Hora', type: 'Ruraypa laya', description: 'Willakuy', save: 'Waqaychay', cancel: 'Saqiy', back: 'Qallariyman kutiy', empty: 'Manam ruraykuna qillqasqachu.', change: 'Allichay', remove: 'Chinkachiy', confirm: 'Kay rurayta chinkachiyta munankichu?', count: 'qillqakuna', required: 'Kamachiqta, p’unchawta, horata, layata hinaspa willakuyta hunt’achiy.' },
  ay: { title: 'Taripirinakana agenda apnaqaña', desc: 'Sapa taripirina audiencia ukhamaraki lurawinaka qillqaña.', add: 'Machaq lurawi', edit: 'Lurawi askichaña', judge: 'Taripiri', caseNo: 'Expediente (munaspa)', date: 'Uru', time: 'Hora', type: 'Lurawina kasta', description: 'Qhanañchawi', save: 'Imaña', cancel: 'Janiwa', back: 'Qalltañar kutt’aña', empty: 'Janiw lurawinakax qillqatäkiti.', change: 'Askichaña', remove: 'Chhaqtayaña', confirm: '¿Aka lurawi chhaqtayañ muntati?', count: 'qillqatanaka', required: 'Taripiri, uru, hora, kasta ukhamaraki qhanañchawi phuqacham.' }
} as const;

const vacio = (): Formulario => ({ magistrado: '', expedienteNomenclatura: '', fecha: '', hora: '09:00', tipo: '', descripcion: '' });

export const AgendaMagistradosAdmin: React.FC<Props> = ({ agenda, idioma, onVolver, onGuardar }) => {
  const t = textos[idioma] || textos.es;
  const [editando, setEditando] = useState<string | null>(null);
  const [form, setForm] = useState<Formulario>(vacio());
  const [formAbierto, setFormAbierto] = useState(false);
  const ordenada = useMemo(() => [...agenda].sort((a, b) => a.fecha.localeCompare(b.fecha) || a.hora.localeCompare(b.hora)), [agenda]);

  const iniciarNuevo = () => { setEditando(null); setForm(vacio()); setFormAbierto(true); };
  const iniciarEdicion = (d: DiligenciaAgenda) => {
    setEditando(d.id);
    setForm({ magistrado: d.magistrado, expedienteNomenclatura: d.expedienteNomenclatura || '', fecha: d.fecha, hora: d.hora, tipo: d.tipo, descripcion: d.descripcion });
    setFormAbierto(true);
  };
  const guardar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.magistrado.trim() || !form.fecha || !form.hora || !form.tipo.trim() || !form.descripcion.trim()) {
      window.alert(t.required); return;
    }
    if (editando) {
      onGuardar(agenda.map(d => d.id === editando ? { ...form, id: editando } : d));
    } else {
      onGuardar([{ ...form, id: `aud-${Date.now()}` }, ...agenda]);
    }
    setFormAbierto(false); setEditando(null); setForm(vacio());
  };
  const eliminar = (id: string) => {
    if (window.confirm(t.confirm)) onGuardar(agenda.filter(d => d.id !== id));
  };
  const campo = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-100';
  const etiqueta = 'mb-1 block text-xs font-bold uppercase tracking-wide text-slate-700';

  return <div className="mx-auto max-w-6xl space-y-5">
    <button type="button" onClick={onVolver} className="flex items-center gap-2 text-sm font-bold text-rose-800 hover:text-rose-600"><ArrowLeft className="h-4 w-4" />{t.back}</button>
    <div className="mb-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-rose-200 bg-white px-5 py-4 shadow-sm">
      <div className="flex items-center gap-3"><img src="https://upload.wikimedia.org/wikipedia/commons/5/58/Poder_Judicial_del_Peru.png" alt="Logotipo del Poder Judicial del Perú" referrerPolicy="no-referrer" className="h-14 w-14 object-contain" /><div><p className="text-xs font-bold uppercase tracking-widest text-rose-800">Poder Judicial del Perú</p><h2 className="text-lg font-black uppercase text-slate-900">Administración de Agenda Judicial</h2><p className="text-xs font-semibold text-slate-600">Distrito Judicial de Puno · Código 2101</p></div></div>
      <img src="/logo-una-puno.png" alt="Logotipo de la Universidad Nacional del Altiplano de Puno" className="h-14 w-14 rounded-full border border-rose-200 bg-white object-contain p-0.5" />
    </div>
    <section className="overflow-hidden rounded-2xl border border-rose-200 bg-white shadow-md">
      <header className="flex flex-wrap items-center justify-between gap-3 bg-rose-800 px-5 py-4 text-white">
        <div className="flex items-center gap-3"><CalendarDays className="h-7 w-7 text-rose-200" /><div><h1 className="text-lg font-black">{t.title}</h1><p className="mt-1 text-xs text-rose-100">{t.desc}</p></div></div>
        <div className="flex items-center gap-3"><span className="text-xs">{agenda.length} {t.count}</span><button type="button" onClick={iniciarNuevo} className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-bold text-rose-800 hover:bg-rose-50"><Plus className="h-4 w-4" />{t.add}</button></div>
      </header>
      {formAbierto && <form onSubmit={guardar} className="space-y-4 border-b border-slate-200 bg-rose-50/60 p-5">
        <h2 className="font-bold text-slate-900">{editando ? t.edit : t.add}</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label><span className={etiqueta}>{t.judge}</span><input className={campo} value={form.magistrado} onChange={e => setForm({...form, magistrado:e.target.value})} required /></label>
          <label><span className={etiqueta}>{t.caseNo}</span><input className={campo} value={form.expedienteNomenclatura} onChange={e => setForm({...form, expedienteNomenclatura:e.target.value})} /></label>
          <label><span className={etiqueta}>{t.date}</span><input type="date" className={campo} value={form.fecha} onChange={e => setForm({...form, fecha:e.target.value})} required /></label>
          <label><span className={etiqueta}>{t.time}</span><input type="time" className={campo} value={form.hora} onChange={e => setForm({...form, hora:e.target.value})} required /></label>
          <label className="sm:col-span-2"><span className={etiqueta}>{t.type}</span><input className={campo} value={form.tipo} onChange={e => setForm({...form, tipo:e.target.value})} required /></label>
          <label className="sm:col-span-2"><span className={etiqueta}>{t.description}</span><textarea rows={3} className={campo} value={form.descripcion} onChange={e => setForm({...form, descripcion:e.target.value})} required /></label>
        </div>
        <div className="flex justify-end gap-2"><button type="button" onClick={() => setFormAbierto(false)} className="flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-700"><X className="h-4 w-4" />{t.cancel}</button><button type="submit" className="flex items-center gap-1 rounded-lg bg-rose-800 px-4 py-2 text-sm font-bold text-white hover:bg-rose-900"><Save className="h-4 w-4" />{t.save}</button></div>
      </form>}
      {ordenada.length === 0 ? <p className="p-8 text-center text-sm text-slate-500">{t.empty}</p> : <div className="divide-y divide-slate-200">
        {ordenada.map(d => <article key={d.id} className="flex flex-col justify-between gap-3 p-5 sm:flex-row sm:items-start">
          <div className="min-w-0 flex-1"><p className="text-xs font-bold text-rose-800">{d.fecha} · {d.hora}</p><h3 className="mt-1 font-bold text-slate-900">{d.tipo}</h3><p className="mt-1 text-sm text-slate-700">{d.descripcion}</p><p className="mt-2 text-xs text-slate-500">{t.judge}: <strong>{d.magistrado}</strong>{d.expedienteNomenclatura ? <> · {t.caseNo}: <strong>{d.expedienteNomenclatura}</strong></> : null}</p></div>
          <div className="flex shrink-0 gap-2"><button type="button" onClick={() => iniciarEdicion(d)} className="flex items-center gap-1 rounded-lg border border-rose-200 px-3 py-2 text-xs font-bold text-rose-800 hover:bg-rose-50"><Pencil className="h-3.5 w-3.5" />{t.change}</button><button type="button" onClick={() => eliminar(d.id)} className="flex items-center gap-1 rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-700 hover:bg-red-50"><Trash2 className="h-3.5 w-3.5" />{t.remove}</button></div>
        </article>)}
      </div>}
    </section>
  </div>;
};
