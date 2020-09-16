const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const loginGateway = require('../../gateways/auth/loginGateway');
const userGateway = require('../../gateways/userGateway');

router.post('/', async(req, res) => {
    console.log(req.body);
    const userInfo = await loginGateway.login(req.body.email)
        .catch(e => {
            //console.log('bad query');
            res.status(500);
            return res.json({data: 'Bad query'});
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

            //console.log(tokenSaved);
            if (tokenSaved) {
                delete userInfo[0].password;
                res.status(200);
                return res.json({data: userInfo[0]});
            }

            res.status(500);
            return res.json({data: 'Unable to save new state'});
        }

        res.status(401);
        return res.json({data: 'Invalid credentials'});
    }

    //console.log('User not found');
    res.status(404);
    return res.json({data: 'User not found'});
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
            return null;
        })

    if (updatedTok !== null) {
        return true;
    }

    return false;
}

module.exports = router;