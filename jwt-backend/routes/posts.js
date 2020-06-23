const router = require("express").Router();
const verify = require("../verifyToken");

// include the middleware to check if user is jwt verified
router.get("/", verify, (req, res) => {
  res.json({
    posts: { title: "My first post", description: "I can only be seen if user is Authenticated" },
  });
});

module.exports = router;
