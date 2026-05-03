
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// =======================
// SCHEMA
// =======================
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  course: String
});

const Student = mongoose.model("Student", studentSchema);

// =======================
// ROUTES
// =======================
app.get("/api/items", async (req, res) => {
  try {
    const data = await Student.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ ADD THIS (CREATE)
app.post("/api/items", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ ADD THIS (DELETE)
app.delete("/api/items/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ ADD THIS (UPDATE)
app.put("/api/items/:id", async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/items", async (req, res) => {
  try {
    const data = await Student.find();
    res.json(data);
  } catch (err) {
    console.error("GET ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// =======================
// CONNECT + START ONLY AFTER READY
// =======================
async function startServer() {
  try {
    await mongoose.connect(
      "mongodb+srv://rubab:rubab123@cluster0.vdq3fki.mongodb.net/studentDB"
    );

    console.log("✅ MongoDB FULLY CONNECTED");

    app.listen(5000, () => {
      console.log("🚀 Server running on port 5000");
    });

  } catch (err) {
    console.error("❌ DB CONNECTION FAILED:", err);
  }
}

startServer();