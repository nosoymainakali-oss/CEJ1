export type TipoResolucion = 
  | 'DECRETO' 
  | 'AUTO' 
  | 'SENTENCIA' 
  | 'ESCRITO' 
  | 'NOTIFICACION' 
  | 'OFICIO';

export interface HitoLineaTiempo {
  id: string;
  titulo: string;
  fecha: string;
  descripcion: string;
  estado: 'completado' | 'en_proceso' | 'pendiente';
  orden: number;
}

export interface ArchivoAdjunto {
  id: string;
  nombre: string;
  tamano: string;
  tipo: 'pdf' | 'imagen' | 'doc';
  url?: string;
  dataUrl?: string;
  fechaSubida: string;
  subidoPor?: string;
}

export interface DetalleDiaHabil {
  fecha: string;
  diaSemana: string;
  esHabil: boolean;
  motivoNoHabil?: string;
  numeroDiaHabil?: number;
  esDiasAdicionalesSinoe?: boolean;
}

export interface CalculoPlazo {
  tipoNotificacion: 'fisica' | 'electronica';
  diasOtorgados: number;
  diasTotalesEfectivos: number;
  fechaNotificacion: string;
  fechaInicioComputo: string;
  fechaVencimiento: string;
  diasRestantes: number;
  estado: 'vigente' | 'urgente' | 'vencido' | 'cumplido';
  horasRestantesTexto?: string;
  detalleDias: DetalleDiaHabil[];
}

export interface ResumenSencillo {
  enCristiano: string;
  plazoAbierto: string;
  queHacer: string[];
  terminosExplicados: Array<{ termino: string; significado: string }>;
  explicacionQuechua: string;
  explicacionAimara: string;
}

export interface Resolucion {
  id: string;
  numero: number;
  tipo: TipoResolucion;
  titulo: string;
  fechaResolucion: string;
  fechaNotificacion: string;
  tipoNotificacion?: 'fisica' | 'electronica';
  fojas: number | string;
  sumilla: string;
  contenidoCompleto: string;
  codigoBarras: string;
  codigoQRData?: string;
  archivosAdjuntos: ArchivoAdjunto[];
  resumenSencillo: ResumenSencillo;
  calculoPlazo?: CalculoPlazo;
}

export interface DiligenciaAgenda {
  id: string;
  magistrado: string;
  expedienteNomenclatura: string;
  fecha: string;
  hora: string;
  tipo: 'AUDIENCIA' | 'VISTA_DE_LA_CAUSA' | 'INFORME_ORAL' | 'DILIGENCIA_EXTERNA' | 'CITA_CIUDADANA';
  descripcion: string;
  solicitante?: string;
  dniSolicitante?: string;
  motivo?: string;
}

export interface NotaInterna {
  id: string;
  fecha: string;
  autor: string;
  texto: string;
}

export interface Expediente {
  id: string;
  numeroExpediente: string; // 00140-2026
  nomenclaturaCompleta: string; // 00140-2026-0-2111-JR-LA-02
  distritoJudicial: string; // PUNO
  instancia: string; // 2do JUZGADO DE TRABAJO ZONA NORTE - JULIACA
  juez: string; // LEYDI KAREN QUISPE ROJAS
  secretario: string; // WILMER LIZARDO JORGE HUARACHA
  especialidad: string; // LABORAL - CONTENCIOSO ADMINISTRATIVO
  materia: string; // INVALIDEZ DE CONTRATO CAS, RECONOCIMIENTO COMO TRABAJADOR BAJO EL RÉGIMEN DEL DECRETO LEGISLATIVO 728...
  estadoProcesal: string; // ELEVADO A LA SALA LABORAL MIXTA DE PUNO
  demandante: string; // EDUARDO LUISMARIO MEDINA HUMPIRI
  dniDemandante: string; // 75412933
  demandado: string; // MUNICIPALIDAD PROVINCIAL DE SAN ROMAN, REPRESENTADO POR SU PROCURADOR PÚBLICO
  fechaInicio: string; // 11/02/2026
  cuantia?: string;
  etiquetas: string[];
  clienteNombre?: string;
  notasInternas: NotaInterna[];
  lineaTiempo: HitoLineaTiempo[];
  resoluciones: Resolucion[];
}

export type RolUsuario = 'editor' | 'consultor';
export type Idioma = 'es' | 'qu' | 'ay' | 'sh' | 'en' | 'de' | 'fr';
