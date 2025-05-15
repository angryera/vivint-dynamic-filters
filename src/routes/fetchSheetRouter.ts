import { Router } from "express";
import { fetchSheetData } from "../services/googleSheetService";

export const fetchSheetRouter = Router();

fetchSheetRouter.get("/", async (req, res) => {
  const sheetName = req.query.sheetName as string;

  if (!sheetName) {
    res.status(400).send({ error: "Missing 'sheetName' query parameter" });
    return;
  }

  try {
    const data = await fetchSheetData(sheetName);
    res.json(data);
  } catch (error) {
    console.error("Error fetching sheet data:", error);
    res.status(500).send({ error: "Failed to fetch sheet data" });
  }
});
