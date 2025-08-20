import express from "express";
import { calculateBmi } from "./bmiCalculator";
const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
