const jwt = require('jsonwebtoken');


const authorize = (roles = []) => {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

        // authorize based on user role
    return  (req, res, next) => {
        jwt.verify(req.cookies['token'].access_token, process.env.SECRET_TOKEN, (err, decoded) => {
            if(err){
                return res.status(401).json({ message: 'Unauthorized' });
            }
            if(roles.length && !roles.includes(decoded.role)) {
                // user's role is not authorized
                return res.status(401).json({ message: 'Unauthorized' });
            }
            // authentication and authorization successful
            req.user = { id: decoded.id, role: decoded.role, pseudo: decoded.pseudo};
            next();
        })
    }; 
}

module.exports = authorize;