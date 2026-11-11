# CEJ — Simulador académico de consulta de expedientes

CEJ es un prototipo académico independiente para explorar, con datos ficticios, conceptos de consulta de expedientes, actuaciones, documentos, agenda judicial y cómputo de plazos.

**No es una plataforma oficial del Poder Judicial ni de la Universidad Nacional del Altiplano.** No tiene conexión con SIJ, EJE, CEJ oficial, RENIEC, PIDE, ID GOB.PE, casillas electrónicas ni servicios estatales. No permite presentar escritos, consultar expedientes reales, practicar notificaciones ni emitir documentos con efectos jurídicos.

## Uso seguro

- Utilizar exclusivamente expedientes, nombres, identificadores y documentos ficticios.
- No introducir DNI, datos personales, datos sensibles, información reservada, escritos reales ni documentos judiciales auténticos.
- Los datos de demostración pueden guardarse en el almacenamiento del navegador y sincronizarse con Supabase; los PDF de prueba se alojan en Supabase Storage y se visualizan mediante enlaces generados por la aplicación.
- El acceso de personal valida las credenciales de demostración en el servidor mediante variables de entorno. No integra el directorio institucional, SSO ni los servicios de identidad del Poder Judicial; las API de datos tampoco constituyen controles de acceso de producción. El botón «SOY VIP» conserva un acceso independiente al rol de editor para la exposición.
- La función de explicación mediante IA puede transmitir el texto suministrado al proveedor de IA configurado (Google Gemini).
- El acceso «SOY VIP» simula un rol de editor; no autentica ni acredita a un servidor público.

## Acceso de personal en el entorno académico

La pantalla de acceso de personal utiliza el endpoint `/api/auth/editor`. Configura las variables `CEJ_EDITOR_USER` y `CEJ_EDITOR_PASSWORD` en el entorno del servidor (en Render: **Environment**). En desarrollo local, copia `.env.example` a `.env` y completa los valores. No introduzcas credenciales reales ni las guardes en el repositorio.

La validación de estas credenciales habilita el perfil de editor de este simulador; no autentica ni acredita a personal del Poder Judicial.

## Referencias normativas de diseño

El proyecto incorpora una capa informativa y toma como referencias académicas el Decreto Legislativo N.° 1412, el Reglamento aprobado por Decreto Supremo N.° 029-2021-PCM y sus modificatorias (D.S. N.° 075-2023-PCM y D.S. N.° 098-2025-PCM), así como la Ley N.° 29733 y su Reglamento.

La presencia de estas referencias y de medidas de accesibilidad, transparencia y minimización de datos **no equivale a una certificación de cumplimiento normativo**. La implementación de un servicio digital estatal real exige, entre otros aspectos, titularidad y competencia institucional, gobernanza de datos, evaluación de riesgos, seguridad, gestión documental, interoperabilidad autorizada, identidad digital, mecanismos de atención de derechos y auditorías técnicas.

## Accesibilidad

El prototipo incorpora navegación por teclado, foco visible, alto contraste, diseño adaptable y respeto por la preferencia de movimiento reducido. Estas medidas no constituyen una certificación WCAG ni sustituyen una auditoría con usuarios y tecnologías de asistencia.

## Desarrollo

Aplicación React + TypeScript + Vite, con servidor Express y almacenamiento de demostración en Supabase. Consultar `.env.example` para las variables de entorno.