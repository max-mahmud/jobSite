const jobModel = require("../model/jobModel");
const categoryModel = require("../model/categoryModel");
const applyModel = require("../model/applyModel");
const cloudinary = require("cloudinary").v2;
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

cloudinary.config({
  cloud_name: process.env.CLOUDNARY_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_KEY_SECRET,
});

exports.createJob = async (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ success: false, error: "Invalid data" });
    }

    const { title, description, salary, category, location, company, requirements, benefits } = fields;
    // Configure Cloudinary

    try {
      // Upload logo to Cloudinary
      const result = await cloudinary.uploader.upload(files.logo[0].filepath, {
        folder: "jobs",
      });

      const newJob = await jobModel.create({
        title: title[0],
        description: description[0],
        salary: salary[0],
        category: category[0],
        location: location[0],
        company: company[0],
        requirements: requirements[0],
        benefits: benefits[0],
        logo: result.secure_url,
      });

      res.status(201).json({ success: true, message: "Job created successfully", newJob });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Job creation failed" });
    }
  });
};

//get all jobs
exports.allJobs = async (req, res) => {
  const sort = req.query.sort || "";

  //enable search
  const keyword = req.query.keyword
    ? {
        $or: [
          {
            title: {
              $regex: req.query.keyword,
              $options: "i",
            },
          },
          {
            description: { $regex: req.query.keyword, $options: "i" },
          },
        ],
      }
    : {};

  // filter jobs by category ids
  let ids = [];
  const jobTypeCategory = await categoryModel.find({}, { _id: 1 });
  jobTypeCategory.forEach((c) => {
    ids.push(c._id);
  });

  let cat = req.query.cat || "";
  let categ = cat !== "" ? cat : ids;

  //jobs by location
  let locations = [];
  const jobByLocation = await jobModel.find({}, { location: 1 });
  jobByLocation.forEach((val) => {
    locations.push(val.location);
  });
  let setUniqueLocation = [...new Set(locations)];
  let location = req.query.location;
  let locationFilter = location !== "" ? location : setUniqueLocation;

  const pageSize = 6;
  const page = Number(req.query.page) || 1;
  const count = await jobModel
    .find({ ...keyword, category: categ, location: locationFilter })
    .countDocuments();

  try {
    const jobs = await jobModel
      .find({ ...keyword, category: categ, location: locationFilter })
      .populate("category")
      .sort({ createdAt: sort == "old" ? 1 : -1 })
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    res.status(200).json({
      success: true,
      page,
      pages: Math.ceil(count / pageSize),
      count,
      setUniqueLocation,
      jobs,
    });
  } catch (error) {
    console.log(error);
  }
};

//single job
exports.singleJob = async (req, res, next) => {
  const jobId = req.params.id;
  try {
    const job = await jobModel.findById(jobId).populate("category").populate("applyForm");
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.log(error);
  }
};

//update job
exports.updatJob = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, salary, location, company, requirements, benefits, category } = req.body;
  try {
    const updatedJob = await jobModel.findByIdAndUpdate(
      id,
      { title, description, salary, location, company, requirements, benefits, category },
      { new: true }
    );

    res.status(200).json({ success: true, message: "Job updated successfully", updatedJob });
  } catch (error) {
    console.log(error);
  }
};

exports.updateLogo = async (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ success: false, error: "Invalid data" });
    }

    const jobid = fields.jobid[0];
    // console.log(files.newImage[0]);

    try {
      const result = await cloudinary.uploader.upload(files.newImage[0].filepath, {
        folder: "jobs",
      });
      const updataLogo = await jobModel.findByIdAndUpdate(jobid, { logo: result.secure_url }, { new: true });
      res.status(200).json({ success: true, message: "Logo updated successfully", updataLogo });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Logo update failed" });
    }
  });
};

exports.deleteJob = async (req, res) => {
  try {
    await jobModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Job Deleted Failed" });
  }
};

//Table jobs
exports.tableJobs = async (req, res, next) => {
  //enable search
  const keyword = req.query.keyword
    ? {
        $or: [
          {
            title: { $regex: req.query.keyword, $options: "i" },
          },
          {
            description: { $regex: req.query.keyword, $options: "i" },
          },
          {
            location: { $regex: req.query.keyword, $options: "i" },
          },
          {
            salary: { $regex: req.query.keyword, $options: "i" },
          },
        ],
      }
    : {};

  const pageSize = 8;
  const page = Number(req.query.page);
  const count = await jobModel.find({ ...keyword }).countDocuments();

  try {
    const jobs = await jobModel
      .find({ ...keyword })
      .populate("category")
      .sort({ createdAt: -1 })
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    res.status(200).json({
      success: true,
      page,
      pages: Math.ceil(count / pageSize),
      count,
      jobs,
    });
  } catch (error) {
    console.log(error);
  }
};

//======== create new application form==========///
exports.applyForm = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    let { resume } = files;
    newFileName = Date.now() + files?.resume[0]?.originalFilename;

    const newPath = path.join(__dirname, "..", "uploads", newFileName);
    fs.copyFile(files.resume[0].filepath, newPath, (error) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error copying file." });
      } else {
        return res.json({ message: "File uploaded successfully." });
      }
    });

    try {
      const newForm = await applyModel.create({
        name: fields.name[0],
        email: fields.email[0],
        resume: newFileName,
        user: fields.user[0],
      });
      const jobid = fields.jobId[0];
      if (newForm) {
        await jobModel.findByIdAndUpdate(jobid, { applyForm: newForm._id }, { new: true });
      }
      return res.status(201).json({ message: "Applied SuccessFully", form: newForm });
    } catch (error) {}
  });
};

//get alll applications form
exports.getAllApplyform = async (req, res) => {
  try {
    const allform = await applyModel.find({}).populate("user");
    return res.status(200).json({ applyCount: allform.length, allApplyJob: allform });
  } catch (error) {
    console.log(error);
  }
};

//delete application form
exports.deleteApplyForm = async (req, res) => {
  const { applyId } = req.params;

  try {
    const form = await applyModel.findById(applyId);

    if (!form) {
      return res.status(404).json({ error: "Form not found." });
    }

    // Delete the associated file
    const filePath = path.join(__dirname, "..", "uploads", form.resume);
    await fs.unlink(filePath, (error) => {
      if (error) {
        console.error("Error deleting file: at deleteApplyForm line 288 ");
      } else {
        console.log("File deleted:");
      }
    });
    // Delete the database entry
    await applyModel.findByIdAndDelete(applyId);

    return res.status(200).json({ message: "Delete Success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error deleting form." });
  }
};

//all job count
exports.allJobCount = async (req, res) => {
  try {
    const allCount = await jobModel.find({}).countDocuments();
    return res.status(200).json({ allCount: allCount });
  } catch (error) {
    console.log(error);
  }
};
