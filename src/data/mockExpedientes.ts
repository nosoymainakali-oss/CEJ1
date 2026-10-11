import { Expediente } from '../types/judicial';
import { calcularPlazoConReglas } from '../utils/peruLegalDeadlines';

export const INITIAL_EXPEDIENTES: Expediente[] = [
  {
    id: 'exp-00140-2026',
    numeroExpediente: '00140-2026',
    nomenclaturaCompleta: '00140-2026-0-2111-JR-LA-02',
    distritoJudicial: 'PUNO',
    instancia: '2do JUZGADO DE TRABAJO ZONA NORTE - JULIACA',
    juez: 'LEYDI KAREN QUISPE ROJAS',
    secretario: 'WILMER LIZARDO JORGE HUARACHA',
    especialidad: 'LABORAL - CONTENCIOSO ADMINISTRATIVO',
    materia:
      'INVALIDEZ DE CONTRATO CAS, RECONOCIMIENTO COMO TRABAJADOR BAJO EL RÉGIMEN DEL DECRETO LEGISLATIVO 728 CON CONTRATO DE TRABAJO A PLAZO INDETERMINADO, PAGO DE DERECHOS LABORES E INDEMNIZACIÓN POR DAÑOS Y PERJUICIOS',
    estadoProcesal: 'ELEVADO A LA SALA LABORAL MIXTA DE PUNO',
    demandante: 'EDUARDO LUISMARIO MEDINA HUMPIRI',
    dniDemandante: '75412933',
    demandado: 'MUNICIPALIDAD PROVINCIAL DE SAN ROMAN, REPRESENTADO POR SU PROCURADOR PÚBLICO',
    fechaInicio: '11/02/2026',
    cuantia: 'S/ 78,920.00 (MÁS BENEFICIOS SOCIALES)',
    etiquetas: ['Proceso Principal', 'Laboral 728', 'San Román Juliaca', 'En Sala Mixta'],
    clienteNombre: 'Eduardo Luismario Medina Humpiri',
    notasInternas: [
      {
        id: 'n-1',
        fecha: '11/02/2026',
        autor: 'Eduardo Luismario Medina Humpiri',
        texto: 'Demanda ingresada por Mesa de Partes Electrónica solicitando la desnaturalización de contratos CAS e incorporación al régimen de la actividad privada D.Leg. 728.',
      },
      {
        id: 'n-2',
        fecha: '28/09/2026',
        autor: 'Eduardo Luismario Medina Humpiri',
        texto: 'El expediente fue formalmente elevado a la Sala Laboral Mixta de Puno. Solicitar oportunamente el uso de la palabra para el informe oral.',
      },
    ],
    lineaTiempo: [
      {
        id: 'hito-1',
        titulo: 'Interposición de Demanda Laboral',
        fecha: '2026-02-11',
        descripcion: 'Ingreso de la demanda laboral contra la Municipalidad Provincial de San Román sobre invalidez de contratos CAS y reconocimiento bajo el D.Leg. 728.',
        estado: 'completado',
        orden: 1,
      },
      {
        id: 'hito-2',
        titulo: 'Auto Admisorio (Resolución N° 01)',
        fecha: '2026-02-25',
        descripcion: 'El 2do Juzgado de Trabajo Zona Norte - Juliaca admite la demanda y corre traslado al Procurador Público de la Municipalidad por diez días.',
        estado: 'completado',
        orden: 2,
      },
      {
        id: 'hito-3',
        titulo: 'Contestación de Demanda por Procuraduría',
        fecha: '2026-03-24',
        descripcion: 'La Procuraduría Municipal absuelve el traslado contradiciendo los extremos de la pretensión laboral.',
        estado: 'completado',
        orden: 3,
      },
      {
        id: 'hito-4',
        titulo: 'Audiencia Única de Juzgamiento',
        fecha: '2026-05-28',
        descripcion: 'Actuación de pruebas documentales, exhibición de planillas y boletas de pago ante la jueza Leydi Karen Quispe Rojas.',
        estado: 'completado',
        orden: 4,
      },
      {
        id: 'hito-5',
        titulo: 'Sentencia de Primera Instancia (Res N° 04)',
        fecha: '2026-07-20',
        descripcion: 'SENTENCIA DECLARA FUNDADA EN PARTE la demanda: Invalidez de contratos CAS y reconocimiento como trabajador a plazo indeterminado bajo el régimen 728.',
        estado: 'completado',
        orden: 5,
      },
      {
        id: 'hito-6',
        titulo: 'Recurso de Apelación Municipal',
        fecha: '2026-08-03',
        descripcion: 'La Municipalidad Provincial de San Román interpone recurso de apelación contra la sentencia estimatoria.',
        estado: 'completado',
        orden: 6,
      },
      {
        id: 'hito-7',
        titulo: 'Auto Concesorio y Elevación a Sala Laboral Mixta de Puno',
        fecha: '2026-09-28',
        descripcion: 'Se concede la apelación con efecto suspensivo y se dispone la elevación inmediata de los autos electrónicos a la Sala Laboral Mixta de Puno.',
        estado: 'en_proceso',
        orden: 7,
      },
      {
        id: 'hito-8',
        titulo: 'Vista de la Causa e Informe Oral en Sala Laboral de Puno',
        fecha: '2026-11-20',
        descripcion: 'Programación de vista de la causa con informe oral de los abogados defensores ante los señores Jueces Superiores.',
        estado: 'pendiente',
        orden: 8,
      },
    ],
    resoluciones: [
      {
        id: 'res-1',
        numero: 1,
        tipo: 'AUTO',
        titulo: 'AUTO ADMISORIO DE DEMANDA LABORAL',
        fechaResolucion: '2026-02-25',
        fechaNotificacion: '2026-03-02',
        fojas: 28,
        sumilla: 'ADMITIR a trámite la demanda contencioso administrativa laboral interpuesta por don Eduardo Luismario Medina Humpiri contra la Municipalidad Provincial de San Román.',
        contenidoCompleto: `CORTE SUPERIOR DE JUSTICIA DE PUNO
SEGUNDO JUZGADO DE TRABAJO ZONA NORTE - JULIACA
EXPEDIENTE: 00140-2026-0-2111-JR-LA-02
JUEZ: LEYDI KAREN QUISPE ROJAS
ESPECIALISTA: WILMER LIZARDO JORGE HUARACHA

AUTO ADMISORIO N° 01-2026

Juliaca, veinticinco de febrero de dos mil veintiséis.-

AUTOS Y VISTOS: La demanda laboral contencioso administrativa interpuesta por don EDUARDO LUISMARIO MEDINA HUMPIRI, con DNI N° 75412933; y CONSIDERANDO:
Primero: Que, el accionante solicita la declaración judicial de invalidez de los contratos administrativos de servicios (CAS) suscritos con la demandada, el reconocimiento como trabajador a plazo indeterminado sujeto al régimen del Texto Único Ordenado del Decreto Legislativo N° 728, y el reintegro de derechos laborales.
Segundo: Que, la demanda reúne los requisitos de admisibilidad contemplados en el Texto Único Ordenado de la Ley N° 27584 y normas complementarias.
Por tales fundamentos; SE RESUELVE:
1. ADMITIR A TRÁMITE la demanda en la vía del PROCESO ESPECIAL.
2. CÓRRASE TRASLADO de la demanda y sus recaudos a la demandada MUNICIPALIDAD PROVINCIAL DE SAN ROMÁN y a su Procurador Público, por el plazo perentorio de DIEZ DÍAS HÁBILES, a fin de que cumplan con contestar la demanda.
3. TÉNGASE por fijado el domicilio procesal y casilla electrónica SINOE del demandante. Notifíquese.`,
        codigoBarras: 'PJ-2111-2026-00140-001-75412933',
        codigoQRData: 'PJ-PERU|EXP:00140-2026-0-2111-JR-LA-02|RES:01|DTE:EDUARDO LUISMARIO MEDINA HUMPIRI|DNI:75412933|JUEZ:LEYDI KAREN QUISPE ROJAS',
        archivosAdjuntos: [
          {
            id: 'arch-1',
            nombre: 'Resolucion_01_AutoAdmisorio_Exp00140-2026.pdf',
            tamano: '1.6 MB',
            tipo: 'pdf',
            fechaSubida: '2026-03-02',
            subidoPor: 'Juzgado de Trabajo Juliaca',
          },
          {
            id: 'arch-2',
            nombre: 'Cedula_Electronica_Notificacion_Admisorio.pdf',
            tamano: '380 KB',
            tipo: 'pdf',
            fechaSubida: '2026-03-02',
            subidoPor: 'SINOE Notificaciones',
          },
        ],
        resumenSencillo: {
          enCristiano:
            'La jueza Leydi Karen Quispe Rojas revisó la demanda de Eduardo Luismario Medina Humpiri, constató que cumple con todos los requisitos de ley y la admitió formalmente a trámite. Ordenó notificar a la Municipalidad Provincial de San Román para que conteste en el plazo legal de 10 días.',
          plazoAbierto:
            'Otorga a la Municipalidad Provincial de San Román diez (10) días hábiles judiciales para contestar la demanda.',
          queHacer: [
            'Verificar la correcta entrega de la cédula de notificación a la Procuraduría Municipal.',
            'Preparar la estrategia frente a las excepciones que formule el municipio.',
          ],
          terminosExplicados: [
            { termino: 'Auto Admisorio', significado: 'Resolución judicial que da inicio formal al juicio por cumplir todos los requisitos legales.' },
            { termino: 'Procurador Público', significado: 'Abogado que representa y defiende los intereses del Estado y la Municipalidad.' },
          ],
          explicacionQuechua:
            'Juez Leydi Karen Quispe Rojas Eduardo Luismario Medina Humpiriq demandanta chaskiykun. San Román Municipalidadta chunka p’unchaypi kutichinanta kamachin.',
          explicacionAimara:
            'Juez Leydi Karen Quispe Rojas Eduardo Luismario Medina Humpirin demandaparu arsuwayi. San Román Alcalditaru tunka uru churi kutiyiñataki.',
        },
        calculoPlazo: calcularPlazoConReglas('2026-03-02', 10, 'electronica'),
      },
      {
        id: 'res-2',
        numero: 2,
        tipo: 'DECRETO',
        titulo: 'DECRETO DE MÉRITO Y TRASLADO DE CONTESTACIÓN DE DEMANDA',
        fechaResolucion: '2026-04-06',
        fechaNotificacion: '2026-04-10',
        fojas: 64,
        sumilla: 'Al escrito de contestación de demanda presentado por la Procuraduría Pública Municipal: TÉNGASE por apersonada y contestada la demanda. Póngase en conocimiento.',
        contenidoCompleto: `Juliaca, seis de abril de dos mil veintiséis. AUTOS Y VISTOS: Téngase por apersonado al Procurador Público de la Municipalidad Provincial de San Román, por señalado su domicilio procesal y por contestada la demanda en los términos expuestos; al principal y otrosíes: PÓNGASE a conocimiento del demandante don Eduardo Luismario Medina Humpiri por el término de TRES DÍAS; Notifíquese vía SINOE.`,
        codigoBarras: 'PJ-2111-2026-00140-002-75412933',
        codigoQRData: 'PJ-PERU|EXP:00140-2026-0-2111-JR-LA-02|RES:02|TIPO:DECRETO|DTE:EDUARDO LUISMARIO MEDINA HUMPIRI',
        archivosAdjuntos: [
          {
            id: 'arch-3',
            nombre: 'Resolucion_02_Decreto_TrasladoContestacion.pdf',
            tamano: '820 KB',
            tipo: 'pdf',
            fechaSubida: '2026-04-10',
          },
        ],
        resumenSencillo: {
          enCristiano:
            'El municipio presentó su respuesta oponiéndose a la demanda laboral. El juzgado la tiene por presentada y le da copia a Eduardo Luismario Medina Humpiri para su conocimiento.',
          plazoAbierto: 'Plazo de 3 días para absolver cualquier cuestión accesoria formulada.',
          queHacer: [
            'Revisar los argumentos de la contestación municipal.',
            'Preparar los alegatos para la audiencia de juzgamiento.',
          ],
          terminosExplicados: [
            { termino: 'Póngase a conocimiento', significado: 'Notificar una copia del documento a la contraparte para que se entere.' },
          ],
          explicacionQuechua:
            'Municipalidad papelninta churan manan pagayta munaspa. Juez chay papelta Eduardo Luismario Medina Humpiriman willachin.',
          explicacionAimara:
            'Alcaldiax janiw sawayiti, qillqata apani. Juezax Eduardo Luismario Medina Humpiriru yatiyi uka amuyt’ata.',
        },
        calculoPlazo: calcularPlazoConReglas('2026-04-10', 3, 'electronica'),
      },
      {
        id: 'res-3',
        numero: 3,
        tipo: 'AUTO',
        titulo: 'AUTO DE CITACIÓN A AUDIENCIA ÚNICA DE JUZGAMIENTO',
        fechaResolucion: '2026-05-04',
        fechaNotificacion: '2026-05-08',
        fojas: 82,
        sumilla: 'CÍTESE a las partes a Audiencia Única para el día 28 de mayo de 2026 a horas 10:30 a.m. a realizarse mediante la plataforma Google Meet.',
        contenidoCompleto: `Juliaca, cuatro de mayo de dos mil veintiséis. SE RESUELVE: CITAR a las partes procesales a la AUDIENCIA ÚNICA DE JUZGAMIENTO para el día VEINTIOCHO DE MAYO DE DOS MIL VEINTISÉIS a horas DIEZ Y MEDIA DE LA MAÑANA (10:30 A.M.), la misma que se llevará a cabo a través del enlace de Google Meet. Notifíquese con apercibimiento de ley.`,
        codigoBarras: 'PJ-2111-2026-00140-003-75412933',
        codigoQRData: 'PJ-PERU|EXP:00140-2026-0-2111-JR-LA-02|RES:03|AUDIENCIA:2026-05-28|JUEZ:LEYDI KAREN QUISPE ROJAS',
        archivosAdjuntos: [
          {
            id: 'arch-4',
            nombre: 'Resolucion_03_CitacionAudiencia_GoogleMeet.pdf',
            tamano: '940 KB',
            tipo: 'pdf',
            fechaSubida: '2026-05-08',
          },
        ],
        resumenSencillo: {
          enCristiano:
            'La jueza fijó fecha para la audiencia virtual donde ambas partes debatirán las pruebas sobre los contratos CAS y el régimen laboral 728.',
          plazoAbierto: 'Conexión obligatoria en la fecha y hora fijada.',
          queHacer: [
            'Probar la conexión de cámara y audio.',
            'Tener a la mano copia del DNI 75412933 y los contratos de trabajo.',
          ],
          terminosExplicados: [
            { termino: 'Audiencia Única', significado: 'Acto judicial central donde se debaten y actúan todas las pruebas del juicio.' },
          ],
          explicacionQuechua:
            'Juez wajan llapa runakunata internetpi tantanakunankupaq 28 de mayo p’unchaypi pruebakunata uyarispanku.',
          explicacionAimara:
            'Juezax arsuwa internet tuqi tantachasiñataki 28 uru mayo phaxsitana yanakampi qillqatanakampi uñacht’ayañataki.',
        },
        calculoPlazo: calcularPlazoConReglas('2026-05-08', 3, 'electronica'),
      },
      {
        id: 'res-4',
        numero: 4,
        tipo: 'SENTENCIA',
        titulo: 'SENTENCIA N° 45-2026 QUE DECLARA FUNDADA EN PARTE LA DEMANDA LABORAL',
        fechaResolucion: '2026-07-20',
        fechaNotificacion: '2026-07-24',
        fojas: 120,
        sumilla: 'FALLA: DECLARANDO FUNDADA EN PARTE la demanda laboral interpuesta por don Eduardo Luismario Medina Humpiri. DECLARA la invalidez de los contratos CAS e INCORPÓRASELE bajo el régimen del D.Leg. 728.',
        contenidoCompleto: `CORTE SUPERIOR DE JUSTICIA DE PUNO
SEGUNDO JUZGADO DE TRABAJO ZONA NORTE - JULIACA
EXPEDIENTE: 00140-2026-0-2111-JR-LA-02
JUEZ: LEYDI KAREN QUISPE ROJAS
ESPECIALISTA: WILMER LIZARDO JORGE HUARACHA

SENTENCIA N° 45-2026

Juliaca, veinte de julio de dos mil veintiséis.-

VISTOS: Los actuados que obran en el expediente judicial de autos;
CONSIDERANDO:
Primero: Que, el demandante Eduardo Luismario Medina Humpiri prestó servicios personales y subordinados para la Municipalidad Provincial de San Román bajo contratos CAS fraudulentos.
Segundo: Que, conforme al principio de primacía de la realidad, sus labores fueron permanentes y sujetas a fiscalización y horario de trabajo.
Por estos fundamentos, administrando justicia a nombre de la Nación:

FALLA:
1. DECLARANDO FUNDADA EN PARTE la demanda interpuesta por don EDUARDO LUISMARIO MEDINA HUMPIRI (DNI N° 75412933) contra la MUNICIPALIDAD PROVINCIAL DE SAN ROMÁN.
2. DECLARO LA INVALIDEZ Y DESNATURALIZACIÓN de los contratos administrativos de servicios (CAS) suscritos entre las partes.
3. RECONOZCO al demandante como TRABAJADOR A PLAZO INDETERMINADO sujeto al régimen laboral de la actividad privada regulado por el DECRETO LEGISLATIVO N° 728.
4. ORDENO a la Municipalidad Provincial de San Román cumpla con incorporar al demandante en sus planillas de remuneraciones bajo el régimen del D.Leg. 728 y abonar el reintegro de beneficios laborales más intereses legales.
5. NOTIFÍQUESE conforme a ley en la casilla judicial SINOE.`,
        codigoBarras: 'PJ-2111-2026-00140-004-75412933',
        codigoQRData: 'PJ-PERU|EXP:00140-2026-0-2111-JR-LA-02|SENTENCIA:45-2026|FALLA:FUNDADA EN PARTE|DTE:EDUARDO LUISMARIO MEDINA HUMPIRI|REGIMEN:D.LEG 728|JUEZ:LEYDI KAREN QUISPE ROJAS',
        archivosAdjuntos: [
          {
            id: 'arch-5',
            nombre: 'Sentencia_N45-2026_Fundada_Reconocimiento728_FirmaDigital.pdf',
            tamano: '3.4 MB',
            tipo: 'pdf',
            fechaSubida: '2026-07-24',
            subidoPor: 'Juzgado de Trabajo Juliaca - Firma Digital',
          },
          {
            id: 'arch-6',
            nombre: 'Cedula_SINOE_Notificacion_Sentencia_45.pdf',
            tamano: '480 KB',
            tipo: 'pdf',
            fechaSubida: '2026-07-24',
          },
        ],
        resumenSencillo: {
          enCristiano:
            '¡VICTORIA JUDICIAL PARA EDUARDO LUISMARIO MEDINA HUMPIRI! La jueza Leydi Karen Quispe Rojas declaró la invalidez de los contratos CAS fraudulentos y ordenó a la Municipalidad Provincial de San Román reconocerlo como trabajador con contrato a plazo indeterminado bajo el régimen laboral 728, más el pago de sus derechos y beneficios adeudados.',
          plazoAbierto:
            'La Municipalidad dispone de CINCO (5) DÍAS HÁBILES judiciales para apelar la sentencia ante la Sala Laboral de Puno.',
          queHacer: [
            'Calcular el vencimiento del plazo de apelación de la Municipalidad.',
            'En caso de que apelen, preparar la defensa ante la Sala Laboral Mixta de Puno.',
          ],
          terminosExplicados: [
            { termino: 'Régimen 728', significado: 'Régimen laboral de la actividad privada que brinda estabilidad laboral indeterminada y todos los beneficios de ley.' },
            { termino: 'Primacía de la Realidad', significado: 'Principio por el cual los hechos reales tienen mayor valor que los papeles o contratos CAS firmados.' },
          ],
          explicacionQuechua:
            '¡EDUARDO LUISMARIO MEDINA HUMPIRI ATIPANMI! Juez Leydi Karen Quispe Rojas kamachin Municipalidadta CAS contratos p’akiyta, hinaspa D.Leg. 728 leypi wiñaypaq llank’ananta churanankupaq lliw qullqinwan.',
          explicacionAimara:
            '¡EDUARDO LUISMARIO MEDINA HUMPIRI ATIPXIWA! Juezax kamachiwa CAS contratos q’al chhaqtayaña, ukatxa D.Leg. 728 kamachimpi wiñayatak irnaqirit uñt’ayañataki qullqinakapampi.',
        },
        calculoPlazo: calcularPlazoConReglas('2026-07-24', 5, 'electronica'),
      },
      {
        id: 'res-5',
        numero: 5,
        tipo: 'ESCRITO',
        titulo: 'ESCRITO DE RECURSO DE APELACIÓN DE LA PROCURADURÍA MUNICIPAL',
        fechaResolucion: '2026-08-03',
        fechaNotificacion: '2026-08-07',
        fojas: 135,
        sumilla: 'Procurador Público de la Municipalidad Provincial de San Román interpone recurso de apelación contra la Sentencia N° 45-2026.',
        contenidoCompleto: `SUMILLA: INTERPONE RECURSO DE APELACIÓN CONTRA SENTENCIA N° 45-2026
SEÑORA JUEZA DEL SEGUNDO JUZGADO DE TRABAJO ZONA NORTE - JULIACA
La Procuraduría Pública de la Municipalidad Provincial de San Román, en los seguidos por Eduardo Luismario Medina Humpiri; interpone recurso de apelación solicitando se revoque la sentencia y se declare infundada la demanda.`,
        codigoBarras: 'PJ-2111-2026-00140-005-75412933',
        codigoQRData: 'PJ-PERU|EXP:00140-2026-0-2111-JR-LA-02|ESCRITO:APELACION|PARTE:MUNICIPALIDAD SAN ROMAN',
        archivosAdjuntos: [
          {
            id: 'arch-7',
            nombre: 'Escrito_Apelacion_Procuraduria_SanRoman.pdf',
            tamano: '1.9 MB',
            tipo: 'pdf',
            fechaSubida: '2026-08-07',
          },
        ],
        resumenSencillo: {
          enCristiano:
            'La Municipalidad no conforme con el fallo presentó su recurso de apelación buscando que una instancia superior anule o revoque el reconocimiento laboral de Eduardo Luismario Medina Humpiri.',
          plazoAbierto: 'El juzgado debe calificar la procedencia del recurso de apelación.',
          queHacer: [
            'Esperar la emisión del auto que concede la apelación y ordena la elevación.',
          ],
          terminosExplicados: [
            { termino: 'Apelación', significado: 'Pedido para que jueces superiores revisen la decisión de primera instancia.' },
          ],
          explicacionQuechua:
            'Municipalidadqa apelan kuraq juezkunaman kutt’ananpaq.',
          explicacionAimara:
            'Alcaldiax jach’a jilatanakaruw apeli sentencia kutt’ayañataki.',
        },
        calculoPlazo: calcularPlazoConReglas('2026-08-07', 3, 'electronica'),
      },
      {
        id: 'res-6',
        numero: 6,
        tipo: 'AUTO',
        titulo: 'AUTO QUE CONCEDE APELACIÓN Y DISPONE ELEVACIÓN A SALA LABORAL MIXTA DE PUNO',
        fechaResolucion: '2026-09-28',
        fechaNotificacion: '2026-10-02',
        fojas: 148,
        sumilla: 'CONCEDER la apelación interpuesta por la demandada CON EFECTO SUSPENSIVO. ELÉVENSE los actuados a la Sala Laboral Mixta de Puno.',
        contenidoCompleto: `CORTE SUPERIOR DE JUSTICIA DE PUNO
SEGUNDO JUZGADO DE TRABAJO ZONA NORTE - JULIACA
EXPEDIENTE: 00140-2026-0-2111-JR-LA-02
JUEZ: LEYDI KAREN QUISPE ROJAS
ESPECIALISTA: WILMER LIZARDO JORGE HUARACHA

AUTO N° 06-2026

Juliaca, veintiocho de septiembre de dos mil veintiséis.-

AUTOS Y VISTOS: El recurso de apelación interpuesto por el Procurador Público de la Municipalidad Provincial de San Román; y CONSIDERANDO: Que el recurso ha sido presentado dentro del plazo de ley; SE RESUELVE:
1. CONCEDER CON EFECTO SUSPENSIVO la apelación interpuesta contra la Sentencia N° 45-2026.
2. DISPONER LA ELEVACIÓN INMEDIATA de los autos a la SALA LABORAL MIXTA DE PUNO de la Corte Superior de Justicia de Puno, para los fines de ley. Notifíquese.`,
        codigoBarras: 'PJ-2111-2026-00140-006-75412933',
        codigoQRData: 'PJ-PERU|EXP:00140-2026-0-2111-JR-LA-02|RES:06|ESTADO:ELEVADO A LA SALA LABORAL MIXTA DE PUNO|DTE:EDUARDO LUISMARIO MEDINA HUMPIRI',
        archivosAdjuntos: [
          {
            id: 'arch-8',
            nombre: 'Resolucion_06_AutoConcesorio_Elevacion_SalaLaboralPuno.pdf',
            tamano: '1.4 MB',
            tipo: 'pdf',
            fechaSubida: '2026-10-02',
          },
        ],
        resumenSencillo: {
          enCristiano:
            '¡ESTADO ACTUAL DEL PROCESO! La jueza concedió la apelación y ordenó el envío formal de todo el expediente electrónico a los magistrados de la Sala Laboral Mixta de Puno para que ellos confirmen la sentencia favorable a Eduardo Luismario Medina Humpiri.',
          plazoAbierto:
            'El expediente se encuentra elevado en la Sala Laboral Mixta de Puno. Próximamente se fijará fecha para la Vista de la Causa e Informe Oral.',
          queHacer: [
            'Seguir el ingreso del cuaderno a la Sala Laboral Mixta de Puno.',
            'Presentar escrito pidiendo uso de la palabra para el informe oral del letrado.',
          ],
          terminosExplicados: [
            { termino: 'Elevación de Autos', significado: 'Remisión de todo el expediente judicial hacia el tribunal de segunda instancia en la ciudad de Puno.' },
            { termino: 'Efecto Suspensivo', significado: 'La sentencia se pausa temporalmente mientras los jueces superiores resuelven la apelación.' },
          ],
          explicacionQuechua:
            '¡KUNAN TIEMPOPI! Juezqa llapa papelta Puno llaqtaman apachin (Sala Laboral Mixta de Puno) chaypi kuraq juezkuna sentenciata hunt’achinankupaq.',
          explicacionAimara:
            '¡JICHHA URUXA! Juiciox Puno markaruw apasixi (Sala Laboral Mixta de Puno) ukan jach’a jilatanakax uñjapxañapataki.',
        },
        calculoPlazo: calcularPlazoConReglas('2026-10-02', 3, 'electronica'),
      },
    ],
  },
];
