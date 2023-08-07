const { createJob, allJobs, deleteJob, singleJob } = require("../controller/jobController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = require("express").Router();

router.post("/create-job", createJob);
router.put("/single-job/:id", singleJob);
router.delete("/delete/:id", deleteJob);
router.get("/all-jobs", allJobs);

module.exports = router;
