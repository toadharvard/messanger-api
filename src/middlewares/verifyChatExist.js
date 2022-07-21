module.exports = async (req, res, next) => {
    const models = req.app.get('models');
    const chat = await models.Chat.findByPk(req.params.uuid);
    if (!chat) {
        return res.status(404).json({ message: 'Chat not found' });
    }
    next();
};
