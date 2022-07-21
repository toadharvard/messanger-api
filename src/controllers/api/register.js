module.exports = async (req, res, next) => {
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

    if (await models.User.findOne({ where: { username } }))
        return res.status(409).json({ message: 'User already exists' });

    const [hash, salt] = utils.hashPassword(password);
    const user = models.User.build({
        username,
        hashedPassword: hash,
        salt,
        chats: '',
    });
    try {
        await user.save();
        req.user = { id: user.id, username: user.username };
        next();
    } catch (e) {
        return res.status(500).json(e);
    }
};
