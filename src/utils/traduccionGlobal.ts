import type { Idioma } from './i18n';

/**
 * Capa de compatibilidad para los componentes que todavía contienen textos literales.
 * Conserva los valores originales de cada nodo y vuelve a traducirlos al cambiar de idioma.
 * Los datos de expedientes (nombres, materias y descripciones) no se modifican.
 */
type TraduccionesUI = Partial<Record<Idioma, Record<string, string>>>;

const UI: TraduccionesUI = {
  en: {
    'PODER JUDICIAL DEL PERÚ • SISTEMA JUDICIAL DIGITAL':'JUDICIAL BRANCH OF PERU • DIGITAL JUDICIAL SYSTEM',
    'CONSULTA DE EXPEDIENTES JUDICIALES':'JUDICIAL CASE SEARCH',
    'PORTAL JUDICIAL CIUDADANO':'CITIZEN JUDICIAL PORTAL',
    'PODER JUDICIAL DEL PERÚ • ACCESO OFICIAL':'JUDICIAL BRANCH OF PERU • OFFICIAL ACCESS',
    'Acceso Ciudadano':'Citizen access','Servidor Judicial':'Judicial staff','EL JUEZ TE ESCUCHA':'THE JUDGE HEARS YOU',
    'AGENDA JUDICIAL':'JUDICIAL CALENDAR','Ingrese el número de su documento de identidad.':'Enter your identity document number.',
    'El DNI debe contener exactamente 8 dígitos numéricos.':'The national ID must contain exactly 8 digits.',
    'El pasaporte debe contener al menos 5 caracteres.':'The passport must contain at least 5 characters.',
    'El Carnet de Extranjería debe contener al menos 6 caracteres.':'The foreign resident ID must contain at least 6 characters.',
    'Código de seguridad incorrecto. Intente nuevamente.':'Incorrect security code. Please try again.',
    'Credenciales incorrectas. Verifique el usuario y la contraseña del servidor judicial.':'Incorrect credentials. Check the judicial staff username and password.',
    'Número de documento':'Document number','Tipo de documento':'Document type','DNI':'National ID','PASAPORTE':'Passport',
    'CARNET DE EXTRANJERÍA':'Foreigner ID','Nombre del titular (opcional)':'Holder name (optional)',
    'Código de seguridad':'Security code','Ingrese el código de seguridad':'Enter the security code',
    'Consultar':'Search','Buscar':'Search','Cancelar':'Cancel','Cerrar':'Close','Guardar':'Save','Eliminar':'Delete',
    'Editar':'Edit','Volver al inicio':'Back to home','Volver':'Back','Aceptar':'Accept','Fecha':'Date','Hora':'Time',
    'Descripción':'Description','Magistrado':'Judge','Expediente':'Case file','Tipo de diligencia':'Event type',
    'Nueva diligencia':'New event','Editar diligencia':'Edit event','Guardar diligencia':'Save event',
    'No hay diligencias registradas.':'No events registered.','Seleccione un día para ver su detalle.':'Select a day to view details.',
    'Mes anterior':'Previous month','Mes siguiente':'Next month','Hoy':'Today','Todos los magistrados':'All judges',
    'Administración de Agenda de Magistrados':'Judge Calendar Administration',
    'Registre y mantenga las diligencias programadas por magistrado.':'Register and manage events scheduled by judge.',
    'No se encontraron expedientes con los datos ingresados.':'No case files match the entered details.',
    'Verifique los datos e intente nuevamente.':'Check the details and try again.',
    'Búsqueda de Expedientes Judiciales':'Judicial Case Search','Seleccione el método de búsqueda de su preferencia.':'Select your preferred search method.',
    'Por Nombre de la Parte':'By party name','Por Nomenclatura de Expediente':'By case file number',
    'Por Número de Expediente y Año':'By case number and year','Ingrese el número de expediente':'Enter the case number',
    'Ingrese el año':'Enter the year','Ingrese la nomenclatura del expediente':'Enter the case file number',
    'Ingrese apellido paterno':'Enter last name','Ingrese apellido materno':'Enter second last name','Ingrese nombres':'Enter first name(s)',
    'Resultados de la Búsqueda':'Search results','No se encontraron expedientes con los datos ingresados.':'No case files found for the entered details.',
    'Crear Nuevo Expediente':'Create new case file','Editar Expediente':'Edit case file','Añadir Actuado':'Add court record',
    'Línea de tiempo del proceso':'Procedural timeline','Actuaciones procesales':'Procedural actions',
    'Ver documento':'View document','Descargar documento':'Download document','Cargando...':'Loading...',
    'Usuario':'User','Contraseña':'Password','Ingresar':'Sign in','Salir':'Sign out',
    '¿Desea eliminar esta diligencia?':'Do you want to delete this event?','Complete magistrado, fecha, hora, tipo y descripción.':'Complete judge, date, time, type and description.'
  },
  de: {
    'PODER JUDICIAL DEL PERÚ • SISTEMA JUDICIAL DIGITAL':'JUSTIZ PERUS • DIGITALES JUSTIZSYSTEM',
    'CONSULTA DE EXPEDIENTES JUDICIALES':'SUCHE NACH GERICHTSAKTEN','PORTAL JUDICIAL CIUDADANO':'BÜRGERPORTAL DER JUSTIZ',
    'PODER JUDICIAL DEL PERÚ • ACCESO OFICIAL':'JUSTIZ PERUS • OFFIZIELLER ZUGANG','Acceso Ciudadano':'Bürgerzugang',
    'Servidor Judicial':'Justizpersonal','EL JUEZ TE ESCUCHA':'DER RICHTER HÖRT SIE AN','AGENDA JUDICIAL':'JUSTIZKALENDER',
    'Ingrese el número de su documento de identidad.':'Geben Sie Ihre Ausweisnummer ein.',
    'El DNI debe contener exactamente 8 dígitos numéricos.':'Die nationale ID muss genau 8 Ziffern enthalten.',
    'El pasaporte debe contener al menos 5 caracteres.':'Der Reisepass muss mindestens 5 Zeichen enthalten.',
    'El Carnet de Extranjería debe contener al menos 6 caracteres.':'Der Ausländerausweis muss mindestens 6 Zeichen enthalten.',
    'Código de seguridad incorrecto. Intente nuevamente.':'Falscher Sicherheitscode. Bitte versuchen Sie es erneut.',
    'Credenciales incorrectas. Verifique el usuario y la contraseña del servidor judicial.':'Falsche Zugangsdaten. Bitte Benutzername und Passwort prüfen.',
    'Número de documento':'Ausweisnummer','Tipo de documento':'Ausweisart','PASAPORTE':'Reisepass',
    'CARNET DE EXTRANJERÍA':'Ausländerausweis','Nombre del titular (opcional)':'Name des Inhabers (optional)',
    'Código de seguridad':'Sicherheitscode','Ingrese el código de seguridad':'Sicherheitscode eingeben',
    'Consultar':'Suchen','Buscar':'Suchen','Cancelar':'Abbrechen','Cerrar':'Schließen','Guardar':'Speichern','Eliminar':'Löschen',
    'Editar':'Bearbeiten','Volver al inicio':'Zur Startseite','Volver':'Zurück','Aceptar':'Bestätigen','Fecha':'Datum','Hora':'Uhrzeit',
    'Descripción':'Beschreibung','Magistrado':'Richter/in','Expediente':'Akte','Tipo de diligencia':'Terminart',
    'Nueva diligencia':'Neuer Termin','Editar diligencia':'Termin bearbeiten','Guardar diligencia':'Termin speichern',
    'No hay diligencias registradas.':'Keine Termine eingetragen.','Seleccione un día para ver su detalle.':'Wählen Sie einen Tag für Details.',
    'Mes anterior':'Vorheriger Monat','Mes siguiente':'Nächster Monat','Hoy':'Heute','Todos los magistrados':'Alle Richter',
    'Administración de Agenda de Magistrados':'Verwaltung des Richterkalenders',
    'Registre y mantenga las diligencias programadas por magistrado.':'Termine nach Richter erfassen und verwalten.',
    'Búsqueda de Expedientes Judiciales':'Suche nach Gerichtsakten','Seleccione el método de búsqueda de su preferencia.':'Wählen Sie Ihre Suchmethode.',
    'Por Nombre de la Parte':'Nach Namen der Partei','Por Nomenclatura de Expediente':'Nach Aktenzeichen',
    'Por Número de Expediente y Año':'Nach Aktennummer und Jahr','Ingrese el número de expediente':'Aktennummer eingeben',
    'Ingrese el año':'Jahr eingeben','Ingrese la nomenclatura del expediente':'Aktenzeichen eingeben',
    'Ingrese apellido paterno':'Nachname eingeben','Ingrese apellido materno':'Zweiter Nachname eingeben','Ingrese nombres':'Vornamen eingeben',
    'Resultados de la Búsqueda':'Suchergebnisse','Crear Nuevo Expediente':'Neue Akte erstellen','Editar Expediente':'Akte bearbeiten',
    'Añadir Actuado':'Verfahrenshandlung hinzufügen','Línea de tiempo del proceso':'Verfahrenschronologie',
    'Actuaciones procesales':'Verfahrenshandlungen','Ver documento':'Dokument ansehen','Descargar documento':'Dokument herunterladen',
    'Cargando...':'Wird geladen...','Usuario':'Benutzer','Contraseña':'Passwort','Ingresar':'Anmelden','Salir':'Abmelden',
    '¿Desea eliminar esta diligencia?':'Möchten Sie diesen Termin löschen?','Complete magistrado, fecha, hora, tipo y descripción.':'Bitte Richter, Datum, Uhrzeit, Art und Beschreibung ausfüllen.'
  },
  fr: {
    'PODER JUDICIAL DEL PERÚ • SISTEMA JUDICIAL DIGITAL':'POUVOIR JUDICIAIRE DU PÉROU • SYSTÈME JUDICIAIRE NUMÉRIQUE',
    'CONSULTA DE EXPEDIENTES JUDICIALES':'RECHERCHE DE DOSSIERS JUDICIAIRES','PORTAL JUDICIAL CIUDADANO':'PORTAIL JUDICIAIRE CITOYEN',
    'PODER JUDICIAL DEL PERÚ • ACCESO OFICIAL':'POUVOIR JUDICIAIRE DU PÉROU • ACCÈS OFFICIEL','Acceso Ciudadano':'Accès citoyen',
    'Servidor Judicial':'Personnel judiciaire','EL JUEZ TE ESCUCHA':'LE JUGE VOUS ÉCOUTE','AGENDA JUDICIAL':'AGENDA JUDICIAIRE',
    'Ingrese el número de su documento de identidad.':'Saisissez votre numéro de pièce d’identité.',
    'El DNI debe contener exactamente 8 dígitos numéricos.':'Le numéro national doit contenir exactement 8 chiffres.',
    'El pasaporte debe contener al menos 5 caracteres.':'Le passeport doit contenir au moins 5 caractères.',
    'El Carnet de Extranjería debe contener al menos 6 caracteres.':'Le titre de séjour doit contenir au moins 6 caractères.',
    'Código de seguridad incorrecto. Intente nuevamente.':'Code de sécurité incorrect. Veuillez réessayer.',
    'Credenciales incorrectas. Verifique el usuario y la contraseña del servidor judicial.':'Identifiants incorrects. Vérifiez le nom d’utilisateur et le mot de passe.',
    'Número de documento':'Numéro du document','Tipo de documento':'Type de document','PASAPORTE':'Passeport',
    'CARNET DE EXTRANJERÍA':'Titre de séjour','Nombre del titular (opcional)':'Nom du titulaire (facultatif)',
    'Código de seguridad':'Code de sécurité','Ingrese el código de seguridad':'Saisissez le code de sécurité',
    'Consultar':'Rechercher','Buscar':'Rechercher','Cancelar':'Annuler','Cerrar':'Fermer','Guardar':'Enregistrer','Eliminar':'Supprimer',
    'Editar':'Modifier','Volver al inicio':'Retour à l’accueil','Volver':'Retour','Aceptar':'Accepter','Fecha':'Date','Hora':'Heure',
    'Descripción':'Description','Magistrado':'Magistrat','Expediente':'Dossier','Tipo de diligencia':'Type d’événement',
    'Nueva diligencia':'Nouvel événement','Editar diligencia':'Modifier l’événement','Guardar diligencia':'Enregistrer l’événement',
    'No hay diligencias registradas.':'Aucun événement enregistré.','Seleccione un día para ver su detalle.':'Sélectionnez un jour pour voir les détails.',
    'Mes anterior':'Mois précédent','Mes siguiente':'Mois suivant','Hoy':'Aujourd’hui','Todos los magistrados':'Tous les magistrats',
    'Administración de Agenda de Magistrados':'Gestion de l’agenda des magistrats',
    'Registre y mantenga las diligencias programadas por magistrado.':'Enregistrez et gérez les événements programmés par magistrat.',
    'Búsqueda de Expedientes Judiciales':'Recherche de dossiers judiciaires','Seleccione el método de búsqueda de su preferencia.':'Sélectionnez votre méthode de recherche.',
    'Por Nombre de la Parte':'Par nom de partie','Por Nomenclatura de Expediente':'Par numéro de dossier',
    'Por Número de Expediente y Año':'Par numéro de dossier et année','Ingrese el número de expediente':'Saisissez le numéro du dossier',
    'Ingrese el año':'Saisissez l’année','Ingrese la nomenclatura del expediente':'Saisissez la référence du dossier',
    'Ingrese apellido paterno':'Saisissez le nom de famille','Ingrese apellido materno':'Saisissez le deuxième nom de famille','Ingrese nombres':'Saisissez le prénom',
    'Resultados de la Búsqueda':'Résultats de recherche','Crear Nuevo Expediente':'Créer un dossier','Editar Expediente':'Modifier le dossier',
    'Añadir Actuado':'Ajouter un acte de procédure','Línea de tiempo del proceso':'Chronologie de la procédure',
    'Actuaciones procesales':'Actes de procédure','Ver documento':'Voir le document','Descargar documento':'Télécharger le document',
    'Cargando...':'Chargement…','Usuario':'Utilisateur','Contraseña':'Mot de passe','Ingresar':'Se connecter','Salir':'Déconnexion',
    '¿Desea eliminar esta diligencia?':'Voulez-vous supprimer cet événement ?','Complete magistrado, fecha, hora, tipo y descripción.':'Renseignez le magistrat, la date, l’heure, le type et la description.'
  },
  qu: {
    'PODER JUDICIAL DEL PERÚ • SISTEMA JUDICIAL DIGITAL':'PIRUWPA TARIPAY WASI • LLIKAPI TARIPAY LLAMK’AY',
    'CONSULTA DE EXPEDIENTES JUDICIALES':'TARIPAY QILLQAKUNATA MASK’AY','PORTAL JUDICIAL CIUDADANO':'RUNAPA TARIPAY PUNKU',
    'PODER JUDICIAL DEL PERÚ • ACCESO OFICIAL':'PIRUWPA TARIPAY WASI • OFICIAL YAYKUY','Acceso Ciudadano':'Runapa yaykunan',
    'Servidor Judicial':'Taripay yanapaq','EL JUEZ TE ESCUCHA':'JUEZMI UYARISUNKI','AGENDA JUDICIAL':'Taripay p’unchaw ruraykuna',
    'Consultar':'Mask’ay','Buscar':'Mask’ay','Cancelar':'Saqiy','Cerrar':'Wichq’ay','Guardar':'Waqaychay','Eliminar':'Chinkachiy',
    'Editar':'Allichay','Volver al inicio':'Qallariyman kutiy','Volver':'Kutiy','Aceptar':'Chaskiy','Fecha':'P’unchaw','Hora':'Pacha',
    'Descripción':'Willakuy','Magistrado':'Kamachiq','Expediente':'Taripay qillqa','Tipo de diligencia':'Ruraypa rikch’aynin',
    'Nueva diligencia':'Musuq ruray','Editar diligencia':'Rurayta allichay','Guardar diligencia':'Rurayta waqaychay',
    'No hay diligencias registradas.':'Manam ruraykuna qillqasqachu.','Seleccione un día para ver su detalle.':'Huk p’unchawta akllay qhawaypaq.',
    'Mes anterior':'Ñawpaq killa','Mes siguiente':'Qatiq killa','Hoy':'Kunan p’unchaw','Todos los magistrados':'Lliw kamachiqkuna',
    'Búsqueda de Expedientes Judiciales':'Taripay qillqakunata mask’ay','Seleccione el método de búsqueda de su preferencia.':'Akllay imaynatas mask’anki.',
    'Por Nombre de la Parte':'Runaq sutinwan','Por Nomenclatura de Expediente':'Qillqapa yupayninwan',
    'Por Número de Expediente y Año':'Yupaywan watantinwan','Ingrese el número de expediente':'Qillqapa yupayninta churay',
    'Ingrese el año':'Watata churay','Ingrese la nomenclatura del expediente':'Qillqapa sutinta churay',
    'Resultados de la Búsqueda':'Mask’asqamanta tarisqakuna','Crear Nuevo Expediente':'Musuq qillqata ruray',
    'Editar Expediente':'Qillqata allichay','Ver documento':'Qillqata qhaway','Descargar documento':'Qillqata urayk’achiy',
    'Usuario':'Runa','Contraseña':'Yaykunapa pakasqa simin','Ingresar':'Yaykuy','Salir':'Lluqsiy',
    '¿Desea eliminar esta diligencia?':'Kay rurayta chinkachiyta munankichu?'
  },
  ay: {
    'PODER JUDICIAL DEL PERÚ • SISTEMA JUDICIAL DIGITAL':'PERÚ MARKAN TARIPAWIN UTAPA • LLIKA TARIPAÑA IRNATAWI',
    'CONSULTA DE EXPEDIENTES JUDICIALES':'TARIPAÑA QILLQATANAKA THAQHAÑA','PORTAL JUDICIAL CIUDADANO':'JAQINAKAN TARIPAWI PUNKUPA',
    'PODER JUDICIAL DEL PERÚ • ACCESO OFICIAL':'PERÚ MARKAN TARIPAWIN UTAPA • OFICIAL MANTAÑA','Acceso Ciudadano':'Jaqinakan mantañapa',
    'Servidor Judicial':'Taripaña yanapiri','EL JUEZ TE ESCUCHA':'JUEZAX IST’ÄTAM','AGENDA JUDICIAL':'Taripawin agenda',
    'Consultar':'Thaqhaña','Buscar':'Thaqhaña','Cancelar':'Jaytaña','Cerrar':' jist’antaña','Guardar':'Imaña','Eliminar':'Chhaqtayaña',
    'Editar':'Askichaña','Volver al inicio':'Qalltañar kutt’aña','Volver':'Kutt’aña','Aceptar':'Iyaw saña','Fecha':'Uru','Hora':'Hora',
    'Descripción':'Qhananchawi','Magistrado':'Taripiri','Expediente':'Qillqata','Tipo de diligencia':'Lurawin kasta',
    'Nueva diligencia':'Machaq lurawi','Editar diligencia':'Lurawi askichaña','Guardar diligencia':'Lurawi imaña',
    'No hay diligencias registradas.':'Janiw lurawinakax qillqatäkiti.','Seleccione un día para ver su detalle.':'Mä uru ajllim uñjañataki.',
    'Mes anterior':'Nayra phaxsi','Mes siguiente':'Jutiri phaxsi','Hoy':'Jichha uru','Todos los magistrados':'Taqpach taripirinaka',
    'Búsqueda de Expedientes Judiciales':'Taripaña qillqatanaka thaqhaña','Seleccione el método de búsqueda de su preferencia.':'Kunjams thaqhañ munta uk ajllim.',
    'Por Nombre de la Parte':'Sutimpi','Por Nomenclatura de Expediente':'Qillqatan yupayapampi',
    'Por Número de Expediente y Año':'Yupayampi marampi','Ingrese el número de expediente':'Qillqatan yupayapa uskuña',
    'Ingrese el año':'Marata uskuña','Ingrese la nomenclatura del expediente':'Qillqatan sutipa uskuña',
    'Resultados de la Búsqueda':'Thaqhata jikxatatanaka','Crear Nuevo Expediente':'Machaq qillqata luraña',
    'Editar Expediente':'Qillqata askichaña','Ver documento':'Qillqata uñjaña','Descargar documento':'Qillqata apaqaña',
    'Usuario':'Jaqi','Contraseña':'Imantata arsu','Ingresar':'Mantaña','Salir':'Mistuña',
    '¿Desea eliminar esta diligencia?':'Aka lurawi chhaqtayañ munasmati?'
  }
};

const original = new WeakMap<Text, string>();
const originalAttrs = new WeakMap<Element, Map<string, string>>();
let observer: MutationObserver | null = null;
let idiomaActivo: Idioma = 'es';

const normalizar = (s: string) => s.replace(/\s+/g, ' ').trim();

function traducirTexto(nodo: Text, idioma: Idioma) {
  const actual = nodo.nodeValue ?? '';
  if (!original.has(nodo)) original.set(nodo, actual);
  const base = original.get(nodo) ?? actual;
  const key = normalizar(base);
  if (!key || nodo.parentElement?.closest('script,style,code,pre,[data-no-translate]')) return;
  const traduccion = UI[idioma]?.[key];
  if (traduccion) {
    const leading = base.match(/^\s*/)?.[0] ?? '';
    const trailing = base.match(/\s*$/)?.[0] ?? '';
    if (actual !== leading + traduccion + trailing) nodo.nodeValue = leading + traduccion + trailing;
  } else if (idioma === 'es' && actual !== base) nodo.nodeValue = base;
}

function traducirAtributos(el: Element, idioma: Idioma) {
  const attrs = ['placeholder', 'title', 'aria-label'];
  let guardados = originalAttrs.get(el);
  if (!guardados) { guardados = new Map(); originalAttrs.set(el, guardados); }
  for (const attr of attrs) {
    const valor = el.getAttribute(attr);
    if (valor === null) continue;
    if (!guardados.has(attr)) guardados.set(attr, valor);
    const base = guardados.get(attr) ?? valor;
    const key = normalizar(base);
    const t = UI[idioma]?.[key];
    if (t) {
      // Evita generar mutaciones si el atributo ya contiene la traducción.
      if (valor !== t) el.setAttribute(attr, t);
    } else if (idioma === 'es' && valor !== base) {
      // Restaurar solo cuando el valor realmente haya cambiado.
      el.setAttribute(attr, base);
    }
  }
}

function traducirArbol(root: Node, idioma: Idioma) {
  if (root.nodeType === Node.TEXT_NODE) { traducirTexto(root as Text, idioma); return; }
  if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_NODE) return;
  if (root instanceof Element) traducirAtributos(root, idioma);
  root.childNodes.forEach(n => traducirArbol(n, idioma));
}

export function instalarTraduccionGlobal(idioma: Idioma) {
  idiomaActivo = idioma;
  if (typeof document === 'undefined') return;
  if (observer) observer.disconnect();
  traducirArbol(document.body, idioma);
  observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      if (mutation.type === 'characterData') traducirTexto(mutation.target as Text, idiomaActivo);
      mutation.addedNodes.forEach(n => traducirArbol(n, idiomaActivo));
      if (mutation.type === 'attributes' && mutation.target instanceof Element) traducirAtributos(mutation.target, idiomaActivo);
    }
  });
  observer.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['placeholder', 'title', 'aria-label'] });
}
