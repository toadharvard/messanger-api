const jwt = require('jsonwebtoken');
module.exports = async (req, res, next) => {
    if (!req.headers.authorization)
        return res
            .status(403)
            .json({ message: 'No access auth header provided' });

    const [method, accessToken] = req.headers.authorization.split(' ');
    if (method !== 'Bearer' || !accessToken)
        return res.status(403).json({ message: 'No access token' });

    try {
        const decodedPayload = jwt.verify(accessToken, process.env.PRIVATE_KEY);
        if (!decodedPayload) {
            return res.status(403).json({ message: 'Invalid access token' });
        }
        req.user = decodedPayload;
        next();
    } catch (e) {
        return res
            .status(401)
            .json({ message: 'Access token has been expired' });
    }
};
