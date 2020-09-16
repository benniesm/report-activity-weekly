const express = require('express');
const router = express.Router();
const userGateway = require('../gateways/userGateway');

router.get('/', async(req, res) => {

    return res.json({
        data: await userGateway.find()
            .catch(e => {
                return 'error';
            })
    });
});

router.get('/:id', async(req, res) => {
    return res.json({
        data: await userGateway.findOne(req.params.id)
        .catch(e => {
            return 'error';
        })
    });
});

router.post('/', async(req, res) => {
    return res.json({
        data: await userGateway.insert(req.body)
        .catch(e => {
            return 'error';
        })
    });
});

router.put('/:id', async(req, res) => {
    return res.json({
        data: await userGateway.update(req.params.id, req.body)
        .catch(e => {
            return 'error';
        })
    });   
});

router.delete('/:id', async(req, res) => {
    return res.json({
        data: await userGateway.delete(req.params.id)
        .catch(e => {
            return 'error';
        })
    });   
});

module.exports = router;