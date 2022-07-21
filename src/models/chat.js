const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class chat extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            chat.hasMany(models.Message, { onDelete: 'cascade' });
            chat.belongsToMany(models.User, { through: models.Participant });
        }
    }

    chat.init(
        {
            uuid: {
                type: DataTypes.STRING,
                primaryKey: true,
                notNull: true,
            },
            description: {
                type: DataTypes.STRING,
                notNull: true,
                defaultValue: '',
            },
        },
        {
            sequelize,
            modelName: 'Chat',
        }
    );
    return chat;
};
