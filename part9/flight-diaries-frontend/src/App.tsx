import { useEffect, useState } from "react";
import axios from "axios";
import NewEntryForm from "./components/NewEntryForm";
import DiaryEntries from "./components/DiaryEntries";
import type { DiaryEntry } from "./types";

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  // Fetching the Diary Entries from the backend
  useEffect(() => {
    axios.get<DiaryEntry[]>("http://localhost:3000/api/diaries").then((response) => {
      // console.log(response.data);
      setDiaryEntries(response.data);
    });
  }, []);

  return (
    <div>
      <NewEntryForm />
      <DiaryEntries diaryEntries={diaryEntries}/>
    </div>
  );
};

export default App;
