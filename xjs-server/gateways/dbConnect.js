const mysql = require('mysql');

const config = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    //connectionLimit : 10,
}
const pool = mysql.createPool(config);
console.log('DB pool created');

/*
con.connect((err) => {
  	if (err) {
		  console.log('DB Error!: ' + err);
		  return;
  };
  
  console.log("DB Connected...");
});

const repool = () => {
    //con.state should be 'authenticated'.
    if (con.state === 'disconnected') {
      con.connect((err) => {
        if (err) {
          console.log('Recon Error!');
          return;
        }

        console.log('DB Reconnected...');
      })
    }
}
*/

module.exports = pool;