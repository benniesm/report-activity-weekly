const pool = require('./dbConnect');

const reviewGateway = {
    find: () => {
        const sql = `SELECT * FROM reviews`;

        return new Promise ((resolve, reject) => {
            pool.query(sql, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    },
    findUser: (user) => {
        const sql = `SELECT * FROM reviews WHERE user_id = ${user}`;

        //console.log(sql);
        return new Promise ((resolve, reject) => {
            pool.query(sql, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    },
    findDates: (info) => {
        const sql = `SELECT * FROM reviews WHERE user_id = '${info.user}' AND start_date = '${info.start}' AND end_date = '${info.end}'`;

        return new Promise ((resolve, reject) => {
            pool.query(sql, (err, result) => {
                if (err) {console.log(err); reject(err)};
                resolve(result);
            });
        });
    },
    insert: async(info, findDates) => {
        const sql = `INSERT INTO reviews (user_id, mgr_id, mgr_name, start_date, end_date, workdone_ids, review) VALUES (${info.user_id}, ${info.mgr_id}, '${info.mgr_name}', '${info.start_date}', '${info.end_date}', '${info.workdone_ids}', '${info.review}')`;

        return new Promise ((resolve, reject) => {
            pool.query(sql, async(err, result) => {
                if (err) {console.log(err); reject(err)};
                
                let reviews = [];
                const rInfo = {
                    user: info.user_id,
                    start: info.start_date,
                    end: info.end_date
                };

                const getReviews = await findDates(rInfo)
                    .catch(e => {return 'error'});

                if (getReviews !== 'error') {
                    reviews = getReviews;
                }

                resolve(reviews);
            });
        });
    },
    delete: (id) => {
        const sql = `DELETE FROM reviews WHERE id = '${id}'`;

        return new Promise ((resolve, reject) => {
            pool.query(sql, (err, result) => {
                if (err) reject(err);
                resolve(result ? result.affectedRows : null);
            });
        });
    }
}

module.exports = reviewGateway;