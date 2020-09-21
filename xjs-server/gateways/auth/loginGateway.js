const pool = require('../dbConnect');
let data = [];

const loginGateway = {
    login: (email) => {
        const sql = `SELECT * FROM users WHERE email = '${email}'`;

        return new Promise ((resolve, reject) => {
            pool.query(sql, (err, result) => {
                if (err) reject(err);
                resolve(result);                   
            });
            
        })
    },
    logout: (id) => {
        const sql = `UPDATE users SET auth_token = '' WHERE id = '${id}'`

        return new Promise ((resolve, reject) => {
            pool.query(sql, (err, result) => {
                if (err) reject(err);
                resolve(result ? result.affectedRows : null);
            });
        })
    }
}

module.exports = loginGateway;