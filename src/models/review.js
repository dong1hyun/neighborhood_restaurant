const Sequelize = require('sequelize');

module.exports = class Review extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            rating: {
              type: Sequelize.INTEGER,
              allowNull: false,
            },
            comment: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
        },{
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Review',
            tableName: 'reviews',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        })
    }
    static associate(db) {
        db.Review.belongsTo(db.User, { foreignKey: 'reviewer', targetKey: 'id' });
        db.Review.belongsTo(db.Restaurant, { foreignKey: 'review', targetKey: 'id' });
    }
}