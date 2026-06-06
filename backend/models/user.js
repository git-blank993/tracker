/**
 * This is the User object
 *
 */
class User {
  id;
  username;
  email;
  #password;
  /**
   * @param {number} id
   * @param {string} username
   * @param {string} email
   * @param {string} password
   */
  constructor(id, username, email, password) {
    this.id = id ??;
    this.username = username;
    this.email = email;
    this.#password = password;
  }

  /**
   * @returns {string}
   */
  getPassword() {
    return this.#password;
  }


}

export default User;
