const con = require('./dbConnect');
let data = [];

const lockerGateway = {
    find: () => {
        const sql = `SELECT * FROM locker`;

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
        const sql = `SELECT * FROM locker WHERE id = ${id}`;

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
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + 'dd';

        const sql = `INSERT INTO locker (user_id, token, date, lat, lon, comments) VALUES ('${info.userId}', '${info.token}', '${today}', '${info.lat}', '${info.lon}', '${info.comments}')`;

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
        const sql = `UPDATE locker SET user_id = '${info.userId}', token = '${info.token}', lat = '${info.lat}', lon = '${info.lon}', comments = '${info.comments}' WHERE id = '${id}'`;

        return new Promise ((resolve, reject) => {
            con.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                };
                resolve(result ? result.affectedRows : null);
            });
        });
    },
    delete: (id) => {
        const sql = `DELETE FROM locker WHERE id = '${id}'`;

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

module.exports = lockerGateway;