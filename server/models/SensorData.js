module.exports = (sequelize, DataTypes) => {
  const SensorData = sequelize.define("SensorData", {
    dataid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sensorid: {
      type: DataTypes.INTEGER,
    },
    sensorstatus: {
      type: DataTypes.TINYINT,
    },
    timestamp: {
      type: DataTypes.DATE,
    },
  });

  SensorData.associate = (models) => {
    SensorData.belongsTo(models.SensorList, {
      foreignKey: "sensorid",
      onDelete: "CASCADE",
    });
  };

  return SensorData;
};
