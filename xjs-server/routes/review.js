const express = require('express');
const router = express.Router();
const reviewGateway = require('../gateways/reviewGateway');

let status = 200, data = [];

router.post('/', async(req, res) => {
    const postData = await reviewGateway.insert(req.body, reviewGateway.findDates)
    .catch(e => {
        return 'error';
    });

    //console.log(postData);
    if (postData !== 'error') {
        status = 201, data = postData;
    } else {
        status = 500, data = 'Server error';
    }

    res.status(status);
    return res.json({data: data});
});

module.exports = router;