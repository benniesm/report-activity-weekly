const express = require('express');
const router = express.Router();
const userGateway = require('../../gateways/userGateway');

let status = 200, data = [];

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

module.exports = router;