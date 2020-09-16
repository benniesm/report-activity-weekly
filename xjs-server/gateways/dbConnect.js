const mysql = require('mysql');

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
});

con.connect((err) => {
  	if (err) {
		  console.log('DB Error!');
		  return;
	};
  console.log("DB Connected...");
});

module.exports = con;