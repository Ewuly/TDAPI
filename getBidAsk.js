const axios = require('axios');

async function getDepth(direction = 'ask', pair = 'BTCUSDT') {
  try {
    const response = await axios.get(`https://api.binance.com/api/v3/depth`, {
      params: {
        symbol: pair.toUpperCase(),
      },
    });

    if (response.status !== 200) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    const { bids, asks } = response.data;

    if (direction === 'ask') {
      return asks[0][0];
    } else if (direction === 'bid') {
      return bids[0][0];
    } else {
      throw new Error('Invalid direction. Use "ask" or "bid".');
    }
  } catch (error) {
    console.error('Error fetching depth:', error.message);
    throw error;
  }
}

// Example usage:
async function exampleUsage() {
  try {
    const askPrice = await getDepth('ask', 'BTCUSDT');
    console.log('Ask Price:', askPrice);

    const bidPrice = await getDepth('bid', 'BTCUSDT');
    console.log('Bid Price:', bidPrice);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Uncomment the line below to run the example
exampleUsage();
