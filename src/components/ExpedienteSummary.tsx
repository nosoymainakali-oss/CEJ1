import React from 'react';
import { Expediente } from '../types/judicial';
import { CalendarDays, FileText, Scale, Users, Landmark, Clock3 } from 'lucide-react';

interface Props { expediente: Expediente }

const fechaLegible = (valor: string) => {
  if (!valor) return 'No consignada';
  const partes = valor.includes('-') ? valor.split('-') : valor.split('/');
  const iso = valor.includes('-') ? valor : partes.length === 3 ? `${partes[2]}-${partes[1]}-${partes[0]}` : '';
  const fecha = iso ? new Date(`${iso}T12:00:00`) : new Date(valor);
  return Number.isNaN(fecha.getTime()) ? valor : fecha.toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric' });
};

export const ExpedienteSummary: React.FC<Props> = ({ expediente }) => {
  const hitos = [...expediente.lineaTiempo].sort((a, b) => a.fecha.localeCompare(b.fecha) || a.orden - b.orden);
  const ultimaActuacion = hitos.filter(h => h.estado === 'completado' || h.estado === 'en_proceso').at(-1);
  const siguienteActuacion = hitos.find(h => h.estado === 'pendiente');
  const escritos = expediente.resoluciones.filter(r => r.tipo === 'ESCRITO').length;
  const resoluciones = expediente.resoluciones.filter(r => r.tipo !== 'ESCRITO').length;

  return (
    <section aria-labelledby="resumen-expediente-title" className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.16em] text-slate-500">Ficha procesal</p>
            <h3 id="resumen-expediente-title" className="mt-1 text-lg font-bold text-slate-900">Resumen del expediente</h3>
          </div>
          <span className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700">{expediente.estadoProcesal}</span>
        </div>
      </div>

      <div className="grid gap-0 md:grid-cols-2">
        <div className="space-y-4 border-b border-slate-100 p-5 sm:p-6 md:border-r">
          <div className="flex items-start gap-3">
            <Landmark className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
            <div><p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Órgano jurisdiccional</p><p className="mt-1 text-sm font-semibold text-slate-900">{expediente.instancia}</p><p className="mt-0.5 text-xs text-slate-600">Distrito Judicial de {expediente.distritoJudicial}</p></div>
          </div>
          <div className="flex items-start gap-3">
            <Scale className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
            <div><p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Especialidad y materia</p><p className="mt-1 text-sm font-semibold text-slate-900">{expediente.especialidad}</p><p className="mt-1 text-sm leading-relaxed text-slate-700">{expediente.materia}</p></div>
          </div>
          <div className="flex items-start gap-3">
            <Users className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
            <div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Partes procesales</p><p className="mt-1 text-xs font-bold uppercase text-slate-500">Demandante</p><p className="text-sm font-semibold text-slate-900">{expediente.demandante}</p><p className="mt-2 text-xs font-bold uppercase text-slate-500">Demandado</p><p className="text-sm font-semibold text-slate-900">{expediente.demandado}</p></div>
          </div>
        </div>

        <div className="space-y-4 p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
            <div><p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Datos de tramitación</p><p className="mt-1 text-sm text-slate-800">Fecha de inicio: <strong>{fechaLegible(expediente.fechaInicio)}</strong></p><p className="mt-1 text-sm text-slate-800">Juez: <strong>{expediente.juez}</strong></p><p className="mt-1 text-sm text-slate-800">Especialista: <strong>{expediente.secretario}</strong></p>{expediente.cuantia && <p className="mt-1 text-sm text-slate-800">Cuantía: <strong>{expediente.cuantia}</strong></p>}</div>
          </div>
          <div className="flex items-start gap-3">
            <FileText className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
            <div><p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Documentos incorporados</p><p className="mt-1 text-sm text-slate-800">{resoluciones} resoluciones y actuaciones · {escritos} escritos presentados</p><p className="mt-1 text-xs text-slate-500">{expediente.resoluciones.reduce((total, r) => total + r.archivosAdjuntos.length, 0)} archivos adjuntos registrados</p></div>
          </div>
          <div className="flex items-start gap-3">
            <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
            <div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Movimiento procesal</p>{ultimaActuacion ? <><p className="mt-1 text-sm font-semibold text-slate-900">{ultimaActuacion.titulo}</p><p className="text-xs text-slate-500">{fechaLegible(ultimaActuacion.fecha)}</p></> : <p className="mt-1 text-sm text-slate-600">No se registran actuaciones concluidas.</p>}</div>
          </div>
          {siguienteActuacion && <div className="rounded-lg border border-amber-200 bg-amber-50/60 p-3"><p className="text-[10px] font-bold uppercase tracking-wider text-amber-800">Actuación pendiente registrada</p><p className="mt-1 text-sm font-semibold text-slate-900">{siguienteActuacion.titulo}</p><p className="mt-0.5 text-xs text-slate-600">{fechaLegible(siguienteActuacion.fecha)} · {siguienteActuacion.descripcion}</p></div>}
        </div>
      </div>
      <div className="border-t border-slate-200 bg-slate-50 px-5 py-3 text-xs leading-relaxed text-slate-600 sm:px-6">
        <strong className="text-slate-700">Síntesis:</strong> Proceso seguido por {expediente.demandante} contra {expediente.demandado}, sobre {expediente.materia.toLocaleLowerCase('es')}. Actualmente figura como: {expediente.estadoProcesal.toLocaleLowerCase('es')}.
      </div>
    </section>
  );
};
