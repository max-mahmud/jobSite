const { createJob, allJobs, handlePost, deleteJob } = require("../controller/jobController");

const router = require("express").Router();

router.post("/create-job", createJob);
router.delete("/delete/:id", deleteJob);
router.get("/all-jobs", allJobs);

module.exports = router;
