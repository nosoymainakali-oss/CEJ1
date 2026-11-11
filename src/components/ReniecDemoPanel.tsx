import React, { useMemo, useState } from 'react';
import { ArrowLeft, BadgeCheck, Fingerprint, Search } from 'lucide-react';

type Props = { onVolver: () => void };

export const ReniecDemoPanel: React.FC<Props> = ({ onVolver }) => {
  const [numero, setNumero] = useState('');
  const [consultado, setConsultado] = useState('');
  const [error, setError] = useState('');

  const ficha = useMemo(() => {
    if (!consultado) return null;
    const semilla = Number(consultado.slice(-2));
    const fecha = new Date(Date.UTC(1980 + (semilla % 20), semilla % 12, 1 + (semilla % 27)));
    return {
      nombres: ['MARÍA ELENA', 'JOSÉ ANTONIO', 'ANA LUCÍA', 'CARLOS EDUARDO', 'ROSA ISABEL'][semilla % 5],
      apellidos: ['QUISPE HUAMÁN', 'MAMANI CONDORI', 'FLORES ZEBALLOS', 'ROJAS VILCA', 'TORRES APAZA'][(semilla * 7) % 5],
      nacimiento: fecha.toLocaleDateString('es-PE', { timeZone: 'UTC' }),
      estado: semilla % 2 === 0 ? 'ACTIVO' : 'INACTIVO',
      ubigeo: ['PUNO · 210101', 'JULIACA · 211101', 'ILAVE · 210501'][semilla % 3],
    };
  }, [consultado]);

  const consultar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{8}$/.test(numero)) {
      setError('Ingresa exactamente ocho dígitos.');
      setConsultado('');
      return;
    }
    setError('');
    setConsultado(numero);
  };

  return (
    <section aria-labelledby="reniec-demo-title" className="mx-auto max-w-5xl space-y-5 rounded-2xl border border-sky-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-sky-100 p-3 text-sky-800"><Fingerprint className="h-6 w-6" /></div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.18em] text-sky-700">Servicio de identificación · Consulta de identidad</p>
            <h2 id="reniec-demo-title" className="text-xl font-black text-slate-900">Consulta de identidad</h2>
          </div>
        </div>
        <button type="button" onClick={onVolver} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"><ArrowLeft className="h-4 w-4" /> Volver</button>
      </div>

      <p className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs leading-5 text-slate-600">
        Entorno académico independiente. La información mostrada es sintética y no proviene de RENIEC ni de registros oficiales; esta consulta no verifica identidades.
      </p>

      <form onSubmit={consultar} className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <label className="space-y-2 text-sm font-semibold text-slate-700">
          Número de documento
          <input inputMode="numeric" autoComplete="off" maxLength={8} value={numero} onChange={(e) => setNumero(e.target.value.replace(/\D/g, '').slice(0, 8))} placeholder="Ingrese ocho dígitos" aria-describedby="reniec-help" className="w-full rounded-xl border border-slate-300 px-4 py-3 font-mono text-lg tracking-[.2em] outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-200" />
          <span id="reniec-help" className="block text-xs font-normal text-slate-500">Ingrese el número de documento para consultar la ficha de identidad.</span>
        </label>
        <button type="submit" className="inline-flex items-center justify-center gap-2 self-end rounded-xl bg-[#0c4a6e] px-5 py-3 text-sm font-bold text-white hover:bg-sky-900"><Search className="h-4 w-4" /> Consultar</button>
      </form>
      {error && <p role="alert" className="text-sm font-semibold text-red-700">{error}</p>}

      {ficha && (
        <div className="overflow-hidden rounded-xl border border-emerald-200">
          <div className="flex items-center gap-2 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-900"><BadgeCheck className="h-5 w-5" /> Información de identidad</div>
          <div className="grid gap-4 p-5 sm:grid-cols-2">
            <div><p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Documento consultado</p><p className="font-mono text-lg font-bold text-slate-900">{consultado}</p></div>
            <div><p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Nombres</p><p className="font-bold text-slate-900">{ficha.nombres}</p></div>
            <div><p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Apellidos</p><p className="font-bold text-slate-900">{ficha.apellidos}</p></div>
            <div><p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Fecha de nacimiento</p><p className="font-semibold text-slate-800">{ficha.nacimiento}</p></div>
            <div><p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Estado del registro</p><p className="font-semibold text-slate-800">{ficha.estado}</p></div>
            <div><p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Ubigeo</p><p className="font-semibold text-slate-800">{ficha.ubigeo}</p></div>
          </div>
          <p className="border-t border-emerald-100 bg-emerald-50/50 px-4 py-3 text-xs leading-5 text-slate-600">Información sintética generada localmente para fines académicos. No constituye constancia registral ni acredita identidad.</p>
        </div>
      )}
    </section>
  );
};
