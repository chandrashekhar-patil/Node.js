import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Chandu@1234567",
  database: "users",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

export default db;
