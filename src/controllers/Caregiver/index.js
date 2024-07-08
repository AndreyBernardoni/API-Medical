const Caregiver = require("../../models/Caregiver");

const handleErrors = (err) => {
  const ORIGIN = "@Controllers/Caregiver/handleErrors()";

  console.log(ORIGIN, err.message, err.code);
  let errors = { user_id: "" };

  if (err.message.includes("Caregiver validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports.create = async (req, res) => {
  const ORIGIN = "@Controllers/Caregiver/create()";

  const { _id } = req.body;

  try {
    const caregiver = await Caregiver.create({
      user_id: _id,
    });

    res.status(201).json({ caregiver });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};
