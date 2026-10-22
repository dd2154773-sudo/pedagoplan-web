import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange }) => {
  const navItems: { id: TabType; label: string; icon: string; badge?: string }[] = [
    { id: 'inicio', label: 'Inicio', icon: 'dashboard' },
    { id: 'planeador', label: 'Planeador', icon: 'edit_document', badge: 'IA' },
    { id: 'secuencias', label: 'Secuencias', icon: 'menu_book' },
    { id: 'evidencias', label: 'Evidencias', icon: 'photo_library' },
    { id: 'plantillas', label: 'Plantillas', icon: 'folder_open' },
    { id: 'diario', label: 'Diario', icon: 'history_edu' },
    { id: 'evaluacion', label: 'Acreditación', icon: 'verified' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-40 bg-[#faf8ff]/95 backdrop-blur-xl border-t border-[#e2e7ff] shadow-[0_-2px_12px_rgba(19,27,46,0.06)] pb-safe">
      <div className="max-w-4xl mx-auto h-16 px-2 flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`relative flex flex-col items-center justify-center min-w-[50px] sm:min-w-[64px] h-13 gap-0.5 rounded-xl transition-all ${
                isActive
                  ? 'text-[#00236f] font-bold bg-[#eaedff]/70 scale-105'
                  : 'text-[#444651] hover:text-[#00236f] hover:bg-[#f2f3ff]/50'
              }`}
            >
              <div className="relative">
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {item.icon}
                </span>
                {item.badge && (
                  <span className="absolute -top-1 -right-2 px-1 py-0.2 bg-[#00236f] text-white text-[9px] font-extrabold rounded-full leading-tight ring-1 ring-white">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[11px] leading-tight truncate ${isActive ? 'font-bold text-[#00236f]' : 'font-medium'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
