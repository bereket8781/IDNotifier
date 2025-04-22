const SmsJob  = require('../models/SmsJob');
const smsQueue = require('../services/queueProcessor');

async function processSmsJobs(req, res, next) {
  try {
    const jobs = await SmsJob.findAll({ where: { status: 'pending' } });

    for (const job of jobs) {
      await smsQueue.add({ citizenId: job.citizenId });
    }

    res.json({
      message: 'SMS jobs enqueued',
      count:   jobs.length
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { processSmsJobs };