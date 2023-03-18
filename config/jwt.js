const jwt = require("jsonwebtoken");

//create token
const generateToken = (payload, expData = "30d") => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWTKEY,
      { expiresIn: expData },
      (error, token) => {
        if (error) reject(error);
        else resolve(token);
      }
    );
  });
};

// get token and check the data and tokef
const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWTKEY, (err, decoded) => {
      if (err) reject(err);
      //else resolve(payload);
      else resolve(decoded);
    });
  });
};

module.exports = {
  generateToken,
  verifyToken,
};
