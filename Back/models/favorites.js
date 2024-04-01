module.exports = (sequelize, DataTypes) => {
    const Favorites = sequelize.define("Favorites", {
        favoritesID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true // 자동으로 증가하는 기본 키 설정
        },
        favoritesitem: {
            type: DataTypes.STRING(100),
            allowNull: false // 즐겨찾기 아이템은 null이 될 수 없음
        },
    }, 
    {
        charset: "utf8",
        collate: "utf8_general_ci",
        tableName: "Favorites",
        timestamps: false,
        paranoid: true
    });
    
  
    return Favorites;
  };
  