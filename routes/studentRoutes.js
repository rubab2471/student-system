const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// CREATE
router.post("/students", async (req, res) => {
  try {
    const student = new Student(req.body);
    const saved = await student.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json(err);
  }
});

// READ
router.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// UPDATE
router.put("/students/:id", async (req, res) => {
  const updated = await Student.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE
router.delete("/students/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;