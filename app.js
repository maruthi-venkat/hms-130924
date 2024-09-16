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
const app = express();
dotenv.config({ path: "./config.env" });

// Manually add CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://hms-130924.vercel.app');  // Allow requests from your frontend URL
  res.header('Access-Control-Allow-Credentials', 'true');  // Allow cookies and credentials
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');  // Allowed HTTP methods
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');  // Allowed headers
  if (req.method === 'OPTIONS') {
    // Handle preflight requests
    res.sendStatus(200);
  } else {
    next();
  }
});

// Middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

const dbURI = process.env.DATABASE;
const port = process.env.PORT || 5000;

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

// Serve static files in production
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
//   const path = require("path");
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }
