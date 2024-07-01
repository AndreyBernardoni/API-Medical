const { Router } = require("express");

const authController = require("../../controllers/Auth");

const router = Router();

router.post("/signup", (req, res) => {
  authController.signup(req, res);
});

router.post("/login", (req, res) => {
  authController.login(req, res);
});

module.exports = router;
