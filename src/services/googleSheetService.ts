import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  keyFile: "../../credentials/service_account.json",
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});

export const fetchSheetData = async (sheetName: string) => {
  const sheets = google.sheets({ version: "v4", auth });

  const spreadsheetId = "1X1BlL5f4Q3ttOVAREJrN_By2lfOKugU-crpvvzndAAk";

  // Fetch the entire sheet data
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: sheetName,
  });

  const rows = res.data.values || [];

  // Helper function to find the row index by a specific value
  const findRowIndex = (value: string): number => {
    return rows.findIndex(
      (row) => row[0] && row[0].toString().trim() === value
    );
  };

  // Extract Report Name, URL, and Alias
  const reportName = rows[1]?.[0] || "";
  const reportURL = rows[4]?.[0] || "";
  const reportAlias = rows[7]?.[0] || "";

  // Extract Filters
  const filtersStartIndex = findRowIndex("Filters") + 2;
  const filtersEndIndex = findRowIndex("Parameters") - 2;
  const parametersStartIndex = findRowIndex("Parameters") + 2;
  const parametersEndIndex = findRowIndex("Date Filter") - 2;
  const dateFilterStartIndex = findRowIndex("Date Filter") + 2;
  const dateFilterRelativeStartIndex = findRowIndex("Date Filter Relative") + 2;

  const filtersRows = rows.slice(filtersStartIndex, filtersEndIndex);
  const filters: Record<string, { title: string; category: string }> = {};
  const filtersOrder: string[] = [];

  filtersRows.forEach((row) => {
    const [filterName, title, category] = row;
    if (filterName && title && category) {
      const key = filterName.replace(/ /g, "_").toLowerCase();
      filters[key] = { title, category };
      filtersOrder.push(key);
    }
  });

  const parametersRows = rows.slice(
    parametersStartIndex,
    parametersEndIndex + 1
  );
  const parameters: Record<string, { title: string; category?: string }> = {};

  parametersRows.forEach((row) => {
    const [paramName, title, category] = row;
    if (paramName && title) {
      const key = paramName.replace(/ /g, "_").toLowerCase();
      parameters[key] = category ? { title, category } : { title };
    }
  });

  // Extract Date Filters
  const dateFilterKey = rows[dateFilterStartIndex]?.[0] || "";
  const dateFilterSelectedKey = rows[dateFilterRelativeStartIndex]?.[0] || "";

  // Extract Optional Variables
  const optionalVariablesStartIndex = findRowIndex("Optional Variables") + 1;
  const optionalVariablesRows = rows.slice(optionalVariablesStartIndex);
  const optionalVariables: Record<string, string> = {};

  optionalVariablesRows.forEach((row) => {
    const [variableName, value] = row;
    if (variableName && value) {
      optionalVariables[variableName.replace(/ /g, "_").toLowerCase()] = value;
    }
  });

  // Construct final JSON structures
  const TABLEAU_FILTERS = {
    [reportAlias]: filters,
  };

  const TABLEAU_FILTERS_ORDER = {
    [reportAlias]: filtersOrder,
  };

  const TABLEAU_PARAMETERS = {
    [reportAlias]: parameters,
  };

  const TABLEAU_DATE_FILTER = {
    [reportAlias]: dateFilterKey,
  };

  const TABLEAU_DATE_FILTER_SELECTED = {
    [reportAlias]: dateFilterSelectedKey,
  };

  return {
    TABLEAU_FILTERS,
    TABLEAU_FILTERS_ORDER,
    TABLEAU_PARAMETERS,
    TABLEAU_DATE_FILTER,
    TABLEAU_DATE_FILTER_SELECTED,
    optionalVariables,
  };
};
