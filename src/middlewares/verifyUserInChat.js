module.exports = async (req, res, next) => {
    const models = req.app.get('models');
    const participant = await models.Participant.findOne({
        where: {
            ChatUuid: req.params.uuid,
            UserId: req.user.id,
        },
    });
    if (!participant) {
        return res.status(409).json({ message: 'User not found' });
    }
    next();
};
