const express = require("express");
const router = express.Router();
const reposController = require("../controllers/RepoController");

router.get("/repos", reposController.getRepository);
router.get("/repos/:id", reposController.getRepository);

module.exports = router;
