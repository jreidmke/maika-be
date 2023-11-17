const express = require("express");
const {
  validateAccessToken,
  checkRequiredPermissions,
} = require("../middleware/authMiddleware");
const { AdminMessagesPermissions } = require("../permission");

const maikaRouter = express.Router();

maikaRouter.get("/public", (req, res) => {
  res.status(200).json("Public Data. Everyone can see this.");
});

maikaRouter.get("/protected", validateAccessToken, (req, res) => {
  res.status(200).json("Protected Data. Only logged in users can see this.");
});

maikaRouter.get(
  "/admin",
  validateAccessToken,
  checkRequiredPermissions([AdminMessagesPermissions?.Read]),
  (req, res) => {
    res.status(200).json("Admin Data. Only admin can see this");
  }
);

module.exports = { maikaRouter };
