const pool = require('./dbConnect');

const workdoneGateway = {
    find: () => {
        const sql = `SELECT * FROM workdone`;

        return new Promise ((resolve, reject) => {
            pool.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                };
                console.log(result);
                resolve(result);
            });
        });
    },
    findDates: (info) => {
        const sql = `SELECT * FROM workdone WHERE user_id = '${info.user}' AND time_in BETWEEN '${info.start}' AND '${info.end}'`;

        return new Promise ((resolve, reject) => {
            pool.query(sql, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    },
    findOne: (lock) => {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd + ' ' + '00:00:00';

        const sql = `SELECT * FROM workdone WHERE lock_id = ${lock} AND time_in >= '${today}'`;

        //console.log(sql);
        return new Promise ((resolve, reject) => {
            pool.query(sql, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    },
    insert: (info) => {
        const sql = `INSERT INTO workdone (user_id, lock_id, activity, achievement, comments) VALUES (${info.user_id}, ${info.lock_id}, '${info.activity}', '${info.achievement}', '${info.comments}')`;

        return new Promise ((resolve, reject) => {
            pool.query(sql, (err, result) => {
                if (err) {console.log(err); reject(err)};
                resolve(result ? result.affectedRows : null);
            });
        });
    },
    update: (id, info) => {
        const sql = `UPDATE workdone SET activity = '${info.activity}', achievement = '${info.achievement}', comments = '${info.comments}', reviews = '${info.reviews}', review_time = '${info.reviewTime}' WHERE id = '${id}'`;

        return new Promise ((resolve, reject) => {
            pool.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                };
                resolve(result ? result.affectedRows : null);
            });
        });
    },
    delete: (id) => {
        const sql = `DELETE FROM workdone WHERE id = '${id}'`;

        return new Promise ((resolve, reject) => {
            pool.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                };
                resolve(result ? result.affectedRows : null);
            });
        });
    }
}

module.exports = workdoneGateway;