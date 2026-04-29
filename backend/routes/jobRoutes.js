const express = require("express");
const Job = require("../models/Job");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/post", authMiddleware, async (req, res) => {
  try {
    const { title, company, location, salary, description } = req.body;

    const job = await Job.create({
      title,
      company,
      location,
      salary,
      description,
      postedBy: req.user.id
    });

    res.status(201).json({
      message: "Job posted successfully",
      job
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "Jobs fetched successfully",
      jobs
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.get("/my-jobs", authMiddleware, async (req, res) => {
  try {
    const jobs = await Job.find({
      postedBy: req.user.id
    }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "My jobs fetched successfully",
      jobs
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can delete only your own job"
      });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Job deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can edit only your own job"
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Job updated successfully",
      job: updatedJob
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    res.status(200).json({
      message: "Job fetched successfully",
      job
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;