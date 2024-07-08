const Elderly = require("../../models/Elderly");

const handleErrors = (err) => {
  const ORIGIN = "@Controllers/Elderly/handleErrors()";

  console.log(ORIGIN, err.message, err.code);
  let errors = { user_id: "" };

  if (err.message.includes("Elderly validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const generatePairCode = () => {
  return Math.random().toString(36).substr(2, 6).toUpperCase();
};

const checkPairCode = async (pairCode) => {
  const ORIGIN = "@Controllers/Elderly/checkPairCode()";

  let elderlyWithPairCode = await Elderly.findOne({ pairCode });

  if (elderlyWithPairCode) {
    return true;
  }

  return false;
};

module.exports.create = async (req, res) => {
  const ORIGIN = "@Controllers/Elderly/create()";

  const { _id } = req.body;

  let pairCode = generatePairCode();
  let pairCodeExists = await checkPairCode(pairCode);

  while (pairCodeExists) {
    pairCode = generatePairCode();
    pairCodeExists = await checkPairCode(pairCode);
  }

  try {
    const elderly = await Elderly.create({
      user_id: _id,
      pair_code: pairCode,
    });

    res.status(201).json({ elderly });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};
