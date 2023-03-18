const { verifyToken } = require("../config/jwt");

const authMiddleWare = async (req, res, next) => {
  try {
    const tokenFromClient = req.header("x-auth-token");
    const userInfo = await verifyToken(tokenFromClient);
    req.userData = userInfo;
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};

module.exports = authMiddleWare;
