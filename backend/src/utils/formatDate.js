/**
 * Formats a date to "YYYY-MM-DD HH:mm:ss" in local timezone.
 * @param {Date|string} dateInput
 * @returns {string}
 */
function formatDateTime(dateInput) {
    const date = (dateInput instanceof Date) ? dateInput : new Date(dateInput);
    const pad = (n) => n.toString().padStart(2, '0');
  
    const Y = date.getFullYear();
    const M = pad(date.getMonth() + 1);
    const D = pad(date.getDate());
    const h = pad(date.getHours());
    const m = pad(date.getMinutes());
    const s = pad(date.getSeconds());
  
    return `${Y}-${M}-${D} ${h}:${m}:${s}`;
  }
  
  module.exports = { formatDateTime };