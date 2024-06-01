// models/Ticket.js
module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define("Ticket", {
    ticketid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ticketname: {
      type: DataTypes.STRING(40), // Adjust length as needed
    },
    ticketspot: {
      type: DataTypes.STRING(7), // Adjust length as needed
    },
    ticketcontact: {
      type: DataTypes.STRING(20), // Adjust length as needed
    },
    ticketemail: {
      type: DataTypes.STRING(40), // Adjust length as needed
    },
    ticketvehicle: {
      type: DataTypes.STRING(40), // Adjust length as needed
    },
  });

  Ticket.associate = (models) => {
    // Associate ticket with user (assuming a user can have multiple tickets)
    Ticket.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Ticket;
};
