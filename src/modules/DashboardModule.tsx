import React from 'react';
import { TabType } from '../types';

interface DashboardModuleProps {
  onNavigate: (tab: TabType) => void;
  onOpenAIChat: () => void;
}

export const DashboardModule: React.FC<DashboardModuleProps> = ({ onNavigate, onOpenAIChat }) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4 space-y-5 pb-28">
      {/* Saludo Cálido y Contexto Personal */}
      <section className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="font-extrabold text-[22px] sm:text-[24px] text-[#00236f] tracking-tight">
              ¡Hola, Sofía!
            </h1>
            <span className="text-xl">✨</span>
          </div>
          <p className="text-[12px] text-[#444651]">
            8vo Semestre • Licenciatura en Pedagogía
          </p>
        </div>

        <div className="flex items-center gap-1 bg-[#6cf8bb]/40 text-[#00714d] px-3 py-1 rounded-full shrink-0 shadow-xs">
          <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            workspace_premium
          </span>
          <span className="text-[11px] font-bold">Fase Final</span>
        </div>
      </section>

      {/* Tarjeta de Práctica Activa (Hero Card) */}
      <section className="bg-gradient-to-br from-[#00236f] via-[#1e3a8a] to-[#00236f] text-white rounded-2xl p-4 sm:p-5 shadow-md flex flex-col gap-3 relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-start justify-between gap-2 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px] text-[#dce1ff]">school</span>
            </div>
            <div>
              <span className="text-[11px] text-[#b6c4ff] font-bold uppercase tracking-wider block">
                Centro de Práctica
              </span>
              <h2 className="font-bold text-[17px] sm:text-[18px] text-white leading-tight">
                Esc. Prim. Benito Juárez
              </h2>
            </div>
          </div>

          <span className="bg-[#006c49] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
            Ciclo Activo
          </span>
        </div>

        {/* Metadatos de la Práctica */}
        <div className="grid grid-cols-3 gap-2 pt-1 z-10 text-[12px]">
          <div className="bg-white/10 rounded-xl p-2.5 flex flex-col">
            <span className="text-[10px] text-[#b6c4ff] font-semibold">Grado Asignado</span>
            <span className="font-extrabold text-[15px] text-white">4° B</span>
          </div>

          <div className="bg-white/10 rounded-xl p-2.5 flex flex-col col-span-2">
            <span className="text-[10px] text-[#b6c4ff] font-semibold">Tutor / Asesor</span>
            <span className="font-bold text-[14px] text-white truncate">Mtro. Carlos Fuentes</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[#b6c4ff] text-[12px] pt-1 z-10 border-t border-white/10">
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">date_range</span>
            <span>Feb – Jun 2025</span>
          </span>
          <span className="font-semibold text-white/90">Semana 12 de 18</span>
        </div>
      </section>

      {/* Monitor de Horas y Progreso de Práctica */}
      <section className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-[#dae2fd] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#f2f3ff] text-[#00236f] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">timelapse</span>
            </div>
            <div>
              <h3 className="font-bold text-[15px] text-[#131b2e] leading-none">Horas Acumuladas</h3>
              <p className="text-[11px] text-[#757682] mt-0.5">Requisito de Titulación</p>
            </div>
          </div>

          <span className="bg-[#6cf8bb]/40 text-[#00714d] text-[11px] font-bold px-2.5 py-0.5 rounded-full">
            Al corriente
          </span>
        </div>

        <div className="flex items-baseline justify-between pt-1">
          <div className="flex items-baseline gap-1">
            <span className="font-extrabold text-[32px] sm:text-[36px] text-[#00236f] leading-none">280</span>
            <span className="text-[14px] text-[#757682] font-semibold">/ 480 hrs</span>
          </div>
          <span className="font-extrabold text-[16px] text-[#006c49]">58%</span>
        </div>

        {/* Barra de Progreso */}
        <div className="w-full bg-[#f2f3ff] rounded-full h-3 overflow-hidden border border-[#dae2fd]">
          <div
            className="bg-gradient-to-r from-[#00236f] to-[#006c49] h-3 rounded-full transition-all duration-700"
            style={{ width: '58%' }}
          ></div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-[#444651]">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#006c49]"></span>
            <span>200 hrs restantes</span>
          </span>
          <span>Aprox. 6 semanas para liberación</span>
        </div>
      </section>

      {/* Acciones Rápidas (Matriz 2x2 Táctil) */}
      <section className="space-y-2">
        <h3 className="font-bold text-[15px] text-[#131b2e] px-1">Acciones Frecuentes</h3>
        <div className="grid grid-cols-2 gap-3">
          {/* Acción 1: Nueva Planeación */}
          <button
            onClick={() => onNavigate('planeador')}
            className="bg-white hover:bg-[#f2f3ff] text-left p-4 rounded-2xl border border-[#dae2fd] shadow-xs transition-all flex flex-col justify-between h-28 active:scale-95 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#eaedff] text-[#00236f] flex items-center justify-center shadow-xs group-hover:bg-[#00236f] group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[22px]">post_add</span>
            </div>
            <div>
              <span className="font-bold text-[14px] text-[#131b2e] block leading-tight">Nueva Planeación</span>
              <span className="text-[11px] text-[#757682]">Diseño didáctico</span>
            </div>
          </button>

          {/* Acción 2: Registrar Evidencia */}
          <button
            onClick={() => onNavigate('evidencias')}
            className="bg-white hover:bg-[#f2f3ff] text-left p-4 rounded-2xl border border-[#dae2fd] shadow-xs transition-all flex flex-col justify-between h-28 active:scale-95 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#6cf8bb]/30 text-[#006c49] flex items-center justify-center shadow-xs group-hover:bg-[#006c49] group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[22px]">add_a_photo</span>
            </div>
            <div>
              <span className="font-bold text-[14px] text-[#131b2e] block leading-tight">Subir Evidencias</span>
              <span className="text-[11px] text-[#757682]">Fotos y notas de aula</span>
            </div>
          </button>

          {/* Acción 3: Bitácora Diaria */}
          <button
            onClick={() => onNavigate('diario')}
            className="bg-white hover:bg-[#f2f3ff] text-left p-4 rounded-2xl border border-[#dae2fd] shadow-xs transition-all flex flex-col justify-between h-28 active:scale-95 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#eaedff] text-[#00236f] flex items-center justify-center shadow-xs group-hover:bg-[#00236f] group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[22px]">edit_note</span>
            </div>
            <div>
              <span className="font-bold text-[14px] text-[#131b2e] block leading-tight">Bitácora Diaria</span>
              <span className="text-[11px] text-[#757682]">Reflexión áulica</span>
            </div>
          </button>

          {/* Acción 4: Asesoría IA Didáctica */}
          <button
            onClick={onOpenAIChat}
            className="bg-gradient-to-br from-[#eaedff] to-[#f2f3ff] hover:to-[#dae2fd] text-left p-4 rounded-2xl border border-[#00236f]/30 shadow-xs transition-all flex flex-col justify-between h-28 active:scale-95 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#00236f] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[22px]">psychology</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[14px] text-[#00236f] block leading-tight">Asesoría IA</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#006c49]"></span>
              </div>
              <span className="text-[11px] text-[#757682]">Estrategias activas</span>
            </div>
          </button>
        </div>
      </section>

      {/* Próximos Compromisos y Entregas */}
      <section className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-bold text-[15px] text-[#131b2e]">Próximos Compromisos</h3>
          <button
            onClick={() => onNavigate('secuencias')}
            className="text-[12px] text-[#00236f] font-bold flex items-center gap-0.5 hover:underline"
          >
            Ver planeaciones <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>

        <div className="space-y-2.5">
          {/* Compromiso 1: Urgente */}
          <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#dae2fd] flex items-start gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#ffddb8] text-[#3e2400] flex flex-col items-center justify-center shrink-0 font-bold">
              <span className="text-[10px] uppercase leading-none">Mar</span>
              <span className="text-[16px] leading-tight">25</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="bg-[#ffddb8] text-[#653e00] text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">
                  Revisión Urgente
                </span>
                <span className="text-[11px] text-[#757682]">Mañana 18:00</span>
              </div>
              <h4 className="font-bold text-[14px] text-[#131b2e] truncate pt-1">
                Secuencia didáctica: Fracciones
              </h4>
              <p className="text-[11px] text-[#757682] truncate">
                Pensamiento numérico • 4° Primaria
              </p>
            </div>
          </div>

          {/* Compromiso 2 */}
          <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#dae2fd] flex items-start gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#eaedff] text-[#00236f] flex flex-col items-center justify-center shrink-0 font-bold">
              <span className="text-[10px] uppercase leading-none">Jue</span>
              <span className="text-[16px] leading-tight">27</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="bg-[#eaedff] text-[#00236f] text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">
                  Evaluación en Vivo
                </span>
                <span className="text-[11px] text-[#757682]">10:30 hrs</span>
              </div>
              <h4 className="font-bold text-[14px] text-[#131b2e] truncate pt-1">
                Observación áulica de tutor
              </h4>
              <p className="text-[11px] text-[#757682] truncate">
                Supervisión institucional • Salón 4° B
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Fotográfico Inspirador */}
      <section className="relative w-full h-36 rounded-2xl overflow-hidden shadow-xs border border-[#dae2fd]">
        <img
          alt="Docente en formación planificando en el aula"
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#00236f]/85 via-[#00236f]/40 to-transparent flex items-end p-4">
          <div className="flex items-center gap-2 text-white">
            <span className="material-symbols-outlined text-[18px] text-[#6cf8bb]">verified</span>
            <span className="text-[12px] font-bold">
              Portafolio docente respaldado en la nube con validación oficial
            </span>
          </div>
        </div>
      </section>

      {/* Cita Pedagógica Formativa de Paulo Freire */}
      <section className="bg-gradient-to-r from-[#eaedff] to-[#f2f3ff] rounded-2xl p-4 shadow-xs border border-[#dae2fd]">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-[#00236f]/10 text-[#00236f] flex items-center justify-center shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[20px]">format_quote</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-extrabold text-[#00236f] uppercase tracking-wider">
              Reflexión Pedagógica
            </span>
            <blockquote className="text-[12px] text-[#131b2e] italic leading-relaxed">
              “La educación no cambia al mundo, cambia a las personas que van a cambiar el mundo.”
            </blockquote>
            <span className="text-[11px] font-bold text-[#757682]">
              — Paulo Freire
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
