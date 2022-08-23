const express = require("express");
const {
  getExams,
  getExam,
  addExam,
  updateExam,
  deleteExam,
} = require("../controllers/Exams");

const Exam = require("../models/Exam");
const Problem = require("../models/Problem");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(advancedResults(Exam, "problems"), getExams)
  .post(protect, authorize("publisher", "admin"), addExam);

router
  .route("/:id")
  .get(advancedResults(Exam, "problems"), getExam)
  .put(protect, authorize("publisher", "admin"), updateExam)
  .delete(protect, authorize("publisher", "admin"), deleteExam);

module.exports = router;
