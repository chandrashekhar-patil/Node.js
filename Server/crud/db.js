import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Chandu@1234567",
  database: "user_crud",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

export default db;
    