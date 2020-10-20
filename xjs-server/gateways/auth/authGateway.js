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
    },
    session: (user) => {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd + ' 00:00:00';
        //console.log(today);
        const sql = `SELECT in_time FROM locker WHERE user_id = ${user} AND in_time > '${today}'`;

        return new Promise ((resolve, reject) => {
            pool.query(sql, (err, result) => {
                if (err) reject(err);
                //console.log(result.length > 0 ? result[0]: null);
                resolve(result.length > 0 ? result[0]: null);
            })
        });
    }
}

module.exports = authGateway;