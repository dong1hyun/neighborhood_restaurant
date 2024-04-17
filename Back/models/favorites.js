module.exports = (sequelize, DataTypes) => {
  const Favorites = sequelize.define("Favorites", {
      favoritesId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true // 자동으로 증가하는 기본 키 설정
      },
      id: {
          type: DataTypes.STRING(100),
          allowNull: false
      },
      restaurantId: {
          type: DataTypes.INTEGER,
          allowNull: false
      }
  }, 
  {
      charset: "utf8",
      collate: "utf8_general_ci",
      tableName: "Favorites",
      timestamps: false,
      paranoid: true
  });
  
  Favorites.findFavorite = async (id, restaurantID) => {
      try {
        const favorite = await Favorites.findOne({ where: { id, restaurantID } });
        return favorite;
      } catch (error) {
        throw new Error('즐겨찾기를 찾는 중에 오류가 발생했습니다.');
      }
  };

  return Favorites;
};
