module.exports = (sequelize, DataTypes) => {
  const Citizen = sequelize.define('Citizen', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^\+2519\d{8}$/, 
      },
    },
    district: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subDistrict: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    idReady: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    notified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    tableName: 'citizens',
    timestamps: true,
  });

  Citizen.associate = models => {
    Citizen.hasMany(models.SmsJob, { foreignKey: 'citizenId' });
  };

  return Citizen;
};