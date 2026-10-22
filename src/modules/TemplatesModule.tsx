import React, { useState } from 'react';
import { OfficialTemplate } from '../types';
import { mockTemplates } from '../data/mockData';

export const TemplatesModule: React.FC = () => {
  const [templates] = useState<OfficialTemplate[]>(mockTemplates);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [previewTemplate, setPreviewTemplate] = useState<OfficialTemplate | null>(null);
  const [downloadToast, setDownloadToast] = useState<{ filename: string; text: string } | null>(null);

  const showToast = (filename: string, text: string = 'Archivo oficial preparado para edición') => {
    setDownloadToast({ filename, text });
    setTimeout(() => setDownloadToast(null), 3500);
  };

  const handleDownloadTemplate = (template: OfficialTemplate, format: 'docx' | 'pdf' | 'xlsx' = 'docx') => {
    // Generate real downloadable text/doc file
    const content = `
      ===================================================================
      SECRETARÍA DE EDUCACIÓN PÚBLICA • DIRECCIÓN DE EDUCACIÓN SUPERIOR
      FORMATO OFICIAL NORMATIVO: ${template.title.toUpperCase()}
      FOLIO DE ACREDITACIÓN: ${template.previewContent.folio}
      ===================================================================

      INSTITUCIÓN: ${template.previewContent.institution}
      CICLO ESCOLAR: 2024 - 2025
      ESTUDIANTE PRACTICANTE: Sofía López (8vo Semestre Pedagogía)
      ESCUELA SEDE: Esc. Primaria Lic. Benito Juárez (CCT: 09DPR1428K)
      TUTOR ASESOR: Mtro. Carlos Fuentes

      -------------------------------------------------------------------
      DESCRIPCIÓN DEL INSTRUMENTO:
      ${template.description}

      -------------------------------------------------------------------
      ESTRUCTURA Y CRITERIOS:
      ${template.previewContent.sections
        .map((s, idx) => `\n[SECCIÓN ${idx + 1}]: ${s.heading}\n${s.body}\n`)
        .join('\n')}

      -------------------------------------------------------------------
      VALIDACIÓN Y SELLOS INSTITUCIONALES:
      Firma del Practicante: ____________________ [Sofía López]
      Firma y Sello del Asesor de Práctica: ____________________ [Vo.Bo. Acreditado]
    `;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = template.downloadFileName.replace(/\.[^/.]+$/, `.${format}`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast(template.downloadFileName, `Plantilla descargada en formato .${format}`);
  };

  const handleDownloadZipKit = () => {
    // Generate simulated ZIP bundle info
    const zipManifest = `PAQUETE INTEGRAL DE PRÁCTICAS 2024-2025 (.ZIP)\nContenido:\n- 18 Plantillas normalizadas en formato editable (.docx)\n- Guía metodológica NEM de 42 páginas\n- Glosario de términos socioformativos\n- Rúbricas automatizadas en Excel con macros de ponderación`;
    const blob = new Blob([zipManifest], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Kit_Integral_Practicas_Pedagogicas_2024_2025.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('Kit_Integral_Practicas_Pedagogicas_2024_2025.zip', 'Paquete integral (48.2 MB) descargado para uso offline');
  };

  const filteredTemplates = templates.filter((tpl) => {
    const matchesCategory = activeCategory === 'all' || tpl.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      tpl.title.toLowerCase().includes(q) ||
      tpl.description.toLowerCase().includes(q) ||
      tpl.subtitle.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4 space-y-5 pb-28">
      {/* Header Contextual */}
      <section className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-[#dae2fd] space-y-3">
        <div>
          <div className="flex items-center gap-1.5 text-[#00236f] text-[11px] font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[16px]">folder_special</span>
            <span>Recursos Oficiales de Práctica</span>
          </div>
          <h1 className="font-extrabold text-[20px] sm:text-[22px] text-[#00236f] tracking-tight mt-0.5">
            Centro de Plantillas Oficiales
          </h1>
          <p className="text-[12px] text-[#444651] mt-0.5 leading-relaxed">
            Formatos normativos editables y descargables para tu práctica pedagógica profesional.
          </p>
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
            placeholder="Buscar plantillas por formato, materia o instrumento..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#f2f3ff] text-[13px] text-[#131b2e] placeholder-[#757682] focus:bg-white outline-none border border-transparent focus:border-[#00236f] transition-all"
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
            { id: 'all', label: 'Todos (18)' },
            { id: 'diario', label: 'Diarios de Campo' },
            { id: 'rubricas', label: 'Rúbricas & Listas' },
            { id: 'nem', label: 'Planeación NEM' },
            { id: 'informes', label: 'Informes Finales' },
          ].map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all ${
                  isActive
                    ? 'bg-[#00236f] text-white shadow-xs'
                    : 'bg-[#eaedff] text-[#444651] hover:bg-[#dae2fd]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Banner Kit Semestral 2024-2025 (.ZIP) */}
      <section className="bg-gradient-to-br from-[#1e3a8a] to-[#00236f] text-white rounded-2xl p-4 sm:p-5 shadow-md relative overflow-hidden flex flex-col gap-3">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none"></div>

        <div className="flex items-start justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[26px] text-[#6cf8bb]">archive</span>
            </div>
            <div>
              <span className="inline-block px-2 py-0.5 rounded-full bg-[#006c49] text-white text-[10px] font-bold uppercase tracking-wider mb-1">
                Kit Semestral 2024-2025
              </span>
              <h2 className="font-extrabold text-[17px] sm:text-[18px] text-white leading-tight">
                Paquete Integral de Prácticas (.ZIP)
              </h2>
            </div>
          </div>
        </div>

        <p className="text-[12px] sm:text-[13px] text-white/90 relative z-10 leading-relaxed">
          Incluye las 18 plantillas oficiales en blanco, glosario de términos NEM, guías de llenado y rúbricas editables para uso sin internet en sedes rurales o sin conectividad.
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1 relative z-10">
          <span className="text-[11px] text-white/80 flex items-center gap-1 font-mono">
            <span className="material-symbols-outlined text-[15px] text-[#6cf8bb]">file_download_done</span>
            <span>48.2 MB • Verificado por Dirección de Prácticas</span>
          </span>

          <button
            type="button"
            onClick={handleDownloadZipKit}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#6cf8bb] hover:bg-[#4edea3] text-[#002113] text-[13px] font-bold shadow-xs active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">download_for_offline</span>
            <span>Descargar ZIP Completo</span>
          </button>
        </div>
      </section>

      {/* Listado de Tarjetas Descargables */}
      <section className="space-y-4">
        {filteredTemplates.map((tpl) => (
          <article
            key={tpl.id}
            className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-[#dae2fd] hover:border-[#00236f]/40 hover:shadow-md transition-all flex flex-col gap-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-[#6cf8bb]/30 text-[#00714d] text-[11px] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006c49]"></span>
                  <span>{tpl.badge}</span>
                </span>
                <span className="px-2 py-0.5 rounded-md bg-[#f2f3ff] text-[#757682] text-[11px]">
                  {tpl.pageCount}
                </span>
              </div>

              <div className="flex items-center gap-1 text-[#ef9900] text-[11px] font-bold bg-[#faf8ff] px-2 py-0.5 rounded-md border border-[#c5c5d3]/40">
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span>{tpl.rating}</span>
                <span className="text-[#757682] font-normal">({tpl.reviewsCount})</span>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-[16px] text-[#00236f] leading-snug">
                {tpl.title}
              </h3>
              <p className="text-[12px] font-medium text-[#1e3a8a] mt-0.5">
                {tpl.subtitle}
              </p>
              <p className="text-[12px] text-[#444651] mt-1.5 leading-relaxed">
                {tpl.description}
              </p>
            </div>

            {/* Formatos Disponibles Chips */}
            <div className="flex items-center gap-2 pt-1 flex-wrap">
              <span className="text-[11px] text-[#757682] font-semibold">Formatos:</span>
              <div className="flex items-center gap-1.5">
                {tpl.formats.includes('pdf') && (
                  <span className="px-2 py-0.5 rounded-md bg-[#eaedff] text-[#00236f] text-[11px] font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px] text-[#ba1a1a]">picture_as_pdf</span>
                    <span>PDF</span>
                  </span>
                )}
                {tpl.formats.includes('docx') && (
                  <span className="px-2 py-0.5 rounded-md bg-[#eaedff] text-[#00236f] text-[11px] font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px] text-[#00236f]">description</span>
                    <span>Word (.docx)</span>
                  </span>
                )}
                {tpl.formats.includes('xlsx') && (
                  <span className="px-2 py-0.5 rounded-md bg-[#eaedff] text-[#006c49] text-[11px] font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px] text-[#006c49]">table_view</span>
                    <span>Excel (.xlsx)</span>
                  </span>
                )}
              </div>
            </div>

            <div className="text-[11px] text-[#757682] flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">update</span>
              <span>{tpl.updateDate}</span>
            </div>

            {/* Acciones de Previsualizar y Descargar */}
            <div className="grid grid-cols-2 gap-2.5 pt-1 border-t border-[#f2f3ff]">
              <button
                type="button"
                onClick={() => setPreviewTemplate(tpl)}
                className="py-2.5 px-3 rounded-xl bg-[#eaedff] hover:bg-[#dae2fd] text-[#00236f] text-[13px] font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">visibility</span>
                <span>Previsualizar</span>
              </button>

              <button
                type="button"
                onClick={() => handleDownloadTemplate(tpl, tpl.formats[0])}
                className="py-2.5 px-3 rounded-xl bg-[#00236f] hover:bg-[#1e3a8a] text-white text-[13px] font-bold flex items-center justify-center gap-1.5 shadow-xs active:scale-98 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                <span>Descargar Doc</span>
              </button>
            </div>
          </article>
        ))}
      </section>

      {/* MODAL DE PREVISUALIZACIÓN DE PLANTILLA */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#00236f]/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-xl max-h-[88vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-[#c5c5d3]">
            {/* Header */}
            <div className="p-4 bg-[#eaedff] flex items-center justify-between border-b border-[#dae2fd]">
              <div className="flex items-center gap-2 min-w-0">
                <span className="material-symbols-outlined text-[#00236f] text-[22px]">preview</span>
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-bold text-[#006c49]">Hoja Membretada Oficial</span>
                  <h3 className="font-bold text-[15px] text-[#00236f] truncate leading-tight">
                    {previewTemplate.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="w-8 h-8 rounded-full bg-white hover:bg-[#dae2fd] text-[#444651] flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Simulated Printed Sheet */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#f2f3ff]/40">
              <div className="bg-white p-5 rounded-xl border border-[#c5c5d3] shadow-md space-y-4 text-[12px]">
                {/* Official Header */}
                <div className="flex items-center justify-between pb-3 border-b-2 border-[#00236f]">
                  <div>
                    <span className="text-[10px] font-extrabold text-[#00236f] tracking-widest uppercase block">
                      Secretaría de Educación Pública • Normal Superior
                    </span>
                    <span className="text-[12px] font-bold text-[#131b2e] block">
                      {previewTemplate.previewContent.institution}
                    </span>
                    <span className="text-[10px] text-[#757682] font-mono">
                      Clave de Registro Formato: {previewTemplate.previewContent.folio}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#6cf8bb]/30 text-[#006c49] flex items-center justify-center border border-[#6cf8bb]">
                    <span className="material-symbols-outlined text-[20px]">verified</span>
                  </div>
                </div>

                {/* Simulated Metadata */}
                <div className="grid grid-cols-2 gap-2 text-[11px] bg-[#f2f3ff] p-2.5 rounded-lg">
                  <div>
                    <span className="text-[#757682] block text-[10px] font-bold">ESTUDIANTE PRACTICANTE:</span>
                    <span className="font-semibold text-[#131b2e]">Sofía López (8vo Semestre)</span>
                  </div>
                  <div>
                    <span className="text-[#757682] block text-[10px] font-bold">DOCENTE TUTOR / MENTOR:</span>
                    <span className="font-semibold text-[#131b2e]">Mtro. Carlos Fuentes</span>
                  </div>
                </div>

                {/* Sections */}
                <div className="space-y-3 pt-1">
                  {previewTemplate.previewContent.sections.map((sec, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-[#faf8ff] border border-[#e2e7ff] space-y-1">
                      <span className="text-[11px] font-bold text-[#00236f] uppercase block">
                        {sec.heading}
                      </span>
                      <p className="text-[#444651] whitespace-pre-line leading-relaxed italic">
                        {sec.body}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Signatures */}
                <div className="pt-4 grid grid-cols-2 gap-4 text-center text-[10px] text-[#757682] border-t border-[#e2e7ff]">
                  <div>
                    <div className="h-6 flex items-center justify-center italic text-[#00236f] font-serif">
                      Sofía López T. [Firma]
                    </div>
                    <div className="border-t border-[#c5c5d3] pt-1 font-bold">
                      Docente en Formación
                    </div>
                  </div>
                  <div>
                    <div className="h-6 flex items-center justify-center text-[#006c49] font-bold">
                      ✓ Sello Escolar Asentado
                    </div>
                    <div className="border-t border-[#c5c5d3] pt-1 font-bold">
                      Validación de Dirección
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-white border-t border-[#dae2fd] flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setPreviewTemplate(null)}
                className="px-4 py-2 text-[#444651] hover:text-[#131b2e] text-[13px] font-semibold"
              >
                Cerrar
              </button>
              <button
                type="button"
                onClick={() => {
                  handleDownloadTemplate(previewTemplate, previewTemplate.formats[0]);
                  setPreviewTemplate(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#00236f] hover:bg-[#1e3a8a] text-white text-[13px] font-bold shadow-xs active:scale-95 transition-all flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                <span>Descargar Formato Editable</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {downloadToast && (
        <div className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md bg-[#131b2e] text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 z-50 animate-in slide-in-from-bottom-3 text-[13px]">
          <span className="material-symbols-outlined text-[#6cf8bb] text-[22px]">check_circle</span>
          <div className="flex flex-col min-w-0">
            <span className="font-bold truncate">{downloadToast.filename}</span>
            <span className="text-[11px] text-white/80 truncate">{downloadToast.text}</span>
          </div>
        </div>
      )}
    </div>
  );
};
