const authGateway = require('../../gateways/auth/authGateway');

const authenticator = async(user, token) => {
    //console.log(`${user}: ${token}`);

    const userInfo = await authGateway.authenticate(user)
        .catch(e => {
            //console.log('bad query');
            return false;
        });
    
    if (userInfo.length > 0 && userInfo[0].hasOwnProperty('auth_token')) {
        if (userInfo[0].auth_token === token) {
            //console.log('comparison okay');
            return true;
        }

        //console.log('error in compare')
        return false;
    }
    
    //console.log('User not found');
    return false;
};

module.exports = authenticator;