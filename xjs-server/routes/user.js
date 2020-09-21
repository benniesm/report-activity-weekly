const express = require('express');
const router = express.Router();
const userGateway = require('../gateways/userGateway');

let status = 200, data = [];

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
    //console.log(req.body);
    const userExist = await userGateway.findEmail(req.body.email)
    .catch(e => {
        return 'error';
    });

    //console.log({'ue': userExist});
    if (userExist === 'error') {
        status = 500; data = 'Server error';
        res.status(status);
        return res.json({data: data});
    }

    if (userExist.length > 0) {
        status = 409, data = 'Cannot duplicate user email';
    } else {
        const userReg = await userGateway.insert(req.body)
        .catch(e => {
            return 'error';
        });
        
        //console.log({'ur': userReg});
        if (userReg === 'error' || userReg === null || userReg !== 1) {
            status = 500, data = 'Server error';
        } else {
            status = 201, data = 'Registration success';
        }
    }

    res.status(status);
    return res.json({data: data});
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