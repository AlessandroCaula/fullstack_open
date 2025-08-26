// import diaryData from '../../data/entriesJson.json';
import diaries from '../../data/entries';
import { DiaryEntry, NonSensitiveDiaryEntry } from '../types';

// const diaries: DiaryEntry[] = diaryData as DiaryEntry[];

const getEntries = (): DiaryEntry[] => {
  return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries;
};

const addDiary = () => {
  return null;
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries
};

