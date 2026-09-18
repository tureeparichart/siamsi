export interface EvidenceItem {
  quote: string;
  source: string;
  significance: string;
  discoveryLocation?: string;
}

export interface MissionOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface FortuneMission {
  question: string;
  missionPrompt: string; // e.g. "ค้นหาว่า เครื่องสังคโลกสะท้อนภูมิปัญญาของผู้คนสุโขทัยด้านใดบ้าง"
  clue: string;
  options: MissionOption[];
  funFact: string;
}

export interface Fortune {
  id: number;
  numberStr: string; // "01", "02", ... "20"
  name: string; // e.g. "ดวงช่างผู้สร้าง"
  storyTitle: string; // e.g. "เครื่องสังคโลก"
  blessing: string; // e.g. "ฝีมือสร้างคุณค่า"
  fortuneReading: string; // Positive, inspiring reading
  evidence: EvidenceItem;
  storyDetails: string[];
  mission: FortuneMission;
  category: 'wisdom' | 'lifestyle' | 'monarchy' | 'art_craft' | 'heritage';
}

export type PageView =
  | 'home'
  | 'shaking'
  | 'result'
  | 'story'
  | 'mission'
  | 'souvenir'
  | 'all_fortunes';

export type ThemeMode = 'chibi3d' | 'classic';

export interface MissionState {
  answered: boolean;
  selectedOptionId: string | null;
  isCorrect: boolean;
  attempts: number;
  wrongOptionIds?: string[];
}
