import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  UserCheck, 
  AlertCircle, 
  CheckCircle2, 
  Scale, 
  ArrowLeft,
  FileText,
  CalendarCheck,
  Building,
  User,
  ShieldCheck,
  Search,
  PlusCircle,
  HelpCircle
} from 'lucide-react';
import { DiligenciaAgenda } from '../types/judicial';

const hoyLocal = () => { const f = new Date(); return `${f.getFullYear()}-${String(f.getMonth()+1).padStart(2,'0')}-${String(f.getDate()).padStart(2,'0')}`; };

export const JUECES_PERMITIDOS = [
  'Sebastian Alberto Tapia Tito',
  'Leydi Karen Quispe Rojas',
  'Marco Antonio Ticona Miranda'
];

interface ElJuezTeEscuchaProps {
  onVolver?: () => void;
  dniInicial?: string;
  nombreInicial?: string;
  agendaMagistrados: DiligenciaAgenda[];
  onAgendarCita: (cita: DiligenciaAgenda) => void;
  juezPreseleccionado?: string;
  expedienteNomenclatura?: string;
}

export const ElJuezTeEscucha: React.FC<ElJuezTeEscuchaProps> = ({
  onVolver,
  dniInicial = '',
  nombreInicial = '',
  agendaMagistrados,
  onAgendarCita,
  juezPreseleccionado = '',
  expedienteNomenclatura = '',
}) => {
  // Step 1: Identification
  const [dniUsuario, setDniUsuario] = useState(dniInicial);
  const [nombreUsuario, setNombreUsuario] = useState(nombreInicial);
  const [identificado, setIdentificado] = useState(Boolean(dniInicial && dniInicial.length >= 8 && nombreInicial.trim()));

  // Step 2: Judge search & validation
  const [juezSeleccionado, setJuezSeleccionado] = useState<string | null>(
    JUECES_PERMITIDOS.some(j => j.toLowerCase() === juezPreseleccionado.toLowerCase()) 
      ? juezPreseleccionado 
      : null
  );
  const [errorJuez, setErrorJuez] = useState('');

  // Step 3: Appointment details
  const [motivoCita, setMotivoCita] = useState('');
  const [fechaCita, setFechaCita] = useState(hoyLocal());
  const [horaCita, setHoraCita] = useState('11:00');
  const [citaConfirmada, setCitaConfirmada] = useState<DiligenciaAgenda | null>(null);

  // Handle identification form
  const handleIdentificar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombreUsuario.trim()) { alert('Por favor ingrese sus nombres y apellidos completos.'); return; }
    if (!/^\d{8}$/.test(dniUsuario.trim())) {
      alert('Por favor ingrese un número de DNI válido de 8 dígitos.');
      return;
    }
    setIdentificado(true);
  };

  const handleSeleccionarSugerencia = (juez: string) => {
    setJuezSeleccionado(juez);
    setErrorJuez('');
  };

  // Submit appointment
  const handleSolicitarCita = (e: React.FormEvent) => {
    e.preventDefault();
    if (!juezSeleccionado) {
      setErrorJuez('Debe seleccionar un magistrado habilitado.');
      return;
    }

    if (fechaCita < hoyLocal()) { alert('Seleccione una fecha actual o futura.'); return; }

    if (!motivoCita.trim()) {
      alert('Por favor ingrese el motivo por el cual solicita la cita con el magistrado.');
      return;
    }

    const nuevaCita: DiligenciaAgenda = {
      id: `cita-${Date.now()}`,
      magistrado: juezSeleccionado,
      expedienteNomenclatura: expedienteNomenclatura || '',
      fecha: fechaCita,
      hora: horaCita,
      tipo: 'CITA_CIUDADANA',
      descripcion: `Atención Ciudadana: ${motivoCita.trim().substring(0, 70)}...`,
      solicitante: nombreUsuario || 'Ciudadano Identificado',
      dniSolicitante: dniUsuario,
      motivo: motivoCita.trim(),
    };

    onAgendarCita(nuevaCita);
    setCitaConfirmada(nuevaCita);
  };

  // Filter agenda for the selected judge
  const diligenciasJuez = juezSeleccionado
    ? agendaMagistrados.filter(d => d.magistrado.toLowerCase() === juezSeleccionado.toLowerCase() && d.fecha >= hoyLocal())
    : [];

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4 font-arial" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Header Banner - Granate Oficial */}
      <div className="bg-gradient-to-r from-[#881337] via-[#9f1239] to-[#4c0519] text-white p-6 rounded-2xl shadow-xl border-2 border-rose-300">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white text-[#881337] flex items-center justify-center font-black shadow-md border-2 border-rose-200 shrink-0">
              <Scale className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black tracking-widest text-rose-200 uppercase">
                  PODER JUDICIAL DEL PERÚ &bull; PERÚ
                </span>
                <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  MÓDULO OFICIAL
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight uppercase">
                EL JUEZ TE ESCUCHA
              </h1>
              <p className="text-xs sm:text-sm text-rose-100 font-medium">
                Sistema de Atención y Entrevistas Ciudadanas con Magistrados
              </p>
            </div>
          </div>

          {onVolver && (
            <button
              onClick={onVolver}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition border border-rose-200/40 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver</span>
            </button>
          )}
        </div>
      </div>

      {/* Step 1: Identificación del Ciudadano con DNI */}
      {!identificado ? (
        <div className="bg-white rounded-2xl p-6 border-2 border-rose-200 shadow-md">
          <div className="flex items-center gap-2.5 pb-4 border-b border-rose-100">
            <UserCheck className="w-5 h-5 text-[#881337]" />
            <div>
              <h2 className="text-base font-bold text-slate-900 uppercase">
                Paso 1: Identificación Ciudadana
              </h2>
              <p className="text-xs text-slate-500">
                Ingrese su DNI para iniciar la solicitud en el sistema «El Juez Te Escucha».
              </p>
            </div>
          </div>

          <form onSubmit={handleIdentificar} className="mt-5 space-y-4 max-w-md">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Número de DNI:
              </label>
              <input
                type="text"
                maxLength={8}
                value={dniUsuario}
                onChange={(e) => setDniUsuario(e.target.value.replace(/\D/g, ''))}
                placeholder="Ingrese 8 dígitos de su DNI"
                className="w-full bg-slate-50 border-2 border-slate-300 focus:border-[#881337] rounded-xl px-4 py-2.5 text-sm font-bold tracking-widest text-slate-900 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Nombres y Apellidos Completos:
              </label>
              <input
                type="text"
                value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
                placeholder="Ingrese sus nombres y apellidos completos"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-sm text-slate-900 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#881337] hover:bg-[#9f1239] text-white font-bold rounded-xl text-sm transition shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Validar Identidad y Continuar</span>
            </button>
          </form>
        </div>
      ) : (
        /* Citizen is identified */
        <div className="space-y-6">
          {/* User Bar */}
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#881337]" />
              <span className="text-slate-600">
                Ciudadano Solicitante: <strong className="text-[#881337] uppercase">{nombreUsuario}</strong> (DNI: {dniUsuario})
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIdentificado(false)}
              className="text-[#881337] hover:underline font-bold text-xs"
            >
              Cambiar Identificación
            </button>
          </div>

          {/* Confirmation Box if appointment was booked */}
          {citaConfirmada && (
            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-6 shadow-md animate-in fade-in">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <h3 className="font-bold text-emerald-950 text-base uppercase">
                    ¡Cita Solicitada con Éxito en «El Juez Te Escucha»!
                  </h3>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Su entrevista con el magistrado <strong>{citaConfirmada.magistrado}</strong> ha sido agendada para el <strong>{citaConfirmada.fecha}</strong> a horas <strong>{citaConfirmada.hora}</strong>. Ha quedado registrada formalmente en la agenda oficial del Poder Judicial.
                  </p>
                  <div className="bg-white p-3 rounded-lg border border-emerald-200 text-xs text-slate-700 space-y-1">
                    <div><strong>Expediente Asociado:</strong> {citaConfirmada.expedienteNomenclatura}</div>
                    <div><strong>Motivo:</strong> {citaConfirmada.motivo}</div>
                    <div><strong>Solicitante:</strong> {citaConfirmada.solicitante} (DNI: {citaConfirmada.dniSolicitante})</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCitaConfirmada(null)}
                    className="mt-2 text-xs font-bold text-emerald-700 underline cursor-pointer"
                  >
                    Agendar otra entrevista o revisar agendas
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Buscador y Verificación de Magistrado */}
          <div className="bg-white rounded-2xl p-6 border-2 border-rose-200 shadow-md">
            <div className="flex items-center gap-2.5 pb-4 border-b border-rose-100">
              <Search className="w-5 h-5 text-[#881337]" />
              <div>
                <h2 className="text-base font-bold text-slate-900 uppercase">
                  Paso 2: Seleccione al Magistrado
                </h2>
                <p className="text-xs text-slate-500">
                  Seleccione un magistrado para consultar su agenda oficial disponible.
                </p>
              </div>
            </div>

            {/* Quick shortcuts for user convenience */}
            <div className="pt-3 pb-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1.5">
                Magistrados autorizados en el Distrito Judicial:
              </span>
              <div className="flex flex-wrap gap-2">
                {JUECES_PERMITIDOS.map((juez) => (
                  <button
                    key={juez}
                    type="button"
                    onClick={() => handleSeleccionarSugerencia(juez)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border cursor-pointer ${
                      juezSeleccionado === juez
                        ? 'bg-[#881337] text-white border-[#881337] shadow-sm'
                        : 'bg-rose-50/70 hover:bg-rose-100 text-[#881337] border-rose-200'
                    }`}
                  >
                    {juez}
                  </button>
                ))}
              </div>
            </div>

            {/* Error message if Judge does not exist */}
            {errorJuez && (
              <div className="mt-4 p-4 rounded-xl bg-red-50 border-2 border-red-300 text-red-900 flex items-start gap-3 animate-in fade-in">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold text-xs uppercase tracking-wide">
                    Aviso: El juez no existe
                  </strong>
                  <p className="text-xs mt-0.5 leading-relaxed">
                    {errorJuez}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Step 3: Agenda y Solicitud de Cita (Only visible when a valid Judge is found) */}
          {juezSeleccionado && (
            <div className="space-y-6 animate-in fade-in">
              {/* Formulario de Cita con Casillero de Motivo ARRIBA */}
              <div className="bg-white rounded-2xl p-6 border-2 border-[#881337] shadow-lg">
                <div className="flex items-center gap-2.5 pb-4 border-b border-rose-100">
                  <CalendarCheck className="w-5 h-5 text-[#881337]" />
                  <div>
                    <h2 className="text-base font-bold text-slate-900 uppercase">
                      Solicitud de Entrevista con: {juezSeleccionado}
                    </h2>
                    <p className="text-xs text-slate-500">
                      Complete el motivo y seleccione el horario para su entrevista judicial.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSolicitarCita} className="mt-5 space-y-4">
                  {/* CASILLERO ARRIBA: Motivo por el cual quiere agendar una cita */}
                  <div>
                    <label className="block text-xs font-bold text-[#881337] uppercase mb-1">
                      * Motivo de la Cita / Entrevista Judicial:
                    </label>
                    <textarea
                      rows={3}
                      value={motivoCita}
                      onChange={(e) => setMotivoCita(e.target.value)}
                      placeholder="Explique con claridad el motivo por el cual solicita una entrevista con el magistrado."
                      className="w-full bg-rose-50/40 border-2 border-rose-300 focus:border-[#881337] rounded-xl p-3 text-xs sm:text-sm text-slate-900 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Fecha deseada:
                      </label>
                      <input
                        type="date"
                        min={hoyLocal()}
                        value={fechaCita}
                        onChange={(e) => setFechaCita(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Hora de atención:
                      </label>
                      <select
                        value={horaCita}
                        onChange={(e) => setHoraCita(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900"
                      >
                        <option value="09:00">09:00 a.m.</option>
                        <option value="09:30">09:30 a.m.</option>
                        <option value="10:00">10:00 a.m.</option>
                        <option value="10:30">10:30 a.m.</option>
                        <option value="11:00">11:00 a.m.</option>
                        <option value="11:30">11:30 a.m.</option>
                        <option value="12:00">12:00 m.</option>
                        <option value="15:00">03:00 p.m.</option>
                        <option value="15:30">03:30 p.m.</option>
                        <option value="16:00">04:00 p.m.</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Expediente asociado:
                      </label>
                      <input
                        type="text"
                        value={expedienteNomenclatura}
                        readOnly
                        className="w-full bg-slate-100 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono text-slate-700"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#881337] hover:bg-[#9f1239] text-white font-bold rounded-xl text-sm transition shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    <span>Confirmar y Agendar Cita en «El Juez Te Escucha»</span>
                  </button>
                </form>
              </div>

              {/* Agenda Pública del Juez (Vinculada a las audiencias o diligencias que se anoten en cada expediente) */}
              <div className="bg-white rounded-2xl p-6 border-2 border-rose-200 shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-rose-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#881337]" />
                    <h3 className="text-base font-bold text-slate-900 uppercase">
                      Agenda Oficial de Actividades: {juezSeleccionado}
                    </h3>
                  </div>
                  <span className="text-xs bg-rose-100 text-[#881337] px-2.5 py-0.5 rounded-full font-bold">
                    {diligenciasJuez.length} Diligencias / Audiencias Registradas
                  </span>
                </div>

                <p className="text-xs text-slate-500 mt-2 mb-4">
                  Esta agenda está sincronizada en tiempo real con las audiencias, vistas de causa y diligencias fijadas en los expedientes judiciales del magistrado.
                </p>

                {diligenciasJuez.length === 0 ? (
                  <div className="text-center py-8 bg-rose-50/40 rounded-xl border border-rose-200 text-xs text-slate-600">
                    No hay diligencias ni audiencias agendadas actualmente para este magistrado. Horario completamente disponible para entrevistas ciudadanas.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {diligenciasJuez.map((diligencia) => (
                      <div
                        key={diligencia.id}
                        className={`p-3.5 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs transition ${
                          diligencia.tipo === 'CITA_CIUDADANA'
                            ? 'bg-rose-50/70 border-rose-300'
                            : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                diligencia.tipo === 'AUDIENCIA'
                                  ? 'bg-blue-600 text-white'
                                  : diligencia.tipo === 'CITA_CIUDADANA'
                                  ? 'bg-[#881337] text-white'
                                  : 'bg-slate-700 text-white'
                              }`}
                            >
                              {diligencia.tipo.replace('_', ' ')}
                            </span>
                            <span className="font-mono text-slate-600 font-medium">
                              Exp: {diligencia.expedienteNomenclatura}
                            </span>
                          </div>
                          <p className="text-slate-900 font-bold text-xs sm:text-sm">
                            {diligencia.descripcion}
                          </p>
                          {diligencia.motivo && (
                            <p className="text-slate-600 text-[11px] italic">
                              Motivo: &ldquo;{diligencia.motivo}&rdquo; &bull; Solicitante: {diligencia.solicitante}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-slate-800 font-bold shrink-0 shadow-2xs">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-rose-700" />
                            <span>{diligencia.fecha}</span>
                          </div>
                          <div className="flex items-center gap-1 border-l pl-2 border-slate-200">
                            <Clock className="w-3.5 h-3.5 text-rose-700" />
                            <span>{diligencia.hora}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
