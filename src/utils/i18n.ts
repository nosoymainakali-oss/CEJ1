export type Idioma = 'es' | 'qu' | 'ay' | 'en' | 'de' | 'fr';

export interface Traducciones {
  institucion: string;
  subtitulo: string;
  altoContraste: string;
  usuarioLabel: string;
  servidorJudicialLabel: string;
  salir: string;
  pestanaBusqueda: string;
  pestanaExpediente: string;
  pestanaCalculadora: string;
  idiomaLabel: string;
  bienvenido: string;
  tituloBusqueda: string;
  subtituloBusqueda: string;
  buscarPorParte: string;
  buscarPorNomenclatura: string;
  buscarPorNumeroAnio: string;
  ingreseNumExp: string;
  ingreseAnio: string;
  ingreseNomenclatura: string;
  ingresePaterno: string;
  ingreseMaterno: string;
  ingreseNombres: string;
  btnConsultar: string;
  resultados: string;
  sinResultados: string;
  sinResultadosDesc: string;
  nomenclaturaCompleta: string;
  demandante: string;
  demandado: string;
  materia: string;
  resumenEstadio: string;
  btnIngresarExpediente: string;
  volverBusqueda: string;
  expedienteConsultadoPor: string;
  expedienteElectronico: string;
  estadoPrefijo: string;
  juzgadoSede: string;
  distritoJudicial: string;
  materiaDemandada: string;
  especialidad: string;
  magistrados: string;
  juez: string;
  especialista: string;
  fechaInicio: string;
  partesProcesales: string;
  lineaTiempoTitulo: string;
  actuadosJudicialesTitulo: string;
  actuadosDesc: string;
  btnAnadirActuado: string;
  tabResumen: string;
  tabQuechua: string;
  tabAimara: string;
  tabTexto: string;
  tabDocumentos: string;
  resumenTitulo: string;
  fojas: string;
  resolucionFecha: string;
  notificadoFecha: string;
  verDoc: string;
  descargarDoc: string;
  gobiernoDigital: string;
  disclaimer: string;
  trabajoPerteneciente: string;
  estudianteDe: string;
  btnCrearExpediente: string;
  btnEditarExpediente: string;
  agendaJudicial: string; agendaProgramadas: string; registros: string; sinDiligencias: string;
  etiquetaMagistrado: string; etiquetaExpediente: string; accesoJuez: string; accesoJuezDesc: string;
  administrarAgenda: string; administrarAgendaDesc: string; distintivoDigital: string; cabeceraInstitucional: string;
  descargoTitulo: string; descripcionProyecto: string; identificacionInstitucional: string; creditosAcademicos: string;
}

const DICCIONARIO_BASE = {
  es: {
    institucion: 'PODER JUDICIAL DEL PERÚ',
    subtitulo: 'SISTEMA JUDICIAL DIGITAL',
    altoContraste: 'Alto Contraste',
    usuarioLabel: 'Usuario: ',
    servidorJudicialLabel: 'Servidor Judicial: ',
    salir: 'Salir',
    pestanaBusqueda: 'Búsqueda de Expediente',
    pestanaExpediente: 'Ver Expediente',
    pestanaCalculadora: 'Calculadora de Plazos',
    idiomaLabel: 'Idioma',
    bienvenido: 'Bienvenido',
    tituloBusqueda: 'Búsqueda de Expedientes Judiciales',
    subtituloBusqueda: 'Seleccione el método de búsqueda de su preferencia.',
    buscarPorParte: 'Por Nombre de la Parte',
    buscarPorNomenclatura: 'Por Nomenclatura de Expediente',
    buscarPorNumeroAnio: 'Por Número de Expediente y Año',
    ingreseNumExp: 'Ingrese el número de expediente',
    ingreseAnio: 'Ingrese el año',
    ingreseNomenclatura: 'Ingrese la nomenclatura del expediente',
    ingresePaterno: 'Ingrese apellido paterno',
    ingreseMaterno: 'Ingrese apellido materno',
    ingreseNombres: 'Ingrese nombres',
    btnConsultar: 'Consultar',
    resultados: 'Resultados de la Búsqueda',
    sinResultados: 'No se encontraron expedientes con los datos ingresados.',
    sinResultadosDesc: 'Verifique los datos e intente nuevamente.',
    nomenclaturaCompleta: 'NOMENCLATURA COMPLETA',
    demandante: 'DEMANDANTE',
    demandado: 'DEMANDADO',
    materia: 'MATERIA',
    resumenEstadio: 'RESUMEN DEL ESTADÍO',
    btnIngresarExpediente: 'Ingresar al Expediente y Ver Actuados Judiciales',
    volverBusqueda: 'Volver a la Búsqueda de Expedientes',
    expedienteConsultadoPor: 'Expediente consultado por',
    expedienteElectronico: 'EXPEDIENTE ELECTRÓNICO • PODER JUDICIAL DEL PERÚ',
    estadoPrefijo: 'Estado: ',
    juzgadoSede: 'Juzgado / Sede',
    distritoJudicial: 'Distrito Judicial',
    materiaDemandada: 'Materia Demandada',
    especialidad: 'Especialidad',
    magistrados: 'Magistrados',
    juez: 'Jueza',
    especialista: 'Especialista',
    fechaInicio: 'Fecha Inicio',
    partesProcesales: 'Partes Procesales',
    lineaTiempoTitulo: 'LÍNEA DE TIEMPO DEL PROCESO',
    actuadosJudicialesTitulo: 'ACTUACIONES PROCESALES',
    actuadosDesc: 'Actuados emitidos con validación digital única y texto íntegro.',
    btnAnadirActuado: 'Añadir Actuado',
    tabResumen: 'Resumen:',
    tabQuechua: 'Quechua',
    tabAimara: 'Aimara',
    tabTexto: 'Texto Oficial',
    tabDocumentos: 'Documentos',
    resumenTitulo: 'Resumen:',
    fojas: 'Fojas',
    resolucionFecha: 'Resolución',
    notificadoFecha: 'Notificado SINOE',
    verDoc: 'Ver',
    descargarDoc: 'Descargar',
    gobiernoDigital: 'GOBIERNO DIGITAL Y DERECHO INFORMÁTICO',
    disclaimer: '«Esta página web, fue creada con fines estrictamente académicos, las partes que aparecen en el presente expediente son nombres ficticios, y cualquier parecido con la realidad es puro coincidencia.»',
    trabajoPerteneciente: 'Trabajo académico perteneciente a: ',
    estudianteDe: ', estudiante de la Facultad de Ciencias Jurídicas y Políticas de la Universidad Nacional del Altiplano de Puno.',
    agendaJudicial: 'Agenda Judicial', agendaProgramadas: 'Diligencias programadas por magistrado', registros: 'registros', sinDiligencias: 'No hay diligencias programadas.', etiquetaMagistrado: 'Magistrado', etiquetaExpediente: 'Expediente', accesoJuez: 'El Juez Te Escucha', accesoJuezDesc: 'Solicitudes de atención y citas con el magistrado.', administrarAgenda: 'Administración de Agenda de Magistrados', administrarAgendaDesc: 'Registrar, editar y eliminar diligencias sin ingresar al visor de expedientes.', distintivoDigital: 'DIGITAL', cabeceraInstitucional: 'Poder Judicial del Perú • Plataforma de Consulta Judicial • Perú', descargoTitulo: 'Cláusula de descargo y naturaleza académica', descripcionProyecto: 'Proyecto académico para demostrar expedientes electrónicos, lectura accesible, cálculo de plazos y códigos de validación.', identificacionInstitucional: 'Poder Judicial del Perú • Plataforma de Consulta Judicial • Juliaca, Puno', creditosAcademicos: 'Fines estrictamente académicos • Puno, Perú',    btnCrearExpediente: 'Crear Nuevo Expediente',
        agendaJudicial: 'Judicial calendar', agendaProgramadas: 'Hearings scheduled by judge', registros: 'records', sinDiligencias: 'No hearings are scheduled.', etiquetaMagistrado: 'Judge', etiquetaExpediente: 'Case file', accesoJuez: 'The Judge Hears You', accesoJuezDesc: 'Requests for appointments and meetings with the judge.', administrarAgenda: 'Judge Calendar Administration', administrarAgendaDesc: 'Create, edit and delete events without opening a case file.', distintivoDigital: 'DIGITAL', cabeceraInstitucional: 'Judicial Branch of Peru • Judicial Consultation Platform • Peru', descargoTitulo: 'Disclaimer and academic nature', descripcionProyecto: 'Academic project demonstrating electronic case files, accessible reading, deadline calculation and validation codes.', identificacionInstitucional: 'Judicial Branch of Peru • Juliaca, Puno', creditosAcademicos: 'For academic purposes only • Puno, Peru',     agendaJudicial: 'Justizkalender', agendaProgramadas: 'Vom Richter geplante Termine', registros: 'Einträge', sinDiligencias: 'Keine Termine geplant.', etiquetaMagistrado: 'Richter/in', etiquetaExpediente: 'Akte', accesoJuez: 'Der Richter hört Sie an', accesoJuezDesc: 'Anfragen für Termine und Gespräche mit dem Richter.', administrarAgenda: 'Verwaltung des Richterkalenders', administrarAgendaDesc: 'Termine verwalten, ohne eine Akte zu öffnen.', distintivoDigital: 'DIGITAL', cabeceraInstitucional: 'Justiz Perus • Plattform für Justizabfragen • Peru', descargoTitulo: 'Haftungsausschluss und akademischer Hinweis', descripcionProyecto: 'Akademisches Projekt zu elektronischen Akten, barrierefreiem Lesen, Fristberechnung und Prüfcodes.', identificacionInstitucional: 'Justiz Perus • Juliaca, Puno', creditosAcademicos: 'Nur zu akademischen Zwecken • Puno, Peru',     agendaJudicial: 'Agenda judiciaire', agendaProgramadas: 'Audiences programmées par magistrat', registros: 'entrées', sinDiligencias: 'Aucune audience programmée.', etiquetaMagistrado: 'Magistrat', etiquetaExpediente: 'Dossier', accesoJuez: 'Le juge vous écoute', accesoJuezDesc: 'Demandes de rendez-vous avec le magistrat.', administrarAgenda: 'Gestion de l’agenda des magistrats', administrarAgendaDesc: 'Créer, modifier et supprimer des audiences sans ouvrir un dossier.', distintivoDigital: 'NUMÉRIQUE', cabeceraInstitucional: 'Pouvoir judiciaire du Pérou • Plateforme de consultation judiciaire • Pérou', descargoTitulo: 'Avertissement et nature académique', descripcionProyecto: 'Projet académique sur les dossiers électroniques, la lecture accessible, le calcul des délais et les codes de validation.', identificacionInstitucional: 'Pouvoir judiciaire du Pérou • Juliaca, Puno', creditosAcademicos: 'À des fins strictement académiques • Puno, Pérou', btnEditarExpediente: 'Editar Expediente',
  },
  qu: {
    institucion: 'PIRUWPA SUMAQ TARIPAY WASIN',
    subtitulo: 'LLIKAPI TARIPAY LLAMK’AY',
    altoContraste: 'Hatun Qawapay',
    usuarioLabel: 'Runa: ',
    servidorJudicialLabel: 'Taripay Yanapaq: ',
    salir: 'Lluqsiy',
    pestanaBusqueda: 'Qillqa Mask’ay',
    pestanaExpediente: 'Qillqata Qaway',
    pestanaCalculadora: 'P’unchawkuna Yupaq',
    idiomaLabel: 'Rimay',
    bienvenido: 'Allillamchu',
    tituloBusqueda: 'Taripay Qillqakunata Mask’ay',
    subtituloBusqueda: 'Akllay imaynatas qillqaykita mask’anki.',
    buscarPorParte: 'Runaq Sutinwan Mask’ay',
    buscarPorNomenclatura: 'Qillqapa Yupayninwan',
    buscarPorNumeroAnio: 'Yupaywan Watantinwan',
    ingreseNumExp: 'Taripay qillqapa yupayninta churay',
    ingreseAnio: 'Watata churay',
    ingreseNomenclatura: 'Lliw qillqapa sutinta churay',
    ingresePaterno: 'Taytaykipa sutinta churay',
    ingreseMaterno: 'Mamaykipa sutinta churay',
    ingreseNombres: 'Sutiykikunata churay',
    btnConsultar: 'Mask’ay',
    resultados: 'Mask’asqamanta Tarisqakuna',
    sinResultados: 'Manam ima qillqapas tarisqachu churamusqaykiwan.',
    sinResultadosDesc: 'Allinta qhawaspa kaqmanta mask’amuy.',
    nomenclaturaCompleta: 'LLAPANCHASQA YUPAYNIN',
    demandante: 'DEMANDANTE (MAÑAKUQ)',
    demandado: 'DEMANDADO (KUTICHIQ)',
    materia: 'MATERIA (IMA RURAYMANTA)',
    resumenEstadio: 'KUNAN ESTADIOPA PISILLANPI',
    btnIngresarExpediente: 'Qillqaman Yaykuy hinaspa Actuadokunata Qhaway',
    volverBusqueda: 'Qillqa Mask’ayman Kutiy',
    expedienteConsultadoPor: 'Kay qillqata qhawachkan',
    expedienteElectronico: 'LLIKAPI TARIPAY QILLQA • PIRUWPA TARIPAY WASIN',
    estadoPrefijo: 'Estado: ',
    juzgadoSede: 'Juzgado / Taripay Wasi',
    distritoJudicial: 'Taripay Suyu',
    materiaDemandada: 'Mañakusqa Ruray',
    especialidad: 'Especialidad',
    magistrados: 'Juez Kamachiqkuna',
    juez: 'Juez Warmi',
    especialista: 'Especialista Qillqaq',
    fechaInicio: 'Qallarisqan P’unchaw',
    partesProcesales: 'Juiciopi Kaqkuna',
    lineaTiempoTitulo: 'TARIPAY RURAYPA PURIRIYNIN',
    actuadosJudicialesTitulo: 'ACTUACIONES PROCESALES',
    actuadosDesc: 'Qillqasqakuna digital qhawayniyuq lliw taripay nisqawan.',
    btnAnadirActuado: 'Actuadota Yapay',
    tabResumen: 'Resumen:',
    tabQuechua: 'Quechua',
    tabAimara: 'Aimara',
    tabTexto: 'Oficial Qillqasqa',
    tabDocumentos: 'Qillqakuna',
    resumenTitulo: 'Resumen:',
    fojas: 'Rapikuna',
    resolucionFecha: 'Resolución p’unchaw',
    notificadoFecha: 'SINOE Willasqa',
    verDoc: 'Qhaway',
    descargarDoc: 'Urayk’achiy',
    gobiernoDigital: 'DIJITAL KAMACHIY HINASPA DERECHO INFORMÁTICO',
    disclaimer: '«Kay web p’anqaqa yachay wasipi yachakunallapaq rurasqam, lliw sutikunaqa yanqa churamusqallam, chiqapwan rikch’akuyninqa kawsaypa tupanallanmi.»',
    trabajoPerteneciente: 'Yachay llamk’aypa dueñon: ',
    estudianteDe: ', Universidad Nacional del Altiplano de Puno Fac. Ciencias Jurídicas y Políticas nisqamanta yachaq.',
    agendaJudicial: 'Taripay p’unchaw ruraykuna', agendaProgramadas: 'Kamachiqkunapa ruraykuna', registros: 'qillqakuna', sinDiligencias: 'Manam ruraykuna qillqasqachu.', etiquetaMagistrado: 'Kamachiq', etiquetaExpediente: 'Expediente', accesoJuez: 'Juezmi uyarisunki', accesoJuezDesc: 'Kamachiqwan rimanapaq mañakuykuna.', administrarAgenda: 'Kamachiqkunapa agendanta kamachiy', administrarAgendaDesc: 'Expedienteman mana yaykuspa ruraykunata qillqay, allichay, chinkachiy.', distintivoDigital: 'LLIKAPI', cabeceraInstitucional: 'Piruwpa Taripay Wasin • Taripay Qillqakuna • Piruw', descargoTitulo: 'Yachay llamk’ay kasqanpa willakuy', descripcionProyecto: 'Yachay llamk’ay: llikapi qillqakuna, ñawinchay yanapay, p’unchaw yupay hinaspa validación códigos.', identificacionInstitucional: 'Piruwpa Taripay Wasin • Juliaca, Punu', creditosAcademicos: 'Yachaypaqllam • Punu, Piruw',    btnCrearExpediente: 'Musuq Expedienteta Ruray',
    btnEditarExpediente: 'Expedienteta Allichay',
  },
  ay: {
    institucion: 'PERÚ MARKAN TARIPAWIN UTAPA',
    subtitulo: 'LLIKA TARIPAÑA IRNATAWI',
    altoContraste: 'Qhana Uñjaña',
    usuarioLabel: 'Jaqi: ',
    servidorJudicialLabel: 'Taripa Yapuchiri: ',
    salir: 'Mistuña',
    pestanaBusqueda: 'Qillqata Thaqhaña',
    pestanaExpediente: 'Qillqata Uñjaña',
    pestanaCalculadora: 'Urunaka Yupiri',
    idiomaLabel: 'Aru',
    bienvenido: 'Aski urukipana',
    tituloBusqueda: 'Taripaña Qillqatanaka Thaqhaña',
    subtituloBusqueda: 'Kunjams qillqatam thaqhañ munta uk ajlliña.',
    buscarPorParte: 'Sutinimpi Thaqhaña',
    buscarPorNomenclatura: 'Qillqatan Yupayapampi',
    buscarPorNumeroAnio: 'Yupayampi Marampi',
    ingreseNumExp: 'Qillqatana yupayapa uskuña',
    ingreseAnio: 'Marata uskuña',
    ingreseNomenclatura: 'Taqpacha qillqata sutipa uskuña',
    ingresePaterno: 'Awkin sutipa uskuña',
    ingreseMaterno: 'Taykan sutipa uskuña',
    ingreseNombres: 'Sutinaka uskuña',
    btnConsultar: 'Thaqhaña',
    resultados: 'Thaqhata Jikxatatanaka',
    sinResultados: 'Janiw kuna qillqatas jikxataskiti uskutanakampixa.',
    sinResultadosDesc: 'Sumanak uñjasin wasitata thaqham.',
    nomenclaturaCompleta: 'TAQPACHA QILLQATANA YUPAYAPA',
    demandante: 'DEMANDANTE (MAYIRI)',
    demandado: 'DEMANDADO (JAYSIRI)',
    materia: 'MATERIA (KUNATSA TARIPAWIXA)',
    resumenEstadio: 'JICHHA URUTAKI JUK’AMPI QHANANCHAWI',
    btnIngresarExpediente: 'Qillqaru Mantaña ukhamaraki Actuadonaka Uñjaña',
    volverBusqueda: 'Qillqa Thaqhañaru Kutt’aña',
    expedienteConsultadoPor: 'Aka qillqatax uñt’ataw jupanxa',
    expedienteElectronico: 'LLIKAN TARIPAWIN QILLQAPA • PERÚ MARKAN TARIPAWIN UTAPA',
    estadoPrefijo: 'Estado: ',
    juzgadoSede: 'Juzgado / Taripaña Uta',
    distritoJudicial: 'Taripaña Suyu',
    materiaDemandada: 'Mayita Irnaqaña',
    especialidad: 'Especialidad',
    magistrados: 'Taripaña Irpirinaka',
    juez: 'Juez Warmi',
    especialista: 'Qillqa Especialista',
    fechaInicio: 'Qalltawi Uru',
    partesProcesales: 'Taripawin Kaqirinaka',
    lineaTiempoTitulo: 'TARIPAWIN SARAWI PACHAPA',
    actuadosJudicialesTitulo: 'ACTUACIONES PROCESALES',
    actuadosDesc: 'Digital uñstayatanaka taqpach qillqatampi.',
    btnAnadirActuado: 'Mä Actuado Yapaña',
    tabResumen: 'Resumen:',
    tabQuechua: 'Quechua',
    tabAimara: 'Aimara',
    tabTexto: 'Oficial Qillqata',
    tabDocumentos: 'Qillqatanaka',
    resumenTitulo: 'Resumen:',
    fojas: 'Laphanaka',
    resolucionFecha: 'Resolución urupa',
    notificadoFecha: 'SINOE Yatiyata',
    verDoc: 'Uñjaña',
    descargarDoc: 'Apaqaña',
    gobiernoDigital: 'DIGITAL IRNATAWI UKHAMARAKI DERECHO INFORMÁTICO',
    disclaimer: '«Aka web laphiqa yatiqawitakikiw lurt’ata, sutinaka uñstatanakax k’ariskikwa, cheqamp ukhamarux pantasitakiwa.»',
    trabajoPerteneciente: 'Yatiqañ irnaqatax jupankiwa: ',
    estudianteDe: ', Universidad Nacional del Altiplano de Puno Fac. Ciencias Jurídicas y Políticas ukan yatiqiri.',
    agendaJudicial: 'Taripawin agenda', agendaProgramadas: 'Taripirinakana lurawinaka', registros: 'qillqatanaka', sinDiligencias: 'Janiw lurawinakax qillqatäkiti.', etiquetaMagistrado: 'Taripiri', etiquetaExpediente: 'Expediente', accesoJuez: 'Juezax ist’ätam', accesoJuezDesc: 'Taripirimp aruskipañatak mayitanaka.', administrarAgenda: 'Taripirinakana agenda apnaqaña', administrarAgendaDesc: 'Expediente uñjañat jan mantañasa lurawinaka qillqaña, askichaña, chhaqtayaña.', distintivoDigital: 'DIGITAL', cabeceraInstitucional: 'Perú Markan Taripawin Utapa • Taripaña Qillqatanaka • Perú', descargoTitulo: 'Yatiqañataki luratawa', descripcionProyecto: 'Yatiqañataki proyecto: digital expediente, uñjañ yanapt’awi, plazo jakhuña ukhamaraki códigos.', identificacionInstitucional: 'Perú Markan Taripawin Utapa • Juliaca, Puno', creditosAcademicos: 'Yatiqañatakiki • Puno, Perú',    btnCrearExpediente: 'Machaq Expediente Luraña',
    btnEditarExpediente: 'Expediente Askichaña',
  },
};

export const DICCIONARIO: Record<Idioma, Traducciones> = {
  ...DICCIONARIO_BASE,
  en: { ...DICCIONARIO_BASE.es, institucion: 'JUDICIAL POWER OF PERU', subtitulo: 'DIGITAL JUDICIAL SYSTEM', altoContraste: 'High contrast', usuarioLabel: 'User: ', servidorJudicialLabel: 'Judicial staff: ', salir: 'Sign out', pestanaBusqueda: 'Case search', pestanaExpediente: 'Case file', pestanaCalculadora: 'Deadline calculator', idiomaLabel: 'Language', bienvenido: 'Welcome', tituloBusqueda: 'Search judicial cases', btnConsultar: 'Search', resultados: 'Results', sinResultados: 'No results found', demandante: 'Claimant', demandado: 'Defendant', materia: 'Subject', magistrados: 'Judges', juez: 'Judge', especialista: 'Clerk', fechaInicio: 'Start date', partesProcesales: 'Parties', lineaTiempoTitulo: 'PROCEDURAL TIMELINE', actuadosJudicialesTitulo: 'PROCEDURAL ACTIONS', btnAnadirActuado: 'Add action', resumenTitulo: 'Summary', fojas: 'Pages', resolucionFecha: 'Decision date', notificadoFecha: 'Notification date', verDoc: 'View document', descargarDoc: 'Download document' },
  de: { ...DICCIONARIO_BASE.es, institucion: 'JUSTIZ DER REPUBLIK PERU', subtitulo: 'DIGITALES JUSTIZSYSTEM', altoContraste: 'Hoher Kontrast', usuarioLabel: 'Benutzer: ', servidorJudicialLabel: 'Justizpersonal: ', salir: 'Abmelden', pestanaBusqueda: 'Akten suchen', pestanaExpediente: 'Akte', pestanaCalculadora: 'Fristenrechner', idiomaLabel: 'Sprache', bienvenido: 'Willkommen', tituloBusqueda: 'Gerichtsakten suchen', btnConsultar: 'Suchen', resultados: 'Ergebnisse', sinResultados: 'Keine Ergebnisse gefunden', demandante: 'Kläger', demandado: 'Beklagter', materia: 'Gegenstand', magistrados: 'Richter', juez: 'Richter/in', especialista: 'Sachbearbeiter/in', fechaInicio: 'Beginn', partesProcesales: 'Verfahrensparteien', lineaTiempoTitulo: 'VERFAHRENSCHRONOLOGIE', actuadosJudicialesTitulo: 'VERFAHRENSHANDLUNGEN', btnAnadirActuado: 'Handlung hinzufügen', resumenTitulo: 'Zusammenfassung', fojas: 'Seiten', resolucionFecha: 'Entscheidungsdatum', notificadoFecha: 'Zustellungsdatum', verDoc: 'Dokument ansehen', descargarDoc: 'Dokument herunterladen' },
  fr: { ...DICCIONARIO_BASE.es, institucion: 'POUVOIR JUDICIAIRE DU PÉROU', subtitulo: 'SYSTÈME JUDICIAIRE NUMÉRIQUE', altoContraste: 'Contraste élevé', usuarioLabel: 'Utilisateur : ', servidorJudicialLabel: 'Personnel judiciaire : ', salir: 'Déconnexion', pestanaBusqueda: 'Recherche de dossier', pestanaExpediente: 'Dossier judiciaire', pestanaCalculadora: 'Calcul des délais', idiomaLabel: 'Langue', bienvenido: 'Bienvenue', tituloBusqueda: 'Rechercher des dossiers judiciaires', btnConsultar: 'Rechercher', resultados: 'Résultats', sinResultados: 'Aucun résultat trouvé', demandante: 'Demandeur', demandado: 'Défendeur', materia: 'Objet', magistrados: 'Magistrats', juez: 'Juge', especialista: 'Greffier', fechaInicio: 'Date de début', partesProcesales: 'Parties à la procédure', lineaTiempoTitulo: 'CHRONOLOGIE DE LA PROCÉDURE', actuadosJudicialesTitulo: 'ACTES DE PROCÉDURE', btnAnadirActuado: 'Ajouter un acte', resumenTitulo: 'Résumé', fojas: 'Pages', resolucionFecha: 'Date de décision', notificadoFecha: 'Date de notification', verDoc: 'Voir le document', descargarDoc: 'Télécharger le document' }
};