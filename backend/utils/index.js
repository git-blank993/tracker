/**
 * This is a email validator function
 *
 * @param {string} email
 */
export default function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export class JSONReturn {
  message;
  success;
  error = "";
  /**
   * @param {string} message
   * @param {boolean} success
   * @param {string} [error]
   */
  constructor(message, success, error) {
    this.message = message;
    this.success = success;
    this.error = error;
  }
}
