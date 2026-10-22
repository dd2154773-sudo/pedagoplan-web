import React, { useState } from 'react';
import { AIChatMessage, DidacticPlan } from '../types';

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: DidacticPlan;
  onInsertSuggestion: (targetPhase: 'inicio' | 'desarrollo' | 'cierre', text: string) => void;
  activeEngine: 'gemini' | 'groq';
  onEngineChange: (engine: 'gemini' | 'groq') => void;
}

export const AIChatModal: React.FC<AIChatModalProps> = ({
  isOpen,
  onClose,
  plan,
  onInsertSuggestion,
  activeEngine,
  onEngineChange,
}) => {
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: `¡Hola, Sofía! Soy tu Copiloto Pedagógico IA. Estoy sincronizado con tu planeación "${plan.title}" (${plan.grade}, ${plan.subject}). ¿Deseas que adaptemos la secuencia con metodología DUA, integremos una pregunta metacognitiva o ajustemos la actividad experimental?`,
      timestamp: 'Ahora',
      engine: activeEngine === 'gemini' ? 'Gemini 3.8 Flash' : 'Groq LPU',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string, type: 'activity' | 'dua' | 'metacognitive' | 'chat' = 'chat', targetPhase: 'inicio' | 'desarrollo' | 'cierre' = 'desarrollo') => {
    const query = textToSend || inputText.trim();
    if (!query) return;

    const userMsg: AIChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/pedagogy/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          phase: targetPhase,
          grade: plan.grade,
          subject: plan.subject,
          topic: plan.title,
          currentContent: targetPhase === 'inicio' ? plan.faseInicio.description : targetPhase === 'cierre' ? plan.faseCierre.description : plan.faseDesarrollo.description,
          customPrompt: query,
          engine: activeEngine,
        }),
      });

      const data = await response.json();
      const aiReplyText = data.text || 'He procesado tu solicitud pedagógica.';

      const aiMsg: AIChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        engine: data.engine || (activeEngine === 'gemini' ? 'Gemini 3.8 Flash' : 'Groq Llama-3.3'),
        suggestionAction: {
          targetPhase,
          textToInsert: aiReplyText,
        },
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('Error in AI chat:', err);
      const fallbackMsg: AIChatMessage = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        text: `[Sugerencia Pedagógica DUA]:\nPara apoyar la diversidad en ${plan.grade}, se recomienda estructurar la fase de ${targetPhase} con organizadores gráficos con contraste de color, material manipulativo de apoyo y trabajo en parejas colaborativas con roles asignados.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        engine: 'PedagoPlan Core',
        suggestionAction: {
          targetPhase,
          textToInsert: `[Adecuación DUA]: Se incorpora organizador gráfico con relieve y apoyo visual para la fase de ${targetPhase}.`,
        },
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    { label: '✨ Adaptación DUA (TDAH)', type: 'dua' as const, phase: 'desarrollo' as const, prompt: 'Generar adecuación curricular DUA para alumnos con TDAH o atención dispersa en esta sesión.' },
    { label: '💡 Actividad Experimental Guiada', type: 'activity' as const, phase: 'desarrollo' as const, prompt: 'Proponer una actividad de indagación activa con materiales reciclados para el momento de desarrollo.' },
    { label: '🎯 Preguntas Metacognitivas', type: 'metacognitive' as const, phase: 'cierre' as const, prompt: '3 preguntas metacognitivas reflexivas para evaluar el aprendizaje en el cierre de la clase.' },
    { label: '🌱 Vincular con Problemática Local', type: 'activity' as const, phase: 'inicio' as const, prompt: '¿Cómo vincular esta sesión con el desabasto de agua o ecología de la comunidad escolar?' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#00236f]/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#ffffff] w-full sm:max-w-xl h-[85vh] sm:h-[650px] rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-[#c5c5d3]">
        {/* Header */}
        <div className="p-4 bg-[#eaedff] flex flex-col gap-2 border-b border-[#dae2fd]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#00236f] text-white flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-[20px]">smart_toy</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-[16px] text-[#00236f] leading-none">Copiloto Pedagógico IA</h3>
                  <span className="px-1.5 py-0.2 rounded bg-[#006c49] text-white text-[9px] font-extrabold uppercase">
                    Activo
                  </span>
                </div>
                <p className="text-[11px] text-[#444651] mt-0.5">
                  Asesoría didáctica para el diseño de secuencias NEM y DUA
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white hover:bg-[#dae2fd] text-[#444651] flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          {/* Engine Selector Capsule */}
          <div className="grid grid-cols-2 gap-1.5 bg-[#faf8ff] p-1 rounded-xl border border-[#dae2fd]">
            <button
              type="button"
              onClick={() => onEngineChange('gemini')}
              className={`py-1.5 px-2.5 rounded-lg text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-all ${
                activeEngine === 'gemini'
                  ? 'bg-[#00236f] text-white shadow-xs'
                  : 'text-[#444651] hover:bg-[#eaedff]'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">psychology</span>
              <span>Gemini 3.8 Flash (NEM)</span>
            </button>
            <button
              type="button"
              onClick={() => onEngineChange('groq')}
              className={`py-1.5 px-2.5 rounded-lg text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-all ${
                activeEngine === 'groq'
                  ? 'bg-[#aa0266] text-white shadow-xs'
                  : 'text-[#444651] hover:bg-[#eaedff]'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">bolt</span>
              <span>Groq LPU (280 T/S)</span>
            </button>
          </div>
        </div>

        {/* Quick Suggestion Starter Chips */}
        <div className="px-3 py-2 bg-[#f2f3ff] border-b border-[#dae2fd] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(qp.prompt, qp.type, qp.phase)}
              disabled={isLoading}
              className="shrink-0 text-[11px] font-semibold bg-white hover:bg-[#eaedff] text-[#00236f] border border-[#c5c5d3]/50 px-2.5 py-1 rounded-full shadow-xs active:scale-95 transition-all flex items-center gap-1"
            >
              <span>{qp.label}</span>
            </button>
          ))}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#faf8ff]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-1.5 text-[10px] text-[#757682] mb-1 px-1">
                <span>{msg.sender === 'user' ? 'Tú (Sofía)' : 'Copiloto IA'}</span>
                <span>•</span>
                <span>{msg.timestamp}</span>
                {msg.engine && (
                  <>
                    <span>•</span>
                    <span className="font-mono text-[#006c49] font-semibold">{msg.engine}</span>
                  </>
                )}
              </div>

              <div
                className={`max-w-[88%] p-3.5 rounded-2xl text-[13px] leading-relaxed shadow-xs whitespace-pre-line ${
                  msg.sender === 'user'
                    ? 'bg-[#1e3a8a] text-white rounded-tr-xs'
                    : 'bg-white text-[#131b2e] border border-[#dae2fd] rounded-tl-xs'
                }`}
              >
                {msg.text}

                {/* Direct Action Button to Insert into Active Lesson Plan */}
                {msg.suggestionAction && msg.sender === 'ai' && (
                  <div className="mt-3 pt-2.5 border-t border-[#dae2fd] flex items-center justify-between">
                    <span className="text-[11px] text-[#757682]">
                      Momento: <strong className="text-[#00236f] uppercase">{msg.suggestionAction.targetPhase}</strong>
                    </span>
                    <button
                      onClick={() => {
                        onInsertSuggestion(
                          msg.suggestionAction!.targetPhase,
                          msg.suggestionAction!.textToInsert
                        );
                        onClose();
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#006c49] hover:bg-[#005236] text-white text-[11px] font-bold shadow-xs active:scale-95 transition-all"
                    >
                      <span className="material-symbols-outlined text-[14px]">add_circle</span>
                      <span>Insertar en el Plan</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 p-3 bg-white border border-[#dae2fd] rounded-2xl rounded-tl-xs max-w-xs text-[12px] text-[#00236f] animate-pulse">
              <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
              <span>Diseñando propuesta didáctica con {activeEngine === 'gemini' ? 'Gemini 3.8...' : 'Groq LPUs...'}</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-[#dae2fd]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 bg-[#f2f3ff] rounded-xl p-1.5 border border-[#c5c5d3]/50 focus-within:border-[#00236f] focus-within:bg-white transition-all"
          >
            <span className="material-symbols-outlined text-[#757682] pl-2 text-[20px]">auto_awesome</span>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Pregúntale al Copiloto sobre DUA, actividades, tiempos..."
              disabled={isLoading}
              className="flex-1 bg-transparent border-0 outline-none text-[13px] text-[#131b2e] placeholder-[#757682] py-1"
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="w-9 h-9 rounded-lg bg-[#00236f] hover:bg-[#1e3a8a] text-white flex items-center justify-center shrink-0 active:scale-90 disabled:opacity-40 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
