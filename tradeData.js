const axios = require('axios');
const sqlite3 = require('sqlite3').verbose();

// Function to create SQLite table for trade data
function createTradeDataTable() {
  const db = new sqlite3.Database('trade_data.db');

  // Create the TradeData table if it doesn't exist
  db.run(`
    CREATE TABLE IF NOT EXISTS trade_data (
      tradeId INTEGER PRIMARY KEY,
      pair TEXT NOT NULL,
      price REAL NOT NULL,
      quantity REAL NOT NULL,
      timestamp DATETIME NOT NULL,
      isBuyerMaker INTEGER NOT NULL
    )
  `);

  db.close();
}

// Function to refresh trade data and store in the database
async function refreshDataAndStore(pair = 'BTCUSD') {
  try {
    const response = await axios.get('https://api.binance.com/api/v3/trades', {
      params: {
        symbol: pair.toUpperCase(),
      },
    });

    if (response.status !== 200) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    const trades = response.data.map(({ id, price, qty, time, isBuyerMaker }) => ({
      tradeId: id,
      price: parseFloat(price),
      quantity: parseFloat(qty),
      timestamp: new Date(time),
      isBuyerMaker: isBuyerMaker ? 1 : 0, // Convert boolean to integer
    }));

    const db = new sqlite3.Database('trade_data.db');

    // Ensure the table is created before inserting data
    createTradeDataTable();

    // Insert each trade into the database
    trades.forEach((trade) => {
      db.run(`
        INSERT INTO trade_data (tradeId, pair, price, quantity, timestamp, isBuyerMaker)
        VALUES (?, ?, ?, ?, ?, ?)
      `, [trade.tradeId, pair.toUpperCase(), trade.price, trade.quantity, trade.timestamp, trade.isBuyerMaker]);
    });

    db.close();

    return trades;
  } catch (error) {
    console.error('Error fetching and storing trade data:', error.message);
    throw error;
  }
}

// Example usage:
async function exampleUsage() {
  try {
    // Ensure the table is created before inserting or updating data
    createTradeDataTable();

    const tradeData = await refreshDataAndStore('BTCUSDT');
    console.log('Trade Data:', tradeData);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Uncomment the line below to run the example
exampleUsage();
