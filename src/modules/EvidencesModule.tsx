import React, { useState } from 'react';
import { EvidenceItem } from '../types';
import { mockEvidences } from '../data/mockData';

interface EvidencesModuleProps {
  onAttachToPlan?: (evidence: EvidenceItem) => void;
}

export const EvidencesModule: React.FC<EvidencesModuleProps> = ({ onAttachToPlan }) => {
  const [evidences, setEvidences] = useState<EvidenceItem[]>(mockEvidences);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceItem | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Evidence Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<EvidenceItem['category']>('trabajos');
  const [newNote, setNewNote] = useState('');
  const [newBasis, setNewBasis] = useState('');
  const [newDuaTag, setNewDuaTag] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const samplePhotoUrls = [
    { label: 'Cuaderno DUA con texturas', url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80' },
    { label: 'Pausa socioemocional en alfombra', url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80' },
    { label: 'Rúbrica infantil con caritas', url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80' },
    { label: 'Mural de ciencias por equipos', url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80' },
    { label: 'Manipulativo de fracciones', url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80' },
  ];

  const handleCreateEvidence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newNote.trim()) {
      showToast('Por favor completa el título y la nota reflexiva.');
      return;
    }

    const newItem: EvidenceItem = {
      id: `EV-${Date.now().toString().slice(-4)}`,
      title: newTitle.trim(),
      category: newCategory,
      categoryLabel:
        newCategory === 'dua'
          ? 'Adecuación Curricular / DUA'
          : newCategory === 'clima'
          ? 'Clima de Aula & Convivencia'
          : newCategory === 'evaluacion'
          ? 'Evaluación Formativa'
          : newCategory === 'dinamicas'
          ? 'Dinámicas Áulicas'
          : 'Trabajos de Alumnos (ABP)',
      subject: 'Ciencias & Lenguajes',
      grade: '4° B',
      date: 'Hoy, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      imageUrl: newImageUrl || samplePhotoUrls[0].url,
      imageAlt: newTitle,
      reflectiveNote: newNote.trim(),
      theoreticalBasis: newBasis.trim() || 'Alineado a la Nueva Escuela Mexicana y mediación dialógica situada.',
      supervisorFeedback: {
        author: 'Mtro. Carlos Fuentes',
        role: 'Supervisor de Prácticas',
        comment: 'Registro capturado con anonimización activa y listo para validación colegiada.',
        status: 'Validado',
      },
      duaTag: newDuaTag.trim() || undefined,
      anonymized: true,
    };

    setEvidences([newItem, ...evidences]);
    setIsUploadModalOpen(false);
    setNewTitle('');
    setNewNote('');
    setNewBasis('');
    setNewDuaTag('');
    setNewImageUrl('');
    showToast('📸 ¡Nueva evidencia fotográfica registrada y asegurada en el portafolio!');
  };

  const filteredEvidences = evidences.filter((ev) => {
    const matchesCategory = activeCategory === 'all' || ev.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      ev.title.toLowerCase().includes(q) ||
      ev.reflectiveNote.toLowerCase().includes(q) ||
      ev.categoryLabel.toLowerCase().includes(q) ||
      (ev.duaTag && ev.duaTag.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4 space-y-5 pb-28">
      {/* Header Contextual */}
      <section className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-[#dae2fd] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-[#006c49] text-[11px] font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#006c49]"></span>
              <span>Portafolio Práctico Oficial</span>
            </div>
            <h1 className="font-extrabold text-[20px] sm:text-[22px] text-[#00236f] tracking-tight mt-0.5">
              Evidencias de Aula & Trabajo Infantil
            </h1>
            <p className="text-[12px] text-[#444651] mt-0.5 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-[#757682]">school</span>
              <span>Ciclo 2024-II • 4° Grado B • EP Benito Juárez</span>
            </p>
          </div>

          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 bg-[#00236f] hover:bg-[#1e3a8a] text-white text-[13px] font-bold rounded-xl shadow-xs active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">add_a_photo</span>
            <span>+ Subir Evidencia</span>
          </button>
        </div>

        {/* Buscador */}
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[19px] text-[#757682]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por alumno, DUA, contenido o fecha..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#f2f3ff] text-[13px] text-[#131b2e] placeholder-[#757682] focus:bg-white focus:shadow-xs outline-none border border-transparent focus:border-[#00236f] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#757682] hover:text-[#131b2e]"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>

        {/* Categorías Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          {[
            { id: 'all', label: 'Todas', count: evidences.length },
            { id: 'trabajos', label: 'Trabajos de Alumnos', count: evidences.filter(e => e.category === 'trabajos').length },
            { id: 'dinamicas', label: 'Dinámicas Áulicas', count: evidences.filter(e => e.category === 'dinamicas').length },
            { id: 'dua', label: 'Adecuaciones DUA', count: evidences.filter(e => e.category === 'dua').length },
            { id: 'clima', label: 'Clima de Convivencia', count: evidences.filter(e => e.category === 'clima').length },
            { id: 'evaluacion', label: 'Evaluación Formativa', count: evidences.filter(e => e.category === 'evaluacion').length },
          ].map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-[12px] font-semibold flex items-center gap-1.5 transition-all ${
                  isActive
                    ? 'bg-[#00236f] text-white shadow-xs'
                    : 'bg-[#eaedff] text-[#444651] hover:bg-[#dae2fd]'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${isActive ? 'bg-white/25 text-white' : 'bg-white text-[#00236f]'}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Progress Card */}
      <section className="bg-white rounded-2xl p-3.5 sm:p-4 border border-[#dae2fd] shadow-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#6cf8bb]/30 text-[#006c49] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[22px]">verified</span>
          </div>
          <div>
            <h4 className="font-bold text-[13px] text-[#131b2e]">
              Avance de Recolección de Evidencias en Práctica
            </h4>
            <p className="text-[11px] text-[#757682]">
              {evidences.length} evidencias verificadas • Portafolio al 85% de acreditación
            </p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-[#6cf8bb]/40 text-[#00714d] text-[12px] font-extrabold">
          Al corriente
        </span>
      </section>

      {/* Grid de Evidencias Visuales */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredEvidences.map((ev) => (
          <article
            key={ev.id}
            className="bg-white rounded-2xl shadow-xs overflow-hidden border border-[#dae2fd] hover:border-[#00236f]/40 hover:shadow-md transition-all flex flex-col group"
          >
            {/* Image Header with Tags */}
            <div className="relative w-full h-48 bg-[#191b23] overflow-hidden">
              <img
                src={ev.imageUrl}
                alt={ev.imageAlt}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00236f]/80 via-transparent to-black/20"></div>

              {/* Upper Badges */}
              <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2">
                <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#00236f] text-[11px] font-bold shadow-xs">
                  {ev.categoryLabel}
                </span>

                {ev.anonymized && (
                  <span className="px-2 py-0.5 rounded-full bg-[#131b2e]/80 backdrop-blur-md text-[#6cf8bb] text-[10px] font-bold flex items-center gap-1 shadow-xs">
                    <span className="material-symbols-outlined text-[12px]">privacy_tip</span>
                    <span>Anonimizado</span>
                  </span>
                )}
              </div>

              {/* Bottom Info on Image */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-[11px]">
                <span className="font-semibold">{ev.subject} • {ev.grade}</span>
                <span className="opacity-80">{ev.date}</span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-4 flex-1 flex flex-col justify-between gap-3">
              <div className="space-y-2">
                <h3 className="font-bold text-[15px] text-[#131b2e] leading-snug">
                  {ev.title}
                </h3>

                {/* Reflective Note */}
                <div className="p-2.5 rounded-xl bg-[#f2f3ff] border border-[#e2e7ff] text-[12px] space-y-1">
                  <div className="flex items-center gap-1 text-[#00236f] font-bold text-[11px] uppercase tracking-wide">
                    <span className="material-symbols-outlined text-[15px]">psychology_alt</span>
                    <span>Nota Reflexiva de Aula</span>
                  </div>
                  <p className="text-[#444651] italic leading-relaxed">
                    "{ev.reflectiveNote}"
                  </p>
                </div>

                {/* DUA Tag if available */}
                {ev.duaTag && (
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#6cf8bb]/20 text-[#00714d] text-[11px] font-bold">
                    <span className="material-symbols-outlined text-[13px]">tune</span>
                    <span>{ev.duaTag}</span>
                  </div>
                )}
              </div>

              {/* Footer with Supervisor Feedback & Ficha Button */}
              <div className="pt-2 border-t border-[#f2f3ff] flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-[11px] text-[#006c49]">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span className="font-bold">Vo.Bo. Tutoría</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {onAttachToPlan && (
                    <button
                      type="button"
                      onClick={() => onAttachToPlan(ev)}
                      className="px-2.5 py-1 rounded-lg bg-[#eaedff] hover:bg-[#dae2fd] text-[#00236f] text-[11px] font-bold transition-colors"
                      title="Vincular a la planeación actual"
                    >
                      + Al Plan
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setSelectedEvidence(ev)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#00236f] hover:bg-[#1e3a8a] text-white text-[12px] font-bold shadow-xs active:scale-95 transition-all"
                  >
                    <span>Ver Ficha</span>
                    <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* MODAL DETALLADO DE FICHA EXPANDIDA */}
      {selectedEvidence && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#00236f]/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl max-h-[88vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-[#c5c5d3]">
            {/* Modal Header */}
            <div className="p-4 bg-[#eaedff] flex items-center justify-between border-b border-[#dae2fd]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#00236f] text-white flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[20px]">menu_book</span>
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase text-[#006c49] tracking-wider">
                    Ficha de Análisis Pedagógico
                  </span>
                  <h3 className="font-bold text-[16px] text-[#00236f] leading-none mt-0.5">
                    {selectedEvidence.id} • {selectedEvidence.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setSelectedEvidence(null)}
                className="w-8 h-8 rounded-full bg-white hover:bg-[#dae2fd] text-[#444651] flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Modal Body Scrollable */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-[13px]">
              {/* Big Photo */}
              <div className="relative rounded-2xl overflow-hidden h-60 bg-[#191b23] shadow-inner">
                <img
                  src={selectedEvidence.imageUrl}
                  alt={selectedEvidence.imageAlt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2.5 right-2.5 px-3 py-1 bg-black/70 backdrop-blur-md rounded-full text-white text-[11px] font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  <span>Protección de Identidad Infantil Activa</span>
                </div>
              </div>

              {/* Theoretical & Pedagogical Details */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-[#f2f3ff] border border-[#dae2fd] space-y-1">
                  <h4 className="font-bold text-[12px] text-[#00236f] uppercase tracking-wide flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">history_edu</span>
                    <span>Justificación Teórico-Pedagógica</span>
                  </h4>
                  <p className="text-[#444651] leading-relaxed">
                    {selectedEvidence.theoreticalBasis}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#faf8ff] border border-[#e2e7ff] space-y-1">
                  <h4 className="font-bold text-[12px] text-[#006c49] uppercase tracking-wide flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">lightbulb</span>
                    <span>Hallazgos en el Aula & Reflexión en Acción</span>
                  </h4>
                  <p className="text-[#131b2e] leading-relaxed">
                    {selectedEvidence.reflectiveNote}
                  </p>
                </div>

                {selectedEvidence.supervisorFeedback && (
                  <div className="p-3.5 rounded-xl bg-[#eaedff] border border-[#dae2fd] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-bold text-[12px] text-[#00236f]">
                        <span className="material-symbols-outlined text-[16px]">rate_review</span>
                        <span>Devolución del Asesor Universitario</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-[#6cf8bb]/40 text-[#00714d] text-[10px] font-extrabold">
                        {selectedEvidence.supervisorFeedback.status}
                      </span>
                    </div>
                    <p className="text-[#444651] italic leading-relaxed">
                      "{selectedEvidence.supervisorFeedback.comment}"
                    </p>
                    <span className="text-[11px] text-[#757682] block">
                      — {selectedEvidence.supervisorFeedback.author} ({selectedEvidence.supervisorFeedback.role})
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#f2f3ff] border-t border-[#dae2fd] flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => {
                  showToast('Descarga del registro fotográfico HD iniciada.');
                }}
                className="px-4 py-2 rounded-xl bg-white hover:bg-[#eaedff] text-[#00236f] text-[12px] font-bold border border-[#c5c5d3]/60 flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span>Descargar HD</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedEvidence(null)}
                className="px-5 py-2.5 rounded-xl bg-[#00236f] hover:bg-[#1e3a8a] text-white text-[13px] font-bold shadow-xs active:scale-95 transition-all"
              >
                Cerrar Ficha
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL REGISTRAR NUEVA EVIDENCIA (+ Subir) */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#00236f]/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-[#c5c5d3]">
            {/* Header */}
            <div className="p-4 bg-[#eaedff] flex items-center justify-between border-b border-[#dae2fd]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00236f] text-[22px]">add_a_photo</span>
                <h3 className="font-bold text-[16px] text-[#00236f]">Registrar Nueva Evidencia de Aula</h3>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white hover:bg-[#dae2fd] text-[#444651] flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleCreateEvidence} className="p-4 sm:p-5 overflow-y-auto space-y-3.5">
              <div>
                <label className="block text-[12px] font-bold text-[#00236f] mb-1">
                  Título de la Evidencia / Trabajo Infantil *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ej. Cartel cooperativo de evaporación o registro de lectura"
                  className="w-full px-3 py-2 text-[13px] rounded-xl border border-[#c5c5d3] outline-none focus:border-[#00236f]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] font-bold text-[#00236f] mb-1">
                    Categoría *
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-[13px] rounded-xl border border-[#c5c5d3] outline-none focus:border-[#00236f] bg-white"
                  >
                    <option value="trabajos">Trabajos de Alumnos (ABP)</option>
                    <option value="dua">Adecuación Curricular / DUA</option>
                    <option value="clima">Clima de Aula & Convivencia</option>
                    <option value="evaluacion">Evaluación Formativa</option>
                    <option value="dinamicas">Dinámicas Áulicas</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-[#00236f] mb-1">
                    Etiqueta DUA (Opcional)
                  </label>
                  <input
                    type="text"
                    value={newDuaTag}
                    onChange={(e) => setNewDuaTag(e.target.value)}
                    placeholder="Ej. Apoyo TDAH, Textura táctil"
                    className="w-full px-3 py-2 text-[13px] rounded-xl border border-[#c5c5d3] outline-none focus:border-[#00236f]"
                  />
                </div>
              </div>

              {/* Sample Photo Selector */}
              <div>
                <label className="block text-[12px] font-bold text-[#00236f] mb-1">
                  Fotografía de Aula (Elige una o ingresa URL)
                </label>
                <div className="grid grid-cols-5 gap-1.5 mb-2">
                  {samplePhotoUrls.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setNewImageUrl(s.url)}
                      className={`relative h-14 rounded-lg overflow-hidden border-2 transition-all ${
                        newImageUrl === s.url ? 'border-[#00236f] scale-105 shadow-xs' : 'border-transparent opacity-70'
                      }`}
                      title={s.label}
                    >
                      <img src={s.url} alt={s.label} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="O pega aquí la URL de la imagen..."
                  className="w-full px-3 py-1.5 text-[12px] rounded-lg border border-[#c5c5d3] outline-none"
                />
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#00236f] mb-1">
                  Nota Reflexiva de Aula (¿Qué ocurrió y qué observaste?) *
                </label>
                <textarea
                  rows={3}
                  required
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Describe la interacción del alumno con el material, logros y dificultades observadas..."
                  className="w-full p-2.5 text-[13px] rounded-xl border border-[#c5c5d3] outline-none focus:border-[#00236f]"
                />
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#00236f] mb-1">
                  Fundamentación Teórico-Pedagógica
                </label>
                <input
                  type="text"
                  value={newBasis}
                  onChange={(e) => setNewBasis(e.target.value)}
                  placeholder="Ej. Zona de Desarrollo Próximo (Vygotsky) / Principio DUA de representación"
                  className="w-full px-3 py-2 text-[13px] rounded-xl border border-[#c5c5d3] outline-none focus:border-[#00236f]"
                />
              </div>

              <div className="p-3 rounded-xl bg-[#f2f3ff] flex items-center gap-2 text-[12px] text-[#444651]">
                <span className="material-symbols-outlined text-[#006c49] text-[18px]">verified_user</span>
                <span>
                  <strong>Anonimización activa:</strong> El sistema aplica filtros éticos de privacidad infantil a las evidencias.
                </span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 text-[#444651] hover:text-[#131b2e] text-[13px] font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#00236f] hover:bg-[#1e3a8a] text-white text-[13px] font-bold shadow-xs active:scale-95 transition-all"
                >
                  Guardar Evidencia en Portafolio
                </button>
              </div>
            </form>
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
