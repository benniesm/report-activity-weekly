const pool = require('../dbConnect');

const authGateway = {
    authenticate: (user) => {
        const sql = `SELECT * FROM users WHERE id = ${user}`;

        return new Promise ((resolve, reject) => {
            pool.query(sql, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }
}

module.exports = authGateway;