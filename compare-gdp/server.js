const express = require("express");
const fetch = require("node-fetch");
const app = express();
const port = 3000;

const apiKey = "d150897ad100479:curovkn7uex1947";

app.use(express.static(__dirname));

app.get("/api/gdp/:country", async (req, res) => {
  const country = req.params.country;
  const url = `https://api.tradingeconomics.com/historical/country/${country}/indicator/population?c=${apiKey}&f=json`;
  try {
    const response = await fetch(url);
    console.log(`Cerere pentru ${country}: Status ${response.status} ${response.statusText}`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error for ${country}: ${response.status} ${errorText}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(`Eroare pentru ${country}:`, error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});