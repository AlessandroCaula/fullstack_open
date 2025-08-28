import { NewDiaryEntry } from "./types";

const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  console.log(object); // Now object is no longer unused

  // Faking the return value
  const newEntry: NewDiaryEntry = {
    weather: 'cloudy',
    visibility: 'great',
    date: '2025-28-08',
    comment: 'fake comment'
  };

  return newEntry;
};

export default toNewDiaryEntry;
