const { createJob, allJobs, deleteJob, singleJob, updatJob, tableJobs } = require("../controller/jobController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = require("express").Router();

router.post("/create-job", createJob);
router.get("/single-job/:id", singleJob);
router.put("/update-job/:id", updatJob);
router.delete("/delete-job/:id", deleteJob);
router.get("/all-jobs", allJobs);


router.get("/table-jobs", tableJobs);

module.exports = router;
