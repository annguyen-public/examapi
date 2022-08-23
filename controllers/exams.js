const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Exam = require("../models/Exam");
const Bootcamp = require("../models/Bootcamp");
const Problem = require("../models/Problem");

// @desc      Get exams
// @route     GET /api/exams
// @route     GET /api/bootcamps/:bootcampId/exams
// @access    Public
exports.getExams = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const exams = await Exam.find({ bootcamp: req.params.bootcampId });

    return res.status(200).json({
      success: true,
      count: exams.length,
      data: exams,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc      Get single Exam
// @route     GET /api/exams/:id
// @access    Public
exports.getExam = asyncHandler(async (req, res, next) => {
  const exam = await Exam.findById(req.params.id).populate({
    path: "problems",
    //path: "answers",
    //select: "instruction",
  });

  if (!exam) {
    return next(
      new ErrorResponse(`No Exam with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: exam,
  });
});

// @desc      Add Exam
// @route     POST /api/bootcamps/:bootcampId/exams
// @access    Private
exports.addExam = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `No bootcamp with the id of ${req.params.bootcampId}`,
        404
      )
    );
  }

  // Make sure user is bootcamp owner
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to add a Exam to bootcamp ${bootcamp._id}`,
        401
      )
    );
  }

  const Exam = await Exam.create(req.body);

  res.status(200).json({
    success: true,
    data: Exam,
  });
});

// @desc      Update Exam
// @route     PUT /api/exams/:id
// @access    Private
exports.updateExam = asyncHandler(async (req, res, next) => {
  let Exam = await Exam.findById(req.params.id);

  if (!Exam) {
    return next(
      new ErrorResponse(`No Exam with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is Exam owner
  if (Exam.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update Exam ${Exam._id}`,
        401
      )
    );
  }

  Exam = await Exam.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  Exam.save();

  res.status(200).json({
    success: true,
    data: Exam,
  });
});

// @desc      Delete Exam
// @route     DELETE /api/exams/:id
// @access    Private
exports.deleteExam = asyncHandler(async (req, res, next) => {
  const Exam = await Exam.findById(req.params.id);

  if (!Exam) {
    return next(
      new ErrorResponse(`No Exam with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is Exam owner
  if (Exam.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete Exam ${Exam._id}`,
        401
      )
    );
  }

  await Exam.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
