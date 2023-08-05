const jobModel = require("../model/jobModel");
const categoryModel = require("../model/categoryModel");

exports.createJob = async (req, res) => {
  const { title, description, salary, category, location } = req.body;

  try {
    if (!title || !description || !salary || !category || !location) {
      res.status(400).json({ message: " all fileds requires" });
    }

    const newJob = await jobModel.create({ title, description, salary, category, location });

    res.status(201).json({ message: "Job created successfully", newJob });
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

// exports.allJobs = async (req, res) => {
//   const { page, searchValue, parPage } = req.query;

//   try {
//     let skipPage = "";

//     if (page && parPage) {
//       skipPage = parseInt(parPage) * (parseInt(page) - 1);
//     }
//     const jobs = await jobModel
//       .find({
//         $or: [
//           { name: { $regex: searchValue, $options: "i" } },
//           { description: { $regex: searchValue, $options: "i" } },
//         ],
//       })
//       .sort({ createdAt: -1 })
//       .skip(skipPage)
//       .limit(parPage);

//     res.status(200).send({
//       totalJobs: jobs.length,
//       allJob: jobs,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

exports.allJobs = async (req, res, next) => {
  const sort = req.query.sort || "";

  //enable search
  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: "i",
        },
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

  const pageSize = 12;
  const page = Number(req.query.page) || 1;
  //const count = await Job.find({}).estimatedDocumentCount();
  const count = await jobModel.find({ ...keyword, category: categ }).countDocuments();

  try {
    const jobs = await jobModel
      .find({ ...keyword, category: categ, location: locationFilter })
      .populate("category")
      .sort({ createdAt: sort == "new" ? 1 : -1 })
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
  try {
    const job = await Job.findById(req.params.id);
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    next(error);
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
