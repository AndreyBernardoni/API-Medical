const Medication = require("../../models/Medication");
const Elderly = require("../../models/Elderly");

const handleErrors = (err) => {
  const ORIGIN = "@Controllers/Medication/handleErrors()";

  console.log(ORIGIN, err.message, err.code);
  let errors = {
    elderly_id: "",
    name: "",
    dosage: "",
    frequency: "",
    time: "",
  };

  if (err.message.includes("Medication validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports.create = async (req, res) => {
  const ORIGIN = "@Controllers/Medication/create()";

  const { elderly_id, name, dosage, frequency, time } = req.body;

  try {
    const medication = await Medication.create({
      elderly_id,
      name,
      dosage,
      frequency,
      time,
    });

    await Elderly.findOneAndUpdate(
      { user_id: elderly_id },
      { $push: { medications: medication._id } }
    );

    res.status(201).json({ medication });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

module.exports.update = async (req, res) => {
  const ORIGIN = "@Controllers/Medication/update()";

  const { id, name, dosage, frequency, time } = req.body;

  try {
    const medication = await Medication.findByIdAndUpdate(id, {
      name,
      dosage,
      frequency,
      time,
    });

    res.status(200).json({ medication });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

module.exports.getById = async (req, res) => {
  const ORIGIN = "@Controllers/Medication/getById()";

  const { id } = req.params;

  try {
    const medication = await Medication.findById(id);
    res.status(200).json({ medication });
  } catch (error) {
    console.log(ORIGIN, error.message, error.code);
    res.status(404).json({ message: "Medication not found" });
  }
};

module.exports.getAll = async (req, res) => {
  const ORIGIN = "@Controllers/Medication/getAll()";

  try {
    const medications = await Medication.find();
    res.status(200).json({ medications });
  } catch (error) {
    console.log(ORIGIN, error.message, error.code);
    res.status(404).json({ message: "Medications not found" });
  }
};

module.exports.delete = async (req, res) => {
  const ORIGIN = "@Controllers/Medication/delete()";

  const { id } = req.body;

  try {
    await Medication.findByIdAndDelete(id);
    await Elderly.updateMany(
      {},
      { $pull: { medications: id } },
      { multi: true }
    );
    res.status(200).json({ message: "Medication deleted" });
  } catch (error) {
    console.log(ORIGIN, error.message, error.code);
    res.status(404).json({ message: "Medication not found" });
  }
};
