const pool = require('./dbConnect');

const lockerGateway = {
    find: () => {
        const sql = `SELECT * FROM locker`;

        return new Promise ((resolve, reject) => {
            pool.query(sql, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    },
    findOne: (id) => {
        const sql = `SELECT * FROM locker WHERE id = ${id}`;

        return new Promise ((resolve, reject) => {
            pool.query(sql, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    },
    findToday: (today, id) => {
        const sql = `SELECT * FROM locker WHERE date = '${today}' AND user_id = ${id}`;

        return new Promise ((resolve, reject) => {
            pool.query(sql, (err, result) => {
                if (err) reject('error');
                if (result.length < 1) {
                    resolve(null);
                } else {
                    resolve(result[0].id);
                }                
            });
        })

    },
    insert: async(info, findToday) => {
        let locked = null;
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        const lockedToday = await findToday(today, info.id);
        if (lockedToday !== 'error' && lockedToday !== null) locked = lockedToday;

        return new Promise ((resolve, reject) => {
            if (locked !== null) {
                resolve(locked);
            } else {
                const sql = `INSERT INTO locker (user_id, date, lat, lon) VALUES ('${info.id}', '${today}', '${info.lat}', '${info.lon}')`;

                pool.query(sql, (err, result) => {
                    if (err) reject(err);
                    resolve(result ? result.insertId : null);
                });
            }
        });
    },
    update: (id, info) => {
        const sql = `UPDATE locker SET user_id = '${info.userId}', lat = '${info.lat}', lon = '${info.lon}' WHERE id = '${id}'`;

        return new Promise ((resolve, reject) => {
            pool.query(sql, (err, result) => {
                if (err)  reject(err);
                resolve(result ? result.affectedRows : null);
            });
        });
    },
    delete: (id) => {
        const sql = `DELETE FROM locker WHERE id = '${id}'`;

        return new Promise ((resolve, reject) => {
            pool.query(sql, (err, result) => {
                if (err) reject(err);
                resolve(result ? result.affectedRows : null);
            });
        });
    }
}

module.exports = lockerGateway;