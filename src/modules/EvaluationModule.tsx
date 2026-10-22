import React, { useState } from 'react';

export const EvaluationModule: React.FC = () => {
  const [isRequestingSignature, setIsRequestingSignature] = useState(false);
  const [isDownloadingCertificate, setIsDownloadingCertificate] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleRequestSignature = () => {
    setIsRequestingSignature(true);
    setTimeout(() => {
      setIsRequestingSignature(false);
      showToast('✓ Solicitud de firma criptográfica enviada al Dr. Roberto Mendoza con notificación prioritaria.');
    }, 1200);
  };

  const handleDownloadExpediente = () => {
    setIsDownloadingCertificate(true);
    setTimeout(() => {
      // Create real downloadable text certificate
      const certContent = `EXPEDIENTE CERTIFICADO DE PRÁCTICAS PROFESIONALES\n======================================================\nALUMNA: Sofía López\nLICENCIATURA: Lic. en Pedagogía (8vo Semestre)\nMATRÍCULA: 2021-PED-842\nCENTRO DE PRÁCTICA: Esc. Prim. Lic. Benito Juárez (CCT: 09DPR1428K)\nHORAS ACREDITADAS: 280 / 480 HRS (58%)\nPROMEDIO DE RÚBRICA TRIPARTITA: 4.75 / 5.0\nHASH CRIPTOGRÁFICO: 8F4A-91C2-E09B-7721\nESTADO: Sello Institucional Activo y Certificado`;

      const blob = new Blob([certContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Expediente_Certificado_Practica_SofiaLopez.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setIsDownloadingCertificate(false);
      showToast('📄 Expediente de Acreditación compilado y descargado con éxito.');
    }, 1400);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4 space-y-5 pb-28">
      {/* Resumen Oficial de Acreditación */}
      <section className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-[#dae2fd] space-y-3 relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#eaedff] rounded-full blur-xl pointer-events-none"></div>

        <div className="flex items-start justify-between gap-3 relative z-10">
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#6cf8bb]/30 text-[#00714d] text-[11px] font-bold">
              <span className="material-symbols-outlined text-[14px]">school</span>
              <span>En Proceso Colegiado</span>
            </span>
            <h1 className="font-extrabold text-[20px] sm:text-[22px] text-[#00236f] tracking-tight mt-1">
              Licenciatura en Pedagogía
            </h1>
            <p className="text-[13px] text-[#131b2e] font-semibold">
              Práctica Profesional II • 8º Semestre
            </p>
          </div>

          <div className="w-11 h-11 rounded-xl bg-[#eaedff] text-[#00236f] flex items-center justify-center shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[24px]">verified_user</span>
          </div>
        </div>

        {/* Metadata Badges */}
        <div className="grid grid-cols-2 gap-2 pt-1 text-[12px] relative z-10">
          <div className="bg-[#faf8ff] p-2.5 rounded-xl border border-[#e2e7ff]">
            <span className="text-[10px] text-[#757682] font-semibold block">Matrícula Escolar</span>
            <span className="font-mono font-bold text-[#131b2e] text-[14px]">2021-PED-842</span>
          </div>

          <div className="bg-[#faf8ff] p-2.5 rounded-xl border border-[#e2e7ff]">
            <span className="text-[10px] text-[#757682] font-semibold block">Centro de Prácticas</span>
            <span className="font-bold text-[#131b2e] text-[14px] truncate block">EP Benito Juárez</span>
          </div>
        </div>
      </section>

      {/* Termómetro de Horas y Asistencia (Radial Chart) */}
      <section className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-[#dae2fd] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#6cf8bb]/30 text-[#006c49] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">timelapse</span>
            </div>
            <h2 className="font-bold text-[16px] text-[#00236f]">Termómetro de Horas</h2>
          </div>
          <span className="text-[12px] font-bold text-[#006c49]">58% Completado</span>
        </div>

        {/* Radial Gauge & Breakdown */}
        <div className="bg-[#faf8ff] p-4 rounded-xl border border-[#e2e7ff] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-[#e2e7ff]"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
              />
              <path
                className="text-[#006c49]"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeDasharray="58, 100"
                strokeLinecap="round"
                strokeWidth="3.5"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-extrabold text-[24px] text-[#00236f] leading-none">280</span>
              <span className="text-[11px] text-[#757682] font-semibold leading-none mt-1">horas</span>
            </div>
          </div>

          <div className="flex-1 w-full space-y-2 text-[12px]">
            <div className="flex items-center justify-between">
              <span className="text-[#444651]">Presenciales logradas:</span>
              <strong className="text-[#00236f] text-[14px]">280 hrs</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#444651]">Meta institucional:</span>
              <span className="font-bold text-[#131b2e]">480 hrs</span>
            </div>
            <div className="w-full bg-[#e2e7ff] h-2.5 rounded-full overflow-hidden">
              <div className="bg-[#006c49] h-full rounded-full transition-all duration-700" style={{ width: '58%' }}></div>
            </div>
            <span className="text-[11px] text-[#757682] text-right block">
              Faltan 200 hrs para liberar el servicio pedagógico
            </span>
          </div>
        </div>

        {/* Bitácoras Quincenales Tracking */}
        <div className="space-y-2 pt-1">
          <span className="text-[12px] font-bold text-[#00236f] uppercase tracking-wide block">
            Seguimiento de Bitácoras Quincenales
          </span>

          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#faf8ff] border border-[#e2e7ff]">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#006c49] text-[20px]">verified</span>
                <div>
                  <h4 className="font-bold text-[13px] text-[#131b2e]">Reporte 1 (Quincena 1-2)</h4>
                  <span className="text-[11px] text-[#757682]">90 hrs • Sello oficial asentado</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#6cf8bb]/30 text-[#00714d] text-[11px] font-bold">
                Aprobado y sellado
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#faf8ff] border border-[#e2e7ff]">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#006c49] text-[20px]">check_circle</span>
                <div>
                  <h4 className="font-bold text-[13px] text-[#131b2e]">Reporte 2 (Quincena 3-4)</h4>
                  <span className="text-[11px] text-[#757682]">95 hrs • Vo.Bo. de Mentor de Aula</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#6cf8bb]/30 text-[#00714d] text-[11px] font-bold">
                Aprobado
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#faf8ff] border border-[#e2e7ff]">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#ef9900] text-[20px]">pending_actions</span>
                <div>
                  <h4 className="font-bold text-[13px] text-[#131b2e]">Reporte 3 (Quincena 5-6)</h4>
                  <span className="text-[11px] text-[#757682]">95 hrs • En rectoría de plantel</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#ffddb8] text-[#653e00] text-[11px] font-bold">
                Pendiente firma
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Rúbrica de Desempeño Triangulada */}
      <section className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-[#dae2fd] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#eaedff] text-[#00236f] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">fact_check</span>
            </div>
            <div>
              <h2 className="font-bold text-[16px] text-[#00236f]">Rúbrica de Desempeño</h2>
              <p className="text-[11px] text-[#757682]">Evaluación triangulada (Tutor + Supervisor)</p>
            </div>
          </div>

          <div className="px-3 py-1 bg-[#eaedff] rounded-xl text-[#00236f] font-extrabold text-[16px]">
            4.75 <span className="text-[11px] font-normal text-[#757682]">/ 5.0</span>
          </div>
        </div>

        <div className="space-y-3">
          {/* Competencia 1 */}
          <div className="p-3 rounded-xl bg-[#faf8ff] border border-[#e2e7ff] space-y-1.5">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-bold text-[13px] text-[#131b2e]">
                  Dominio de contenidos y transposición didáctica
                </h4>
                <p className="text-[11px] text-[#757682]">Adaptación curricular para 4º de Primaria</p>
              </div>
              <span className="font-extrabold text-[14px] text-[#006c49]">4.8</span>
            </div>
            <div className="w-full bg-[#e2e7ff] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#006c49] h-full rounded-full" style={{ width: '96%' }}></div>
            </div>
            <div className="flex justify-between text-[10px] text-[#757682]">
              <span className="text-[#006c49] font-bold">Excelente</span>
              <span>Escala 5.0</span>
            </div>
          </div>

          {/* Competencia 2 */}
          <div className="p-3 rounded-xl bg-[#faf8ff] border border-[#e2e7ff] space-y-1.5">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-bold text-[13px] text-[#131b2e]">
                  Intervención y ambiente de aprendizaje
                </h4>
                <p className="text-[11px] text-[#757682]">Gestión de dinámicas grupales y mediación</p>
              </div>
              <span className="font-extrabold text-[14px] text-[#00236f]">4.5</span>
            </div>
            <div className="w-full bg-[#e2e7ff] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#00236f] h-full rounded-full" style={{ width: '90%' }}></div>
            </div>
            <div className="flex justify-between text-[10px] text-[#757682]">
              <span className="text-[#00236f] font-bold">Notable</span>
              <span>Escala 5.0</span>
            </div>
          </div>

          {/* Competencia 3 */}
          <div className="p-3 rounded-xl bg-[#faf8ff] border border-[#e2e7ff] space-y-1.5">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-bold text-[13px] text-[#131b2e]">
                  Evaluación formativa e inclusión educativa
                </h4>
                <p className="text-[11px] text-[#757682]">Instrumentos diferenciados y DUA</p>
              </div>
              <span className="font-extrabold text-[14px] text-[#006c49]">4.7</span>
            </div>
            <div className="w-full bg-[#e2e7ff] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#006c49] h-full rounded-full" style={{ width: '94%' }}></div>
            </div>
            <div className="flex justify-between text-[10px] text-[#757682]">
              <span className="text-[#006c49] font-bold">Excelente</span>
              <span>Escala 5.0</span>
            </div>
          </div>

          {/* Competencia 4 */}
          <div className="p-3 rounded-xl bg-[#faf8ff] border border-[#e2e7ff] space-y-1.5">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-bold text-[13px] text-[#131b2e]">
                  Ética, puntualidad y responsabilidad profesional
                </h4>
                <p className="text-[11px] text-[#757682]">Compromiso colegiado y asistencia puntual</p>
              </div>
              <span className="font-extrabold text-[14px] text-[#006c49]">5.0</span>
            </div>
            <div className="w-full bg-[#e2e7ff] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#006c49] h-full rounded-full" style={{ width: '100%' }}></div>
            </div>
            <div className="flex justify-between text-[10px] text-[#757682]">
              <span className="text-[#006c49] font-bold">Sobresaliente</span>
              <span>Escala 5.0</span>
            </div>
          </div>
        </div>
      </section>

      {/* Validación Institucional (Sello Digital + QR) */}
      <section className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-[#dae2fd] space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-[#eaedff] text-[#00236f] flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">approval</span>
          </div>
          <div>
            <h2 className="font-bold text-[16px] text-[#00236f]">Validación Institucional</h2>
            <p className="text-[11px] text-[#757682]">Acreditación recíproca Escuela-Universidad</p>
          </div>
        </div>

        {/* QR y Cripto Badge */}
        <div className="bg-[#faf8ff] p-4 rounded-xl border border-[#e2e7ff] flex flex-col sm:flex-row items-center gap-4">
          <div className="w-24 h-24 p-2 bg-white rounded-xl shadow-xs border border-[#c5c5d3] flex items-center justify-center shrink-0">
            <svg className="w-full h-full text-[#00236f]" fill="currentColor" viewBox="0 0 100 100">
              <rect x="5" y="5" width="25" height="25" rx="3" />
              <rect x="10" y="10" width="15" height="15" fill="#ffffff" />
              <rect x="13" y="13" width="9" height="9" />
              <rect x="70" y="5" width="25" height="25" rx="3" />
              <rect x="75" y="10" width="15" height="15" fill="#ffffff" />
              <rect x="78" y="13" width="9" height="9" />
              <rect x="5" y="70" width="25" height="25" rx="3" />
              <rect x="10" y="75" width="15" height="15" fill="#ffffff" />
              <rect x="13" y="78" width="9" height="9" />
              <rect x="35" y="10" width="8" height="8" />
              <rect x="50" y="10" width="8" height="8" />
              <rect x="35" y="25" width="8" height="8" />
              <rect x="45" y="35" width="12" height="12" />
              <rect x="65" y="40" width="10" height="10" />
              <rect x="10" y="45" width="8" height="15" />
              <rect x="35" y="55" width="10" height="10" />
              <rect x="80" y="60" width="12" height="8" />
              <rect x="60" y="75" width="15" height="8" />
              <rect x="40" y="75" width="8" height="15" />
              <rect x="80" y="80" width="10" height="10" />
            </svg>
          </div>

          <div className="flex-1 text-center sm:text-left space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-1 text-[#006c49] text-[11px] font-bold">
              <span className="material-symbols-outlined text-[15px]">verified</span>
              <span>Sello Criptográfico Activo</span>
            </div>
            <h4 className="font-bold text-[14px] text-[#131b2e]">
              Escuela Primaria Lic. Benito Juárez
            </h4>
            <p className="text-[11px] text-[#757682]">
              CCT: 09DPR1428K • Clave Validadora UNAM-PED-44
            </p>
            <span className="text-[10px] text-[#757682] font-mono block">
              HASH: 8F4A-91C2-E09B-7721
            </span>
          </div>
        </div>

        {/* Firmas de Comité */}
        <div className="grid grid-cols-2 gap-2 text-[12px]">
          <div className="p-3 rounded-xl bg-[#faf8ff] border border-[#e2e7ff] space-y-1">
            <span className="text-[10px] text-[#757682] block">Tutor en Aula:</span>
            <span className="font-bold text-[#131b2e] block truncate">Mtra. Elena Salgado</span>
            <span className="text-[11px] text-[#006c49] font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px]">check</span> Firmado digitalmente
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#faf8ff] border border-[#e2e7ff] space-y-1">
            <span className="text-[10px] text-[#757682] block">Supervisor Universitario:</span>
            <span className="font-bold text-[#131b2e] block truncate">Dr. Roberto Mendoza</span>
            <span className="text-[11px] text-[#ef9900] font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px]">schedule</span> En revisión
            </span>
          </div>
        </div>

        {/* CTAs */}
        <div className="space-y-2 pt-1">
          <button
            onClick={handleRequestSignature}
            disabled={isRequestingSignature}
            className="w-full py-3.5 px-4 rounded-xl bg-[#00236f] hover:bg-[#1e3a8a] text-white font-bold text-[13px] sm:text-[14px] flex items-center justify-center gap-2 shadow-xs active:scale-98 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isRequestingSignature ? 'refresh' : 'draw'}
            </span>
            <span>{isRequestingSignature ? 'Notificando al Asesor...' : 'Solicitar Firma Digital del Asesor'}</span>
          </button>

          <button
            onClick={handleDownloadExpediente}
            disabled={isDownloadingCertificate}
            className="w-full py-3 px-4 rounded-xl bg-[#eaedff] hover:bg-[#dae2fd] text-[#00236f] font-bold text-[13px] flex items-center justify-center gap-2 border border-[#c5c5d3]/50 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isDownloadingCertificate ? 'downloading' : 'download_for_offline'}
            </span>
            <span>{isDownloadingCertificate ? 'Compilando expediente...' : 'Descargar Expediente Certificado en PDF'}</span>
          </button>
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
