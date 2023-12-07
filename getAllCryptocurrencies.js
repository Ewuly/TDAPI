const axios = require('axios');

const binanceApiBaseUrl = 'https://api.binance.com/api/v3';

async function getAllCryptocurrencies() {
  try {
    const response = await axios.get(`${binanceApiBaseUrl}/exchangeInfo`);
    const symbols = response.data.symbols;

    // Extracting the symbol names from the response
    const cryptocurrencies = symbols.map(symbol => symbol.symbol);

    return cryptocurrencies;
  } catch (error) {
    console.error('Error fetching cryptocurrencies:', error.message);
    throw error;
  }
}

// Example usage
getAllCryptocurrencies()
  .then(cryptocurrencies => {
    console.log('Available Cryptocurrencies:', cryptocurrencies);
  })
  .catch(error => {
    // Handle errors
  });
