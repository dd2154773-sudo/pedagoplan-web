export type TabType = 'inicio' | 'planeador' | 'secuencias' | 'evidencias' | 'plantillas' | 'diario' | 'evaluacion';

export interface DidacticSequencePhase {
  title: string;
  subtitle: string;
  timeMinutes: number;
  grouping: 'Individual' | 'Parejas' | 'Equipos' | 'Grupal' | 'Plenario';
  description: string;
  pedagogicalIntention: string;
  materials?: string[];
  evaluationInstrument?: string;
  duaAdaptation?: string;
  referenceImage?: string;
}

export interface DidacticPlan {
  id: string;
  title: string;
  grade: string;
  group: string;
  subject: string;
  durationMinutes: number;
  schoolName: string;
  tutorName: string;
  pda: string; // Proceso de Desarrollo de Aprendizaje (NEM)
  axes: string[]; // Ejes articuladores
  faseInicio: DidacticSequencePhase;
  faseDesarrollo: DidacticSequencePhase;
  faseCierre: DidacticSequencePhase;
  status: 'borrador' | 'revision' | 'aprobada';
  lastSaved: string;
  version: string;
}

export interface EvidenceItem {
  id: string;
  title: string;
  category: 'trabajos' | 'dinamicas' | 'dua' | 'clima' | 'evaluacion';
  categoryLabel: string;
  subject: string;
  grade: string;
  date: string;
  imageUrl: string;
  imageAlt: string;
  reflectiveNote: string;
  theoreticalBasis: string;
  supervisorFeedback?: {
    author: string;
    role: string;
    comment: string;
    status: 'Validado' | 'En revisión';
  };
  duaTag?: string;
  anonymized: boolean;
  fileCount?: string;
}

export interface OfficialTemplate {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'diario' | 'rubricas' | 'nem' | 'informes';
  badge: string;
  rating: number;
  reviewsCount: number;
  pageCount: string;
  formats: ('pdf' | 'docx' | 'xlsx')[];
  updateDate: string;
  downloadFileName: string;
  previewContent: {
    folio: string;
    institution: string;
    sections: { heading: string; body: string }[];
  };
}

export interface FieldDiaryEntry {
  id: string;
  weekNumber: number;
  weekTheme: string;
  date: string;
  sessionSubject: string;
  category: string;
  title: string;
  factDescription: string;
  pedagogicalAnalysis: string; // Fundamento teórico Vygotsky / Freire / Schön
  futureCommitment: string;
  evidenceImages: { url: string; alt: string; caption: string }[];
  audioNoteDuration?: string;
  signedByPractitioner: boolean;
  supervisorFeedback?: {
    author: string;
    role: string;
    comment: string;
    date: string;
  };
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  engine?: string;
  suggestionAction?: {
    targetPhase: 'inicio' | 'desarrollo' | 'cierre';
    textToInsert: string;
  };
}
