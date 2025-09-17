import axios from "axios";
import React, { useState } from "react";
import type { DiaryEntry } from "../types";

interface NewEntryFormProps {
  setDiaryEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
  diaryEntries: DiaryEntry[];
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

const NewEntryForm = ({
  setDiaryEntries,
  diaryEntries,
  setErrorMessage,
}: NewEntryFormProps) => {
  const visibilityVal: string[] = ["great", "good", "ok", "poor"];
  const weatherVal: string[] = ["sunny", "rainy", "cloudy", "stormy", "windy"];

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
          const errorMsPath =
            error.response?.data.error[0].path[0] === "visibility"
              ? visibility
              : weather;
          setErrorMessage(
            `Error: Incorrect ${error.response?.data.error[0].path[0]}: ${errorMsPath}`
          );
        } else {
          setErrorMessage("Something went wrong");
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
            type="date"
            required
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>

        {/* Visibility */}
        <div>
          <label>Visibility: </label>
          {visibilityVal.map((val) => {
            const visibilityId =
              "visibility" + val.charAt(0).toUpperCase() + val.slice(1);
            const visibilityLabel = val.charAt(0).toUpperCase() + val.slice(1);
            return (
              <div
                key={val}
                style={{ display: "inline-block", marginRight: "10px" }}
              >
                <input
                  type="radio"
                  id={visibilityId}
                  name="visibility"
                  value={val}
                  checked={visibility === val} // It is check when the visibility is the same of the current val
                  onChange={(event) => setVisibility(event.target.value)}
                />
                <label>{visibilityLabel}</label>
              </div>
            );
          })}
        </div>

        {/* Weather */}
        <div>
          <label>Weather: </label>
          {weatherVal.map((val) => {
            const weatherId =
              "weather" + val.charAt(0).toUpperCase() + val.slice(1);
            const weatherLabel = val.charAt(0).toUpperCase() + val.slice(1);
            return (
              <div
                key={val}
                style={{ display: "inline-block", marginRight: "10px" }}
              >
                <input
                  type="radio"
                  id={weatherId}
                  name="weather"
                  value={val}
                  checked={val === weather}
                  onChange={(event) => setWeather(event.target.value)}
                />
                <label>{weatherLabel}</label>
              </div>
            );
          })}
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
