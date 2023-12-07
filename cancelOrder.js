const axios = require('axios');
const crypto = require('crypto');

function cancelOrder(apiKey, secretKey, orderId) {
  try {
    const timestamp = Date.now();
    const signature = crypto.createHmac('sha256', secretKey).update(`symbol=BTCUSD&orderId=${orderId}&timestamp=${timestamp}`).digest('hex');

    const headers = {
      'X-MBX-APIKEY': apiKey,
    };

    const data = {
      symbol: 'BTCUSD',
      orderId: orderId,
      timestamp: timestamp,
      signature: signature,
    };

    const url = 'https://api.binance.com/api/v3/order';

    return axios.delete(url, { params: data, headers: headers })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw new Error(`Error canceling order: ${error.response.data.msg}`);
      });
  } catch (error) {
    throw new Error(`Error canceling order: ${error.message}`);
  }
}

// Example usage:
async function exampleUsage() {
  try {
    const apiKey = 'your_api_key';
    const secretKey = 'your_secret_key';
    const orderId = 'your_order_id'; // replace with the ID of the order you want to cancel

    const cancelResult = await cancelOrder(apiKey, secretKey, orderId);
    console.log('Cancel Result:', cancelResult);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Uncomment the line below to run the example
// exampleUsage();
