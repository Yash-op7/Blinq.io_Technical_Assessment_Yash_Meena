import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { hash, compare } from "bcrypt";

const signup = async (req, res) => {
  /*
    1. validate user with the schema
    2. check if user exists
    3. create hash
    4. User.create
    5. return 201
    */
  const user = req.body;
  let passwordHash;
  try {
    passwordHash = await hash(user.password, 10);
  } catch (error) {
    return res.status(500).json({
      message:
        "Something went wrong while encrypting the password. Please try again.",
      error,
    });
  }
  try {
    await User.create({
      email: user.email,
      name: user.name,
      password: passwordHash,
    });
    res.status(201).json({
      message: "Successfully created a new user.",
    });
  } catch (error) {
    res.status(500).json({
      message:
        "Something went wrong while creating the user in the database. Please try again.",
      error,
    });
  }
};
const login = async (req, res) => {
  /*
    user is validated
    user exists

    compare hash
    generate jwt
    set cookie
    return 200
    */
  try {
    const isValid = await compare(req.body.password, req.user.password);
    if (!isValid) {
      return res.status(401).json({
        message: "Invalid credentials.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error while comparing hashes, please try again.",
      error,
    });
  }
  let token;
  const userObj = {
    ...req.user,
  };
  try {
    token = jwt.sign(userObj, process.env.TOKEN_SECRET, { expiresIn: "8h" });
    return res
      .cookie("Authorization", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        message: "Successfully signed in",
        user: req.user
      });
  } catch (error) {
    return res.status(500).json({
      message:
        "Something went wrong while generating jwt token or setting header cookie.",
      error,
    });
  }
};
const logout = async (req, res) => {
    return res.clearCookie('Authorization').status(200).json({
        message: 'Successfully logged out.'
    })
};

export default { signup, login, logout };
