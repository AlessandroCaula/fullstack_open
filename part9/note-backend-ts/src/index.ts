import express from "express";
// Routing all the requests to prefix /notes
import noteRouter from './routes/notes';

const app = express();
app.use(express.json());

const PORT = 3001;

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use('/notes', noteRouter);

app.listen(PORT, () => {
  console.log(`Server running on port localhost:${PORT}`);
});
