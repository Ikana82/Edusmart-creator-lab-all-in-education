export type EducationLevel = 'PAUD/TK' | 'SD' | 'SMP' | 'SMA' | 'Umum';
export type ResourceCategory = 'worksheet' | 'lkpd' | 'media' | 'game' | 'comic' | 'flashcard' | 'ebook';
export type DifficultyLevel = 'Mudah' | 'Sedang' | 'Tantangan';

export interface EducationalResource {
  id: string;
  title: string;
  category: ResourceCategory;
  categoryLabel: string;
  ageRange: string;
  educationLevel: EducationLevel;
  description: string;
  fullContent?: string;
  learningObjectives?: string[];
  instructions?: string;
  thumbnail: string;
  theme: string;
  difficulty: DifficultyLevel;
  tags: string[];
  promptTemplate?: string;
  downloadUrl?: string;
}

export type PromptCategory =
  | 'worksheet'
  | 'lkpd'
  | 'game'
  | 'comic'
  | 'flashcard'
  | 'video'
  | 'storyboard'
  | 'image'
  | 'audio'
  | 'product';

export interface PromptTemplate {
  id: string;
  title: string;
  category: PromptCategory;
  categoryLabel: string;
  description: string;
  promptText: string;
  variables: string[];
  targetAudience: string;
  recommendedModel: string;
  exampleOutput?: string;
  isFavorite?: boolean;
}

export type AIDirectoryCategory =
  | 'text'
  | 'image'
  | 'video'
  | 'audio'
  | 'presentation'
  | 'design';

export interface AITool {
  id: string;
  name: string;
  category: AIDirectoryCategory;
  categoryLabel: string;
  description: string;
  bestFor: string;
  websiteUrl: string;
  iconName: string;
  popular?: boolean;
  pricing?: string;
}

export type WorksheetPromptCategoryType =
  | 'mewarnai'
  | 'matching'
  | 'tracing'
  | 'coding'
  | 'cut_paste'
  | 'berhitung'
  | 'literasi'
  | 'maze_puzzle';

export interface WorksheetPromptSubtype {
  id: string;
  name: string;
  description: string;
  indonesianHeader: string;
  indonesianInstruction: string;
  visualReferenceNote: string;
  defaultTopic: string;
  defaultEnglishPrompt: string;
}

export interface WorksheetCategoryDef {
  id: WorksheetPromptCategoryType;
  name: string;
  iconName: string;
  description: string;
  subtypes: WorksheetPromptSubtype[];
}

export interface StoryboardScene {
  sceneNumber: number;
  timestamp: string;
  visualDescription: string;
  narration: string;
  onScreenText: string;
  imagePrompt: string;
  videoPrompt: string;
  cameraMovement: string;
  transition: string;
}

export interface StoryboardProject {
  id: string;
  title: string;
  topic: string;
  audience: EducationLevel;
  videoType: string;
  duration: string;
  aspectRatio: '16:9' | '9:16' | '1:1';
  visualStyle: string;
  scenes: StoryboardScene[];
  createdAt: string;
  notes?: string;
}

export interface SongLyricSection {
  sectionTitle: string;
  lines: string[];
}

export interface SongProject {
  id: string;
  title: string;
  topic: string;
  age: string;
  language: string;
  songStyle: string;
  duration: string;
  learningObjective: string;
  lyrics: SongLyricSection[];
  songStructure: string;
  musicStylePrompt: string;
  voiceDirection: string;
  createdAt: string;
}

export interface WorksheetStructureSection {
  sectionTitle: string;
  instructions: string;
  items: string[];
}

export interface WorksheetProject {
  id: string;
  title: string;
  topic: string;
  ageRange: string;
  educationLevel: EducationLevel;
  theme: string;
  worksheetType: string;
  difficulty: DifficultyLevel;
  learningObjectives: string[];
  instructions: string;
  structure: WorksheetStructureSection[];
  textToImagePrompt: string;
  createdAt: string;
}

export interface LKPDProject {
  id: string;
  title: string;
  topic: string;
  jenjang: EducationLevel;
  capaianPembelajaran: string;
  tujuanPembelajaran: string[];
  petunjukBelajar: string;
  aktivitasEksplorasi: {
    langkah: number;
    instruksi: string;
    pertanyaanPanduan?: string;
  }[];
  soalAnalitis: string[];
  rubrikPenilaian: {
    aspek: string;
    kriteriaBaik: string;
    kriteriaCukup: string;
  }[];
  promptIlustrasi: string;
  createdAt: string;
}

export interface VideoScriptProject {
  id: string;
  topic: string;
  targetAudience: EducationLevel;
  videoType: string;
  script: string;
  storyboard: StoryboardScene[];
  imagePrompts: string[];
  videoPrompts: string[];
  voiceOverScript: string;
  subtitles: { time: string; text: string }[];
  sceneSequence: string;
  productionGuide: string[];
  createdAt: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}
