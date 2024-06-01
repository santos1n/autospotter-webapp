module.exports = (sequelize, DataTypes) => {
  const UserAdmin = sequelize.define("UserAdmin", {
    name: {
      type: DataTypes.STRING(40),
    },
    password: {
      type: DataTypes.STRING(255),
    },
  });

  return UserAdmin;
};
