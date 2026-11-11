import React, { useMemo, useState } from 'react';
import { ArrowLeft, BadgeCheck, Fingerprint, Search, ShieldAlert } from 'lucide-react';

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
      nombres: `PERSONA FICTICIA ${String(semilla).padStart(2, '0')}`,
      apellidos: `APELLIDO DE PRUEBA ${String((semilla * 7) % 97).padStart(2, '0')}`,
      nacimiento: fecha.toLocaleDateString('es-PE', { timeZone: 'UTC' }),
      estado: semilla % 2 === 0 ? 'REGISTRO SIMULADO ACTIVO' : 'REGISTRO SIMULADO INACTIVO',
      ubigeo: '000000 · UBIGEO DE DEMOSTRACIÓN',
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
            <p className="text-[10px] font-bold uppercase tracking-[.18em] text-sky-700">Módulo académico · Interoperabilidad</p>
            <h2 id="reniec-demo-title" className="text-xl font-black text-slate-900">RENIEC · Consulta simulada</h2>
          </div>
        </div>
        <button type="button" onClick={onVolver} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"><ArrowLeft className="h-4 w-4" /> Volver</button>
      </div>

      <div role="alert" className="flex gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
        <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0" />
        <div><strong>SIMULACIÓN FICTICIA: NO EXISTE CONEXIÓN CON RENIEC.</strong><br />
          Esta pantalla no consulta bases oficiales, no valida identidades y no transmite el número ingresado. Introduce únicamente números de prueba (por ejemplo, 00000000 o 11111111). No uses el DNI de una persona real. Los resultados son sintéticos y carecen de valor identificatorio, registral o probatorio.</div>
      </div>

      <form onSubmit={consultar} className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <label className="space-y-2 text-sm font-semibold text-slate-700">
          Número de documento de prueba
          <input inputMode="numeric" autoComplete="off" maxLength={8} value={numero} onChange={(e) => setNumero(e.target.value.replace(/\D/g, '').slice(0, 8))} placeholder="Ej. 00000000" aria-describedby="reniec-help" className="w-full rounded-xl border border-slate-300 px-4 py-3 font-mono text-lg tracking-[.2em] outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-200" />
          <span id="reniec-help" className="block text-xs font-normal text-slate-500">Ocho dígitos. El valor se procesa exclusivamente en este navegador.</span>
        </label>
        <button type="submit" className="inline-flex items-center justify-center gap-2 self-end rounded-xl bg-[#0c4a6e] px-5 py-3 text-sm font-bold text-white hover:bg-sky-900"><Search className="h-4 w-4" /> Consultar simulación</button>
      </form>
      {error && <p role="alert" className="text-sm font-semibold text-red-700">{error}</p>}

      {ficha && (
        <div className="overflow-hidden rounded-xl border border-emerald-200">
          <div className="flex items-center gap-2 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-900"><BadgeCheck className="h-5 w-5" /> Resultado generado por el simulador</div>
          <div className="grid gap-4 p-5 sm:grid-cols-2">
            <div><p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Documento consultado (dato de prueba)</p><p className="font-mono text-lg font-bold text-slate-900">DEMO-{consultado}</p></div>
            <div><p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Nombres</p><p className="font-bold text-slate-900">{ficha.nombres}</p></div>
            <div><p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Apellidos</p><p className="font-bold text-slate-900">{ficha.apellidos}</p></div>
            <div><p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Fecha de nacimiento ficticia</p><p className="font-semibold text-slate-800">{ficha.nacimiento}</p></div>
            <div><p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Estado</p><p className="font-semibold text-slate-800">{ficha.estado}</p></div>
            <div><p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Ubigeo</p><p className="font-semibold text-slate-800">{ficha.ubigeo}</p></div>
          </div>
          <p className="border-t border-emerald-100 bg-emerald-50/50 px-4 py-3 text-xs leading-5 text-slate-600">Aviso: los campos se generan mediante una regla local determinista; no corresponden a una persona ni a un asiento del Registro Nacional de Identificación y Estado Civil.</p>
        </div>
      )}
    </section>
  );
};
