import { CalculoPlazo, DetalleDiaHabil } from '../types/judicial';

export const FERIADOS_PERU_RECURRENTES: Array<{ mes: number; dia: number; nombre: string }> = [
  { mes: 1, dia: 1, nombre: 'Año Nuevo' },
  { mes: 5, dia: 1, nombre: 'Día del Trabajo' },
  { mes: 6, dia: 7, nombre: 'Batalla de Arica y Día de la Bandera' },
  { mes: 6, dia: 29, nombre: 'San Pedro y San Pablo' },
  { mes: 7, dia: 23, nombre: 'Día de la Fuerza Aérea del Perú' },
  { mes: 7, dia: 28, nombre: 'Fiestas Patrias (Independencia)' },
  { mes: 7, dia: 29, nombre: 'Fiestas Patrias (Fuerzas Armadas)' },
  { mes: 8, dia: 4, nombre: 'Día del Juez y la Justicia (Feriado Judicial)' },
  { mes: 8, dia: 6, nombre: 'Batalla de Junín' },
  { mes: 8, dia: 30, nombre: 'Santa Rosa de Lima' },
  { mes: 10, dia: 8, nombre: 'Combate de Angamos' },
  { mes: 11, dia: 1, nombre: 'Día de Todos los Santos' },
  { mes: 12, dia: 8, nombre: 'Inmaculada Concepción' },
  { mes: 12, dia: 9, nombre: 'Batalla de Ayacucho' },
  { mes: 12, dia: 25, nombre: 'Navidad' },
];

export const FERIADOS_MOVIBLES: Record<string, string> = {
  '2024-03-28': 'Jueves Santo',
  '2024-03-29': 'Viernes Santo',
  '2025-04-17': 'Jueves Santo',
  '2025-04-18': 'Viernes Santo',
  '2026-04-02': 'Jueves Santo',
  '2026-04-03': 'Viernes Santo',
  '2027-03-25': 'Jueves Santo',
  '2027-03-26': 'Viernes Santo',
};

const NOMBRES_DIAS = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
];

export function esFeriadoOFestivo(fechaStr: string): { esFeriado: boolean; motivo?: string } {
  const [anioStr, mesStr, diaStr] = fechaStr.split('-');
  const mes = parseInt(mesStr, 10);
  const dia = parseInt(diaStr, 10);

  if (FERIADOS_MOVIBLES[fechaStr]) {
    return { esFeriado: true, motivo: FERIADOS_MOVIBLES[fechaStr] };
  }

  const recurrente = FERIADOS_PERU_RECURRENTES.find((f) => f.mes === mes && f.dia === dia);
  if (recurrente) {
    return { esFeriado: true, motivo: recurrente.nombre };
  }

  return { esFeriado: false };
}

export function formatoFechaCorta(fecha: Date): string {
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const dia = String(fecha.getDate()).padStart(2, '0');
  return `${anio}-${mes}-${dia}`;
}

export function parseFechaLocal(fechaStr: string): Date {
  const [anio, mes, dia] = fechaStr.split('-').map(Number);
  return new Date(anio, mes - 1, dia, 12, 0, 0);
}

/**
 * Calculadora de plazos según regla:
 * - Ubicando una fecha en el calendario.
 * - Plazo otorgado (días hábiles).
 * - Notificación Física: El plazo comienza a partir del día siguiente de la notificación.
 * - Notificación Electrónica: Se le agregan dos días más al plazo (días hábiles adicionales).
 */
export function calcularPlazoConReglas(
  fechaNotificacionStr: string,
  diasOtorgados: number,
  tipoNotificacion: 'fisica' | 'electronica'
): CalculoPlazo {
  const fechaNotif = parseFechaLocal(fechaNotificacionStr);
  const detalleDias: DetalleDiaHabil[] = [];

  // Día de la notificación (no corre plazo el día mismo)
  const diaSemanaNotif = NOMBRES_DIAS[fechaNotif.getDay()];
  const feriadoNotif = esFeriadoOFestivo(fechaNotificacionStr);
  const esFinSemanaNotif = fechaNotif.getDay() === 0 || fechaNotif.getDay() === 6;

  detalleDias.push({
    fecha: fechaNotificacionStr,
    diaSemana: diaSemanaNotif,
    esHabil: !esFinSemanaNotif && !feriadoNotif.esFeriado,
    motivoNoHabil: esFinSemanaNotif
      ? 'Día no hábil (Fin de semana)'
      : feriadoNotif.esFeriado
      ? `Feriado: ${feriadoNotif.motivo}`
      : `Día de recepción de la notificación (${tipoNotificacion.toUpperCase()})`,
  });

  let fechaCursor = new Date(fechaNotif);
  let fechaInicioComputo = '';

  // Si es electrónica, se agregan dos días más al plazo
  const diasAdicionalesSinoe = tipoNotificacion === 'electronica' ? 2 : 0;
  const diasTotalesHabiles = diasOtorgados + diasAdicionalesSinoe;

  let habilesContados = 0;
  let fechaVencimientoStr = fechaNotificacionStr;

  while (habilesContados < diasTotalesHabiles) {
    fechaCursor.setDate(fechaCursor.getDate() + 1);
    const cursorStr = formatoFechaCorta(fechaCursor);
    const diaSemana = NOMBRES_DIAS[fechaCursor.getDay()];
    const esFinSemana = fechaCursor.getDay() === 0 || fechaCursor.getDay() === 6;
    const feriadoInfo = esFeriadoOFestivo(cursorStr);

    if (!esFinSemana && !feriadoInfo.esFeriado) {
      habilesContados++;

      if (habilesContados === 1) {
        fechaInicioComputo = cursorStr;
      }

      const esDiaAdicional = tipoNotificacion === 'electronica' && habilesContados <= 2;

      detalleDias.push({
        fecha: cursorStr,
        diaSemana,
        esHabil: true,
        numeroDiaHabil: habilesContados,
        esDiasAdicionalesSinoe: esDiaAdicional,
        motivoNoHabil: esDiaAdicional
          ? `Día Adicional Electrónico SINOE (${habilesContados} de 2)`
          : undefined,
      });

      if (habilesContados === diasTotalesHabiles) {
        fechaVencimientoStr = cursorStr;
      }
    } else {
      detalleDias.push({
        fecha: cursorStr,
        diaSemana,
        esHabil: false,
        motivoNoHabil: esFinSemana ? 'Fin de semana' : `Feriado: ${feriadoInfo.motivo}`,
      });
    }
  }

  // Estado respecto a hoy
  const hoyStr = formatoFechaCorta(new Date());
  const fechaHoy = parseFechaLocal(hoyStr);
  const fechaVence = parseFechaLocal(fechaVencimientoStr);

  const diffTime = fechaVence.getTime() - fechaHoy.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let estado: 'vigente' | 'urgente' | 'vencido' | 'cumplido' = 'vigente';
  if (diffDays < 0) {
    estado = 'vencido';
  } else if (diffDays <= 2) {
    estado = 'urgente';
  } else {
    estado = 'vigente';
  }

  return {
    tipoNotificacion,
    diasOtorgados,
    diasTotalesEfectivos: diasTotalesHabiles,
    fechaNotificacion: fechaNotificacionStr,
    fechaInicioComputo: fechaInicioComputo || fechaNotificacionStr,
    fechaVencimiento: fechaVencimientoStr,
    diasRestantes: Math.max(0, diffDays),
    estado,
    horasRestantesTexto:
      diffDays === 0
        ? 'VENCE HOY a las 23:59 hrs (Mesa de Partes Virtual MPV)'
        : diffDays === 1
        ? 'Vence MAÑANA a las 23:59 hrs'
        : diffDays > 1
        ? `${diffDays} días restantes para el vencimiento`
        : 'Plazo procesal vencido',
    detalleDias,
  };
}

export function generarMensajeWhatsApp(
  expediente: string,
  materia: string,
  tipoNotificacion: string,
  diasOtorgados: number,
  fechaVencimiento: string
): string {
  return `🏛️ *PODER JUDICIAL DEL PERÚ - AVISO DE PLAZO JUDICIAL*
📁 *Expediente:* ${expediente}
⚖️ *Materia:* ${materia}
📨 *Modalidad:* Notificación ${tipoNotificacion.toUpperCase()}
⏱️ *Plazo Otorgado:* ${diasOtorgados} días hábiles ${tipoNotificacion === 'electronica' ? '(+2 días hábiles adicionales por ley electrónica)' : '(inicia al día siguiente)'}
🗓️ *FECHA DE VENCIMIENTO:* ${fechaVencimiento} (hasta 23:59 hrs en MPV)

_Cómputo oficial descontando sábados, domingos y feriados judiciales del calendario peruano._`;
}
