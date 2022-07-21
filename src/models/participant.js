const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class participant extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            participant.belongsToMany(models.Message, {
                through: models.ViewedMessage,
            });
        }
    }

    participant.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                notNull: true,
            },
        },
        {
            sequelize,
            modelName: 'Participant',
        }
    );
    return participant;
};
