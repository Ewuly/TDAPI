const axios = require('axios');

async function getOrderBook(pair = 'BTCUSDT', limit = 5) {
  try {
    const response = await axios.get(`https://api.binance.com/api/v3/depth`, {
      params: {
        symbol: pair.toUpperCase(),
        limit: limit,
      },
    });

    if (response.status !== 200) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    const { bids, asks } = response.data;

    return {
      bids: bids.slice(0, limit).map(([price, quantity]) => ({ price, quantity })),
      asks: asks.slice(0, limit).map(([price, quantity]) => ({ price, quantity })),
    };
  } catch (error) {
    console.error('Error fetching order book:', error.message);
    throw error;
  }
}

// Example usage:
async function exampleUsage() {
  try {
    const orderBook = await getOrderBook('BTCUSDT');
    console.log('Order Book:', orderBook);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Uncomment the line below to run the example
exampleUsage();
