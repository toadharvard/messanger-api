module.exports = async (req, res) => {
    const models = req.app.get('models');
    const chat = await models.Chat.findByPk(req.params.uuid);

    if (!req.body.message)
        return res
            .status(400)
            .json({ message: 'Request body should contains message field' });

    await chat.addMessage(
        await models.Message.create({
            content: req.body.message,
            ChatUuid: chat.uuid,
            UserId: req.user.id,
        })
    );
    return res.json({ message: 'Successfully sent to chat' });
};
