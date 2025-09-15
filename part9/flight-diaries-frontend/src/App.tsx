import { useEffect, useState } from "react";
import axios from "axios";

interface DiaryEntry {
  id: number;
  date: string;
  visibility: string;
  weather: string;
  comment?: string;
}

const App = () => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  const [diaryEntry, setDiaryEntry] = useState<DiaryEntry[]>([]);

  // console.log(date);
  // console.log(visibility);
  // console.log(weather);
  // console.log(comment);

  // Fetching the Diary Entries from the backend
  useEffect(() => {
    axios.get<DiaryEntry[]>("http://localhost:3000/api/diaries").then((response) => {
      // console.log(response.data);
      setDiaryEntry(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Add new entry</h1>
      <form>
        {/* Date */}
        <div>
          <label>Date: </label>
          <input
            required
            placeholder="YYYY-MM-DD"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>

        {/* Visibility */}
        <div>
          <label>Visibility: </label>
          <select
            required
            id="visibility"
            value={visibility}
            onChange={(event) => setVisibility(event.target.value)}
          >
            <option value="Great">Great</option>
            <option value="Good">Good</option>
            <option value="OK">OK</option>
            <option value="Poor">Poor</option>
          </select>
        </div>

        {/* Weather */}
        <div>
          <label>Weather: </label>
          <select
            required
            id="weather"
            value={weather}
            onChange={(event) => setWeather(event.target.value)}
          >
            <option value="sunny">Sunny</option>
            <option value="rainy">Rainy</option>
            <option value="cloudy">Cloudy</option>
            <option value="stormy">Stormy</option>
            <option value="windy">Windy</option>
          </select>
        </div>

        {/* Comment */}
        <label>Comment: </label>
        <input
          required
          placeholder="Comment on the flight"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
      </form>

      {/* Diary entries */}
      <div>
        {diaryEntry.map((entry) => (
          <div key={entry.id}>
            <h2>{entry.date}</h2>
            <p>Visibility: {entry.visibility}</p>
            <p>Weather: {entry.weather}</p>
            {entry.comment 
              ? <p>Comment: {entry.comment}</p>
              : <></>
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
