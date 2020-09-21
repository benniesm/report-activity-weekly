const pool = require('./dbConnect');
const bcrypt = require('bcryptjs');

const userGateway = {
    find: () => {
        const sql = `SELECT * FROM users`;

        return new Promise ((resolve, reject) => {
            pool.query(sql, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    },
    findOne: (id) => {
        const sql = `SELECT * FROM users WHERE id = ${id}`;

        return new Promise ((resolve, reject) => {
            pool.query(sql, (err, result) => {
                if (err) reject(err);
                resolve(result[0]);
            });
        });
    },
    findEmail: (email) => {
        const sql = `SELECT email FROM users WHERE email = '${email}'`;

        return new Promise ((resolve, reject) => {
            pool.query(sql, (err, result) => {
                if (err) reject(err);
                //console.log({'qr': result[0]});
                resolve(result);
            });
        });
    },
    insert: (info) => {
        info.password = bcrypt.hashSync(info.password);        
        const sql = `INSERT INTO users (name, email, password) VALUES ('${info.name}', '${info.email}', '${info.password}')`;

        return new Promise ((resolve, reject) => {
            pool.query(sql, (err, result) => {
                if (err) reject(err);
                resolve(result ? result.affectedRows : null);
            });
        });
    },
    update: (id, info) => {
        const sql = `UPDATE users SET name = '${info.name}', email = '${info.email}', password = '${info.password}', device_token = '${info.device_token}', auth_token = '${info.auth_token}' WHERE id = '${id}'`;

        return new Promise ((resolve, reject) => {
            pool.query(sql, (err, result) => {
                if (err) reject(err);
                resolve(result ? result.affectedRows : null);
            });
        });
    },
    delete: (id) => {
        const sql = `DELETE FROM users WHERE id = '${id}'`;

        return new Promise ((resolve, reject) => {
            pool.query(sql, (err, result) => {
                if (err) reject(err);
                resolve(result ? result.affectedRows : null);
            });
        });
    }
}

module.exports = userGateway;