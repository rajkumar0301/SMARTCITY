// routes/feedback.js
// server/routes/feedback.js
const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// POST: Submit feedback
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const feedback = new Feedback({ name, email, message });
    await feedback.save();
    res.status(201).json({ success: true, message: "Feedback submitted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to submit feedback." });
  }
});

// GET: View all feedbacks (optional)
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ date: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch feedback." });
  }
});

module.exports = router;
