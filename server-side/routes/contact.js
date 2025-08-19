import express from "express";
import Message from "../models/Contact.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, msg: "All fields are required" });
    }

    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    res.status(201).json({ success: true, msg: "Message sent successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error", error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json({ success: true, data: "messages" });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error", error: err.message });
  }
});

export default router;
