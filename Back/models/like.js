module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define("Like", {
        likeId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true // 자동으로 증가하는 기본 키 설정
        },
        id: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        reviewId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
        {
            charset: "utf8",
            collate: "utf8_general_ci",
            tableName: "Like",
            timestamps: true,
            paranoid: true
        });


    return Like;
};