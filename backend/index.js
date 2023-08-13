require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");

// express app
const app = express();

// middlewares
app.use(express.json());
app.use(cors());

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static("uploads"));

// static files access
// app.use(express.static(path.join(__dirname, "./frontend/build")));

// endpoints
app.use("/api", require("./routes/jobRoutes"));
app.use("/api", require("./routes/categoryRoutes"));
app.use("/api", require("./routes/userRoutes"));
app.use("/api", require("./routes/messageRoutes"));

// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
// });

app.get("/abc", function (req, res) {
  res.send("Welcome to the frontend project");
});

// port
const PORT = process.env.PORT || 4000;

// connect to db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // listening for requests
    app.listen(PORT, (req, res) => {
      console.log(`connected to db && server running on port:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
