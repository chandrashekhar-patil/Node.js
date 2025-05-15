import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Chandu@1234567',
  database: 'users',
});
function handleDisconnect() {
  db.connect((err) => {
    if (err) {
      console.error("Database connection failed:", err);
      setTimeout(handleDisconnect, 2000); // Retry after 2 seconds
      return;
    }
    console.log("Connected to MySQL database");
  });
}

handleDisconnect();

db.on('error', (err) => {
  console.error('Database error:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    handleDisconnect();
  } else {
    throw err;
  }
});

export default db;