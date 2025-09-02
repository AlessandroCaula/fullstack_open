import z from "zod";
import { NewDiaryEntry, Visibility, Weather } from "./types";

const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "comment" in object &&
    "date" in object &&
    "weather" in object &&
    "visibility" in object
  ) {
    // Validate string in the format YYYY-MM-DD
    const zDate = z.iso.date();
    // Validation with Zod enums
    const zWeather = z.enum(Weather);
    const zVisibility = z.enum(Visibility);
    // Faking the return value
    const newEntry: NewDiaryEntry = {
      comment: z.string().optional().parse(object.comment),
      date: zDate.parse(object.date),
      weather: zWeather.parse(object.weather),
      visibility: zVisibility.parse(object.visibility),
    };
    return newEntry;
  }

  throw new Error("Incorrect data: some fields are missing");
};

export default toNewDiaryEntry;
