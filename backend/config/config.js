import dotenv from "dotenv";

dotenv.config({ debug: process.env.DEBUG == "true" });

/**
 * This function checks if the env key exists or else throws an error
 *
 * @param {string} key
 * @returns {string }
 */
function getEnvOrThrow(key) {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable - ${key} not set`);
  }
  return value;
}

/**
 * This function initialises the config for the project.
 *
 */
function initConfig() {
  let port = 3000;
  let debug = false;
  try {
    const rawPort = getEnvOrThrow("PORT");
    port = parseInt(rawPort);
  } catch (err) {
    console.error(`Error parsing PORT env. Setting default port ${3000}`);
  }

  const db_url = getEnvOrThrow("DATABASE_URL");
  try {
    let value = getEnvOrThrow("DEBUG");
    debug = value === "true";
    if (debug) {
      console.debug("Debug mode on");
    }
  } catch (err) {
    console.error(`Error parsing Debug. Setting default ${debug}`);
  }

  const secret = getEnvOrThrow("SECRET");
  return {
    getPort: () => port,
    getDbUrl: () => db_url,
    getDebug: () => debug,
    getSecret: () => secret,
  };
}

const Config = initConfig();
export default Config;
