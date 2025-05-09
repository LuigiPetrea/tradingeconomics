# Economic Indicator Comparator
This application allows the comparison of the population of two selected countries (Sweden, Mexico, New Zealand, Thailand) using the Trading Economics API.

## How to Run
1. Install dependencies: `npm install express node-fetch@2 tradingeconomics`
2. Add the API key to `server.js`.
3. Start the server: `node server.js`
4. Open `http://localhost:3000/index.html`.
5. Select two countries and click "Compare".

## Technologies
- HTML, CSS, JavaScript
- Chart.js (chart)
- Node.js, Express (backend)

## Notes
- The default indicator is `population`. Replace with another available indicator (e.g., `consumer price index cpi`) in `server.js` if needed.
- The free Trading Economics account allows access only to Sweden, Mexico, New Zealand, and Thailand.
- The `tradingeconomics` library uses `date-and-time`, which has a known vulnerability with no available fix. This does not affect the application's functionality.

explain API limitations

alternative data sources

more concise

