const { Router } = require("express");

const medicationController = require("../../controllers/Medication/index");

const router = Router();

router.post("/create", (req, res) => {
  medicationController.create(req, res);
});

router.post("/update", (req, res) => {
  medicationController.update(req, res);
});

router.post("/delete", (req, res) => {
  medicationController.delete(req, res);
});

router.get(":id", (req, res) => {
  medicationController.getById(req, res);
});

router.get("/", (req, res) => {
  medicationController.getAll(req, res);
});

module.exports = router;
