import React, { useState } from 'react';
import { mockSequencesList } from '../data/mockData';
import { TabType } from '../types';

interface SequencesListModuleProps {
  onNavigateToPlanner: (sequenceId?: string) => void;
  onOpenExport: () => void;
}

export const SequencesListModule: React.FC<SequencesListModuleProps> = ({
  onNavigateToPlanner,
  onOpenExport,
}) => {
  const [activeFilter, setActiveFilter] = useState<'todos' | 'aprobada' | 'revision' | 'borrador'>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMethodologyModalOpen, setIsMethodologyModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredSequences = mockSequencesList.filter((seq) => {
    const matchesFilter = activeFilter === 'todos' || seq.status === activeFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      seq.title.toLowerCase().includes(q) ||
      seq.subject.toLowerCase().includes(q) ||
      seq.grade.toLowerCase().includes(q);
    return matchesFilter && matchesQuery;
  });

  const handleSelectMethodology = (methodologyName: string) => {
    setIsMethodologyModalOpen(false);
    showToast(`Marco metodológico seleccionado: ${methodologyName}`);
    onNavigateToPlanner();
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4 space-y-5 pb-28">
      {/* Header & New Button */}
      <section className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-[#dae2fd] space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="font-extrabold text-[20px] sm:text-[22px] text-[#00236f] tracking-tight">
              Secuencias de Clase
            </h1>
            <p className="text-[12px] text-[#444651]">
              Prácticas docentes • Primaria Niños Héroes / Benito Juárez
            </p>
          </div>

          <button
            onClick={() => setIsMethodologyModalOpen(true)}
            className="flex items-center gap-1.5 bg-[#00236f] hover:bg-[#1e3a8a] text-white px-4 py-2.5 rounded-xl shadow-xs font-bold text-[13px] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>+ Nueva</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[19px] text-[#757682]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por tema, grado o competencia..."
            className="w-full pl-10 pr-10 py-2.5 bg-[#f2f3ff] text-[13px] text-[#131b2e] rounded-xl outline-none focus:bg-white border border-transparent focus:border-[#00236f] transition-all"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          {[
            { id: 'todos', label: `Todos (${mockSequencesList.length})` },
            { id: 'aprobada', label: `Aprobadas (${mockSequencesList.filter(s => s.status === 'aprobada').length})` },
            { id: 'revision', label: `En Revisión (${mockSequencesList.filter(s => s.status === 'revision').length})` },
            { id: 'borrador', label: `Borradores (${mockSequencesList.filter(s => s.status === 'borrador').length})` },
          ].map((f) => {
            const isActive = activeFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id as any)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all ${
                  isActive
                    ? 'bg-[#00236f] text-white shadow-xs'
                    : 'bg-[#eaedff] text-[#444651] hover:bg-[#dae2fd]'
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Cards List */}
      <section className="space-y-4">
        {filteredSequences.map((seq) => (
          <article
            key={seq.id}
            className="bg-white rounded-2xl shadow-xs border border-[#dae2fd] p-4 sm:p-5 flex flex-col gap-3 hover:border-[#00236f]/40 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#f2f3ff] text-[#444651] text-[11px] font-semibold">
                  {seq.grade}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#eaedff] text-[#00236f] text-[11px] font-bold">
                  {seq.subject}
                </span>
              </div>

              {seq.status === 'aprobada' ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#6cf8bb]/40 text-[#00714d] text-[11px] font-bold">
                  <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                  <span>{seq.statusLabel}</span>
                </span>
              ) : seq.status === 'revision' ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ffddb8] text-[#653e00] text-[11px] font-bold">
                  <span className="material-symbols-outlined text-[13px]">rate_review</span>
                  <span>{seq.statusLabel}</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#f2f3ff] text-[#757682] text-[11px] font-bold">
                  <span className="material-symbols-outlined text-[13px]">draw</span>
                  <span>{seq.statusLabel}</span>
                </span>
              )}
            </div>

            <div>
              <h3 className="font-bold text-[16px] text-[#00236f] tracking-tight">
                {seq.title}
              </h3>
              <p className="text-[12px] text-[#444651] mt-1 leading-relaxed">
                {seq.description}
              </p>
            </div>

            {/* Observations or progress */}
            {seq.pendingObservation && (
              <div className="p-3 rounded-xl bg-[#ffddb8]/40 border border-[#ffddb8] flex flex-col gap-1 text-[12px]">
                <div className="flex items-center gap-1.5 text-[#653e00] font-bold">
                  <span className="material-symbols-outlined text-[15px]">sms_failed</span>
                  <span>Observaciones del Asesor pendientes:</span>
                </div>
                <p className="text-[#444651] italic pl-5">
                  "{seq.pendingObservation}"
                </p>
              </div>
            )}

            {seq.progress && (
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#757682]">Progreso de redacción</span>
                  <span className="font-bold text-[#00236f]">{seq.progress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#f2f3ff] overflow-hidden">
                  <div className="h-full bg-[#00236f] rounded-full" style={{ width: `${seq.progress}%` }}></div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 text-[11px] text-[#444651] pt-1">
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-[#faf8ff] border border-[#e2e7ff]">
                <span className="material-symbols-outlined text-[#006c49] text-[17px]">schedule</span>
                <div>
                  <span className="text-[#757682] block text-[10px]">Duración:</span>
                  <span className="font-bold text-[#131b2e]">{seq.duration}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-[#faf8ff] border border-[#e2e7ff]">
                <span className="material-symbols-outlined text-[#00236f] text-[17px]">folder_copy</span>
                <div>
                  <span className="text-[#757682] block text-[10px]">Anexos:</span>
                  <span className="font-bold text-[#131b2e]">{seq.annexes}</span>
                </div>
              </div>
            </div>

            {/* Card Actions */}
            <div className="flex items-center gap-2 pt-1 border-t border-[#f2f3ff]">
              <button
                onClick={() => onNavigateToPlanner(seq.id)}
                className="flex-1 py-2 px-3 rounded-xl bg-[#00236f] hover:bg-[#1e3a8a] text-white text-[12px] font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">edit</span>
                <span>{seq.status === 'borrador' ? 'Continuar redactando' : 'Ver y Editar'}</span>
              </button>

              <button
                onClick={onOpenExport}
                className="py-2 px-3 rounded-xl bg-[#eaedff] hover:bg-[#dae2fd] text-[#00236f] text-[12px] font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
                <span>PDF / Word</span>
              </button>
            </div>
          </article>
        ))}
      </section>

      {/* Banco de Estrategias y Recursos */}
      <section className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-[#dae2fd] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006c49] text-[22px]">lightbulb</span>
            <h2 className="font-bold text-[16px] text-[#00236f]">
              Banco de Estrategias y Recursos Didácticos
            </h2>
          </div>
          <button
            onClick={() => showToast('Catálogo de 120 recursos disponible en la nube.')}
            className="text-[12px] text-[#00236f] font-bold hover:underline"
          >
            Ver catálogo
          </button>
        </div>

        <div className="space-y-2.5">
          <div className="p-3 rounded-xl bg-[#faf8ff] border border-[#e2e7ff] flex items-center justify-between gap-3 hover:bg-[#f2f3ff] transition-colors">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#eaedff] text-[#00236f] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">psychology</span>
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-[13px] text-[#131b2e] truncate">Pausa Activa: "Espejo Corporal"</h4>
                <p className="text-[11px] text-[#757682] truncate">5 mins • Regulación atencional kinestésica</p>
              </div>
            </div>
            <button
              onClick={() => showToast('Pausa activa "Espejo Corporal" guardada en tu banco.')}
              className="p-2 text-[#00236f] hover:bg-[#eaedff] rounded-full transition-colors"
              title="Añadir a mi planeación"
            >
              <span className="material-symbols-outlined text-[20px]">bookmark_add</span>
            </button>
          </div>

          <div className="p-3 rounded-xl bg-[#faf8ff] border border-[#e2e7ff] flex items-center justify-between gap-3 hover:bg-[#f2f3ff] transition-colors">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#6cf8bb]/30 text-[#006c49] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">checklist_rtl</span>
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-[13px] text-[#131b2e] truncate">Rúbrica Formativa ABP (4 Niveles)</h4>
                <p className="text-[11px] text-[#757682] truncate">NEM • Coevaluación entre pares</p>
              </div>
            </div>
            <button
              onClick={() => showToast('Rúbrica formativa descargada.')}
              className="p-2 text-[#006c49] hover:bg-[#6cf8bb]/20 rounded-full transition-colors"
              title="Descargar rúbrica"
            >
              <span className="material-symbols-outlined text-[20px]">download</span>
            </button>
          </div>

          <div className="p-3 rounded-xl bg-[#faf8ff] border border-[#e2e7ff] flex items-center justify-between gap-3 hover:bg-[#f2f3ff] transition-colors">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#ffddb8] text-[#653e00] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">groups</span>
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-[13px] text-[#131b2e] truncate">Dinamizador: "Tribuna de Expertos"</h4>
                <p className="text-[11px] text-[#757682] truncate">Socialización de saberes y debate dialógico</p>
              </div>
            </div>
            <button
              onClick={() => showToast('Dinamizador añadido a tu colección de recursos.')}
              className="p-2 text-[#653e00] hover:bg-[#ffddb8]/50 rounded-full transition-colors"
              title="Añadir a mi planeación"
            >
              <span className="material-symbols-outlined text-[20px]">bookmark_add</span>
            </button>
          </div>
        </div>
      </section>

      {/* Modal Nueva Planeación (Metodología) */}
      {isMethodologyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#00236f]/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl p-5 flex flex-col gap-4 shadow-2xl border border-[#c5c5d3]">
            <div className="flex items-center justify-between pb-1">
              <div>
                <h3 className="font-extrabold text-[18px] text-[#00236f]">Nueva Planeación Didáctica</h3>
                <p className="text-[12px] text-[#757682]">Selecciona el marco metodológico</p>
              </div>
              <button
                onClick={() => setIsMethodologyModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#f2f3ff] text-[#444651] flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => handleSelectMethodology('Aprendizaje Basado en Proyectos (ABP)')}
                className="w-full flex items-start gap-3 p-3.5 rounded-xl bg-[#faf8ff] hover:bg-[#eaedff] text-left border border-[#dae2fd] transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#eaedff] text-[#00236f] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[22px]">diversity_3</span>
                </div>
                <div>
                  <h4 className="font-bold text-[14px] text-[#131b2e]">Aprendizaje Basado en Proyectos (ABP)</h4>
                  <p className="text-[11px] text-[#757682] mt-0.5">
                    Metodología NEM en 3 fases y 11 momentos de indagación sociocrítica.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleSelectMethodology('Secuencia Didáctica Clásica')}
                className="w-full flex items-start gap-3 p-3.5 rounded-xl bg-[#faf8ff] hover:bg-[#eaedff] text-left border border-[#dae2fd] transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#6cf8bb]/30 text-[#006c49] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[22px]">view_timeline</span>
                </div>
                <div>
                  <h4 className="font-bold text-[14px] text-[#131b2e]">Secuencia Didáctica Clásica</h4>
                  <p className="text-[11px] text-[#757682] mt-0.5">
                    Estructura tradicional en tres tiempos: Inicio, Desarrollo y Cierre.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleSelectMethodology('Enfoque STEAM')}
                className="w-full flex items-start gap-3 p-3.5 rounded-xl bg-[#faf8ff] hover:bg-[#eaedff] text-left border border-[#dae2fd] transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#eaedff] text-[#1e3a8a] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[22px]">rocket_launch</span>
                </div>
                <div>
                  <h4 className="font-bold text-[14px] text-[#131b2e]">Enfoque STEAM</h4>
                  <p className="text-[11px] text-[#757682] mt-0.5">
                    Ciencia, tecnología, ingeniería, artes y matemáticas integradas.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleSelectMethodology('Aprendizaje en Servicio (AS)')}
                className="w-full flex items-start gap-3 p-3.5 rounded-xl bg-[#faf8ff] hover:bg-[#eaedff] text-left border border-[#dae2fd] transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#ffddb8] text-[#653e00] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[22px]">volunteer_activism</span>
                </div>
                <div>
                  <h4 className="font-bold text-[14px] text-[#131b2e]">Aprendizaje en Servicio (AS)</h4>
                  <p className="text-[11px] text-[#757682] mt-0.5">
                    Articulación curricular enfocada en necesidades de la comunidad barrial.
                  </p>
                </div>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsMethodologyModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-[#f2f3ff] text-[#444651] text-[13px] font-semibold hover:bg-[#eaedff]"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

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
