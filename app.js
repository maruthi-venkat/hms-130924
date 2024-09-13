const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");
const cookieParser = require("cookie-parser");
const registerRoute = require("./routes/registerRoute");
const doctorRoute = require("./routes/doctorRoute");
const adminRoutes = require("./routes/adminRoutes");
const logoutRoute = require("./routes/logoutRoute");
const cors = require("cors");
const app = express();

// CORS setup
const corsOptions = {
  origin: ['https://hms-130924.vercel.app', 'http://localhost:3000'],  // Replace with your frontend URL(s)
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

dotenv.config({ path: "./config.env" });

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

const dbURI = process.env.DATABASE;
const port = process.env.PORT || 5000;

// Log database URI for debugging (optional)
console.log("Database URI:", dbURI);

mongoose
  .connect(dbURI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Connected to DB and listening at port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);  // Terminate process if DB connection fails
  });

// Routes
app.get("/", (req, res) => res.send("server listening at 5000 port!"));
app.use(authRoutes);
app.use(registerRoute);
app.use(doctorRoute);
app.use(patientRoutes);
app.use(adminRoutes);
app.use(logoutRoute);



// if (process.env.NODE_ENV == "production") {
//   app.use(express.static("client/build"));
//   const path = require("path");
//   app.get("*", function (req, res) {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }
