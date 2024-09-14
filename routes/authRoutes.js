const { Router } = require("express");
const { admin_login, auth } = require("../controllers/authControllers");

const router = Router();

router.get("/auth", auth);
// Admin login route with log statement
router.post("/login/admin", (req, res) => {
  console.log("Admin login request received");  // Log message to check if the request is reaching this route
  admin_login(req, res);  // Continue with admin login handling
});

module.exports = router;
