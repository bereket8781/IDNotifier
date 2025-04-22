/**
 * Maps raw CSV headers to your model field names.
 * E.g. "Full Name" → "fullName", "Phone Number" → "phoneNumber"
 */
const HEADER_MAP = {
    'full name':    'fullName',
    'phone number': 'phoneNumber',
    kebele:         'kebele',
    'ready date':   'readyDate',
  };
  
  /**
   * Takes a raw CSV header and returns the corresponding field name.
   * Defaults to camelCased header if not in map.
   * @param {string} header
   * @returns {string}
   */
  function mapHeader(header) {
    const key = header.trim().toLowerCase();
    if (HEADER_MAP[key]) return HEADER_MAP[key];
    // fallback: camelCase the header
    return header
      .trim()
      .toLowerCase()
      .split(/[\s_]+/)
      .map((word, i) =>
        i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join('');
  }
  
  module.exports = { mapHeader };