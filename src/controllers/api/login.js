const jwt = require('jsonwebtoken');
module.exports = async (req, res) => {
    const utils = req.app.get('utils');
    const models = req.app.get('models');

    const { username, password } = req.body;
    if (!username || !password)
        return res
            .status(400)
            .json({
                message:
                    'Request body should contains username and password fields',
            });

    const user = await models.User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!utils.isValidPassword(password, user.hashedPassword, user.salt)) {
        return res.status(403).json({ message: 'Wrong credentials' });
    }
    const jwtToken = jwt.sign({ id: user.id }, process.env.PRIVATE_KEY, {
        expiresIn: '24h',
    });
    return res.json({ token: jwtToken });
};
