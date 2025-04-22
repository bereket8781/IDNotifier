const Queue    = require('bull');
const SmsJob   = require('../models/SmsJob');
const Citizen  = require('../models/Citizen');
const sendSms  = require('./smppClient');
const redis    = require('../config/redis');
const config   = require('../config');

// Initialize Bull queue with your Redis connection
const smsQueue = new Queue('smsQueue', {
  createClient: type => {
    switch (type) {
      case 'client': return redis;
      case 'subscriber': return redis.duplicate();
      default: return redis.duplicate();
    }
  }
});

// Process jobs: fetch citizen, send SMS, and update statuses
smsQueue.process(config.app.queueConcurrency || 5, async job => {
  const { citizenId, smsJobId } = job.data;
  const smsJob  = await SmsJob.findByPk(smsJobId);
  const citizen = await Citizen.findByPk(citizenId);

  if (!smsJob || !citizen) {
    throw new Error('Invalid job: missing Citizen or SmsJob');
  }

  try {
    const message = `Hello ${citizen.fullName}, your ID card is ready for collection.`;
    const msgId   = await sendSms(citizen.phoneNumber, message);

    smsJob.status = 'sent';
    smsJob.error  = null;
    smsJob.messageId = msgId;
    await smsJob.save();

    citizen.notified = true;
    await citizen.save();
  } catch (err) {
    smsJob.status = 'failed';
    smsJob.error  = err.message;
    await smsJob.save();
    throw err;  // let Bull handle retries if configured
  }
});

module.exports = smsQueue;