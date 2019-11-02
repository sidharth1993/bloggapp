const jwt = require('jsonwebtoken');

const login = (bmail, bpwd) => {
    if (bmail && bpwd) {
        let token = jwt.sign({
            bmail: bmail
        }, 'gss', {
            expiresIn: '24h'
        });
        return token;
    } else {
        return null;
    }
}

const verify = (req, res, next) => {
    if (req.headers && req.headers.authorization) {
        jwt.verify(req.headers.authorization, 'gss', (err, decoded) => {
            if (err) {
                throw new Error('Invalid token');
            }
            if (decoded) {
                console.log('decoded', decoded);
                next();
            }
        });
    }
}


module.exports = {
    login: login,
    verify: verify
}