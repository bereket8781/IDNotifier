module.exports = (sequelize, DataTypes) => {
  const SmsJob = sequelize.define('SmsJob', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    status: {
      type: DataTypes.ENUM('pending', 'sent', 'failed'),
      defaultValue: 'pending',
    },
    error: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'sms_jobs',
    timestamps: true,
  });

  SmsJob.associate = models => {
    SmsJob.belongsTo(models.Citizen, { foreignKey: 'citizenId' });
  };

  return SmsJob;
};