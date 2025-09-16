import axios from "axios";
import React, { useState } from "react";
import type { DiaryEntry } from "../types";

interface NewEntryFormProps {
  setDiaryEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
  diaryEntries: DiaryEntry[];
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

const NewEntryForm = ({ setDiaryEntries, diaryEntries, setErrorMessage }: NewEntryFormProps) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("great");
  const [weather, setWeather] = useState("sunny");
  const [comment, setComment] = useState("");

  const addNewFlightEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();

    // Adding the new flight entry to the backend
    axios
      .post("http://localhost:3000/api/diaries", {
        date: date,
        visibility: visibility,
        weather: weather,
        comment: comment,
      })
      .then((response) => {
        setDiaryEntries(diaryEntries.concat(response.data));
      })
      .catch((error: unknown) => {
        if (axios.isAxiosError(error)) {
          const errorMsPath = error.response?.data.error[0].path[0] === "visibility" ? visibility : weather;
          setErrorMessage(`Error: Incorrect ${error.response?.data.error[0].path[0]}: ${errorMsPath}`);
        } else {
          setErrorMessage('Something went wrong')
          console.log("Unknown error");
        }
      });

    // Resetting the input in the forms
    setDate("");
    setVisibility("great");
    setWeather("sunny");
    setComment("");
    setErrorMessage("");
  };

  return (
    <div>
      <h1>Add new entry</h1>
      <form onSubmit={addNewFlightEntry}>
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
            {/* <option value="best ever">Best Ever</option> */}
            <option value="great">Great</option>
            <option value="good">Good</option>
            <option value="ok">OK</option>
            <option value="poor">Poor</option>
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
            {/* <option value="sunny a lot">Sunny A Lot</option> */}
            <option value="sunny">Sunny</option>
            <option value="rainy">Rainy</option>
            <option value="cloudy">Cloudy</option>
            <option value="stormy">Stormy</option>
            <option value="windy">Windy</option>
          </select>
        </div>

        {/* Comment */}
        <div>
          <label>Comment: </label>
          <input
            required
            placeholder="Comment on the flight"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default NewEntryForm;
