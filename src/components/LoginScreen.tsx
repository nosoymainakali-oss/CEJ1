import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  User, 
  Lock, 
  CheckCircle2, 
  AlertCircle, 
  Scale, 
  ArrowRight,
  RefreshCw,
  FileCheck
} from 'lucide-react';
import { RolUsuario } from '../types/judicial';

interface LoginScreenProps {
  onLoginExitoso: (datos: { rol: RolUsuario; nombreUsuario: string; dniUsuario: string }) => void;
  onAbrirJuezTeEscucha?: () => void;
}

type TipoDocumento = 'DNI' | 'PASAPORTE' | 'CARNET_EXTRANJERIA';

// Simulated directory of verified citizen identities
const REGISTRO_CIUDADANOS: Record<string, string> = {
  '75412933': 'EDUARDO LUISMARIO MEDINA HUMPIRI',
  '45892147': 'JUAN CARLOS MAMANI QUISPE',
  '70241589': 'MARIA ELENA ROJAS APAZA',
  '41258963': 'CARLOS ALBERTO CONDORI FLORES',
  '73521489': 'ANA PATRICIA TICONACONDORI',
  '72819230': 'YENI LUZMILA MAMANI HUANCA',
  '40192837': 'VICTOR RAUL CHURA CHOQUE',
  '71829304': 'GLADYS SONIA QUISPE MAMANI',
};

function generarNombreCiudadano(doc: string, tipo: TipoDocumento): string {
  if (REGISTRO_CIUDADANOS[doc]) {
    return REGISTRO_CIUDADANOS[doc];
  }

  const apellidos = [
    'QUISPE', 'MAMANI', 'CONDORI', 'FLORES', 'ROJAS', 'APAZA', 'HUANCA',
    'CHURA', 'TICONACONDORI', 'MEDINA', 'HUMPIRI', 'COILA', 'RAMOS',
    'SANCHEZ', 'TORRES', 'MENDOZA', 'VARGAS', 'FERNANDEZ'
  ];
  const nombres = [
    'JUAN CARLOS', 'EDGAR MIGUEL', 'WILMER LIZARDO', 'LUIS ALBERTO',
    'MARIA ELENA', 'ANA PATRICIA', 'LEYDI KAREN', 'ROSA LUZ', 'JORGE LUIS'
  ];

  let hash = 0;
  for (let i = 0; i < doc.length; i++) {
    hash = (hash * 31 + doc.charCodeAt(i)) >>> 0;
  }

  const nom = nombres[hash % nombres.length];
  const ap1 = apellidos[(hash >> 2) % apellidos.length];
  const ap2 = apellidos[(hash >> 4) % apellidos.length];

  if (tipo === 'PASAPORTE') {
    return `${nom} ${ap1} (EXTRANJERO)`;
  }
  return `${nom} ${ap1} ${ap2}`;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ 
  onLoginExitoso,
  onAbrirJuezTeEscucha
}) => {
  const [tipoAcceso, setTipoAcceso] = useState<'ciudadano' | 'servidor'>('ciudadano');

  // Ciudadano states
  const [tipoDocumento, setTipoDocumento] = useState<TipoDocumento>('DNI');
  const [numeroDocumento, setNumeroDocumento] = useState('');
  const [nombreTitular, setNombreTitular] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCodigo, setCaptchaCodigo] = useState('');
  const [validandoAcceso, setValidandoAcceso] = useState(false);
  const [errorCiudadano, setErrorCiudadano] = useState('');
  const [ciudadanoConfirmado, setCiudadanoConfirmado] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Servidor Judicial states
  const [usuarioServidor, setUsuarioServidor] = useState('');
  const [passwordServidor, setPasswordServidor] = useState('');
  const [errorServidor, setErrorServidor] = useState('');

  // Random 5-char judicial captcha
  const regenerarCaptcha = () => {
    const caracteres = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    setCaptchaCodigo(code);
    setCaptchaInput('');
    setErrorCiudadano('');
  };

  useEffect(() => {
    regenerarCaptcha();
  }, []);

  // Draw security captcha
  useEffect(() => {
    if (!canvasRef.current || !captchaCodigo) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#f0f9ff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#bae6fd';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 16) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 12) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.quadraticCurveTo(canvas.width / 2, canvas.height * 0.1, canvas.width, canvas.height * 0.8);
    ctx.stroke();

    const colors = ['#0c4a6e', '#0369a1', '#0284c7', '#0f172a', '#1e293b'];
    ctx.font = 'bold 24px "Courier New", monospace';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < captchaCodigo.length; i++) {
      const char = captchaCodigo[i];
      const x = 16 + i * 24;
      const y = canvas.height / 2 + (Math.random() * 6 - 3);
      const angle = (Math.random() * 16 - 8) * (Math.PI / 180);

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillStyle = colors[i % colors.length];
      ctx.fillText(char, 0, 0);
      ctx.restore();
    }
  }, [captchaCodigo]);

  // Ciudadano login
  const handleAccesoCiudadano = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorCiudadano('');

    const docLimpio = numeroDocumento.trim();

    if (!docLimpio) {
      setErrorCiudadano('Por favor ingrese el número de su documento de identidad.');
      return;
    }

    if (tipoDocumento === 'DNI' && (docLimpio.length !== 8 || isNaN(Number(docLimpio)))) {
      setErrorCiudadano('El DNI debe contener exactamente 8 dígitos numéricos.');
      return;
    }

    if (tipoDocumento === 'PASAPORTE' && docLimpio.length < 5) {
      setErrorCiudadano('El pasaporte debe contener al menos 5 caracteres.');
      return;
    }

    if (tipoDocumento === 'CARNET_EXTRANJERIA' && docLimpio.length < 6) {
      setErrorCiudadano('El Carnet de Extranjería debe contener al menos 6 caracteres.');
      return;
    }

    if (captchaInput.trim().toUpperCase() !== captchaCodigo.toUpperCase()) {
      setErrorCiudadano('Código de seguridad incorrecto. Intente nuevamente.');
      regenerarCaptcha();
      return;
    }

    setValidandoAcceso(true);

    const nombre = nombreTitular.trim()
      ? nombreTitular.trim().toUpperCase()
      : generarNombreCiudadano(docLimpio, tipoDocumento);

    setCiudadanoConfirmado(nombre);

    setTimeout(() => {
      setValidandoAcceso(false);
      onLoginExitoso({
        rol: 'consultor',
        nombreUsuario: nombre,
        dniUsuario: docLimpio,
      });
    }, 600);
  };

  // Servidor Judicial login
  const handleLoginServidor = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorServidor('');

    if (usuarioServidor.trim() === '75412933' && passwordServidor.trim() === '120403') {
      onLoginExitoso({
        rol: 'editor',
        nombreUsuario: 'EDUARDO LUISMARIO MEDINA HUMPIRI',
        dniUsuario: '75412933',
      });
    } else {
      setErrorServidor('Credenciales incorrectas. Verifique el usuario y la contraseña del servidor judicial.');
    }
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-sky-100 flex flex-col justify-between text-slate-800"
      style={{ fontFamily: 'Arial, sans-serif' }}
    >
      {/* Top Banner */}
      <div className="bg-[#0c4a6e] text-white py-2.5 px-4 border-b border-sky-400/40">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between text-xs gap-2">
          <div className="flex items-center gap-2 font-bold tracking-wide">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse"></span>
            <span>PODER JUDICIAL DEL PERÚ &bull; SISTEMA JUDICIAL DIGITAL</span>
          </div>
          <div className="text-sky-200">
            <span>CONSULTA DE EXPEDIENTES JUDICIALES</span>
          </div>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="max-w-lg w-full mx-auto p-4 sm:p-6 my-auto">
        <div className="bg-white rounded-2xl shadow-xl border-2 border-sky-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0369a1] via-[#0284c7] to-[#0c4a6e] text-white p-6 text-center">
            <div className="inline-flex p-3 bg-white/10 rounded-full border border-white/20 mb-3 shadow-inner">
              <Scale className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight uppercase">
              PORTAL JUDICIAL CIUDADANO
            </h1>
            <p className="text-xs sm:text-sm text-sky-100 mt-1 font-medium">
              PODER JUDICIAL DEL PERÚ &bull; ACCESO OFICIAL
            </p>
          </div>

          {/* Access Tabs: Ciudadano, Servidor Judicial, y Pestaña Granate EL JUEZ TE ESCUCHA */}
          <div className="flex flex-wrap border-b border-sky-200 bg-sky-50/70 p-1.5 gap-1.5">
            <button
              type="button"
              onClick={() => {
                setTipoAcceso('ciudadano');
                setErrorCiudadano('');
              }}
              className={`flex-1 py-2.5 px-2 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition cursor-pointer min-w-[110px] ${
                tipoAcceso === 'ciudadano'
                  ? 'bg-white text-[#0369a1] shadow-sm border border-sky-200'
                  : 'text-slate-600 hover:text-[#0369a1] hover:bg-white/50'
              }`}
            >
              <User className="w-4 h-4 text-[#0284c7]" />
              <span>Acceso Ciudadano</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setTipoAcceso('servidor');
                setErrorServidor('');
              }}
              className={`flex-1 py-2.5 px-2 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition cursor-pointer min-w-[110px] ${
                tipoAcceso === 'servidor'
                  ? 'bg-white text-[#0369a1] shadow-sm border border-sky-200'
                  : 'text-slate-600 hover:text-[#0369a1] hover:bg-white/50'
              }`}
            >
              <Lock className="w-4 h-4 text-sky-700" />
              <span>Servidor Judicial</span>
            </button>

            {/* PESTAÑA GRANATE: EL JUEZ TE ESCUCHA */}
            {onAbrirJuezTeEscucha && (
              <button
                type="button"
                onClick={onAbrirJuezTeEscucha}
                className="py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition cursor-pointer bg-[#881337] hover:bg-[#9f1239] text-white shadow-sm border border-rose-300 shrink-0"
                title="Sacar cita con el Juez - Módulo El Juez Te Escucha"
              >
                <Scale className="w-4 h-4 text-rose-200" />
                <span className="uppercase tracking-wider font-black">EL JUEZ TE ESCUCHA</span>
              </button>
            )}
          </div>

          {/* Tab 1: Ciudadano with Document Type Selector and CAPTCHA */}
          {tipoAcceso === 'ciudadano' ? (
            <div className="p-6 sm:p-8 space-y-5">
              <form onSubmit={handleAccesoCiudadano} className="space-y-4">
                {/* Selector: DNI, Pasaporte o Carnet de Extranjería */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Tipo de Documento:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setTipoDocumento('DNI');
                        setNumeroDocumento('');
                        setErrorCiudadano('');
                      }}
                      className={`py-2 px-2 text-xs font-bold rounded-lg border transition ${
                        tipoDocumento === 'DNI'
                          ? 'bg-[#0284c7] text-white border-[#0284c7] shadow-xs'
                          : 'bg-white text-slate-700 border-sky-200 hover:bg-sky-50'
                      }`}
                    >
                      DNI
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setTipoDocumento('PASAPORTE');
                        setNumeroDocumento('');
                        setErrorCiudadano('');
                      }}
                      className={`py-2 px-2 text-xs font-bold rounded-lg border transition ${
                        tipoDocumento === 'PASAPORTE'
                          ? 'bg-[#0284c7] text-white border-[#0284c7] shadow-xs'
                          : 'bg-white text-slate-700 border-sky-200 hover:bg-sky-50'
                      }`}
                    >
                      Pasaporte
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setTipoDocumento('CARNET_EXTRANJERIA');
                        setNumeroDocumento('');
                        setErrorCiudadano('');
                      }}
                      className={`py-2 px-2 text-xs font-bold rounded-lg border transition ${
                        tipoDocumento === 'CARNET_EXTRANJERIA'
                          ? 'bg-[#0284c7] text-white border-[#0284c7] shadow-xs'
                          : 'bg-white text-slate-700 border-sky-200 hover:bg-sky-50'
                      }`}
                    >
                      Carnet de Ext.
                    </button>
                  </div>
                </div>

                {/* Input for document number */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {tipoDocumento === 'DNI'
                      ? 'Número de DNI:'
                      : tipoDocumento === 'PASAPORTE'
                      ? 'Número de Pasaporte:'
                      : 'Número de Carnet de Extranjería:'}
                  </label>
                  <input
                    type="text"
                    maxLength={tipoDocumento === 'DNI' ? 8 : 12}
                    value={numeroDocumento}
                    onChange={(e) => {
                      if (tipoDocumento === 'DNI') {
                        setNumeroDocumento(e.target.value.replace(/\D/g, ''));
                      } else {
                        setNumeroDocumento(e.target.value.toUpperCase());
                      }
                    }}
                    placeholder=""
                    className="w-full bg-white border-2 border-sky-200 focus:border-[#0284c7] rounded-lg px-4 py-2.5 text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400/20 shadow-2xs font-mono"
                    autoFocus
                    required
                  />
                </div>

                {/* Optional full name field if passport or foreign */}
                {tipoDocumento !== 'DNI' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Nombres y Apellidos Completos:
                    </label>
                    <input
                      type="text"
                      value={nombreTitular}
                      onChange={(e) => setNombreTitular(e.target.value)}
                      placeholder=""
                      className="w-full bg-white border-2 border-sky-200 focus:border-[#0284c7] rounded-lg px-3.5 py-2 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400/20 shadow-2xs"
                      required
                    />
                  </div>
                )}

                {/* Obligatory Judicial Security CAPTCHA */}
                <div className="bg-sky-50/70 p-3.5 rounded-xl border border-sky-200 space-y-2.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Código de Seguridad:
                  </label>
                  
                  <div className="flex items-center gap-3">
                    <canvas
                      ref={canvasRef}
                      width={150}
                      height={48}
                      className="border-2 border-sky-300 rounded-lg shadow-2xs bg-sky-50 select-none"
                    />

                    <button
                      type="button"
                      onClick={regenerarCaptcha}
                      className="p-2 text-[#0284c7] hover:text-[#0369a1] bg-white hover:bg-sky-50 rounded-lg border border-sky-200 transition shadow-2xs cursor-pointer"
                      title="Generar nuevo código"
                    >
                      <RefreshCw className="w-5 h-5" />
                    </button>
                  </div>

                  <input
                    type="text"
                    maxLength={5}
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value.toUpperCase())}
                    placeholder="Ingrese el código de la imagen"
                    className="w-full bg-white border-2 border-sky-200 focus:border-[#0284c7] rounded-lg px-3.5 py-2 text-sm font-bold text-slate-900 tracking-widest font-mono uppercase focus:outline-none focus:ring-2 focus:ring-sky-400/20 shadow-2xs"
                    required
                  />
                </div>

                {errorCiudadano && (
                  <div className="flex items-start gap-2 text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorCiudadano}</span>
                  </div>
                )}

                {ciudadanoConfirmado && (
                  <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 p-3 rounded-lg border border-emerald-300 animate-in fade-in">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <strong className="block text-emerald-950">{ciudadanoConfirmado}</strong>
                      <span className="text-[11px] text-emerald-700">Identidad confirmada. Ingresando...</span>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={validandoAcceso || !!ciudadanoConfirmado}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-sm rounded-lg shadow-md hover:shadow-lg transition cursor-pointer disabled:bg-slate-300"
                >
                  {validandoAcceso ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Verificando ingreso...</span>
                    </>
                  ) : (
                    <>
                      <span>Ingresar al Sistema</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* Tab 2: Servidor Judicial */
            <div className="p-6 sm:p-8 space-y-5">
              <div className="bg-sky-50 border border-sky-200 rounded-xl p-3.5 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#0369a1] shrink-0 mt-0.5" />
                <div className="text-xs text-sky-950 leading-relaxed">
                  <strong>Acceso de Servidor Judicial:</strong> Ingrese sus credenciales de usuario y contraseña autorizadas para funciones de administración, edición de expedientes y carga de actuados.
                </div>
              </div>

              <form onSubmit={handleLoginServidor} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Usuario:
                  </label>
                  <input
                    type="text"
                    value={usuarioServidor}
                    onChange={(e) => setUsuarioServidor(e.target.value)}
                    placeholder=""
                    className="w-full bg-white border-2 border-sky-200 focus:border-[#0284c7] rounded-lg px-4 py-2.5 text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400/20 shadow-2xs font-mono"
                    autoFocus
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Contraseña:
                  </label>
                  <input
                    type="password"
                    value={passwordServidor}
                    onChange={(e) => setPasswordServidor(e.target.value)}
                    placeholder=""
                    className="w-full bg-white border-2 border-sky-200 focus:border-[#0284c7] rounded-lg px-4 py-2.5 text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400/20 shadow-2xs"
                    required
                  />
                </div>

                {errorServidor && (
                  <div className="flex items-start gap-2 text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorServidor}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#0c4a6e] hover:bg-[#0369a1] text-white font-bold text-sm rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
                >
                  <Lock className="w-4 h-4 text-sky-300" />
                  <span>Iniciar Sesión como Servidor Judicial</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Academic Disclaimer & Attribution Footer on Login */}
      <footer className="bg-[#0c4a6e] text-white py-6 px-4 border-t-2 border-sky-400 text-xs text-center space-y-2">
        <div className="max-w-4xl mx-auto space-y-1.5">
          <p className="font-medium text-sky-100">
            «Esta página web, fue creada con fines estrictamente académicos, las partes que aparecen en el presente expediente son nombres ficticios, y cualquier parecido con la realidad es puro coincidencia.»
          </p>
          <p className="font-bold text-white pt-1">
            Trabajo académico perteneciente a: <span className="underline decoration-sky-400 underline-offset-4 text-sky-200">Eduardo Luismario Medina Humpiri</span>, estudiante de la <span className="text-white">Facultad de Ciencias Jurídicas y Políticas de la Universidad Nacional del Altiplano de Puno</span>.
          </p>
          <p className="text-[11px] text-sky-300 font-bold uppercase tracking-wider pt-0.5">
            GOBIERNO DIGITAL Y DERECHO INFORMÁTICO &bull; PODER JUDICIAL DEL PERÚ
          </p>
        </div>
      </footer>
    </div>
  );
};
