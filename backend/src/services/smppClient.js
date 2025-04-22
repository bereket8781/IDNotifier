const smpp   = require('smpp');
const config = require('../config');

let session = null;
let bound   = false;

/**
 * Ensures a bound transceiver session is available.
 */
function ensureBound() {
  if (bound && session) return Promise.resolve(session);

  return new Promise((resolve, reject) => {
    session = new smpp.Session({
      host: config.smpp.host,
      port: config.smpp.port,
    });
    session.on('error', err => console.error('SMPP session error:', err));
    session.bind_transceiver({
      system_id: config.smpp.systemId,
      password:  config.smpp.password,
    }, pdu => {
      if (pdu.command_status === 0) {
        bound = true;
        resolve(session);
      } else {
        reject(new Error(`SMPP bind failed: ${pdu.command_status}`));
      }
    });
  });
}

/**
 * Sends an SMS via SMPP.
 * @param {string} to      E.164 phone number
 * @param {string} message text body
 */
async function sendSms(to, message) {
  const sess = await ensureBound();
  return new Promise((resolve, reject) => {
    sess.submit_sm({
      destination_addr: to,
      short_message:    message,
    }, pdu => {
      if (pdu.command_status === 0) {
        resolve(pdu.message_id);
      } else {
        reject(new Error(`SMPP submit_sm failed: ${pdu.command_status}`));
      }
    });
  });
}

module.exports = sendSms;