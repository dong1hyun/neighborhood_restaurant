module.exports = (sequelize, DataTypes) => {
    const QnA = sequelize.define("QnA", {
        qnaId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true // 자동으로 증가하는 기본 키 설정
        },
        question: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        answer: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
    }, 
    {
        charset: "utf8",
        collate: "utf8_general_ci",
        tableName: "QnA",
        timestamps: true,
        paranoid: true
    });
  
  
    return QnA;
};
