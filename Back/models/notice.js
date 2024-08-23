module.exports = (sequelize, DataTypes) => {
    const Notice = sequelize.define("Notice", {
        noticeId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true // 자동으로 증가하는 기본 키 설정
        },
        title: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
    }, 
    {
        charset: "utf8",
        collate: "utf8_general_ci",
        tableName: "Notice",
        timestamps: true,
        paranoid: true
    });
  
  
    return Notice;
};
