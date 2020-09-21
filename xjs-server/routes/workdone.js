const express = require('express');
const router = express.Router();
const workdoneGateway = require('../gateways/workdoneGateway');

let status = 200, data = [];

router.get('/', async(req, res) => {

    return res.json({
        data: await workdoneGateway.find()
            .catch(e => {
                return 'error';
            })
    });
});

router.get('/date', async(req, res) => {
        const getData = await workdoneGateway.findDates(req.body)
            .catch(e => {
                return 'error';
            });

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