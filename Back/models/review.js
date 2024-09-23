module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define("Review", {
        reviewId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true // 자동으로 증가하는 기본 키 설정
        },
        comment: {
            type: DataTypes.STRING(100),
            allowNull: true // 댓글은 null이 될 수 있음
        },
        rating: {
            type: DataTypes.INTEGER, // 추가: rating 컬럼 정의
            allowNull: true // rating은 null이 될 수 있음
        },
        userId: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        restaurantId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
        {
            charset: "utf8",
            collate: "utf8_general_ci",
            tableName: "Review",
            timestamps: true,
            paranoid: true
        });
        
    return Review;
};
