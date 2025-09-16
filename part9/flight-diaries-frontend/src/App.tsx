import { useEffect, useState } from "react";
import axios from "axios";
import NewEntryForm from "./components/NewEntryForm";
import DiaryEntries from "./components/DiaryEntries";
import type { DiaryEntry } from "./types";
import ErrorNotification from "./components/ErrorNotification";

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetching the Diary Entries from the backend
  useEffect(() => {
    axios.get<DiaryEntry[]>("http://localhost:3000/api/diaries").then((response) => {
      // console.log(response.data);
      setDiaryEntries(response.data);
    });
  }, []);

  return (
    <div>
      {errorMessage && <ErrorNotification errorMessage={errorMessage}/>}

      <NewEntryForm 
        diaryEntries={diaryEntries} 
        setDiaryEntries={setDiaryEntries}
        setErrorMessage={setErrorMessage}
      />
      
      <DiaryEntries diaryEntries={diaryEntries}/>
    </div>
  );
};

export default App;
