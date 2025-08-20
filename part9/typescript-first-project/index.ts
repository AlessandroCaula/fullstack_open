import express from "express";
import { calculator, Operation } from "./calculator";
const app = express();

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.post("/calculate", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;

  // Data validation
  if (!value1 || isNaN(Number(value1))) {
    return res.status(400).send({ error: '...' });
  }

  // assert the type
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculator(Number(value1), Number(value2), op as Operation);

  return res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
