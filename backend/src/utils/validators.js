/**
 * Validates an Ethiopian mobile phone number in E.164 format.
 * @param {string} phone
 * @returns {boolean}
 */
function isEthiopianPhone(phone) {
    // +2519XXXXXXXX
    const re = /^\+2519\d{8}$/;
    return re.test(phone);
  }
  
  /**
   * Validates that a full name consists of letters, spaces, and hyphens.
   * @param {string} name
   * @returns {boolean}
   */
  function isValidName(name) {
    const re = /^[A-Za-z\u00C0-\u017F]+(?: [A-Za-z\u00C0-\u017F]+)*$/;
    return re.test(name.trim());
  }
  
  /**
   * Validates kebele as alphanumeric plus spaces.
   * @param {string} kebele
   * @returns {boolean}
   */
  function isValidKebele(kebele) {
    if (!kebele) return true; // optional
    const re = /^[A-Za-z0-9 ]+$/;
    return re.test(kebele.trim());
  }
  
  module.exports = {
    isEthiopianPhone,
    isValidName,
    isValidKebele,
  };