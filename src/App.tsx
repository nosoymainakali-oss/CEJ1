/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Scale, 
  Search, 
  CalendarClock, 
  Plus, 
  FileText, 
  ShieldCheck, 
  Upload, 
  FolderOpen, 
  Edit3, 
  Trash2, 
  Lock, 
  User, 
  RefreshCw,
  QrCode,
  Barcode,
  ArrowLeft,
  Sparkles
} from 'lucide-react';

import { 
  Expediente, 
  Resolucion, 
  RolUsuario, 
  ArchivoAdjunto, 
  HitoLineaTiempo,
  Idioma,
  DiligenciaAgenda
} from './types/judicial';
import { INITIAL_EXPEDIENTES } from './data/mockExpedientes';
import { DICCIONARIO } from './utils/i18n';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LoginScreen } from './components/LoginScreen';
import { SearchPortalView } from './components/SearchPortalView';
import { TimelineProcess } from './components/TimelineProcess';
import { ResolutionCard } from './components/ResolutionCard';
import { DeadlineCalculatorModal } from './components/DeadlineCalculatorModal';
import { UploadDocumentModal } from './components/UploadDocumentModal';
import { ViewDocumentModal } from './components/ViewDocumentModal';
import { EditResolucionModal } from './components/EditResolucionModal';
import { NewActuadoModal } from './components/NewActuadoModal';
import { LiveExpedienteEditorModal } from './components/LiveExpedienteEditorModal';
import { ElJuezTeEscucha } from './components/ElJuezTeEscucha';
import { AgendarAudienciaModal } from './components/AgendarAudienciaModal';
import { Calendar } from 'lucide-react';
import { generarExplicacionIA } from './services/aiExplainer';

const NOMBRE_EDITOR = 'Eduardo Luismario Medina Humpiri';

export default function App() {
  // Session states: Must log in first! Case is NOT shown initially
  const [sesionIniciada, setSesionIniciada] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('sjd_sesion_activa') === 'true';
    }
    return false;
  });

  const [rol, setRol] = useState<RolUsuario>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('sjd_rol') as RolUsuario) || 'consultor';
    }
    return 'consultor';
  });

  const [nombreUsuario, setNombreUsuario] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('sjd_nombre_usuario') || 'Ciudadano';
    }
    return 'Ciudadano';
  });

  const [dniUsuario, setDniUsuario] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('sjd_dni_usuario') || '75412933';
    }
    return '75412933';
  });

  
  // Global Language State: Español ('es'), Quechua ('qu'), Aimara ('ay')
  const [idioma, setIdioma] = useState<Idioma>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('sjd_idioma') as Idioma) || 'es';
    }
    return 'es';
  });


  // Current case list
  const [expedientes, setExpedientes] = useState<Expediente[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sjd_expediente_00140_v3');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Error parsing stored cases:', e);
        }
      }
    }
    return INITIAL_EXPEDIENTES;
  });

  // The main case working on
  const expedientePrincipal = expedientes[0] || INITIAL_EXPEDIENTES[0];

  // Case view selection: Initially null so case is NOT displayed until searched
  const [expedienteSeleccionado, setExpedienteSeleccionado] = useState<Expediente | null>(null);

  // Active view: 'busqueda' | 'expediente' | 'calculadora' | 'juez_te_escucha'
  const [vistaActual, setVistaActual] = useState<'busqueda' | 'expediente' | 'calculadora' | 'juez_te_escucha'>('busqueda');

  // Agenda de Magistrados sincronizada con los expedientes
  const [agendaMagistrados, setAgendaMagistrados] = useState<DiligenciaAgenda[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sjd_agenda_magistrados_v1');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return [
      {
        id: 'aud-001',
        magistrado: 'Leydi Karen Quispe Rojas',
        expedienteNomenclatura: '00140-2026-0-2111-JR-LA-02',
        fecha: '2026-05-28',
        hora: '10:30',
        tipo: 'AUDIENCIA',
        descripcion: 'Audiencia Única de Juzgamiento - Proceso Laboral CAS a 728',
      },
      {
        id: 'aud-002',
        magistrado: 'Sebastian Alberto Tapia Tito',
        expedienteNomenclatura: '00085-2026-0-2111-JR-CI-01',
        fecha: '2026-10-20',
        hora: '09:30',
        tipo: 'AUDIENCIA',
        descripcion: 'Audiencia Preliminar de Conciliación y Fijación de Puntos Controvertidos',
      },
      {
        id: 'aud-003',
        magistrado: 'Marco Antonio Ticona Miranda',
        expedienteNomenclatura: '00320-2026-0-2111-JR-PE-02',
        fecha: '2026-10-22',
        hora: '11:00',
        tipo: 'AUDIENCIA',
        descripcion: 'Audiencia de Control de Acusación',
      },
    ];
  });

  // Modal para que el Servidor Judicial anote diligencias en la agenda del Juez
  const [modalAgendarAudiencia, setModalAgendarAudiencia] = useState(false);

  // Guardar agenda de magistrados
  useEffect(() => {
    try {
      localStorage.setItem('sjd_agenda_magistrados_v1', JSON.stringify(agendaMagistrados));
    } catch (e) {
      console.warn(e);
    }
  }, [agendaMagistrados]);

  // Accessibility State (High Contrast)
  const [altoContraste, setAltoContraste] = useState(false);

  // Modals
  const [uploadModalAbierto, setUploadModalAbierto] = useState(false);
  const [targetResolucionId, setTargetResolucionId] = useState<string | null>(null);
  const [viewDocModal, setViewDocModal] = useState<ArchivoAdjunto | null>(null);
  const [editResolucionModal, setEditResolucionModal] = useState<Resolucion | null>(null);
  const [modalNuevoActuado, setModalNuevoActuado] = useState(false);
  const [seccionDocumentos, setSeccionDocumentos] = useState<'actuaciones' | 'escritos'>('actuaciones');

  // Live Case Editor Modal (For Servidor Judicial to create or edit cases with live preview)
  const [modalLiveEditor, setModalLiveEditor] = useState<{
    abierto: boolean;
    modo: 'crear' | 'editar';
  }>({ abierto: false, modo: 'crear' });

  // Persist case updates
  useEffect(() => {
    try {
      localStorage.setItem('sjd_expediente_00140_v3', JSON.stringify(expedientes));
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }
  }, [expedientes]);

  // Recuperar desde Supabase los documentos de las resoluciones seleccionadas
  useEffect(() => {
    const expediente = expedienteSeleccionado;
    if (!expediente) return;

    let cancelado = false;

    const cargarDocumentos = async () => {
      try {
        const resultados = await Promise.all(
          expediente.resoluciones.map(async (res) => {
            const parametros = new URLSearchParams({
              expedienteId: String(expediente.id),
              resolucionId: String(res.id),
            });

            const respuesta = await fetch(
              `/api/documentos?${parametros.toString()}`
            );

            if (!respuesta.ok) {
              console.error(
                `No se pudieron recuperar los documentos de la resolución ${res.id}.`
              );

              return {
                resolucionId: String(res.id),
                documentos: [] as ArchivoAdjunto[],
              };
            }

            const remotos = (await respuesta.json()) as Array<{
              id: string;
              nombre: string;
              tamano?: string | null;
              dataUrl: string;
              fechaSubida?: string;
              subidoPor?: string;
            }>;

            const documentos: ArchivoAdjunto[] = remotos.map((doc) => ({
              id: doc.id,
              nombre: doc.nombre,
              tamano: doc.tamano || 'PDF',
              tipo: 'pdf',
              dataUrl: doc.dataUrl,
              fechaSubida:
                doc.fechaSubida || new Date().toISOString().slice(0, 10),
              subidoPor: doc.subidoPor || '',
            }));

            return {
              resolucionId: String(res.id),
              documentos,
            };
          })
        );

        if (cancelado) return;

        const documentosPorResolucion = new Map(
          resultados.map((resultado) => [
            resultado.resolucionId,
            resultado.documentos,
          ])
        );

        const combinarDocumentos = (exp: Expediente): Expediente => ({
          ...exp,
          resoluciones: exp.resoluciones.map((res) => {
            const remotos =
              documentosPorResolucion.get(String(res.id)) || [];
            const actuales = res.archivosAdjuntos || [];
            const idsActuales = new Set(actuales.map((doc) => doc.id));

            return {
              ...res,
              archivosAdjuntos: [
                ...actuales,
                ...remotos.filter((doc) => !idsActuales.has(doc.id)),
              ],
            };
          }),
        });

        setExpedientes((anteriores) =>
          anteriores.map((exp) =>
            exp.id === expediente.id
              ? combinarDocumentos(exp)
              : exp
          )
        );

        setExpedienteSeleccionado((actual) =>
          actual && actual.id === expediente.id
            ? combinarDocumentos(actual)
            : actual
        );
      } catch (error) {
        if (!cancelado) {
          console.error(
            'Error al recuperar documentos desde Supabase:',
            error
          );
        }
      }
    };

    void cargarDocumentos();

    return () => {
      cancelado = true;
    };
  }, [expedienteSeleccionado?.id]);

  const handleCambiarIdioma = (nuevoIdioma: Idioma) => {
    setIdioma(nuevoIdioma);
    try {
      localStorage.setItem('sjd_idioma', nuevoIdioma);
    } catch (e) {
      console.warn('Could not save language:', e);
    }
  };

  // Handle Login
  const handleLoginExitoso = (datos: { rol: RolUsuario; nombreUsuario: string; dniUsuario: string }) => {
    setRol(datos.rol);
    setNombreUsuario(datos.nombreUsuario);
    setDniUsuario(datos.dniUsuario);
    setSesionIniciada(true);
    setVistaActual('busqueda'); // Must be strictly search screen upon login!
    setExpedienteSeleccionado(null); // Case is hidden until searched

    try {
      localStorage.setItem('sjd_sesion_activa', 'true');
      localStorage.setItem('sjd_rol', datos.rol);
      localStorage.setItem('sjd_nombre_usuario', datos.nombreUsuario);
      localStorage.setItem('sjd_dni_usuario', datos.dniUsuario);
    } catch (e) {
      console.warn('Error saving session:', e);
    }
  };

  // Logout
  const handleCerrarSesion = () => {
    setSesionIniciada(false);
    setExpedienteSeleccionado(null);
    setVistaActual('busqueda');
    try {
      localStorage.removeItem('sjd_sesion_activa');
      localStorage.removeItem('sjd_rol');
      localStorage.removeItem('sjd_nombre_usuario');
      localStorage.removeItem('sjd_dni_usuario');
    } catch (e) {
      console.warn('Error clearing session:', e);
    }
  };

  // Case selected from search
  const handleSeleccionarExpedienteDesdeBusqueda = (exp: Expediente) => {
    setExpedienteSeleccionado(exp);
    setVistaActual('expediente');
  };

  // Save case from Live Case Editor Modal (updates case or adds new case with instant live update)
  const handleGuardarExpedienteDesdeEditor = (expEditado: Expediente) => {
    setExpedientes((prevExpedientes) => {
      const existe = prevExpedientes.some((e) => e.id === expEditado.id);
      if (existe) {
        return prevExpedientes.map((e) => (e.id === expEditado.id ? expEditado : e));
      }
      return [expEditado, ...prevExpedientes];
    });

    if (expedienteSeleccionado && expedienteSeleccionado.id === expEditado.id) {
      setExpedienteSeleccionado(expEditado);
    } else if (modalLiveEditor.modo === 'crear') {
      setExpedienteSeleccionado(expEditado);
      setVistaActual('expediente');
    }
  };

  // Add new actuado (with QR and Barcode)
  const handleCrearNuevoActuado = (nuevoActuado: Resolucion) => {
    if (rol !== 'editor') return;

    const targetId = expedienteSeleccionado ? expedienteSeleccionado.id : expedientePrincipal.id;

    setExpedientes((prevExpedientes) => {
      return prevExpedientes.map((exp) => {
        if (exp.id !== targetId) return exp;
        return {
          ...exp,
          resoluciones: [...exp.resoluciones, nuevoActuado],
        };
      });
    });

    if (expedienteSeleccionado && expedienteSeleccionado.id === targetId) {
      setExpedienteSeleccionado((prev) =>
        prev ? { ...prev, resoluciones: [...prev.resoluciones, nuevoActuado] } : null
      );
    }
  };

  // Upload file to resolution
  const handleAbrirSubirArchivo = (resId: string) => {
    if (rol !== 'editor') return;
    setTargetResolucionId(resId);
    setUploadModalAbierto(true);
  };

  const handleGuardarNuevoArchivo = (nuevoArchivo: ArchivoAdjunto) => {
    if (!targetResolucionId) return;
    const targetId = expedienteSeleccionado ? expedienteSeleccionado.id : expedientePrincipal.id;

    setExpedientes((prevExpedientes) =>
      prevExpedientes.map((exp) => {
        if (exp.id !== targetId) return exp;
        return {
          ...exp,
          resoluciones: exp.resoluciones.map((res) => {
            if (res.id !== targetResolucionId) return res;
            return {
              ...res,
              archivosAdjuntos: [nuevoArchivo, ...res.archivosAdjuntos],
            };
          }),
        };
      })
    );

    if (expedienteSeleccionado) {
      setExpedienteSeleccionado((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          resoluciones: prev.resoluciones.map((res) =>
            res.id === targetResolucionId
              ? { ...res, archivosAdjuntos: [nuevoArchivo, ...res.archivosAdjuntos] }
              : res
          ),
        };
      });
    }
  };

  // Rename attached file
  const handleRenombrarArchivo = (resId: string, archId: string, nuevoNombre: string) => {
    if (rol !== 'editor') return;
    const targetId = expedienteSeleccionado ? expedienteSeleccionado.id : expedientePrincipal.id;

    setExpedientes((prevExpedientes) =>
      prevExpedientes.map((exp) => {
        if (exp.id !== targetId) return exp;
        return {
          ...exp,
          resoluciones: exp.resoluciones.map((res) => {
            if (res.id !== resId) return res;
            return {
              ...res,
              archivosAdjuntos: res.archivosAdjuntos.map((arch) =>
                arch.id === archId ? { ...arch, nombre: nuevoNombre } : arch
              ),
            };
          }),
        };
      })
    );

    if (expedienteSeleccionado) {
      setExpedienteSeleccionado((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          resoluciones: prev.resoluciones.map((res) =>
            res.id === resId
              ? {
                  ...res,
                  archivosAdjuntos: res.archivosAdjuntos.map((arch) =>
                    arch.id === archId ? { ...arch, nombre: nuevoNombre } : arch
                  ),
                }
              : res
          ),
        };
      });
    }
  };

  // Delete attached file
  const handleEliminarArchivo = (resId: string, archId: string) => {
    if (rol !== 'editor') return;
    if (!window.confirm('¿Está seguro de eliminar este documento adjunto?')) return;
    const targetId = expedienteSeleccionado ? expedienteSeleccionado.id : expedientePrincipal.id;

    setExpedientes((prevExpedientes) =>
      prevExpedientes.map((exp) => {
        if (exp.id !== targetId) return exp;
        return {
          ...exp,
          resoluciones: exp.resoluciones.map((res) => {
            if (res.id !== resId) return res;
            return {
              ...res,
              archivosAdjuntos: res.archivosAdjuntos.filter((a) => a.id !== archId),
            };
          }),
        };
      })
    );

    if (expedienteSeleccionado) {
      setExpedienteSeleccionado((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          resoluciones: prev.resoluciones.map((res) =>
            res.id === resId
              ? {
                  ...res,
                  archivosAdjuntos: res.archivosAdjuntos.filter((a) => a.id !== archId),
                }
              : res
          ),
        };
      });
    }
  };

  // Edit resolution data
  const handleGuardarResolucionEditada = (resEditada: Resolucion) => {
    if (rol !== 'editor') return;
    const targetId = expedienteSeleccionado ? expedienteSeleccionado.id : expedientePrincipal.id;

    setExpedientes((prevExpedientes) =>
      prevExpedientes.map((exp) => {
        if (exp.id !== targetId) return exp;
        return {
          ...exp,
          resoluciones: exp.resoluciones.map((res) =>
            res.id === resEditada.id ? resEditada : res
          ),
        };
      })
    );

    if (expedienteSeleccionado) {
      setExpedienteSeleccionado((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          resoluciones: prev.resoluciones.map((res) =>
            res.id === resEditada.id ? resEditada : res
          ),
        };
      });
    }
  };

  // Delete resolution
  const handleEliminarResolucion = (resId: string) => {
    if (rol !== 'editor') return;
    if (!window.confirm('¿Está seguro de eliminar este actuado judicial?')) return;
    const targetId = expedienteSeleccionado ? expedienteSeleccionado.id : expedientePrincipal.id;

    setExpedientes((prevExpedientes) =>
      prevExpedientes.map((exp) => {
        if (exp.id !== targetId) return exp;
        return {
          ...exp,
          resoluciones: exp.resoluciones.filter((r) => r.id !== resId),
        };
      })
    );

    if (expedienteSeleccionado) {
      setExpedienteSeleccionado((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          resoluciones: prev.resoluciones.filter((r) => r.id !== resId),
        };
      });
    }
  };

  // Update timeline milestones (Eduardo's full control)
  const handleActualizarHitos = (nuevosHitos: HitoLineaTiempo[]) => {
    if (rol !== 'editor') return;
    const targetId = expedienteSeleccionado ? expedienteSeleccionado.id : expedientePrincipal.id;

    setExpedientes((prevExpedientes) =>
      prevExpedientes.map((exp) => {
        if (exp.id !== targetId) return exp;
        return {
          ...exp,
          lineaTiempo: nuevosHitos,
        };
      })
    );

    if (expedienteSeleccionado) {
      setExpedienteSeleccionado((prev) =>
        prev ? { ...prev, lineaTiempo: nuevosHitos } : null
      );
    }
  };

  // Re-analyze resolution with AI
  const handleReanalizarIA = async (res: Resolucion) => {
    const targetExp = expedienteSeleccionado || expedientePrincipal;
    const nuevoResumen = await generarExplicacionIA(
      res.tipo,
      res.titulo,
      res.contenidoCompleto,
      targetExp.materia
    );

    setExpedientes((prevExpedientes) =>
      prevExpedientes.map((exp) => {
        if (exp.id !== targetExp.id) return exp;
        return {
          ...exp,
          resoluciones: exp.resoluciones.map((r) =>
            r.id === res.id ? { ...r, resumenSencillo: nuevoResumen } : r
          ),
        };
      })
    );

    if (expedienteSeleccionado) {
      setExpedienteSeleccionado((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          resoluciones: prev.resoluciones.map((r) =>
            r.id === res.id ? { ...r, resumenSencillo: nuevoResumen } : r
          ),
        };
      });
    }
  };

  // 1. IF NOT LOGGED IN: SHOW ONLY LOGIN SCREEN (First citizen / editor must authenticate)
  if (!sesionIniciada) {
    if (vistaActual === 'juez_te_escucha') {
      return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-arial" style={{ fontFamily: 'Arial, sans-serif' }}>
          <div className="bg-[#0c4a6e] text-white py-2.5 px-4 border-b border-sky-400/40">
            <div className="max-w-6xl mx-auto flex items-center justify-between text-xs">
              <span className="font-bold">PODER JUDICIAL DEL PERÚ &bull; PLATAFORMA NACIONAL</span>
              <button
                onClick={() => setVistaActual('busqueda')}
                className="underline text-sky-200 hover:text-white"
              >
                Volver al Acceso Ciudadano
              </button>
            </div>
          </div>
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
            <ElJuezTeEscucha
              onVolver={() => setVistaActual('busqueda')}
              dniInicial=""
              nombreInicial=""
              agendaMagistrados={agendaMagistrados}
              onAgendarCita={(nuevaCita) => setAgendaMagistrados((prev) => [nuevaCita, ...prev])}
              juezPreseleccionado="Leydi Karen Quispe Rojas"
              expedienteNomenclatura="00140-2026-0-2111-JR-LA-02"
            />
          </main>
          <Footer idioma={idioma} />
        </div>
      );
    }

    return (
      <LoginScreen
        onLoginExitoso={handleLoginExitoso}
        onAbrirJuezTeEscucha={() => setVistaActual('juez_te_escucha')}
      />
    );
  }

  const expActual = expedienteSeleccionado || expedientePrincipal;
  const t = DICCIONARIO[idioma];

  const resolucionTarget = expActual.resoluciones.find(
    (r) => r.id === targetResolucionId
  );

  return (
    <div
      className={`min-h-screen flex flex-col font-arial transition-colors ${
        altoContraste ? 'high-contrast' : 'bg-slate-50 text-slate-900'
      }`}
      style={{ fontFamily: 'Arial, sans-serif' }}
    >
      {/* Header with Global Language Switcher (ES, QU, AY) */}
      <Header
        rol={rol}
        nombreUsuario={nombreUsuario}
        dniUsuario={dniUsuario}
        onCerrarSesion={handleCerrarSesion}
        altoContraste={altoContraste}
        onToggleAltoContraste={() => setAltoContraste(!altoContraste)}
        vistaActual={vistaActual}
        onChangeVista={setVistaActual}
        expedienteSeleccionado={!!expedienteSeleccionado}
        idioma={idioma}
        onChangeIdioma={handleCambiarIdioma}
        onAbrirCrearExpediente={() => setModalLiveEditor({ abierto: true, modo: 'crear' })}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        {/* VISTA 1: BÚSQUEDA EXCLUSIVA (Displayed directly after login) */}
        {vistaActual === 'busqueda' && (
          <SearchPortalView
            expedientes={expedientes}
            expedientePrincipal={expedientePrincipal}
            onSeleccionarExpediente={handleSeleccionarExpedienteDesdeBusqueda}
            rol={rol}
            nombreUsuario={nombreUsuario}
            idioma={idioma}
          />
        )}

        {/* VISTA 2: CALCULADORA DE PLAZOS STANDALONE */}
        {vistaActual === 'calculadora' && (
          <div className="space-y-4">
            <button
              onClick={() => setVistaActual(expedienteSeleccionado ? 'expediente' : 'busqueda')}
              className="flex items-center gap-1.5 text-xs font-bold text-[#0284c7] hover:text-[#0369a1] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.volverBusqueda}</span>
            </button>
            <DeadlineCalculatorModal
              expedienteNumero={expActual.nomenclaturaCompleta}
              materia={expActual.materia}
            />
          </div>
        )}

        {/* VISTA 4: EL JUEZ TE ESCUCHA (Citas con el Juez, validación de magistrados y agenda) */}
        {vistaActual === 'juez_te_escucha' && (
          <ElJuezTeEscucha
            onVolver={() => setVistaActual(expedienteSeleccionado ? 'expediente' : 'busqueda')}
            dniInicial=""
            nombreInicial=""
            agendaMagistrados={agendaMagistrados}
            onAgendarCita={(nuevaCita) => setAgendaMagistrados((prev) => [nuevaCita, ...prev])}
            juezPreseleccionado={expActual.juez}
            expedienteNomenclatura={expActual.nomenclaturaCompleta}
          />
        )}

        {/* VISTA 3: VISTA COMPLETA DEL EXPEDIENTE (Only visible after clicking on the search result!) */}
        {vistaActual === 'expediente' && expedienteSeleccionado && (
          <div className="space-y-6">
            {/* Top Bar inside case view */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setVistaActual('busqueda')}
                className="flex items-center gap-1.5 text-xs font-bold text-[#0284c7] hover:text-[#0369a1] bg-white px-3 py-1.5 rounded-lg border border-sky-200 shadow-2xs transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t.volverBusqueda}</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">
                  {t.expedienteConsultadoPor}: <strong>{nombreUsuario}</strong>
                </span>

                {rol === 'editor' && (
                  <button
                    type="button"
                    onClick={() => setModalLiveEditor({ abierto: true, modo: 'editar' })}
                    className="flex items-center gap-1 px-3 py-1.5 bg-sky-100 hover:bg-sky-200 text-[#0369a1] text-xs font-bold rounded-lg border border-sky-300 transition cursor-pointer"
                    title="Editar datos del expediente con vista previa en vivo"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>{t.btnEditarExpediente} (Vista Previa en Vivo)</span>
                  </button>
                )}
              </div>
            </div>

            {/* Expediente Header Card in Celeste, Azul y Blanco */}
            <div className="bg-white rounded-2xl border-2 border-sky-200 shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-[#0369a1] via-[#0284c7] to-[#0c4a6e] text-white p-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white text-[#0284c7] rounded-xl flex items-center justify-center shadow-md border-2 border-sky-300 shrink-0">
                    <Scale className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[11px] text-sky-200 font-bold uppercase tracking-wider block">
                      {t.expedienteElectronico}
                    </span>
                    <h2 className="font-mono font-black text-lg sm:text-2xl text-white tracking-wide">
                      {expActual.nomenclaturaCompleta}
                    </h2>
                  </div>
                </div>

                {/* State Badge strictly with "Estado: " prefix. Button next to it has been eliminated! */}
                <div>
                  <span className="bg-white text-[#0369a1] text-xs font-black px-3.5 py-1.5 rounded-lg shadow-sm uppercase tracking-wide">
                    {t.estadoPrefijo}{expActual.estadoProcesal}
                  </span>
                </div>
              </div>

              {/* Case metadata details */}
              <div className="p-5 sm:p-6 bg-sky-50/40 border-b border-sky-100">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  <div className="bg-white p-3.5 rounded-xl border border-sky-200 shadow-2xs">
                    <span className="text-[#0369a1] font-bold uppercase text-[10px] block">{t.juzgadoSede}:</span>
                    <strong className="text-slate-900 font-bold text-xs sm:text-sm block mt-0.5">
                      {expActual.instancia}
                    </strong>
                    <span className="text-slate-500 text-[11px] block mt-1">
                      {t.distritoJudicial}: <strong>{expActual.distritoJudicial}</strong>
                    </span>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-sky-200 shadow-2xs">
                    <span className="text-[#0369a1] font-bold uppercase text-[10px] block">{t.materiaDemandada}:</span>
                    <strong className="text-slate-900 font-bold text-xs block mt-0.5 leading-snug">
                      {expActual.materia}
                    </strong>
                    <span className="text-slate-500 text-[11px] block mt-1">
                      {t.especialidad}: <strong>{expActual.especialidad}</strong>
                    </span>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-sky-200 shadow-2xs">
                    <span className="text-[#0369a1] font-bold uppercase text-[10px] block">{t.magistrados}:</span>
                    <strong className="text-slate-900 block mt-0.5">
                      {t.juez}: {expActual.juez}
                    </strong>
                    <span className="text-slate-700 text-xs block mt-0.5">
                      {t.especialista}: <strong>{expActual.secretario}</strong>
                    </span>
                    <span className="text-slate-500 text-[11px] block mt-1">
                      {t.fechaInicio}: <strong>{expActual.fechaInicio}</strong>
                    </span>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-sky-200 shadow-2xs">
                    <span className="text-[#0369a1] font-bold uppercase text-[10px] block">{t.partesProcesales}:</span>
                    <div className="mt-0.5 space-y-1">
                      <div>
                        <span className="text-[10px] text-[#0284c7] font-bold uppercase">{t.demandante}:</span>
                        <strong className="text-slate-900 block text-xs">
                          {expActual.demandante}
                        </strong>
                        <span className="text-[11px] text-slate-600 block">
                          DNI: <strong>{expActual.dniDemandante}</strong>
                        </span>
                      </div>
                      <div className="pt-1 border-t border-slate-100">
                        <span className="text-[10px] text-slate-500 font-bold uppercase">{t.demandado}:</span>
                        <strong className="text-slate-800 block text-xs leading-tight">
                          {expActual.demandado}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Editable Timeline of the Case (Eduardo has full control to add/edit/reorder) */}
            <TimelineProcess
              hitos={expActual.lineaTiempo}
              rol={rol}
              onActualizarHitos={handleActualizarHitos}
              nombreEditor={NOMBRE_EDITOR}
            />

            {/* Actuados and Resolutions List */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div>
                <h3 className="font-bold text-lg sm:text-xl text-slate-900 flex items-center gap-2">
                  <FolderOpen className="w-5 h-5 text-[#0284c7]" />
                  <span>{seccionDocumentos === 'actuaciones' ? 'ACTUACIONES PROCESALES' : 'ESCRITOS PRESENTADOS'}</span>
                </h3>
                <p className="text-xs text-slate-500">
                  {(seccionDocumentos === 'actuaciones' ? expActual.resoluciones.filter(r => r.tipo !== 'ESCRITO') : expActual.resoluciones.filter(r => r.tipo === 'ESCRITO')).length} documentos registrados.
                </p>
              </div>

              {rol === 'editor' && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setModalAgendarAudiencia(true)}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-[#881337] hover:bg-[#9f1239] text-white text-xs font-bold rounded-lg shadow-sm transition cursor-pointer border border-rose-300"
                    title="Anotar audiencia o diligencia directamente en la agenda oficial del Juez"
                  >
                    <Calendar className="w-4 h-4 text-rose-200" />
                    <span>Anotar Audiencia en Agenda del Juez</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setModalNuevoActuado(true)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold rounded-lg shadow-sm transition cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{t.btnAnadirActuado}</span>
                  </button>
                </div>
              )}
            </div>

            {rol === 'editor' && (
              <section className="rounded-xl border border-rose-200 bg-white p-4 space-y-3">
                <h4 className="text-sm font-bold text-slate-900">Administrar agenda de magistrados</h4>
                {agendaMagistrados.length === 0 ? (
                  <p className="text-xs text-slate-500">No hay diligencias registradas.</p>
                ) : agendaMagistrados.map((diligencia) => (
                  <div key={diligencia.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 p-3">
                    <div className="text-xs">
                      <strong className="block text-slate-900">{diligencia.magistrado} · {diligencia.tipo}</strong>
                      <span className="text-slate-600">{diligencia.fecha} · {diligencia.hora} · {diligencia.descripcion}</span>
                      <span className="block text-slate-500">Expediente: {diligencia.expedienteNomenclatura}</span>
                    </div>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => {
                        const fecha = window.prompt('Fecha (AAAA-MM-DD):', diligencia.fecha);
                        if (fecha === null) return;
                        const hora = window.prompt('Hora (HH:MM):', diligencia.hora);
                        if (hora === null) return;
                        const descripcion = window.prompt('Descripción:', diligencia.descripcion);
                        if (descripcion === null) return;
                        const magistrado = window.prompt('Nombre del magistrado:', diligencia.magistrado);
                        if (magistrado === null) return;
                        const hoy = new Date();
                        const minFecha = hoy.getFullYear() + '-' + String(hoy.getMonth()+1).padStart(2,'0') + '-' + String(hoy.getDate()).padStart(2,'0');
                        if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha) || fecha < minFecha || !/^\d{2}:\d{2}$/.test(hora) || !descripcion.trim() || !magistrado.trim()) {
                          alert('Verifique la fecha, hora, descripción y magistrado. No se permiten fechas pasadas.');
                          return;
                        }
                        setAgendaMagistrados(actual => actual.map(item => item.id === diligencia.id ? { ...item, fecha, hora, descripcion: descripcion.trim(), magistrado: magistrado.trim() } : item));
                      }} className="rounded-md border border-sky-300 bg-sky-50 px-3 py-1.5 text-xs font-bold text-sky-800">Editar</button>
                      <button type="button" onClick={() => {
                        if (window.confirm('¿Eliminar esta diligencia de la agenda?')) setAgendaMagistrados(actual => actual.filter(item => item.id !== diligencia.id));
                      }} className="rounded-md border border-red-300 bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700">Eliminar</button>
                    </div>
                  </div>
                ))}
              </section>
            )}

            <div className="flex gap-2 border-b border-slate-200 pb-2">
              <button type="button" onClick={() => setSeccionDocumentos('actuaciones')} className={`px-4 py-2 rounded-lg text-xs font-bold ${seccionDocumentos === 'actuaciones' ? 'bg-[#0284c7] text-white' : 'bg-white text-slate-700 border border-slate-200'}`}>Actuaciones procesales</button>
              <button type="button" onClick={() => setSeccionDocumentos('escritos')} className={`px-4 py-2 rounded-lg text-xs font-bold ${seccionDocumentos === 'escritos' ? 'bg-[#0284c7] text-white' : 'bg-white text-slate-700 border border-slate-200'}`}>Escritos presentados</button>
            </div>

            {/* Separate lists for procedural actions and submitted briefs */}
            <div className="space-y-4">
              {[...expActual.resoluciones].filter(res => seccionDocumentos === 'escritos' ? res.tipo === 'ESCRITO' : res.tipo !== 'ESCRITO').reverse().map((res) => (
                <ResolutionCard
                  key={res.id}
                  resolucion={res}
                  expedienteNumero={expActual.nomenclaturaCompleta}
                  materia={expActual.materia}
                  rol={rol}
                  onEditarResolucion={(r) => setEditResolucionModal(r)}
                  onEliminarResolucion={handleEliminarResolucion}
                  onSubirArchivo={handleAbrirSubirArchivo}
                  onRenombrarArchivo={handleRenombrarArchivo}
                  onEliminarArchivo={handleEliminarArchivo}
                  onReanalizarIA={handleReanalizarIA}
                  onVerArchivo={(arch) => setViewDocModal(arch)}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* MODAL: Live Expediente Editor (Add or Edit case with real-time live preview) */}
      <LiveExpedienteEditorModal
        isOpen={modalLiveEditor.abierto}
        onClose={() => setModalLiveEditor({ abierto: false, modo: 'crear' })}
        expedienteInicial={modalLiveEditor.modo === 'editar' ? expActual : null}
        modo={modalLiveEditor.modo}
        onGuardar={handleGuardarExpedienteDesdeEditor}
        idioma={idioma}
      />

      {/* MODAL: Añadir Actuado (Con Barcode y QR automáticos) */}
      <NewActuadoModal
        isOpen={modalNuevoActuado}
        onClose={() => setModalNuevoActuado(false)}
        onCrear={handleCrearNuevoActuado}
        numeroSiguiente={expActual.resoluciones.length + 1}
        expedienteNomenclatura={expActual.nomenclaturaCompleta}
        nombreEditor={NOMBRE_EDITOR}
        dniDemandante={expActual.dniDemandante}
      />

      {/* MODAL: Subir Archivo PDF/Imagen a un Actuado (Solo Servidor Judicial) */}
      <UploadDocumentModal
  isOpen={uploadModalAbierto}
  onClose={() => {
    setUploadModalAbierto(false);
    setTargetResolucionId(null);
  }}
  onGuardar={handleGuardarNuevoArchivo}
  resolucionTitulo={resolucionTarget?.titulo || 'Actuado Judicial'}
  nombreEditor={NOMBRE_EDITOR}
  expedienteId={
    expedienteSeleccionado
      ? String(expedienteSeleccionado.id)
      : String(expedientePrincipal.id)
  }
  resolucionId={String(targetResolucionId || '')}
/>

      {/* MODAL: Visor de Documentos */}
      <ViewDocumentModal
        archivo={viewDocModal}
        onClose={() => setViewDocModal(null)}
        expedienteNumero={expActual.nomenclaturaCompleta}
      />

      {/* MODAL: Editar Actuado / Resolución */}
      <EditResolucionModal
        isOpen={!!editResolucionModal}
        onClose={() => setEditResolucionModal(null)}
        resolucion={editResolucionModal}
        onGuardar={handleGuardarResolucionEditada}
        nombreEditor={NOMBRE_EDITOR}
      />

      {/* MODAL: Anotar Diligencia / Audiencia en Agenda del Juez (Servidor Judicial) */}
      <AgendarAudienciaModal
        isOpen={modalAgendarAudiencia}
        onClose={() => setModalAgendarAudiencia(false)}
        onAgregarDiligencia={(diligencia) => setAgendaMagistrados((prev) => [diligencia, ...prev])}
        expedienteNomenclatura={expActual.nomenclaturaCompleta}
        juezPorDefecto={expActual.juez}
        nombreEditor={NOMBRE_EDITOR}
      />

      {/* Footer with Academic Disclaimer & Attribution with i18n */}
      <Footer idioma={idioma} />
    </div>
  );
}
