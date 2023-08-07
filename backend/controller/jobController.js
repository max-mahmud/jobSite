const jobModel = require("../model/jobModel");
const categoryModel = require("../model/categoryModel");
const formidable = require("formidable");

exports.createJob = async (req, res) => {
  const { title, description, salary, category, location } = req.body;

  try {
    const newJob = await jobModel.create({ title, description, salary, category, location });
    return res.status(201).json({ message: "Job created successfully", newJob });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "job creation Failed" });
  }
};

exports.allJobs = async (req, res, next) => {
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
    const job = await jobModel.findById(jobId).populate("category");
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.log(error);
  }
};

//single job
exports.updatJob = async (req, res, next) => {
  const { title, description, salary, category, location } = req.body;
  const jobId = req.params.id;
  try {
    const job = await jobModel.findByIdAndUpdate(
      jobId,
      { description, title, salary, category, location },
      { new: true }
    );
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteJob = async (req, res) => {
  try {
    await jobModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.log(error);
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
  console.log(page);
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

// export const realtedProductController = async (req, res) => {
//   try {
//     const { pid, cid } = req.params;
//     const products = await productModel
//       .find({
//         category: cid,
//         _id: { $ne: pid },
//       })
//       .select("-photo")
//       .limit(3)
//       .populate("category");

//     res.status(200).send({
//       success: true,
//       products,
//     });

// };

// app.post("/image-send", (req, res) => {
//   const form = new formidable.IncomingForm();

//   form.parse(req, (err, fields, files) => {
//     let { image } = files;
//     image[0].originalFilename = Date.now() + image[0].originalFilename;

//     const newPath = __dirname + `/image/${image[0].originalFilename}`;

//     fs.copyFile(files.image[0].filepath, newPath, (error) => {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log("upload success");
//       }
//     });
//   });
// });
