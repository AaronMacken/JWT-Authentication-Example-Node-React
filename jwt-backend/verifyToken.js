const jwt = require("jsonwebtoken");

// middleware function for routes that need to be protected
function auth(req, res, next) {
  // check if we have an auth token in the header of our request, "authorization" coming from the name we gave
  // in the login funciton that uses jwt
  const token = req.header("authorization");
  if (!token) return res.status(401).send("Access Denied");

  try {
    // verify the token in the header
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    // once verified (a valid json webtoken is in the header of the request as "authorization": < valid jwt >)
    // the next part of the request can be ran
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
}

module.exports = auth;
