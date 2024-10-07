import jwt from "jsonwebtoken";

const isAuthorized = async (req, res, next) => {
  const token = req?.cookies["Authorization"];
  if (!token) {
    return res.status(401).json({
      message: "You need to be signed in to use this feature.",
    });
  }

  const payload = jwt.verify(token, process.env.TOKEN_SECRET);
  if (payload) {
    req.user = payload;
    next();
  } else {
    res.status(403).json({
      message:
        "Unauthorized. Either the token has expired or it has been tampered with.",
    });
  }
};

export default isAuthorized;
