const con = require('./dbConnect');
let data = [];

const workdoneGateway = {
    find: () => {
        const sql = `SELECT * FROM workdone`;

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
        const sql = `SELECT * FROM workdone WHERE id = ${id}`;

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
    insert: (info) => {
        const sql = `INSERT INTO workdone (lock_id, activity, achievement, comments) VALUES ('${info.lockId}', '${info.activity}', '${info.achievement}', '${info.comment}')`;

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
        const sql = `UPDATE workdone SET activity = '${info.activity}', achievement = '${info.achievement}', comments = '${info.comments}', reviews = '${info.reviews}', review_time = '${info.reviewTime}' WHERE id = '${id}'`;

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
        const sql = `DELETE FROM workdone WHERE id = '${id}'`;

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

module.exports = workdoneGateway;