module.exports = (sequelize, DataTypes) => {
  const SensorList = sequelize.define("SensorList", {
    sensorid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sensorname: {
      type: DataTypes.STRING(7),
    },
  });

  return SensorList;
};
