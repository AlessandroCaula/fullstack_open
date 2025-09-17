// Types for the diary entries
export interface DiaryEntry {
  id: number;
  date: string;
  visibility: string;
  weather: string;
  comment?: string;
}