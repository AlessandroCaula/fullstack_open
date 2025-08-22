import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises, ExerciseRecap } from "./exerciseCalculator";
const app = express();

// Important to part JSON request
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

// BMI endpoint
app.get("/bmi", (req, res) => {
  // Access query parameters
  const { height, weight } = req.query;

  // Convert to numbers
  const heightNum: number = Number(height);
  const weightNum: number = Number(weight);

  // Validate parameters. Check if they are given in the query and if they are numbers.
  if (!height || !weight || isNaN(heightNum) || isNaN(weightNum)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  // Calculate BMI
  const bmi = calculateBmi(heightNum, weightNum);

  // Respond with result
  return res.json({
    weight: weightNum,
    height: heightNum,
    bmi
  });
});

// End point for the HTTP POST request
app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  // Validate the data in the request body. 
  if (!daily_exercises || !target) {
    return res.status(400).json({ error: "parameters missing" });
  }
  // Check that the day is an array of numbers
  if (!Array.isArray(daily_exercises) || !daily_exercises.every(d => typeof d === "number" && !isNaN(d))) {
    return res.status(400).json({ error: "malformatted parameters" });
  }
  // Check that the target is a number
  if (isNaN(Number(target))) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  // Convert the values
  const daysArray: number[] = daily_exercises.map(d => Number(d));
  const targetNum: number = Number(target);
  // Compute the metrics given the days of training and the target
  const result: ExerciseRecap = calculateExercises(daysArray, targetNum);

  // return the result
  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
