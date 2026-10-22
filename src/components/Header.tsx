import React from 'react';
import { TabType } from '../types';

interface HeaderProps {
  currentTab: TabType;
  onOpenAIChat: () => void;
  activeEngine: 'gemini' | 'groq';
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onOpenAIChat, activeEngine }) => {
  const getTabLabel = (tab: TabType): string => {
    switch (tab) {
      case 'inicio': return 'Inicio & Práctica';
      case 'planeador': return 'Planeador Didáctico';
      case 'secuencias': return 'Secuencias de Clase';
      case 'evidencias': return 'Evidencias de Aula';
      case 'plantillas': return 'Centro de Plantillas';
      case 'diario': return 'Diario de Campo';
      case 'evaluacion': return 'Acreditación & Horas';
      default: return 'Prácticas Docentes';
    }
  };

  return (
    <header className="fixed top-0 w-full z-40 bg-[#faf8ff]/90 backdrop-blur-xl border-b border-[#e2e7ff] shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="max-w-6xl mx-auto h-16 px-4 flex items-center justify-between gap-3">
        {/* Brand & Context */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00236f] to-[#1e3a8a] text-white flex items-center justify-center shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[24px]">school</span>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-bold text-[17px] text-[#00236f] tracking-tight">PedagoPlan</span>
              <span className="text-[11px] text-[#757682] opacity-60">•</span>
              <span className="text-[13px] font-semibold text-[#1e3a8a] truncate">
                {getTabLabel(currentTab)}
              </span>
            </div>
            <span className="text-[11px] text-[#757682] tracking-normal truncate mt-0.5">
              Lic. en Pedagogía • Prácticas Profesionales 2024-II
            </span>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* AI Quick Assistant Pill Button */}
          <button
            onClick={onOpenAIChat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#eaedff] hover:bg-[#dae2fd] text-[#00236f] transition-all text-[12px] font-semibold shadow-xs active:scale-95 border border-[#c5c5d3]/40"
            title="Abrir Asistente Pedagógico IA"
          >
            <span className="w-2 h-2 rounded-full bg-[#006c49] animate-pulse"></span>
            <span className="material-symbols-outlined text-[16px] text-[#00236f]">smart_toy</span>
            <span className="hidden sm:inline">Copiloto IA</span>
            <span className="px-1.5 py-0.2 rounded bg-[#006c49]/15 text-[#006c49] text-[10px] font-bold">
              {activeEngine === 'gemini' ? 'Gemini 3.8' : 'Groq 280 T/S'}
            </span>
          </button>

          {/* Notifications Button */}
          <button
            className="relative w-9 h-9 flex items-center justify-center rounded-full text-[#444651] hover:text-[#00236f] hover:bg-[#f2f3ff] transition-colors"
            title="Notificaciones de tutoría"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ba1a1a] rounded-full ring-2 ring-[#faf8ff]"></span>
          </button>

          {/* Profile Avatar */}
          <div className="relative flex items-center justify-center pl-1" title="Sofía López - 8vo Semestre Pedagogía">
            <img
              alt="Sofía López - Practicante"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[#006c49]/30 shadow-xs"
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#006c49] rounded-full ring-2 ring-[#faf8ff]"></span>
          </div>
        </div>
      </div>
    </header>
  );
};
