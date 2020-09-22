const express = require('express');
const router = express.Router();
const workdoneGateway = require('../gateways/workdoneGateway');
const reviewGateway = require('../gateways/reviewGateway');

let status = 200, data = [];

const getReviews = async(info) => {
    const getData = await reviewGateway.findDates(info)
        .catch(e => {
            return 'error';
        });

    if (getData === 'error') {
        return 'error';
    } else {
        return getData;
    }
};

router.get('/', async(req, res) => {

    return res.json({
        data: await workdoneGateway.find()
            .catch(e => {
                return 'error';
            })
    });
});

router.get('/date/:user/:start/:end', async(req, res) => {
        const start = req.params.start + ' 00:00:00';
        const end = req.params.end + ' 23:59:59';
        const info = {user: req.params.user, start: start, end: end}
        const getData = await workdoneGateway.findDates(info)
            .catch(e => {
                return 'error';
            });
        
        if (getData === 'error') {
            status = 500, data = 'Server error';
        } else {
            const reviews = await getReviews(req.params);

            if (reviews === 'error') {
                status = 500, data = 'Server error';
            } else {
                //getData.reviews = getReviews;
                status = 200, data = {report: getData, review: reviews};
            }
        }

        res.status(status);
        return res.json({data: data});
});

router.get('/:id', async(req, res) => {
    //console.log(req.params.id);
    const getData = await workdoneGateway.findOne(req.params.id)
    .catch(e => {
        return 'error';
    });

    if (getData === 'error') {
        status = 500, data = 'Server error';
    } else {
        status = 200, data = getData;
    }

    res.status(status);
    return res.json({data: data});
});

router.post('/', async(req, res) => {
    const postData = await workdoneGateway.insert(req.body)
    .catch(e => {
        return 'error';
    });

    //console.log(postData);
    if (postData === 1) {
        status = 201, data = 'Success';
    } else {
        status = 500, data = 'Server error';
    }

    res.status(status);
    return res.json({data: data});
});

router.put('/:id', async(req, res) => {
    return res.json({
        data: await workdoneGateway.update(req.params.id, req.body)
        .catch(e => {
            return 'error';
        })
    });   
});

router.delete('/:id', async(req, res) => {
    return res.json({
        data: await workdoneGateway.delete(req.params.id)
        .catch(e => {
            return 'error';
        })
    });   
});

module.exports = router;