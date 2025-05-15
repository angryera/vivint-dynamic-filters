import express from "express";

import { fetchSheetRouter } from "./routes/fetchSheetRouter";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello from Express + TypeScript!");
});

app.use("/fetch-sheet", fetchSheetRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
