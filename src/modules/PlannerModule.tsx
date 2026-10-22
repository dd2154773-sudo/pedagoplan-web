import React, { useState } from 'react';
import { DidacticPlan } from '../types';

interface PlannerModuleProps {
  plan: DidacticPlan;
  onUpdatePlan: (updated: DidacticPlan) => void;
  onOpenExport: () => void;
  onOpenAIChat: () => void;
  activeEngine: 'gemini' | 'groq';
  onEngineChange: (engine: 'gemini' | 'groq') => void;
}

export const PlannerModule: React.FC<PlannerModuleProps> = ({
  plan,
  onUpdatePlan,
  onOpenExport,
  onOpenAIChat,
  activeEngine,
  onEngineChange,
}) => {
  const [activeStep, setActiveStep] = useState<number>(3);
  const [newMaterialInput, setNewMaterialInput] = useState('');
  const [showAddMaterial, setShowAddMaterial] = useState(false);
  const [aiCustomInput, setAiCustomInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  // Current live AI suggestion for development phase
  const [currentAiSuggestion, setCurrentAiSuggestion] = useState<string>(
    'Te sugiero integrar una analogía con la tala y deforestación en la micro-cuenca vecina a la primaria. Reforzará el PDA socioformativo al conectar el ciclo hidrológico con la problemática de sequía comunitaria.'
  );

  const showToast = (msg: string) => {
    setFeedbackToast(msg);
    setTimeout(() => setFeedbackToast(null), 3500);
  };

  // Field update handlers
  const handleUpdateInicio = (field: string, value: any) => {
    onUpdatePlan({
      ...plan,
      lastSaved: 'Justo ahora',
      faseInicio: { ...plan.faseInicio, [field]: value },
    });
  };

  const handleUpdateDesarrollo = (field: string, value: any) => {
    onUpdatePlan({
      ...plan,
      lastSaved: 'Justo ahora',
      faseDesarrollo: { ...plan.faseDesarrollo, [field]: value },
    });
  };

  const handleUpdateCierre = (field: string, value: any) => {
    onUpdatePlan({
      ...plan,
      lastSaved: 'Justo ahora',
      faseCierre: { ...plan.faseCierre, [field]: value },
    });
  };

  const handleAddMaterial = () => {
    if (!newMaterialInput.trim()) return;
    const currentList = plan.faseDesarrollo.materials || [];
    handleUpdateDesarrollo('materials', [...currentList, newMaterialInput.trim()]);
    setNewMaterialInput('');
    setShowAddMaterial(false);
    showToast(`Material "${newMaterialInput.trim()}" agregado.`);
  };

  const handleRemoveMaterial = (indexToRemove: number) => {
    const currentList = plan.faseDesarrollo.materials || [];
    const updated = currentList.filter((_, idx) => idx !== indexToRemove);
    handleUpdateDesarrollo('materials', updated);
  };

  // Insert AI suggestion into development section
  const handleInsertAiSuggestion = () => {
    const textToInsert = `\n\n[Vinculación Socioformativa NEM]: ${currentAiSuggestion}`;
    if (plan.faseDesarrollo.description.includes(currentAiSuggestion)) {
      showToast('Esta sugerencia ya se encuentra integrada en el Momento de Desarrollo.');
      return;
    }
    handleUpdateDesarrollo('description', plan.faseDesarrollo.description + textToInsert);
    showToast('✨ Sugerencia pedagógica insertada en el Momento de Desarrollo.');
  };

  // Request AI adjustment
  const handleRequestAiAdjustment = async (type: 'activity' | 'dua' | 'metacognitive', phase: 'inicio' | 'desarrollo' | 'cierre' = 'desarrollo', customReq?: string) => {
    setIsAiLoading(true);
    try {
      const response = await fetch('/api/pedagogy/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          phase,
          grade: plan.grade,
          subject: plan.subject,
          topic: plan.title,
          currentContent: phase === 'inicio' ? plan.faseInicio.description : phase === 'cierre' ? plan.faseCierre.description : plan.faseDesarrollo.description,
          customPrompt: customReq || aiCustomInput,
          engine: activeEngine,
        }),
      });

      const data = await response.json();
      if (data.text) {
        setCurrentAiSuggestion(data.text);
        if (type === 'dua') {
          handleUpdateDesarrollo('duaAdaptation', data.text);
          showToast('✨ Adecuación DUA actualizada en el plan.');
        } else {
          showToast(`Sugerencia generada con ${data.engine || 'IA Pedagógica'}.`);
        }
      }
    } catch (err) {
      console.error(err);
      setCurrentAiSuggestion('Ajuste DUA recomendado: Incorporar una bitácora ilustrada con pictogramas para alumnos que requieren andamiaje gráfico.');
      showToast('Sugerencia pedagógica generada.');
    } finally {
      setIsAiLoading(false);
      setAiCustomInput('');
    }
  };

  const handleSubmitToTutor = () => {
    onUpdatePlan({
      ...plan,
      status: 'revision',
      lastSaved: 'Enviado a revisión',
    });
    showToast('📨 ¡Planeación enviada con éxito al Mtro. Carlos Fuentes para revisión!');
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4 space-y-5 pb-28">
      {/* Header & Status Card */}
      <section className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-[#dae2fd] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="p-2.5 rounded-xl bg-[#eaedff] text-[#00236f] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">assignment</span>
            </span>
            <div className="min-w-0">
              <h1 className="font-extrabold text-[20px] sm:text-[22px] text-[#00236f] truncate tracking-tight">
                Planeador Didáctico Interactivo
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={`w-2 h-2 rounded-full ${plan.status === 'aprobada' ? 'bg-[#006c49]' : plan.status === 'revision' ? 'bg-[#ef9900]' : 'bg-[#006c49]'}`}></span>
                <span className="text-[12px] text-[#444651]">
                  {plan.status === 'revision' ? 'En revisión por Asesor' : plan.status === 'aprobada' ? 'Aprobada por Asesor' : 'Borrador auto-guardado'} • {plan.lastSaved}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="px-2.5 py-1 rounded-lg bg-[#eaedff] text-[#00236f] font-mono text-[12px] font-bold">
              {plan.version}
            </span>
            <button
              onClick={onOpenExport}
              className="px-3 py-1.5 rounded-xl bg-[#00236f] hover:bg-[#1e3a8a] text-white text-[12px] font-bold flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px]">file_download</span>
              <span>Exportar PDF/Word</span>
            </button>
          </div>
        </div>

        {/* Stepper Wizard */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-[#757682] uppercase tracking-wider">
              Fase de Elaboración Curricular
            </span>
            <span className="text-[12px] font-bold text-[#00236f]">
              Paso {activeStep} de 4 ({activeStep === 1 ? '25%' : activeStep === 2 ? '50%' : activeStep === 3 ? '75%' : '100%'})
            </span>
          </div>

          <div className="grid grid-cols-4 gap-1.5">
            {[
              { step: 1, label: '1. Datos' },
              { step: 2, label: '2. Metas' },
              { step: 3, label: '3. Secuencia' },
              { step: 4, label: '4. DUA' },
            ].map((s) => {
              const isDone = s.step < activeStep;
              const isCurrent = s.step === activeStep;
              return (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => setActiveStep(s.step)}
                  className="flex flex-col gap-1 text-left group"
                >
                  <div
                    className={`h-2 rounded-full transition-all ${
                      isDone
                        ? 'bg-[#006c49]'
                        : isCurrent
                        ? 'bg-[#00236f]'
                        : 'bg-[#e2e7ff]'
                    }`}
                  ></div>
                  <div className="flex items-center gap-1">
                    {isDone ? (
                      <span className="material-symbols-outlined text-[#006c49] text-[13px]">check_circle</span>
                    ) : isCurrent ? (
                      <span className="w-2 h-2 rounded-full bg-[#00236f]"></span>
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-[#c5c5d3]"></span>
                    )}
                    <span
                      className={`text-[11px] truncate ${
                        isCurrent
                          ? 'font-bold text-[#00236f]'
                          : isDone
                          ? 'font-semibold text-[#006c49]'
                          : 'text-[#757682]'
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Curricular Context Card */}
      <section className="bg-gradient-to-r from-[#eaedff] via-[#f2f3ff] to-[#faf8ff] p-4 rounded-2xl border border-[#dae2fd] shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-[#00236f] text-white text-[12px] font-bold shadow-xs">
              {plan.grade} "{plan.group}"
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#6cf8bb] text-[#00714d] text-[12px] font-bold">
              {plan.subject}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[#444651] text-[12px] font-semibold bg-white/70 px-2.5 py-1 rounded-full border border-[#c5c5d3]/40">
            <span className="material-symbols-outlined text-[16px] text-[#00236f]">schedule</span>
            <span>{plan.durationMinutes} min lectivos</span>
          </div>
        </div>

        <div className="mt-2.5 flex items-start gap-2">
          <span className="material-symbols-outlined text-[#00236f] text-[20px] shrink-0 mt-0.5">water_drop</span>
          <div className="flex-1">
            <input
              type="text"
              value={plan.title}
              onChange={(e) => onUpdatePlan({ ...plan, title: e.target.value })}
              className="w-full font-bold text-[16px] sm:text-[17px] text-[#131b2e] bg-transparent border-b border-transparent hover:border-[#00236f]/40 focus:border-[#00236f] focus:bg-white/80 rounded px-1 outline-none transition-all"
              title="Haz clic para editar el tema de la planeación"
            />
            <p className="text-[12px] text-[#444651] mt-1 italic pl-1">
              <strong>PDA (NEM):</strong> {plan.pda}
            </p>
          </div>
        </div>
      </section>

      {/* SECUENCIA DIDÁCTICA FORMULARIO (Inicio, Desarrollo, Cierre) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="font-bold text-[18px] text-[#00236f] flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">view_timeline</span>
            <span>Estructura Secuencial (Inicio, Desarrollo y Cierre)</span>
          </h2>
          <span className="text-[12px] text-[#757682]">Marco NEM 2024</span>
        </div>

        {/* FASE 1: MOMENTO DE INICIO */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-[#dae2fd] space-y-3 transition-all hover:border-[#00236f]/40">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#f2f3ff]">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-[#eaedff] text-[#00236f] flex items-center justify-center font-extrabold text-[13px] shadow-xs">
                F1
              </span>
              <div>
                <h3 className="font-bold text-[15px] text-[#131b2e] leading-tight">
                  {plan.faseInicio.title}
                </h3>
                <p className="text-[11px] text-[#757682]">{plan.faseInicio.subtitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#f2f3ff] text-[#1e3a8a] text-[11px] font-bold border border-[#dae2fd]">
                <span className="material-symbols-outlined text-[13px]">timer</span>
                <input
                  type="number"
                  value={plan.faseInicio.timeMinutes}
                  onChange={(e) => handleUpdateInicio('timeMinutes', parseInt(e.target.value) || 15)}
                  className="w-7 text-center bg-transparent border-0 outline-none font-bold text-[#1e3a8a]"
                />
                <span>min</span>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-[#6cf8bb]/40 text-[#00714d] text-[11px] font-bold">
                {plan.faseInicio.grouping}
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[12px] font-bold text-[#00236f] uppercase tracking-wide">
                Pregunta detonadora y lluvia de ideas
              </label>
              <button
                type="button"
                onClick={() => handleRequestAiAdjustment('activity', 'inicio', 'Mejorar pregunta detonadora con analogía cotidiana')}
                className="text-[11px] font-bold text-[#1e3a8a] hover:text-[#00236f] flex items-center gap-1 bg-[#eaedff] px-2 py-0.5 rounded-full"
              >
                <span className="material-symbols-outlined text-[13px]">magic_button</span>
                <span>Expandir con IA</span>
              </button>
            </div>
            <textarea
              rows={3}
              value={plan.faseInicio.description}
              onChange={(e) => handleUpdateInicio('description', e.target.value)}
              className="w-full p-3 rounded-xl bg-[#f2f3ff] text-[#131b2e] text-[13px] leading-relaxed border border-[#c5c5d3]/40 focus:border-[#00236f] focus:bg-white outline-none transition-all resize-y"
              placeholder="Escribe el planteamiento detonador..."
            />
          </div>

          <div className="flex items-center gap-2 text-[12px] text-[#444651] bg-[#faf8ff] p-2.5 rounded-xl border border-[#e2e7ff]">
            <span className="material-symbols-outlined text-[#006c49] text-[18px] shrink-0">verified</span>
            <div className="flex-1">
              <strong>Intención pedagógica:</strong>{' '}
              <input
                type="text"
                value={plan.faseInicio.pedagogicalIntention}
                onChange={(e) => handleUpdateInicio('pedagogicalIntention', e.target.value)}
                className="w-full bg-transparent border-0 outline-none text-[#444651] italic"
              />
            </div>
          </div>
        </div>

        {/* FASE 2: MOMENTO DE DESARROLLO */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border-2 border-[#00236f]/30 space-y-3 transition-all relative">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#f2f3ff]">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-[#00236f] text-white flex items-center justify-center font-extrabold text-[13px] shadow-xs">
                F2
              </span>
              <div>
                <h3 className="font-bold text-[15px] text-[#00236f] leading-tight">
                  {plan.faseDesarrollo.title}
                </h3>
                <p className="text-[11px] text-[#757682]">{plan.faseDesarrollo.subtitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#f2f3ff] text-[#1e3a8a] text-[11px] font-bold border border-[#dae2fd]">
                <span className="material-symbols-outlined text-[13px]">timer</span>
                <input
                  type="number"
                  value={plan.faseDesarrollo.timeMinutes}
                  onChange={(e) => handleUpdateDesarrollo('timeMinutes', parseInt(e.target.value) || 50)}
                  className="w-7 text-center bg-transparent border-0 outline-none font-bold text-[#1e3a8a]"
                />
                <span>min</span>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-[#dae2fd] text-[#00236f] text-[11px] font-bold">
                {plan.faseDesarrollo.grouping} (4 integrantes)
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[12px] font-bold text-[#00236f] uppercase tracking-wide">
                Actividad Experimental Guiada & Construcción de Saberes
              </label>
              <button
                type="button"
                onClick={() => handleRequestAiAdjustment('activity', 'desarrollo', 'Potenciar la experimentación científica escolar')}
                className="text-[11px] font-bold text-[#006c49] hover:underline flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[13px]">auto_awesome</span>
                <span>Mejorar con IA</span>
              </button>
            </div>
            <textarea
              rows={4}
              value={plan.faseDesarrollo.description}
              onChange={(e) => handleUpdateDesarrollo('description', e.target.value)}
              className="w-full p-3 rounded-xl bg-[#f2f3ff] text-[#131b2e] text-[13px] leading-relaxed border border-[#c5c5d3]/40 focus:border-[#00236f] focus:bg-white outline-none transition-all resize-y"
              placeholder="Describe detalladamente la actividad guiada..."
            />
          </div>

          {/* Materiales requeridos Tag Manager */}
          <div className="p-3 bg-[#faf8ff] rounded-xl border border-[#e2e7ff] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#444651] uppercase tracking-wide flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-[#00236f]">inventory_2</span>
                <span>Materiales requeridos para la sesión</span>
              </span>
              <button
                type="button"
                onClick={() => setShowAddMaterial(!showAddMaterial)}
                className="text-[11px] font-bold text-[#00236f] hover:underline flex items-center gap-0.5"
              >
                <span className="material-symbols-outlined text-[14px]">add</span>
                <span>{showAddMaterial ? 'Cerrar' : 'Agregar material'}</span>
              </button>
            </div>

            {showAddMaterial && (
              <div className="flex items-center gap-2 pt-1 pb-1">
                <input
                  type="text"
                  value={newMaterialInput}
                  onChange={(e) => setNewMaterialInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddMaterial())}
                  placeholder="Ej. Cartulina blanca, semillas de lenteja..."
                  className="flex-1 px-3 py-1.5 text-[12px] bg-white border border-[#c5c5d3] rounded-lg outline-none focus:border-[#00236f]"
                />
                <button
                  type="button"
                  onClick={handleAddMaterial}
                  className="px-3 py-1.5 bg-[#00236f] text-white text-[12px] font-bold rounded-lg shadow-xs hover:bg-[#1e3a8a]"
                >
                  Añadir
                </button>
              </div>
            )}

            <div className="flex flex-wrap gap-1.5 pt-1">
              {plan.faseDesarrollo.materials?.map((mat, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-white border border-[#dae2fd] text-[#131b2e] text-[12px] flex items-center gap-1.5 shadow-xs"
                >
                  <span>{mat}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveMaterial(idx)}
                    className="text-[#757682] hover:text-[#ba1a1a] transition-colors"
                    title="Eliminar material"
                  >
                    <span className="material-symbols-outlined text-[13px]">close</span>
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Pedagogical Reference Photography */}
          <div className="relative rounded-xl overflow-hidden h-40 bg-[#191b23] shadow-inner group">
            <img
              alt="Ejemplo de montaje experimental en primaria"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 opacity-90"
              src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#00236f]/90 via-transparent to-transparent flex items-end justify-between p-3">
              <span className="text-white text-[12px] font-semibold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#6cf8bb]">science</span>
                <span>Referencia fotográfica: Montaje de terrario cerrado en primaria</span>
              </span>
              <button
                type="button"
                onClick={() => showToast('Guía técnica de laboratorio escolar descargada.')}
                className="text-[11px] text-[#6cf8bb] underline hover:text-white transition-colors"
              >
                Ver guía técnica
              </button>
            </div>
          </div>

          {/* DUA Adjustment pill in Development */}
          {plan.faseDesarrollo.duaAdaptation && (
            <div className="p-3 bg-[#6cf8bb]/15 rounded-xl border border-[#6cf8bb]/40 text-[12px] space-y-1">
              <div className="flex items-center justify-between text-[#00714d] font-bold">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">diversity_3</span>
                  <span>Adecuación DUA Integrada (Inclusión Escolar)</span>
                </span>
                <span className="text-[10px] bg-[#6cf8bb] text-[#00714d] px-1.5 py-0.2 rounded font-extrabold">
                  ACTIVO
                </span>
              </div>
              <p className="text-[#131b2e] leading-snug">
                {plan.faseDesarrollo.duaAdaptation}
              </p>
            </div>
          )}
        </div>

        {/* FASE 3: MOMENTO DE CIERRE */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-[#dae2fd] space-y-3 transition-all hover:border-[#00236f]/40">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#f2f3ff]">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-[#eaedff] text-[#00236f] flex items-center justify-center font-extrabold text-[13px] shadow-xs">
                F3
              </span>
              <div>
                <h3 className="font-bold text-[15px] text-[#131b2e] leading-tight">
                  {plan.faseCierre.title}
                </h3>
                <p className="text-[11px] text-[#757682]">{plan.faseCierre.subtitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#f2f3ff] text-[#1e3a8a] text-[11px] font-bold border border-[#dae2fd]">
                <span className="material-symbols-outlined text-[13px]">timer</span>
                <input
                  type="number"
                  value={plan.faseCierre.timeMinutes}
                  onChange={(e) => handleUpdateCierre('timeMinutes', parseInt(e.target.value) || 25)}
                  className="w-7 text-center bg-transparent border-0 outline-none font-bold text-[#1e3a8a]"
                />
                <span>min</span>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-[#ef9900]/20 text-[#ef9900] text-[11px] font-bold">
                {plan.faseCierre.grouping}
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[12px] font-bold text-[#00236f] uppercase tracking-wide">
                Socialización, Síntesis y Metacognición
              </label>
              <button
                type="button"
                onClick={() => handleRequestAiAdjustment('metacognitive', 'cierre', 'Generar preguntas de síntesis reflexiva')}
                className="text-[11px] font-bold text-[#1e3a8a] hover:text-[#00236f] flex items-center gap-1 bg-[#eaedff] px-2 py-0.5 rounded-full"
              >
                <span className="material-symbols-outlined text-[13px]">psychology_alt</span>
                <span>Preguntas Metacognitivas</span>
              </button>
            </div>
            <textarea
              rows={3}
              value={plan.faseCierre.description}
              onChange={(e) => handleUpdateCierre('description', e.target.value)}
              className="w-full p-3 rounded-xl bg-[#f2f3ff] text-[#131b2e] text-[13px] leading-relaxed border border-[#c5c5d3]/40 focus:border-[#00236f] focus:bg-white outline-none transition-all resize-y"
              placeholder="Describe el cierre reflexivo..."
            />
          </div>

          <div className="flex items-center justify-between bg-[#f2f3ff] px-3 py-2 rounded-xl border border-[#dae2fd]">
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-[#006c49] text-[18px]">fact_check</span>
              <div className="flex flex-col min-w-0">
                <span className="text-[12px] font-bold text-[#131b2e] truncate">
                  Instrumento de Evaluación Formativa:
                </span>
                <span className="text-[11px] text-[#757682]">
                  {plan.faseCierre.evaluationInstrument || 'Lista de cotejo formativa'}
                </span>
              </div>
            </div>
            <span className="text-[11px] font-bold text-[#006c49] bg-[#6cf8bb]/30 px-2 py-0.5 rounded-md">
              Configurado ✓
            </span>
          </div>
        </div>
      </section>

      {/* COPILOTO PEDAGÓGICO IA INTEGRADO (Módulo Central Requerido) */}
      <section className="bg-gradient-to-b from-[#ffffff] to-[#f2f3ff] rounded-2xl p-4 sm:p-5 shadow-md border border-[#c5c5d3]/70 space-y-4">
        {/* Header con Switcher de Motor */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00236f] to-[#1e3a8a] text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[20px]">smart_toy</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-[16px] text-[#00236f]">Copiloto Pedagógico IA</h3>
                <span className="px-1.5 py-0.2 bg-[#006c49] text-white text-[9px] font-bold rounded">
                  EN LÍNEA
                </span>
              </div>
              <p className="text-[11px] text-[#757682]">
                Asistencia para transposición didáctica, enfoque NEM y adecuaciones DUA
              </p>
            </div>
          </div>

          {/* Engine Selector */}
          <div className="flex items-center gap-1.5 bg-[#eaedff] p-1 rounded-xl border border-[#dae2fd] self-start sm:self-auto">
            <button
              type="button"
              onClick={() => onEngineChange('gemini')}
              className={`px-3 py-1 rounded-lg text-[12px] font-bold flex items-center gap-1 transition-all ${
                activeEngine === 'gemini'
                  ? 'bg-white text-[#00236f] shadow-xs'
                  : 'text-[#444651] hover:text-[#00236f]'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">psychology</span>
              <span>Gemini 3.8</span>
            </button>
            <button
              type="button"
              onClick={() => onEngineChange('groq')}
              className={`px-3 py-1 rounded-lg text-[12px] font-bold flex items-center gap-1 transition-all ${
                activeEngine === 'groq'
                  ? 'bg-[#aa0266] text-white shadow-xs'
                  : 'text-[#444651] hover:text-[#aa0266]'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">bolt</span>
              <span>Groq 280 T/S</span>
            </button>
          </div>
        </div>

        {/* Live Suggestion Box */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-[#dae2fd] shadow-xs space-y-3">
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#ef9900]/15 text-[#ef9900] flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[18px]">lightbulb</span>
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[12px] font-bold text-[#00236f] block">
                Sugerencia Dinámica para Momento de Desarrollo:
              </span>
              <p className="text-[13px] text-[#131b2e] mt-1 leading-relaxed whitespace-pre-line">
                "{currentAiSuggestion}"
              </p>
            </div>
          </div>

          {/* Suggestion Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#f2f3ff]">
            <button
              type="button"
              onClick={handleInsertAiSuggestion}
              className="px-3 py-1.5 rounded-xl bg-[#00236f] hover:bg-[#1e3a8a] text-white text-[12px] font-bold flex items-center gap-1.5 shadow-xs active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[15px]">add_circle</span>
              <span>+ Insertar actividad sugerida</span>
            </button>

            <button
              type="button"
              disabled={isAiLoading}
              onClick={() => handleRequestAiAdjustment('dua', 'desarrollo', 'Adaptación DUA para estudiantes con TDAH')}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#eaedff] text-[#006c49] border border-[#006c49]/30 text-[12px] font-bold flex items-center gap-1.5 shadow-xs active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[15px]">diversity_3</span>
              <span>✨ Adaptar DUA (TDAH)</span>
            </button>

            <button
              type="button"
              disabled={isAiLoading}
              onClick={() => handleRequestAiAdjustment('metacognitive', 'cierre', '3 preguntas metacognitivas clave')}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#eaedff] text-[#1e3a8a] border border-[#1e3a8a]/30 text-[12px] font-bold flex items-center gap-1.5 shadow-xs active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[15px]">psychology_alt</span>
              <span>🎯 Pregunta metacognitiva</span>
            </button>

            <button
              type="button"
              onClick={onOpenAIChat}
              className="px-3 py-1.5 rounded-xl bg-[#eaedff] hover:bg-[#dae2fd] text-[#00236f] text-[12px] font-bold flex items-center gap-1.5 shadow-xs active:scale-95 transition-all ml-auto"
            >
              <span className="material-symbols-outlined text-[15px]">chat</span>
              <span>Abrir Chat Extendido</span>
            </button>
          </div>
        </div>

        {/* Custom AI Prompt Bar */}
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-[#c5c5d3]/60 shadow-xs focus-within:border-[#00236f]">
          <span className="material-symbols-outlined text-[#757682] pl-2 text-[20px]">auto_awesome</span>
          <input
            type="text"
            value={aiCustomInput}
            onChange={(e) => setAiCustomInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleRequestAiAdjustment('activity', 'desarrollo', aiCustomInput))}
            placeholder="Pídele a la IA ajustar la dificultad, proponer materiales reciclados o dinámicas..."
            disabled={isAiLoading}
            className="flex-1 bg-transparent text-[13px] text-[#131b2e] outline-none placeholder-[#757682] py-1"
          />
          <button
            type="button"
            disabled={isAiLoading || !aiCustomInput.trim()}
            onClick={() => handleRequestAiAdjustment('activity', 'desarrollo', aiCustomInput)}
            className="w-9 h-9 rounded-lg bg-[#00236f] hover:bg-[#1e3a8a] text-white flex items-center justify-center shrink-0 active:scale-90 disabled:opacity-40 transition-all"
            title="Enviar petición a la IA"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isAiLoading ? 'refresh' : 'send'}
            </span>
          </button>
        </div>
      </section>

      {/* Primary Export & Save Floating Bar */}
      <section className="space-y-2.5 pt-2">
        <button
          type="button"
          onClick={onOpenExport}
          className="w-full py-4 px-5 rounded-2xl bg-[#00236f] hover:bg-[#1e3a8a] text-white font-bold text-[15px] sm:text-[16px] flex items-center justify-between shadow-md active:scale-99 transition-all"
        >
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[24px]">download_for_offline</span>
            <span>Exportar Planeación Completa</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-xl text-[12px] font-semibold">
            <span>PDF / .docx</span>
            <span className="material-symbols-outlined text-[16px]">expand_more</span>
          </div>
        </button>

        <button
          type="button"
          onClick={handleSubmitToTutor}
          className="w-full py-3.5 px-5 rounded-2xl bg-[#eaedff] hover:bg-[#dae2fd] text-[#00236f] font-bold text-[14px] flex items-center justify-center gap-2 border border-[#c5c5d3]/50 shadow-xs active:scale-99 transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">send_and_archive</span>
          <span>Guardar y Enviar a Revisión de Tutor</span>
        </button>
      </section>

      {/* Toast Feedback */}
      {feedbackToast && (
        <div className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md bg-[#131b2e] text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 z-50 animate-in slide-in-from-bottom-3 text-[13px]">
          <span className="material-symbols-outlined text-[#6cf8bb] text-[22px]">check_circle</span>
          <span className="flex-1 font-medium">{feedbackToast}</span>
          <button
            onClick={() => setFeedbackToast(null)}
            className="text-white/60 hover:text-white"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}
    </div>
  );
};
