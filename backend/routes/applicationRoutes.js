const express = require("express");
const Application = require("../models/Application");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const router = express.Router();

router.post(
  "/apply/:jobId",
  authMiddleware,
  upload.single("resume"),
  async (req, res) => {
    try {
      const { coverLetter } = req.body;

      const alreadyApplied = await Application.findOne({
        job: req.params.jobId,
        applicant: req.user.id
      });

      if (alreadyApplied) {
        return res.status(400).json({
          message: "You have already applied for this job"
        });
      }

      const application = await Application.create({
        job: req.params.jobId,
        applicant: req.user.id,
        resume: req.file ? req.file.filename : "",
        coverLetter
      });

      res.status(201).json({
        message: "Job applied successfully",
        application
      });

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
);

router.get("/my-applications", authMiddleware, async (req, res) => {
  try {
    const applications = await Application.find({
      applicant: req.user.id
    }).populate("job");

    res.status(200).json({
      message: "Applications fetched successfully",
      applications
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.get("/job/:jobId", authMiddleware, async (req, res) => {
  try {
    const applications = await Application.find({
      job: req.params.jobId
    })
      .populate("applicant", "-password")
      .populate("job");

    res.status(200).json({
      message: "Applicants fetched successfully",
      applications
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    if (application.applicant.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can delete only your own application"
      });
    }

    await Application.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Application deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});
router.put("/status/:id", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    res.status(200).json({
      message: "Application status updated successfully",
      application
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});
module.exports = router;