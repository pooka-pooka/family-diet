import Papa from "papaparse";

// Create a JavaScript function to fetch and parse the CSV
const loadCsvData = async () => {
  const response = await fetch("nutrition.csv");
  const reader = response.body.getReader();
  const result = await reader.read();
  const decoder = new TextDecoder("utf-8");
  const csv = decoder.decode(result.value); // Result in CSV string

  // Now use PapaParse to parse the CSV string into a JSON object
  const parsedData = Papa.parse(csv, { header: true });

  return parsedData.data; // This returns the parsed JSON
};

export default loadCsvData;
