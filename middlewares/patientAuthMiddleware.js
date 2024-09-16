const jwt = require("jsonwebtoken");
const Patient = require("../models/patient");

const requirePatientAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        console.error("Authentication error:", err);
        return res.status(401).json({ error: "Patient is not authenticated!" });
      } else {
        try {
          const patient = await Patient.findById(decodedToken.id);
          if (!patient) {
            return res.status(401).json({ error: "Patient not found!" });
          }
          req.patient = patient;
          next();
        } catch (err) {
          console.error("Database error:", err);
          return res.status(500).json({ error: "Internal server error" });
        }
      }
    });
  } else {
    return res.status(401).json({ error: "Token not found!" });
  }
};

module.exports = { requirePatientAuth };
