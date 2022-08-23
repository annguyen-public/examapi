const mongoose = require("mongoose");

const ExamSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Please add a Exam title"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    hours: {
      type: String,
      required: [true, "Please add number of hours"],
    },
    fee: {
      type: Number,
      required: [true, "Please add a registration fees"],
    },
    minimumSkill: {
      type: String,
      required: [true, "Please add a minimum skill"],
      enum: ["beginner", "intermediate", "advanced"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    bootcamp: {
      type: mongoose.Schema.ObjectId,
      ref: "Bootcamp",
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ExamSchema.virtual("problems", {
  ref: "Problem",
  localField: "_id",
  foreignField: "exam",
  justOne: false,
});

module.exports = mongoose.model("Exam", ExamSchema);
