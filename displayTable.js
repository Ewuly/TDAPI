const sqlite3 = require('sqlite3').verbose();

// Function to display the contents of the database
function displayDatabase() {
  const db = new sqlite3.Database('candlestick_data.db');

  // Select all rows from the my_table table
  db.all('SELECT * FROM my_table', (err, rows) => {
    if (err) {
      console.error('Error fetching data:', err.message);
      return;
    }

    // Print the rows to the console
    console.log('Candlestick Data:');
    rows.forEach((row) => {
      console.log(row);
    });

    db.close();
  });
}

// Example usage to display the database
displayDatabase();
