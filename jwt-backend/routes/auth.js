const router = require("express").Router();
const User = require("../model/User");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if user already exists
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email already exists");

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send({ user: savedUser._id });
  } catch (error) {
    res.status(400).send(error);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  // validate the data before we log in a user
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if email doesn't exist in the DB
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email does not exist");

  // check if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");

  // create and assign a token, res.header will make our token available in the header
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  //   res.header("authorization", token).send(token);
  return res.status(200).json({
    userName: user.name,
    email: user.email,
    token,
  });
  // check verifyToken.js for routes that require token in headers
});

module.exports = router;
