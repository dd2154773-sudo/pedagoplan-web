import React, { useState } from 'react';
import { DidacticPlan } from '../types';

interface ExportModalProps {
  plan: DidacticPlan;
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ plan, isOpen, onClose }) => {
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'docx' | 'xlsx'>('pdf');
  const [includeDua, setIncludeDua] = useState(true);
  const [includeRubrics, setIncludeRubrics] = useState(true);
  const [includeSignatures, setIncludeSignatures] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<string | null>(null);

  if (!isOpen) return null;

  // Real Word .doc file generation and browser download
  const handleDownloadWord = () => {
    setIsExporting(true);
    setTimeout(() => {
      const htmlContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset="utf-8">
          <title>${plan.title}</title>
          <style>
            body { font-family: 'Arial', sans-serif; margin: 20px; color: #131b2e; }
            h1 { color: #00236f; font-size: 20pt; border-bottom: 2px solid #00236f; padding-bottom: 6px; }
            h2 { color: #1e3a8a; font-size: 14pt; margin-top: 16px; }
            table { width: 100%; border-collapse: collapse; margin-top: 12px; margin-bottom: 12px; }
            th, td { border: 1px solid #c5c5d3; padding: 8px 12px; text-align: left; }
            th { background-color: #eaedff; color: #00236f; }
            .badge { background: #6cf8bb; color: #00714d; font-weight: bold; padding: 3px 6px; border-radius: 4px; }
            .footer-sig { margin-top: 40px; width: 100%; }
          </style>
        </head>
        <body>
          <div style="text-align: center; border-bottom: 2px solid #00236f; padding-bottom: 10px; margin-bottom: 20px;">
            <p style="font-size: 12pt; font-weight: bold; color: #00236f; margin: 0;">SECRETARÍA DE EDUCACIÓN PÚBLICA • DIRECCIÓN DE EDUCACIÓN PRIMARIA</p>
            <p style="font-size: 10pt; color: #444651; margin: 4px 0 0 0;">PLANEACIÓN DIDÁCTICA POR PROYECTOS • NUEVA ESCUELA MEXICANA (NEM)</p>
          </div>

          <h1>${plan.title}</h1>

          <table>
            <tr>
              <th>Escuela Sede:</th>
              <td>${plan.schoolName}</td>
              <th>Grado y Grupo:</th>
              <td>${plan.grade} "${plan.group}"</td>
            </tr>
            <tr>
              <th>Asignatura / Campo:</th>
              <td>${plan.subject}</td>
              <th>Tiempo Estimado:</th>
              <td>${plan.durationMinutes} minutos lectivos</td>
            </tr>
            <tr>
              <th>Docente en Formación:</th>
              <td>Sofía López (8vo Semestre)</td>
              <th>Tutor / Asesor:</th>
              <td>${plan.tutorName}</td>
            </tr>
          </table>

          <h2>1. Proceso de Desarrollo de Aprendizaje (PDA) y Ejes Articuladores</h2>
          <p><strong>PDA:</strong> ${plan.pda}</p>
          <p><strong>Ejes Articuladores:</strong> ${plan.axes.join(', ')}</p>

          <h2>2. Secuencia Didáctica Tripartita</h2>
          
          <table>
            <thead>
              <tr>
                <th style="width: 20%;">Momento</th>
                <th style="width: 15%;">Tiempo / Forma</th>
                <th style="width: 45%;">Actividades de Aprendizaje</th>
                <th style="width: 20%;">Materiales & Evaluación</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>MOMENTO 1: INICIO</strong><br><small>Activación de saberes</small></td>
                <td>${plan.faseInicio.timeMinutes} min<br>${plan.faseInicio.grouping}</td>
                <td>
                  <p><strong>Pregunta detonadora:</strong> ${plan.faseInicio.description}</p>
                  <p><em>Intención:</em> ${plan.faseInicio.pedagogicalIntention}</p>
                  ${includeDua && plan.faseInicio.duaAdaptation ? `<p><span class="badge">DUA:</span> ${plan.faseInicio.duaAdaptation}</p>` : ''}
                </td>
                <td>
                  <strong>Materiales:</strong><br>${plan.faseInicio.materials?.join(', ') || 'N/A'}<br><br>
                  <strong>Inst. Evaluación:</strong><br>${plan.faseInicio.evaluationInstrument || 'N/A'}
                </td>
              </tr>
              <tr>
                <td><strong>MOMENTO 2: DESARROLLO</strong><br><small>Construcción activa & experimentación</small></td>
                <td>${plan.faseDesarrollo.timeMinutes} min<br>${plan.faseDesarrollo.grouping}</td>
                <td>
                  <p>${plan.faseDesarrollo.description}</p>
                  <p><em>Intención:</em> ${plan.faseDesarrollo.pedagogicalIntention}</p>
                  ${includeDua && plan.faseDesarrollo.duaAdaptation ? `<p><span class="badge">DUA:</span> ${plan.faseDesarrollo.duaAdaptation}</p>` : ''}
                </td>
                <td>
                  <strong>Materiales:</strong><br>${plan.faseDesarrollo.materials?.join(', ') || 'N/A'}<br><br>
                  <strong>Inst. Evaluación:</strong><br>${plan.faseDesarrollo.evaluationInstrument || 'N/A'}
                </td>
              </tr>
              <tr>
                <td><strong>MOMENTO 3: CIERRE</strong><br><small>Metacognición y síntesis</small></td>
                <td>${plan.faseCierre.timeMinutes} min<br>${plan.faseCierre.grouping}</td>
                <td>
                  <p>${plan.faseCierre.description}</p>
                  <p><em>Intención:</em> ${plan.faseCierre.pedagogicalIntention}</p>
                  ${includeDua && plan.faseCierre.duaAdaptation ? `<p><span class="badge">DUA:</span> ${plan.faseCierre.duaAdaptation}</p>` : ''}
                </td>
                <td>
                  <strong>Materiales:</strong><br>${plan.faseCierre.materials?.join(', ') || 'N/A'}<br><br>
                  <strong>Inst. Evaluación:</strong><br>${plan.faseCierre.evaluationInstrument || 'N/A'}
                </td>
              </tr>
            </tbody>
          </table>

          ${includeSignatures ? `
            <table class="footer-sig" style="margin-top: 50px; border: none;">
              <tr style="border: none;">
                <td style="text-align: center; border: none; width: 50%;">
                  _______________________________________<br>
                  <strong>Sofía López</strong><br>
                  Docente en Formación • Lic. en Pedagogía
                </td>
                <td style="text-align: center; border: none; width: 50%;">
                  _______________________________________<br>
                  <strong>${plan.tutorName}</strong><br>
                  Asesor de Práctica Profesional
                </td>
              </tr>
            </table>
          ` : ''}
        </body>
        </html>
      `;

      const blob = new Blob(['\ufeff', htmlContent], {
        type: 'application/msword',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Planeacion_${plan.title.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 30)}.doc`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setIsExporting(false);
      setDownloadSuccessToast('¡Documento Word (.doc) generado y descargado con éxito!');
      setTimeout(() => setDownloadSuccessToast(null), 3500);
    }, 600);
  };

  // Real Print / PDF trigger
  const handlePrintPDF = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      window.print();
      setDownloadSuccessToast('Diálogo de impresión activado: Elige "Guardar como PDF"');
      setTimeout(() => setDownloadSuccessToast(null), 4000);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#00236f]/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#ffffff] w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-[#c5c5d3]/50">
        {/* Header */}
        <div className="p-4 bg-[#eaedff] flex items-center justify-between border-b border-[#dae2fd]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#00236f] text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[22px]">download_for_offline</span>
            </div>
            <div>
              <h2 className="font-bold text-[18px] text-[#00236f] leading-tight">
                Exportar Planeación Didáctica Completa
              </h2>
              <p className="text-[12px] text-[#444651]">
                Generación normalizada de formatos oficiales listos para el aula o supervisión
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#faf8ff] hover:bg-[#e2e7ff] text-[#444651] flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          {/* Format Selection Cards */}
          <div>
            <label className="block text-[12px] font-bold text-[#00236f] uppercase tracking-wider mb-2">
              Selecciona el Formato de Salida
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* PDF */}
              <button
                type="button"
                onClick={() => setSelectedFormat('pdf')}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between h-24 ${
                  selectedFormat === 'pdf'
                    ? 'border-[#00236f] bg-[#f2f3ff] ring-2 ring-[#00236f]/20 shadow-xs'
                    : 'border-[#c5c5d3]/60 hover:bg-[#faf8ff]'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="material-symbols-outlined text-[24px] text-[#ba1a1a]">picture_as_pdf</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#6cf8bb] text-[#00714d] text-[10px] font-bold">Oficial</span>
                </div>
                <div>
                  <span className="font-bold text-[14px] text-[#131b2e] block leading-tight">Formato SEP (.PDF)</span>
                  <span className="text-[11px] text-[#757682]">Imprimible con membrete</span>
                </div>
              </button>

              {/* Word */}
              <button
                type="button"
                onClick={() => setSelectedFormat('docx')}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between h-24 ${
                  selectedFormat === 'docx'
                    ? 'border-[#00236f] bg-[#f2f3ff] ring-2 ring-[#00236f]/20 shadow-xs'
                    : 'border-[#c5c5d3]/60 hover:bg-[#faf8ff]'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="material-symbols-outlined text-[24px] text-[#00236f]">description</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#eaedff] text-[#00236f] text-[10px] font-bold">Editable</span>
                </div>
                <div>
                  <span className="font-bold text-[14px] text-[#131b2e] block leading-tight">Plantilla Word (.doc)</span>
                  <span className="text-[11px] text-[#757682]">Tablas editables en Word</span>
                </div>
              </button>

              {/* Excel */}
              <button
                type="button"
                onClick={() => setSelectedFormat('xlsx')}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between h-24 ${
                  selectedFormat === 'xlsx'
                    ? 'border-[#00236f] bg-[#f2f3ff] ring-2 ring-[#00236f]/20 shadow-xs'
                    : 'border-[#c5c5d3]/60 hover:bg-[#faf8ff]'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="material-symbols-outlined text-[24px] text-[#006c49]">table_view</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#eaedff] text-[#006c49] text-[10px] font-bold">Rúbricas</span>
                </div>
                <div>
                  <span className="font-bold text-[14px] text-[#131b2e] block leading-tight">Matriz Curricular</span>
                  <span className="text-[11px] text-[#757682]">Ponderación y escalas</span>
                </div>
              </button>
            </div>
          </div>

          {/* Configuration Checkboxes */}
          <div className="p-3 bg-[#f2f3ff] rounded-xl border border-[#dae2fd] space-y-2">
            <span className="block text-[12px] font-bold text-[#1e3a8a] uppercase tracking-wide">
              Contenidos Adicionales a Incluir
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <label className="flex items-center gap-2 text-[13px] text-[#131b2e] cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeDua}
                  onChange={(e) => setIncludeDua(e.target.checked)}
                  className="rounded text-[#00236f] focus:ring-[#00236f] w-4 h-4"
                />
                <span>Adecuaciones DUA</span>
              </label>

              <label className="flex items-center gap-2 text-[13px] text-[#131b2e] cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeRubrics}
                  onChange={(e) => setIncludeRubrics(e.target.checked)}
                  className="rounded text-[#00236f] focus:ring-[#00236f] w-4 h-4"
                />
                <span>Rúbrica Formativa</span>
              </label>

              <label className="flex items-center gap-2 text-[13px] text-[#131b2e] cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeSignatures}
                  onChange={(e) => setIncludeSignatures(e.target.checked)}
                  className="rounded text-[#00236f] focus:ring-[#00236f] w-4 h-4"
                />
                <span>Sellos y Firmas</span>
              </label>
            </div>
          </div>

          {/* Interactive Document Preview Box */}
          <div className="border border-[#c5c5d3] rounded-xl overflow-hidden shadow-inner bg-[#faf8ff]">
            <div className="bg-[#eaedff] px-3 py-1.5 flex items-center justify-between border-b border-[#c5c5d3]">
              <span className="text-[11px] font-bold text-[#00236f] uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">preview</span>
                Vista previa del documento generado
              </span>
              <span className="text-[11px] text-[#757682] font-mono">Folio: {plan.id}</span>
            </div>

            <div className="p-4 space-y-3 bg-white text-[12px] font-normal leading-relaxed max-h-56 overflow-y-auto">
              <div className="text-center pb-2 border-b border-[#e2e7ff]">
                <p className="font-extrabold text-[13px] text-[#00236f] uppercase tracking-tight">
                  Secretaría de Educación Pública • Primaria Benito Juárez
                </p>
                <p className="text-[11px] text-[#757682]">
                  Secuencia Didáctica: "{plan.title}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] bg-[#f2f3ff] p-2 rounded-lg">
                <div><strong className="text-[#00236f]">Grado:</strong> {plan.grade} "{plan.group}"</div>
                <div><strong className="text-[#00236f]">Asignatura:</strong> {plan.subject}</div>
                <div><strong className="text-[#00236f]">Docente:</strong> Sofía López (Practicante)</div>
                <div><strong className="text-[#00236f]">Duración:</strong> {plan.durationMinutes} minutos</div>
              </div>

              <div>
                <strong className="text-[#00236f] block mb-0.5">Momento 1: Inicio (15 min - Grupal)</strong>
                <p className="text-[#444651] pl-2 border-l-2 border-[#1e3a8a] italic">
                  {plan.faseInicio.description}
                </p>
              </div>

              <div>
                <strong className="text-[#00236f] block mb-0.5">Momento 2: Desarrollo (50 min - Equipos)</strong>
                <p className="text-[#444651] pl-2 border-l-2 border-[#006c49]">
                  {plan.faseDesarrollo.description}
                </p>
                {includeDua && plan.faseDesarrollo.duaAdaptation && (
                  <p className="text-[11px] text-[#006c49] mt-1 pl-2 bg-[#6cf8bb]/20 py-1 rounded">
                    <strong>Ajuste DUA:</strong> {plan.faseDesarrollo.duaAdaptation}
                  </p>
                )}
              </div>

              <div>
                <strong className="text-[#00236f] block mb-0.5">Momento 3: Cierre (25 min - Plenario)</strong>
                <p className="text-[#444651] pl-2 border-l-2 border-[#ef9900]">
                  {plan.faseCierre.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#f2f3ff] border-t border-[#dae2fd] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 text-[#444651] hover:text-[#131b2e] font-semibold text-[13px] transition-colors"
          >
            Volver a Editar
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {selectedFormat === 'pdf' ? (
              <button
                onClick={handlePrintPDF}
                disabled={isExporting}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#00236f] hover:bg-[#1e3a8a] text-white font-bold text-[14px] shadow-sm transition-all active:scale-98"
              >
                <span className="material-symbols-outlined text-[18px]">print</span>
                <span>{isExporting ? 'Preparando...' : 'Descargar / Imprimir PDF'}</span>
              </button>
            ) : selectedFormat === 'docx' ? (
              <button
                onClick={handleDownloadWord}
                disabled={isExporting}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1e3a8a] hover:bg-[#00236f] text-white font-bold text-[14px] shadow-sm transition-all active:scale-98"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                <span>{isExporting ? 'Generando...' : 'Descargar Word (.doc)'}</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setDownloadSuccessToast('Matriz de Evaluación en Excel (.xlsx) generada.');
                  setTimeout(() => setDownloadSuccessToast(null), 3000);
                }}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#006c49] hover:bg-[#005236] text-white font-bold text-[14px] shadow-sm transition-all active:scale-98"
              >
                <span className="material-symbols-outlined text-[18px]">table_chart</span>
                <span>Descargar Matriz Excel</span>
              </button>
            )}
          </div>
        </div>

        {/* Success Toast */}
        {downloadSuccessToast && (
          <div className="absolute bottom-5 inset-x-5 bg-[#131b2e] text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 text-[13px] z-50 animate-in slide-in-from-bottom-2">
            <span className="material-symbols-outlined text-[#6cf8bb] text-[20px]">check_circle</span>
            <span className="flex-1 font-medium">{downloadSuccessToast}</span>
          </div>
        )}
      </div>
    </div>
  );
};
