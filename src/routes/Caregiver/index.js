const { Router } = require("express");

const caregiverController = require("../../controllers/Caregiver");

const router = Router();

router.post("/create", (req, res) => {
  caregiverController.create(req, res);
});

module.exports = router;
