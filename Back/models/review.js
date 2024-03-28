module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define("Review", {
      reviewID: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true // 자동으로 증가하는 기본 키 설정
      },
      comment: {
          type: DataTypes.STRING(100),
          allowNull: true // 댓글은 null이 될 수 있음
      },
      userID: {
          type: DataTypes.INTEGER,
          allowNull: false // userID는 null이 될 수 없음
      },
      restaurantID: {
          type: DataTypes.INTEGER,
          allowNull: false // restaurantID는 null이 될 수 없음
      }
  }, 
  {
      charset: "utf8",
      collate: "utf8_general_ci",
      tableName: "Review",
      timestamps: false,
      paranoid: true
  });

  return Review;
};
