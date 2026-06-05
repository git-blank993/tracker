/**
 * This is a email validator function
 *
 * @param {string} email
 */
export default function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
