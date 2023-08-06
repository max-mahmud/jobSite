const { createJob, allJobs, handlePost, deleteJob, testjob } = require("../controller/jobController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = require("express").Router();

router.post("/create-job", authMiddleware, createJob);
router.delete("/delete/:id", deleteJob);
router.get("/all-jobs", allJobs);
router.get("/test-jobs", testjob);

module.exports = router;
