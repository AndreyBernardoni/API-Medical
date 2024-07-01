const { Router } = require("express");

const userController = require("../../controllers/User");

const router = Router();

router.post("/signup", (req, res) => {
  userController.signup(req, res);
});

router.post("/login", (req, res) => {
  userController.login(req, res);
});

router.post("/logout", (req, res) => {
  userController.logout(req, res);
});

module.exports = router;
