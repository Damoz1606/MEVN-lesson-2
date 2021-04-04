const router = require("express").Router();
const send = require("send");
const Note = require("../model/note");

router.get("/", async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

router.get("/:id", async (req, res) => {
  try {
    const notes = await Note.findById(req.params.id);
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({
      message: "Error",
      error: err,
    });
  }
});

router.post("/", async (req, res) => {
  const note = new Note(req.body);
  await note
    .save()
    .then((db) => {
      res.status(200).json({
        status: "Note save",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error",
        error: err,
      });
    });
});

router.delete("/:id", async (req, res) => {
  await Note.findByIdAndRemove(req.params.id)
    .then((db) => {
      res.status(200).json({
        status: "Note deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error",
        error: err,
      });
    });
});

router.put("/:id", async (req, res) => {
  await Note.findByIdAndUpdate(req.params.id, req.body)
    .then((db) => {
      res.status(200).json({
        status: "Note updated",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error",
        error: err,
      });
    });
});

module.exports = router;
