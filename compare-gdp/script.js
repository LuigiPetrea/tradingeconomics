let chart = null;

// Funcție pentru a adăuga întârziere
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function compareGDP() {
  const country1 = document.getElementById("country1").value;
  const country2 = document.getElementById("country2").value;
  const errorDiv = document.getElementById("error");

  if (country1 === country2) {
    errorDiv.textContent = "Please select two different countries.";
    return;
  }

  errorDiv.textContent = "";
  const years = new Set();
  const gdpData = { [country1]: [], [country2]: [] };

  try {
    // Cereri secvențiale cu întârziere pentru a evita 409
    const response1 = await fetch(`/api/gdp/${country1}`);
    if (!response1.ok) throw new Error(`Error for ${country1}: ${response1.status}`);
    const data1 = await response1.json();
    await delay(1000); // Întârziere de 1 secundă între cereri

    const response2 = await fetch(`/api/gdp/${country2}`);
    if (!response2.ok) throw new Error(`Error for ${country2}: ${response2.status}`);
    const data2 = await response2.json();

    const data = [data1, data2];
    data.forEach((countryData, index) => {
      const country = [country1, country2][index];
      gdpData[country] = countryData;
      countryData.forEach(item => years.add(item.DateTime.split("-")[0]));
    });

    const sortedYears = Array.from(years).sort();

    const country1Values = sortedYears.map(year => 
      gdpData[country1].find(item => item.DateTime.startsWith(year))?.Value || null
    );
    const country2Values = sortedYears.map(year => 
      gdpData[country2].find(item => item.DateTime.startsWith(year))?.Value || null
    );

    if (chart) chart.destroy();

    chart = new Chart(document.getElementById("gdpChart").getContext("2d"), {
      type: "line",
      data: {
        labels: sortedYears,
        datasets: [
          {
            label: `Population ${country1.replace(/\b\w/g, l => l.toUpperCase())} (Millions)`,
            data: country1Values,
            borderColor: "blue",
            fill: false
          },
          {
            label: `Population ${country2.replace(/\b\w/g, l => l.toUpperCase())} (Millions)`,
            data: country2Values,
            borderColor: "red",
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: { title: { display: true, text: "Year" } },
          y: { title: { display: true, text: "Population (Millions)" } }
        }
      }
    });
  } catch (error) {
    console.error("Error:", error);
    errorDiv.textContent = "Failed to load population data. Please try again.";
  }
}