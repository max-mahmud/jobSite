require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// express app
const app = express();

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static("uploads"));

// endpoints
app.use("/api", require("./routes/jobRoutes"));
app.use("/api", require("./routes/categoryRoutes"));
app.use("/api", require("./routes/userRoutes"));
app.use("/api", require("./routes/messageRoutes"));

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
