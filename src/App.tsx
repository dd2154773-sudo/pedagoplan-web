import React, { useState } from 'react';
import { TabType, DidacticPlan, EvidenceItem } from './types';
import { initialActivePlan } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { ExportModal } from './components/ExportModal';
import { AIChatModal } from './components/AIChatModal';
import { DashboardModule } from './modules/DashboardModule';
import { PlannerModule } from './modules/PlannerModule';
import { SequencesListModule } from './modules/SequencesListModule';
import { EvidencesModule } from './modules/EvidencesModule';
import { TemplatesModule } from './modules/TemplatesModule';
import { DiaryModule } from './modules/DiaryModule';
import { EvaluationModule } from './modules/EvaluationModule';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('planeador');
  const [activePlan, setActivePlan] = useState<DidacticPlan>(initialActivePlan);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isAIChatModalOpen, setIsAIChatModalOpen] = useState(false);
  const [activeEngine, setActiveEngine] = useState<'gemini' | 'groq'>('gemini');
  const [globalToast, setGlobalToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setGlobalToast(msg);
    setTimeout(() => setGlobalToast(null), 3500);
  };

  const handleInsertSuggestionFromAI = (targetPhase: 'inicio' | 'desarrollo' | 'cierre', text: string) => {
    if (targetPhase === 'inicio') {
      setActivePlan((prev) => ({
        ...prev,
        lastSaved: 'Actualizado con IA',
        faseInicio: {
          ...prev.faseInicio,
          description: prev.faseInicio.description + `\n\n[Sugerencia IA]: ${text}`,
        },
      }));
    } else if (targetPhase === 'cierre') {
      setActivePlan((prev) => ({
        ...prev,
        lastSaved: 'Actualizado con IA',
        faseCierre: {
          ...prev.faseCierre,
          description: prev.faseCierre.description + `\n\n[Sugerencia IA]: ${text}`,
        },
      }));
    } else {
      setActivePlan((prev) => ({
        ...prev,
        lastSaved: 'Actualizado con IA',
        faseDesarrollo: {
          ...prev.faseDesarrollo,
          description: prev.faseDesarrollo.description + `\n\n[Sugerencia IA]: ${text}`,
        },
      }));
    }
    setCurrentTab('planeador');
    triggerToast(`✨ Sugerencia incorporada exitosamente en el Momento de ${targetPhase.toUpperCase()}.`);
  };

  const handleAttachEvidenceToPlan = (evidence: EvidenceItem) => {
    setActivePlan((prev) => ({
      ...prev,
      lastSaved: 'Evidencia vinculada',
      faseDesarrollo: {
        ...prev.faseDesarrollo,
        description: prev.faseDesarrollo.description + `\n\n[Evidencia de Aula Vinculada]: ${evidence.title} (${evidence.categoryLabel}) - ${evidence.reflectiveNote}`,
      },
    }));
    triggerToast(`📸 Evidencia "${evidence.title}" adjuntada a la planeación didáctica.`);
    setCurrentTab('planeador');
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col antialiased">
      {/* Top Fixed Header */}
      <Header
        currentTab={currentTab}
        onOpenAIChat={() => setIsAIChatModalOpen(true)}
        activeEngine={activeEngine}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 pt-18 pb-6">
        {currentTab === 'inicio' && (
          <DashboardModule
            onNavigate={(tab) => setCurrentTab(tab)}
            onOpenAIChat={() => setIsAIChatModalOpen(true)}
          />
        )}

        {currentTab === 'planeador' && (
          <PlannerModule
            plan={activePlan}
            onUpdatePlan={setActivePlan}
            onOpenExport={() => setIsExportModalOpen(true)}
            onOpenAIChat={() => setIsAIChatModalOpen(true)}
            activeEngine={activeEngine}
            onEngineChange={setActiveEngine}
          />
        )}

        {currentTab === 'secuencias' && (
          <SequencesListModule
            onNavigateToPlanner={() => setCurrentTab('planeador')}
            onOpenExport={() => setIsExportModalOpen(true)}
          />
        )}

        {currentTab === 'evidencias' && (
          <EvidencesModule onAttachToPlan={handleAttachEvidenceToPlan} />
        )}

        {currentTab === 'plantillas' && <TemplatesModule />}

        {currentTab === 'diario' && <DiaryModule />}

        {currentTab === 'evaluacion' && <EvaluationModule />}
      </main>

      {/* Persistent Bottom Tab Navigation */}
      <BottomNav
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Modals */}
      <ExportModal
        plan={activePlan}
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />

      <AIChatModal
        isOpen={isAIChatModalOpen}
        onClose={() => setIsAIChatModalOpen(false)}
        plan={activePlan}
        onInsertSuggestion={handleInsertSuggestionFromAI}
        activeEngine={activeEngine}
        onEngineChange={setActiveEngine}
      />

      {/* Global Toast Feedback */}
      {globalToast && (
        <div className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md bg-[#131b2e] text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 z-50 animate-in slide-in-from-bottom-3 text-[13px]">
          <span className="material-symbols-outlined text-[#6cf8bb] text-[22px]">check_circle</span>
          <span className="flex-1 font-medium">{globalToast}</span>
          <button
            onClick={() => setGlobalToast(null)}
            className="text-white/60 hover:text-white"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}
    </div>
  );
}
