const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");
// Se crea la conexion a la base de datos
//con los datos definidos en el archivo db.config.js
const connection = mysql.createConnection(dbConfig.database);
// Abrir la conexión
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});
module.exports = connection;