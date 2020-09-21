const express = require('express');
const router = express.Router();
const loginGateway = require('../../gateways/auth/loginGateway');

router.post('/:id', async(req, res) => {
    return res.json({
        data: await loginGateway.logout(req.params.id)
        .catch(e => {
            return 'error';
        })
    });
});

module.exports = router;