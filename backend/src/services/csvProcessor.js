const fs       = require('fs');
const csv      = require('csv-parser');
const path     = require('path');
const Citizen  = require('../models/Citizen');
const SmsJob   = require('../models/SmsJob');
const smsQueue = require('./queueProcessor');

/**
 * Reads a CSV file from disk, expecting columns: fullName, phoneNumber, kebele (optional).
 * For each row:
 *   1) upserts a Citizen (marking idReady = true),
 *   2) creates an SmsJob,
 *   3) enqueues the job for SMS dispatch.
 *
 * @param {string} filePath - absolute path to uploaded CSV
 * @returns {Promise<{ count: number }>} number of rows processed
 */
async function processCsv(filePath) {
  return new Promise((resolve, reject) => {
    const rows = [];
    fs.createReadStream(filePath)
      .pipe(csv({ mapHeaders: ({ header }) => header.trim() }))
      .on('data', row => rows.push(row))
      .on('end', async () => {
        let count = 0;
        try {
          for (const data of rows) {
            const { fullName, phoneNumber, kebele } = data;
            if (!fullName || !phoneNumber) continue;

            // Upsert citizen
            const [citizen] = await Citizen.upsert({
              fullName:    fullName.trim(),
              phoneNumber: phoneNumber.trim(),
              kebele:      kebele ? kebele.trim() : null,
              idReady:     true,
            }, { returning: true });

            // Create SMS job record
            const job = await SmsJob.create({
              citizenId: citizen.id,
              status:    'pending',
            });

            // Enqueue for processing
            await smsQueue.add({ citizenId: citizen.id, smsJobId: job.id });
            count++;
          }

          // Clean up uploaded file
          fs.unlinkSync(filePath);
          resolve({ count });
        } catch (err) {
          reject(err);
        }
      })
      .on('error', err => reject(err));
  });
}

module.exports = processCsv;