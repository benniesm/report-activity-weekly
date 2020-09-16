const express = require('express');
const router = express.Router();
const workdoneGateway = require('../gateways/workdoneGateway');

router.get('/', async(req, res) => {

    return res.json({
        data: await workdoneGateway.find()
            .catch(e => {
                return 'error';
            })
    });
});

router.get('/:id', async(req, res) => {
    return res.json({
        data: await workdoneGateway.findOne(req.params.id)
        .catch(e => {
            return 'error';
        })
    });
});

router.post('/', async(req, res) => {
    return res.json({
        data: await workdoneGateway.insert(req.body)
        .catch(e => {
            return 'error';
        })
    });
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