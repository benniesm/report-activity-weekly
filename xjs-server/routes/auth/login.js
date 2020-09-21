const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const lockerGateway = require('../../gateways/lockerGateway');
const loginGateway = require('../../gateways/auth/loginGateway');
const userGateway = require('../../gateways/userGateway');

router.post('/', async(req, res) => {
    //console.log(req.body);
    let status = 200, data = [];

    const userInfo = await loginGateway.login(req.body.email)
    .catch(e => {
        status = 500, data = 'Bad Gateway';
    });

    if (userInfo.length > 0 && userInfo[0].hasOwnProperty('password')) {
        //console.log(req.body.password +': ' + userInfo[0].password);
        const verified = bcrypt.compareSync(
                req.body.password,
                userInfo[0].password
            );

        //console.log(verified);
        if (verified) {
            const tokenGen = generateToken();
            userInfo[0].auth_token = tokenGen;
            const tokenSaved = await updateUserToken(userInfo[0].id, userInfo[0]);
            userInfo[0].lat = req.body.lat;
            userInfo[0].lon = req.body.lon;
            const createLocker = await createLoginLock(userInfo[0]);

            console.log(tokenSaved);
            if (tokenSaved && createLocker) {
                delete userInfo[0].password;
                userInfo[0].lock_id = createLocker;
                //console.log(userInfo[0]);
                res.status(200);
                return res.json({data: userInfo[0]});
            }

            status = 500, data = 'Unable to save new state';
        }

        status = 406, data = 'Credentials not acceptable';
    } else {
        status = 404, data = 'User not found';
    }

    //console.log(userInfo);
    res.status(status);
    return res.json({data: data});
});

const generateToken = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
    let randStr = '';

    for (let i = 0; i < 60; i++) {
       randStr += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return randStr;
}

const updateUserToken = async(id, info) => {
    const updatedTok = await userGateway.update(id, info)
    .catch(e => {
        //console.log(e);
        return false;
    });
    //console.log({'u':updatedTok})
    if (updatedTok !== null && updatedTok !== false ) {
        return true;
    }

    return false;
}

const createLoginLock = async(info) => {
    const locked = await lockerGateway.insert(info, lockerGateway.findToday)
    .catch(e => {
        return false;
    });

    if (locked !== null) {
        return locked;
    }

    return false;
}

module.exports = router;