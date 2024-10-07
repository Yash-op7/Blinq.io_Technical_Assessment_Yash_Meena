import User from "../models/userModel.js";

const userExists = async (req, res, next) => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(409).json({
      message:
        "User with the given email already exists, please use that account to signin.",
    });
  }
  next();
};

const userDoesNotExist = async (req, res, next) => {
  const existingUser = await User.findOne({ email: req.body.email });
  console.log('found user is', existingUser)
  if (!existingUser) {
    return res.status(404).json({
      message: "User doesn't exist, please signup then login.",
    });
  }
  req.user = existingUser;
  next();
};

export { userExists, userDoesNotExist };
