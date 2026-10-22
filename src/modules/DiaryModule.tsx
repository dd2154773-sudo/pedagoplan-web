import React, { useState } from 'react';
import { mockDiaryEntries } from '../data/mockData';
import { FieldDiaryEntry } from '../types';

export const DiaryModule: React.FC = () => {
  const [entries, setEntries] = useState<FieldDiaryEntry[]>(mockDiaryEntries);
  const [selectedWeek, setSelectedWeek] = useState(8);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleToggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
    if (!isPlayingAudio) {
      showToast('Reproduciendo audio adjunto (02:14 min) de la nota de campo...');
    }
  };

  const handleSendReply = (entryId: string) => {
    if (!replyText.trim()) return;
    showToast(`Respuesta enviada a la Dra. Carmen Del Toro: "${replyText.slice(0, 35)}..."`);
    setShowReplyInput(null);
    setReplyText('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4 space-y-5 pb-28">
      {/* Selector de Semana Formativa & Contexto Reflexivo */}
      <section className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-[#dae2fd] space-y-3 relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-[#eaedff] rounded-full blur-xl pointer-events-none"></div>

        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eaedff] text-[#00236f] text-[11px] font-bold">
            <span className="material-symbols-outlined text-[14px]">auto_stories</span>
            <span>Bitácora de Práctica Reflexiva</span>
          </span>
          <span className="text-[11px] text-[#757682] font-semibold">Fase Activa 2024-II</span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="font-extrabold text-[18px] sm:text-[20px] text-[#00236f] truncate tracking-tight">
              Semana {selectedWeek}: Gestión del aula y motivación
            </h1>
            <p className="text-[12px] text-[#444651] mt-0.5">
              Escuela Primaria Lic. Benito Juárez • 4.° Grado Grupo B
            </p>
          </div>

          <button
            onClick={() => {
              const nextWeek = selectedWeek === 8 ? 7 : 8;
              setSelectedWeek(nextWeek);
              showToast(`Cambiando a Semana ${nextWeek}`);
            }}
            className="w-10 h-10 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] flex items-center justify-center text-[#00236f] shrink-0 transition-colors shadow-xs"
            title="Cambiar semana formativa"
          >
            <span className="material-symbols-outlined text-[20px]">calendar_month</span>
          </button>
        </div>

        <div className="pt-2 border-t border-[#f2f3ff] flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-1.5 text-[#444651]">
            <span className="w-2 h-2 rounded-full bg-[#006c49]"></span>
            <span>Competencia eje: Mediación pedagógica</span>
          </div>
          <span className="font-bold text-[#006c49]">Objetivo semanal 85%</span>
        </div>
      </section>

      {/* Métricas Clave de Bitácora */}
      <section className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-2xl p-3.5 sm:p-4 shadow-xs border border-[#dae2fd] flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#eaedff] flex items-center justify-center text-[#00236f] shrink-0">
            <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              psychology_alt
            </span>
          </div>
          <div>
            <span className="font-extrabold text-[22px] text-[#00236f] leading-none block">18</span>
            <span className="text-[11px] text-[#757682] font-medium leading-none block mt-1">Incidentes críticos</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 sm:p-4 shadow-xs border border-[#dae2fd] flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#6cf8bb]/30 flex items-center justify-center text-[#006c49] shrink-0">
            <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified_user
            </span>
          </div>
          <div>
            <span className="font-extrabold text-[22px] text-[#006c49] leading-none block">6</span>
            <span className="text-[11px] text-[#757682] font-medium leading-none block mt-1">Revisados por tutor</span>
          </div>
        </div>
      </section>

      {/* Nuevo Registro Reflexivo Rápido */}
      <section className="bg-gradient-to-br from-[#00236f] to-[#1e3a8a] text-white rounded-2xl p-4 sm:p-5 shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-[15px] sm:text-[16px] text-white">Nuevo Registro Reflexivo</h3>
            <p className="text-[11px] text-white/80">Captura vivencias de aula antes de salir del centro escolar</p>
          </div>
          <button
            onClick={() => showToast('Iniciando captura multimodal...')}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center active:scale-90 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-1">
          <button
            onClick={() => showToast('Cámara escolar activada con máscara de desenfoque ético.')}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/15 hover:bg-white/25 text-[12px] font-bold text-white transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[17px]">add_a_photo</span>
            <span>Foto</span>
          </button>

          <button
            onClick={handleToggleAudio}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/15 hover:bg-white/25 text-[12px] font-bold text-white transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[17px]">
              {isPlayingAudio ? 'stop_circle' : 'mic'}
            </span>
            <span>{isPlayingAudio ? 'Parar' : 'Voz'}</span>
          </button>

          <button
            onClick={() => showToast('Editor de notas de campo reflexivas abierto.')}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/15 hover:bg-white/25 text-[12px] font-bold text-white transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[17px]">edit_note</span>
            <span>Nota</span>
          </button>
        </div>
      </section>

      {/* Línea de Tiempo Crítica */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00236f] text-[20px]">history_edu</span>
            <h2 className="font-bold text-[16px] text-[#00236f]">Línea de Tiempo Crítica</h2>
          </div>
          <span className="text-[11px] text-[#757682] bg-[#f2f3ff] px-2.5 py-1 rounded-full font-semibold">
            Semana en curso
          </span>
        </div>

        {entries.map((entry) => (
          <article
            key={entry.id}
            className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-[#dae2fd] space-y-3.5 hover:border-[#00236f]/40 hover:shadow-md transition-all"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#6cf8bb]/30 text-[#00714d] text-[11px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006c49]"></span>
                  <span>{entry.category}</span>
                </span>
                <h3 className="font-bold text-[15px] sm:text-[16px] text-[#131b2e] leading-snug">
                  {entry.title}
                </h3>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[12px] font-bold text-[#00236f] block">{entry.date}</span>
                <span className="text-[10px] text-[#757682]">{entry.sessionSubject}</span>
              </div>
            </div>

            {/* Tripartite Pedagogical Structure */}
            <div className="p-3.5 rounded-xl bg-[#faf8ff] border border-[#e2e7ff] space-y-3 text-[12px] leading-relaxed">
              {/* Hecho Objetivo */}
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-[#00236f] font-bold">
                  <span className="material-symbols-outlined text-[16px]">visibility</span>
                  <span>Descripción del hecho objetivo:</span>
                </div>
                <p className="text-[#444651] pl-5">{entry.factDescription}</p>
              </div>

              {/* Análisis Fundamentado */}
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-[#006c49] font-bold">
                  <span className="material-symbols-outlined text-[16px]">menu_book</span>
                  <span>Análisis pedagógico fundamentado:</span>
                </div>
                <p className="text-[#444651] pl-5">{entry.pedagogicalAnalysis}</p>
              </div>

              {/* Compromiso Formativo */}
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-[#ef9900] font-bold">
                  <span className="material-symbols-outlined text-[16px]">flag</span>
                  <span>Compromiso de mejora futura:</span>
                </div>
                <p className="text-[#444651] pl-5">{entry.futureCommitment}</p>
              </div>
            </div>

            {/* Attached Contextual Evidences with Privacy Shield */}
            {entry.evidenceImages && entry.evidenceImages.length > 0 && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] text-[#757682]">
                  <span className="flex items-center gap-1 font-semibold">
                    <span className="material-symbols-outlined text-[15px]">photo_library</span>
                    <span>Evidencias contextuales protegidas ({entry.evidenceImages.length})</span>
                  </span>
                  <span>Anonimización activa ✓</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {entry.evidenceImages.map((img, i) => (
                    <div key={i} className="relative rounded-xl overflow-hidden h-28 bg-[#191b23] shadow-xs">
                      <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                      <div className="absolute bottom-1 right-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-white flex items-center gap-1 font-semibold">
                        <span className="material-symbols-outlined text-[12px] text-[#6cf8bb]">privacy_tip</span>
                        <span>Protegida</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Feedback del Tutor si existe */}
            {entry.supervisorFeedback && (
              <div className="p-3.5 rounded-xl bg-[#ffddb8]/30 border border-[#ffddb8] space-y-2 text-[12px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#ffddb8] flex items-center justify-center font-bold text-[#653e00] text-[11px]">
                      CD
                    </div>
                    <div>
                      <span className="font-bold text-[#131b2e] block leading-none">
                        {entry.supervisorFeedback.author}
                      </span>
                      <span className="text-[10px] text-[#757682]">{entry.supervisorFeedback.role}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#006c49] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                    <span>Validado</span>
                  </span>
                </div>

                <p className="text-[#444651] italic">
                  "{entry.supervisorFeedback.comment}"
                </p>

                {showReplyInput === entry.id ? (
                  <div className="pt-2 space-y-2 border-t border-[#ffddb8]">
                    <textarea
                      rows={2}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Escribe tu respuesta al supervisor..."
                      className="w-full p-2 bg-white text-[12px] rounded-lg border border-[#c5c5d3] outline-none focus:border-[#00236f]"
                    />
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setShowReplyInput(null)}
                        className="px-2.5 py-1 text-[11px] text-[#757682] hover:text-[#131b2e]"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => handleSendReply(entry.id)}
                        className="px-3 py-1 bg-[#00236f] text-white text-[11px] font-bold rounded-lg shadow-xs"
                      >
                        Enviar Respuesta
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-end pt-1">
                    <button
                      onClick={() => setShowReplyInput(entry.id)}
                      className="px-3 py-1 bg-white hover:bg-[#faf8ff] text-[#00236f] text-[11px] font-bold rounded-lg border border-[#c5c5d3]/50 shadow-xs flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[14px]">reply</span>
                      <span>Responder al supervisor</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Footer with Audio and Practitioner Signature */}
            <div className="pt-2 border-t border-[#f2f3ff] flex items-center justify-between text-[11px] text-[#757682]">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleToggleAudio}
                  className="flex items-center gap-1 text-[#00236f] hover:underline font-semibold"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {isPlayingAudio ? 'pause_circle' : 'play_circle'}
                  </span>
                  <span>{entry.audioNoteDuration ? `1 nota de voz (${entry.audioNoteDuration})` : 'Adjuntar nota'}</span>
                </button>
              </div>

              <div className="flex items-center gap-1 text-[#006c49] font-bold">
                <span className="material-symbols-outlined text-[15px]">draw</span>
                <span>Firmado digitalmente</span>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Consejo de Práctica Reflexiva */}
      <section className="bg-gradient-to-r from-[#eaedff] to-[#f2f3ff] rounded-2xl p-4 shadow-xs border border-[#dae2fd] flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#00236f]/10 text-[#00236f] flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[22px]">lightbulb</span>
        </div>
        <div className="space-y-0.5">
          <h4 className="font-bold text-[13px] text-[#00236f]">Consejo de Práctica Reflexiva</h4>
          <p className="text-[12px] text-[#444651] leading-relaxed">
            Recuerda describir los incidentes en primera persona sin emitir juicios apresurados sobre los estudiantes; enfoca el registro en las condiciones didácticas del entorno y la transposición del contenido.
          </p>
        </div>
      </section>

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md bg-[#131b2e] text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 z-50 animate-in slide-in-from-bottom-3 text-[13px]">
          <span className="material-symbols-outlined text-[#6cf8bb] text-[22px]">check_circle</span>
          <span className="flex-1 font-medium">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
