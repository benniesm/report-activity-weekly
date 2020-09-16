const con = require('../dbConnect');
let data = [];

const loginGateway = {
    login: (email) => {
        const sql = `SELECT * FROM users WHERE email = '${email}'`;

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

module.exports = loginGateway;