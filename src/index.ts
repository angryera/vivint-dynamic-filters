import * as dotenv from "dotenv";

// Load environment variables from a .env file
dotenv.config();

import { fetchSheetData, fetchSheetNames } from "./services/googleSheetService";
import * as fs from "fs";
import * as path from "path";

async function combineGoogleSheetsToJson(outputJsonPath: string) {
  try {
    const combinedData: Record<string, any> = {};

    // Fetch all sheet names dynamically
    const sheetNames = await fetchSheetNames();

    for (const sheetName of sheetNames) {
      // Fetch data for each sheet
      const sheetData = await fetchSheetData(sheetName);
      combinedData[sheetName] = sheetData;
    }

    // Append current timestamp to the output file name
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const outputFileName = outputJsonPath.replace(
      ".json",
      `_${timestamp}.json`
    );

    // Ensure the output directory exists
    const outputDir = path.join(__dirname, "../output"); // Updated to place output outside of src
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    // Write the combined data to a JSON file in the output directory
    const outputFilePath = path.join(outputDir, path.basename(outputFileName));
    fs.writeFileSync(outputFilePath, JSON.stringify(combinedData, null, 2));
  } catch (error) {
    console.error(
      "An error occurred while combining Google Sheets data:",
      error
    );
  }
}

// Example usage
combineGoogleSheetsToJson("output.json");
