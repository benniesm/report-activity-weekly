const con = require('../dbConnect');
let data = [];

const authGateway = {
    authenticate: (user) => {
        const sql = `SELECT * FROM users WHERE id = ${user}`;

        return new Promise ((resolve, reject) => {
            con.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                };
                data = result;
                resolve(data);
            });
        });
    }
}

module.exports = authGateway;