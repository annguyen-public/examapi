const mongoose = require("mongoose");

const ProblemSchema = new mongoose.Schema({
  instruction: {
    type: String,
    trim: true,
  },
  question: {
    type: String,
    required: [true, "Please add a question"],
  },
  answers: [
    {
      value: {
        type: String,
      },
      description: {
        type: String,
      },
    },
  ],
  point: {
    type: Number,
  },
  problem_type: {
    type: String,
    required: true,
  },
  exam: {
    type: mongoose.Schema.ObjectId,
    ref: "Exam",
    required: true,
  },
});

module.exports = mongoose.model("Problem", ProblemSchema);
