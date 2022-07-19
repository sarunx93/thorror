import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import BadRequestError from "../erros/bad-request.js";
import UnauthorizedError from "../erros/unauthenticated.js";
const register = async (req, res) => {
  const { name, lastName, email, password } = req.body;
  if (!name || !lastName || !email || !password) {
    throw new BadRequestError("Please provide values");
  }
  const userAlreadyExist = await User.findOne({ email });
  if (userAlreadyExist) {
    throw new BadRequestError("Email already exists");
  }
  const user = await User.create({ name, lastName, email, password });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    name: user.name,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
    token,
  });
};
const updateUser = async (req, res) => {
  const { email, name, lastName, password } = req.body;
  if (!email || !name || !lastName) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ _id: req.user.userId });
  //User.findOneAndUpdate will bypass the pre-save hook in the schema.
  user.email = email;
  user.name = name;
  user.lastName = lastName;

  // user.password = password;
  await user.save();
  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ user, token });
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all credentials");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnauthorizedError("User not found");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthorizedError("Invalid Credentials");
  }
  const token = user.createJWT();

  user.password = undefined;

  res.status(StatusCodes.OK).json({ user, token });
};
export { register, updateUser, loginUser };
