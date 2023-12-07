const axios = require('axios');
const sqlite3 = require('sqlite3').verbose();

// Function to create SQLite table for candlestick data
function createCandlestickTable() {
  const db = new sqlite3.Database('candlestick_data.db');

  // Create the Candlestick table if it doesn't exist
  db.run(`
    CREATE TABLE IF NOT EXISTS my_table (
      Id INTEGER PRIMARY KEY,
      date INTEGER NOT NULL,
      high REAL NOT NULL,
      low REAL NOT NULL,
      open REAL NOT NULL,
      close REAL NOT NULL,
      volume REAL NOT NULL
    )
  `);

  db.close();
}

// Function to refresh candle data and update the database
async function refreshDataCandleAndStore(pair = 'BTCUSD', duration = '5m') {
  try {
    const response = await axios.get('https://api.binance.com/api/v3/klines', {
      params: {
        symbol: pair.toUpperCase(),
        interval: duration,
      },
    });

    if (response.status !== 200) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    const candles = response.data.map(([timestamp, open, high, low, close, volume]) => ({
      date: new Date(timestamp),
      open: parseFloat(open),
      high: parseFloat(high),
      low: parseFloat(low),
      close: parseFloat(close),
      volume: parseFloat(volume),
    }));

    const db = new sqlite3.Database('candlestick_data.db');

    // Check if a record with the same timestamp exists and update or insert accordingly
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO my_table (date, high, low, open, close, volume)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    candles.forEach((candle) => {
      stmt.run([candle.date, candle.high, candle.low, candle.open, candle.close, candle.volume]);
    });

    stmt.finalize();

    db.close();

    return candles;
  } catch (error) {
    console.error('Error fetching and updating candlestick data:', error.message);
    throw error;
  }
}

// Example usage:
async function exampleUsage() {
  try {
    // Ensure the table is created before inserting or updating data
    createCandlestickTable();

    const candles = await refreshDataCandleAndStore('BTCUSDT', '5m');
    console.log('Candlestick Data:', candles);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Uncomment the line below to run the example
exampleUsage();
