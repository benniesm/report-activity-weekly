const authGateway = require('../../gateways/auth/authGateway');

const authenticator = async(user, token) => {
    //console.log(`${user}: ${token}`);

    const userInfo = await authGateway.authenticate(user)
        .catch(e => {
            //console.log('bad query');
            return false;
        });
    
    if (userInfo && userInfo.length > 0 && userInfo[0].hasOwnProperty('auth_token')) {
        if (userInfo[0].auth_token === token) {
            //console.log('comparison okay');
            const sessionToday = await authGateway.session(user)
                .catch(e => {
                    return null;
                });

            if (sessionToday === null) {
                return false;
            }
            
            return true;
        }

        //console.log('error in compare')
        return false;
    }
    
    //console.log('User not found');
    return false;
};

module.exports = authenticator;