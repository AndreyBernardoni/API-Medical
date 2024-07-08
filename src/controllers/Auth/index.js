const User = require("../../models/User");

const handleErrors = (err) => {
  const ORIGIN = "@Controllers/User/handleErrors()";

  console.log(ORIGIN, err.message, err.code);
  let errors = { email: "", password: "" };

  if (err.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }

  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports.signup = async (req, res) => {
  const ORIGIN = "@Controllers/User/signup()";

  console.log(ORIGIN);

  const { email, password, role, name } = req.body;

  try {
    const user = await User.create({
      email,
      password,
      role,
      name,
    });
    res.status(201).json({ user });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

module.exports.login = async (req, res) => {
  const ORIGIN = "@Controllers/User/login()";

  console.log(ORIGIN);

  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    res.status(200).json({ user });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};
