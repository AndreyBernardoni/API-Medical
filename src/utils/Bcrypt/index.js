const bcrypt = require("bcrypt");

const saltRounds = 10;

const hashPassword = async (password) => {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    console.log("@HASHPASSWORD()", hash);
    return hash;
  } catch (error) {
    throw new Error(error);
  }
};

const comparePassword = async (password, hash) => {
  try {
    const result = await bcrypt.compare(password, hash);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  hashPassword,
  comparePassword,
};
