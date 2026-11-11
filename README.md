# CEJ — Simulador académico de consulta de expedientes

CEJ es un prototipo académico independiente para explorar, con datos ficticios, conceptos de consulta de expedientes, actuaciones, documentos, agenda judicial y cómputo de plazos.

**No es una plataforma oficial del Poder Judicial ni de la Universidad Nacional del Altiplano.** No tiene conexión con SIJ, EJE, CEJ oficial, RENIEC, PIDE, ID GOB.PE, casillas electrónicas ni servicios estatales. No permite presentar escritos, consultar expedientes reales, practicar notificaciones ni emitir documentos con efectos jurídicos.

## Uso seguro

- Utilizar exclusivamente expedientes, nombres, identificadores y documentos ficticios.
- No introducir DNI, datos personales, datos sensibles, información reservada, escritos reales ni documentos judiciales auténticos.
- Los datos de demostración pueden guardarse en el almacenamiento del navegador y sincronizarse con Supabase; los PDF de prueba se alojan en Supabase Storage y se visualizan mediante enlaces generados por la aplicación.
- Las rutas de demostración no implementan autenticación institucional ni controles de acceso de producción. El rol VIP solo modifica la interfaz y el comportamiento local.
- La función de explicación mediante IA puede transmitir el texto suministrado al proveedor de IA configurado (Google Gemini).
- El acceso «SOY VIP» simula un rol de editor; no autentica ni acredita a un servidor público.

## Referencias normativas de diseño

El proyecto incorpora una capa informativa y toma como referencias académicas el Decreto Legislativo N.° 1412, el Reglamento aprobado por Decreto Supremo N.° 029-2021-PCM y sus modificatorias (D.S. N.° 075-2023-PCM y D.S. N.° 098-2025-PCM), así como la Ley N.° 29733 y su Reglamento.

La presencia de estas referencias y de medidas de accesibilidad, transparencia y minimización de datos **no equivale a una certificación de cumplimiento normativo**. La implementación de un servicio digital estatal real exige, entre otros aspectos, titularidad y competencia institucional, gobernanza de datos, evaluación de riesgos, seguridad, gestión documental, interoperabilidad autorizada, identidad digital, mecanismos de atención de derechos y auditorías técnicas.

## Accesibilidad

El prototipo incorpora navegación por teclado, foco visible, alto contraste, diseño adaptable y respeto por la preferencia de movimiento reducido. Estas medidas no constituyen una certificación WCAG ni sustituyen una auditoría con usuarios y tecnologías de asistencia.

## Desarrollo

Aplicación React + TypeScript + Vite, con servidor Express y almacenamiento de demostración en Supabase. Consultar `.env.example` para las variables de entorno.