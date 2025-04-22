/**
 * Sends a standardized success response.
 * @param {object} res   Express response object
 * @param {any}    data  The payload to send
 * @param {string} [msg] Optional message
 */
function success(res, data, msg = 'OK') {
    return res.json({
      status:  'success',
      message: msg,
      data,
    });
  }
  
  /**
   * Sends a standardized error response.
   * @param {object} res     Express response object
   * @param {number} code    HTTP status code
   * @param {string} message Error message
   */
  function error(res, code, message) {
    return res.status(code).json({
      status:  'error',
      message,
    });
  }
  
  module.exports = { success, error };