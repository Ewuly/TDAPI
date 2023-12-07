const axios = require('axios');
const crypto = require('crypto');

function createOrder(apiKey, secretKey, direction, price, amount, pair = 'BTCUSD', orderType = 'LIMIT') {
  try {
    const timestamp = Date.now();
    const signature = crypto.createHmac('sha256', secretKey).update(`symbol=${pair.toUpperCase()}&side=${direction.toUpperCase()}&type=${orderType.toUpperCase()}&timeInForce=GTC&quantity=${amount}&price=${price}&timestamp=${timestamp}`).digest('hex');

    const headers = {
      'X-MBX-APIKEY': apiKey,
    };

    const data = {
      symbol: pair.toUpperCase(),
      side: direction.toUpperCase(),
      type: orderType.toUpperCase(),
      timeInForce: 'GTC',
      quantity: amount,
      price: price,
      timestamp: timestamp,
      signature: signature,
    };

    const url = 'https://api.binance.com/api/v3/order';

    return axios.post(url, null, { params: data, headers: headers })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw new Error(`Error creating order: ${error.response.data.msg}`);
      });
  } catch (error) {
    throw new Error(`Error creating order: ${error.message}`);
  }
}

// Example usage:
async function exampleUsage() {
  try {
    const apiKey = 'your_api_key';
    const secretKey = 'your_secret_key';
    const direction = 'buy'; // or 'sell'
    const price = 50000; // replace with your desired price
    const amount = 1; // replace with your desired amount
    const pair = 'BTCUSD';
    const orderType = 'LIMIT';

    const orderResult = await createOrder(apiKey, secretKey, direction, price, amount, pair, orderType);
    console.log('Order Result:', orderResult);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Uncomment the line below to run the example
exampleUsage();
