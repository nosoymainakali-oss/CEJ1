import { DiligenciaAgenda } from '../types/judicial';

/**
 * Diligencias civiles de ejemplo (datos ficticios) para el Distrito Judicial de Puno (código 2101).
 * Nomenclatura: NÚMERO-AÑO-0-2101-JR-CI-JUZGADO (JR-CI = Juzgado Civil).
 * Los identificadores empiezan con "sem-civ-" para poder reconocerlos y no duplicarlos.
 */
export const PREFIJO_SEMILLA_CIVIL = 'sem-civ-';

export const DILIGENCIAS_CIVILES_PUNO: DiligenciaAgenda[] = [
  // Sebastian Alberto Tapia Tito, 1.er Juzgado Civil de Puno
  { id: 'sem-civ-01', magistrado: 'Sebastian Alberto Tapia Tito', expedienteNomenclatura: '00312-2026-0-2101-JR-CI-01', fecha: '2026-10-14', hora: '09:00', tipo: 'AUDIENCIA_DE_CONCILIACION', descripcion: 'Audiencia de saneamiento, conciliación y fijación de puntos controvertidos. Proceso de obligación de dar suma de dinero. 1.er Juzgado Civil de Puno.' },
  { id: 'sem-civ-02', magistrado: 'Sebastian Alberto Tapia Tito', expedienteNomenclatura: '00198-2026-0-2101-JR-CI-01', fecha: '2026-10-21', hora: '10:30', tipo: 'INSPECCION_JUDICIAL', descripcion: 'Inspección judicial del predio en proceso de prescripción adquisitiva de dominio. 1.er Juzgado Civil de Puno.' },
  { id: 'sem-civ-03', magistrado: 'Sebastian Alberto Tapia Tito', expedienteNomenclatura: '00245-2025-0-2101-JR-CI-01', fecha: '2026-11-05', hora: '09:30', tipo: 'AUDIENCIA_DE_PRUEBAS', descripcion: 'Audiencia de pruebas en proceso de desalojo por ocupación precaria. 1.er Juzgado Civil de Puno.' },
  { id: 'sem-civ-04', magistrado: 'Sebastian Alberto Tapia Tito', expedienteNomenclatura: '00421-2026-0-2101-JR-CI-01', fecha: '2026-11-18', hora: '11:00', tipo: 'AUDIENCIA_UNICA', descripcion: 'Audiencia única en proceso de otorgamiento de escritura pública. 1.er Juzgado Civil de Puno.' },
  { id: 'sem-civ-05', magistrado: 'Sebastian Alberto Tapia Tito', expedienteNomenclatura: '00156-2025-0-2101-JR-CI-01', fecha: '2026-12-03', hora: '08:45', tipo: 'LECTURA_DE_SENTENCIA', descripcion: 'Lectura de sentencia en proceso de mejor derecho de propiedad. 1.er Juzgado Civil de Puno.' },

  // Leydi Karen Quispe Rojas, 2.º Juzgado Civil de Puno
  { id: 'sem-civ-06', magistrado: 'Leydi Karen Quispe Rojas', expedienteNomenclatura: '00287-2026-0-2101-JR-CI-02', fecha: '2026-10-15', hora: '10:00', tipo: 'AUDIENCIA_DE_CONCILIACION', descripcion: 'Audiencia de saneamiento y conciliación en proceso de división y partición de bien común. 2.º Juzgado Civil de Puno.' },
  { id: 'sem-civ-07', magistrado: 'Leydi Karen Quispe Rojas', expedienteNomenclatura: '00133-2026-0-2101-JR-CI-02', fecha: '2026-10-27', hora: '15:00', tipo: 'AUDIENCIA_DE_PRUEBAS', descripcion: 'Audiencia de pruebas en proceso de nulidad de acto jurídico. 2.º Juzgado Civil de Puno.' },
  { id: 'sem-civ-08', magistrado: 'Leydi Karen Quispe Rojas', expedienteNomenclatura: '00374-2026-0-2101-JR-CI-02', fecha: '2026-11-10', hora: '09:00', tipo: 'INSPECCION_JUDICIAL', descripcion: 'Inspección judicial en interdicto de retener posesión. 2.º Juzgado Civil de Puno.' },
  { id: 'sem-civ-09', magistrado: 'Leydi Karen Quispe Rojas', expedienteNomenclatura: '00459-2026-0-2101-JR-CI-02', fecha: '2026-11-24', hora: '11:30', tipo: 'AUDIENCIA_UNICA', descripcion: 'Audiencia única en proceso de desalojo por falta de pago. 2.º Juzgado Civil de Puno.' },
  { id: 'sem-civ-10', magistrado: 'Leydi Karen Quispe Rojas', expedienteNomenclatura: '00201-2025-0-2101-JR-CI-02', fecha: '2026-12-11', hora: '10:15', tipo: 'LECTURA_DE_SENTENCIA', descripcion: 'Lectura de sentencia en proceso de reivindicación. 2.º Juzgado Civil de Puno.' },

  // Marco Antonio Ticona Miranda, 3.er Juzgado Civil de Puno
  { id: 'sem-civ-11', magistrado: 'Marco Antonio Ticona Miranda', expedienteNomenclatura: '00265-2026-0-2101-JR-CI-03', fecha: '2026-10-16', hora: '11:00', tipo: 'AUDIENCIA_DE_CONCILIACION', descripcion: 'Audiencia de saneamiento y conciliación en proceso de indemnización por daños y perjuicios. 3.er Juzgado Civil de Puno.' },
  { id: 'sem-civ-12', magistrado: 'Marco Antonio Ticona Miranda', expedienteNomenclatura: '00178-2026-0-2101-JR-CI-03', fecha: '2026-10-29', hora: '09:30', tipo: 'AUDIENCIA_DE_PRUEBAS', descripcion: 'Audiencia de pruebas en proceso de tercería de propiedad. 3.er Juzgado Civil de Puno.' },
  { id: 'sem-civ-13', magistrado: 'Marco Antonio Ticona Miranda', expedienteNomenclatura: '00098-2025-0-2101-JR-CI-03', fecha: '2026-11-12', hora: '14:30', tipo: 'DILIGENCIA_DE_LANZAMIENTO', descripcion: 'Diligencia de lanzamiento en ejecución de sentencia de desalojo. 3.er Juzgado Civil de Puno.' },
  { id: 'sem-civ-14', magistrado: 'Marco Antonio Ticona Miranda', expedienteNomenclatura: '00432-2026-0-2101-JR-CI-03', fecha: '2026-11-26', hora: '10:00', tipo: 'AUDIENCIA_UNICA', descripcion: 'Audiencia única en proceso de resolución de contrato de arrendamiento. 3.er Juzgado Civil de Puno.' },
  { id: 'sem-civ-15', magistrado: 'Marco Antonio Ticona Miranda', expedienteNomenclatura: '00212-2026-0-2101-JR-CI-03', fecha: '2026-12-14', hora: '09:00', tipo: 'LECTURA_DE_SENTENCIA', descripcion: 'Lectura de sentencia en proceso de resolución de contrato. 3.er Juzgado Civil de Puno.' },
];
