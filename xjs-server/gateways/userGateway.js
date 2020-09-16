const con = require('./dbConnect');
let data = [];

const userGateway = {
    find: () => {
        const sql = `SELECT * FROM users`;

        return new Promise ((resolve, reject) => {
            con.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                };
                data = result;
                resolve(data);
            });
        });
    },
    findOne: (id) => {
        const sql = `SELECT * FROM users WHERE id = ${id}`;

        return new Promise ((resolve, reject) => {
            con.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                };
                data = result;
                resolve(data[0]);
            });
        });
    },
    insert: (info) => {
        const sql = `INSERT INTO users (name, email, password) VALUES ('${info.name}', '${info.email}', '${info.password}')`;

        return new Promise ((resolve, reject) => {
            con.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                };
                resolve(result ? result.affectedRows : null);
            });
        });
    },
    update: (id, info) => {
        const sql = `UPDATE users SET name = '${info.name}', email = '${info.email}', password = '${info.password}', device_token = '${info.device_token}', auth_token = '${info.auth_token}' WHERE id = '${id}'`;

        return new Promise ((resolve, reject) => {
            con.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                };
                resolve(result ? result.affectedRows : null);
            });
        });
    },
    delete: (id) => {
        const sql = `DELETE FROM users WHERE id = '${id}'`;

        return new Promise ((resolve, reject) => {
            con.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                };
                resolve(result ? result.affectedRows : null);
            });
        });
    }
}

module.exports = userGateway;