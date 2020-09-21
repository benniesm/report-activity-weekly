const express = require('express');
const router = express.Router();
const loginGateway = require('../../gateways/auth/loginGateway');

let status = 200, data = [];

router.post('/:id', async(req, res) => {
        const postData = await loginGateway.logout(req.params.id)
            .catch(e => {
                return 'error';
            });

        if (postData === 'error' || postData == null || postData !== 1) {
            status = 500, data = 'Sever error';
        } else {
            status = 200, data = 'Success'
        }

        res.status(status);
        return res.json({data: data});
});

module.exports = router;