import { useState } from "react";

const NewEntryForm = () => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  // console.log(date);
  // console.log(visibility);
  // console.log(weather);
  // console.log(comment);

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
    </div>
  );
};

export default NewEntryForm;
