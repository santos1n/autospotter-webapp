module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING(40),
    },
    email: {
      type: DataTypes.STRING(40),
    },
    password: {
      type: DataTypes.STRING(255),
    },
    contact: {
      type: DataTypes.STRING(20),
    },
    vehicle: {
      type: DataTypes.STRING(40),
    },
    image: {
      type: DataTypes.STRING, // Consider storing the image path or URL
    },
  });

  return Users;
};
