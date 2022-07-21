module.exports = async (req, res) => {
    const models = req.app.get('models');
    const chat = await models.Chat.findByPk(req.params.uuid);
    const participant = await models.Participant.findOne({
        where: {
            ChatUuid: req.params.uuid,
            UserId: req.user.id,
        },
    });
    if (participant)
        return res.status(409).json({ message: 'User already in chat' });

    await chat.addUser(await models.User.findByPk(req.user.id));
    return res.json({ message: 'Successfully joined to chat' });
};
