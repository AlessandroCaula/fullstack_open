import type { DiaryEntry } from "../types";

// interface DiaryEntryProps {
//   diaryEntries: DiaryEntry[]
// }

const DiaryEntries = ({ diaryEntries }: { diaryEntries: DiaryEntry[] }) => {
  return (
    <div>
      {/* Diary entries */}
      <div>
        <h1>Diary Entries</h1>
        {diaryEntries.map((entry) => (
          <div key={entry.id}>
            <h2>{entry.date}</h2>
            <p>Visibility: {entry.visibility}</p>
            <p>Weather: {entry.weather}</p>
            {entry.comment ? <p>Comment: {entry.comment}</p> : <></>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiaryEntries;
