const express = require("express");
const router = express.Router();

const snippet = require("../controllers/snippet.controller");

router.get("/", snippet.getSnippets);
router.post("/", snippet.createSnippet);
router.get("/:id", snippet.getSnippet);
router.put("/:id", snippet.editSnippet);
router.delete("/:id", snippet.deleteSnippet);

module.exports = router;
