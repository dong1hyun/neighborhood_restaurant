const Sequelize = require('sequelize');

module.exports = class Restaurant extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
              type: Sequelize.INTEGER,
              allowNull: false,
              primaryKey: true,
            },
            name: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
        },{
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Restaurant',
            tableName: 'Restaurants',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        })
    }
    static associate(db) {
        db.Restaurant.hasMany(db.Review, { foreignkey: 'review', sourceKey: 'id' })
    }
}