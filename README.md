# TDAPI
Tasks list - GET  
• Create a git repository and share it with the teacher (0xEniotna, make it public please)  
• Get a list of all available cryptocurrencies and display it  
• Create a function to display the ’ask’ or ‘bid’ price of an asset. Direction and asset name as parameters def getDepth(direction='ask', pair = 'BTCUSD')  
• Get order book for an asset  
• Create a function to read agregated trading data (candles) def refreshDataCandle(pair = 'BTCUSD', duration = '5m’)  
• Create a sqlite table to store said data (schema attached in the next slide)  
• Store candle data in the db • Modify refreshDataCandle() to update when new candle data is available  
• Create a function to extract all available trade data def refreshData(pair = 'BTCUSD’)  
• Store the data in sqlite Tasks list – POST • Create an order def createOrder(api_key, secret_key, direction, price, amount, pair ='BTCUSD_d', orderType = 'LimitOrder’)  
• Cancel an order def cancelOrder(api_key, secret_key, uuid)  
