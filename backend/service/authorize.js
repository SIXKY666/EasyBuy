const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const authorize = () => {
  return [
    async (req, res, next) => {
      if (req.headers["authorization"] && req.headers["authorization"].startsWith("Bearer")) {
        try {
          const token = req.headers["authorization"].replace("Bearer ", "")
          let decoded = jwt.verify(token, process.env.SECRET_KEY);
          let userInfo  = await User.getUserByEmail(decoded.email)
          req.user = userInfo
        } catch (err) {
          console.log(err);
          if (!err.statusCode) {
            err.statusCode = 403;
            res.status(401).json({ status: 401, error: "Incorrect token or it is expired." })
          }
          next(err);
        }
        next();
      } else {
        console.log('authorize => Missing Token key');
        res.status(401).json({ message: "Missing Token key" })
      }
    }
  ]
}


module.exports = authorize;