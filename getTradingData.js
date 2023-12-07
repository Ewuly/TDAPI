const axios = require('axios');

async function refreshDataCandle(pair = 'BTCUSDT', duration = '5m') {
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
      timestamp: new Date(timestamp),
      open: parseFloat(open),
      high: parseFloat(high),
      low: parseFloat(low),
      close: parseFloat(close),
      volume: parseFloat(volume),
    }));

    return candles;
  } catch (error) {
    console.error('Error fetching candlestick data:', error.message);
    throw error;
  }
}

// Example usage:
async function exampleUsage() {
  try {
    const candles = await refreshDataCandle('BTCUSDT', '5m');
    console.log('Candlestick Data:', candles);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Uncomment the line below to run the example
exampleUsage();
