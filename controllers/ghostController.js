import Ghost from "../models/Ghost.js";
import path from "path";
import { StatusCodes } from "http-status-codes";
import CustomAPIError from "../erros/custom-api.js";
import BadRequestError from "../erros/bad-request.js";
import NotFoundError from "../erros/not-found.js";

const createGhost = async (req, res) => {
  const { name, description, image } = req.body;
  if (!name || !description || !image) {
    throw new BadRequestError("Please provide all values");
  }
  const ghost = await Ghost.create({
    name,
    description,
    image,
  });
  res.status(StatusCodes.CREATED).json({ ghost });
};

const getAllGhosts = async (req, res) => {
  const { name, sort } = req.query;
  const queryObject = {};
  if (name) {
    queryObject.name = { $regex: search, $options: "i" };
  }
  let results = Ghost.find(queryObject);
  if (sort === "a-z") {
    results = results.sort("name");
  }
  if (sort === "z-a") {
    results = results.sort("-name");
  }
  const page = req.query.page || 1;
  const limit = req.query.limit || 1;
  const skip = (page - 1) * limit;
  results.skip(skip).limit(limit);
  const ghosts = await results;
  const totalGhosts = await Ghost.countDocuments(queryObject);
  const numOfPges = Math.ceil(totalGhosts / limit);
  res.status(StatusCodes.OK).json({ totalGhosts, numOfPges, ghosts });
};

const getSingleGhost = async (req, res) => {
  const { id: ghostId } = req.params;
  const ghost = await Ghost.findOne({ _id: ghostId });
  if (!ghost) {
    throw new NotFoundError(`No ghost with the id ${ghostId} found.`);
  }
  res.status(StatusCodes.OK).json({ ghost });
};

const updateGhost = async (req, res) => {
  const { id: ghostId } = req.params;
  const ghost = Ghost.findByIdAndUpdate({ _id: ghostId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!ghost) {
    throw new NotFoundError(`No ghost with the id ${ghostId} found.`);
  }
  res.status(StatusCodes.OK).json({ ghost });
};

const deleteGhost = async (req, res) => {
  const { id: ghostId } = req.params;
  const ghost = await Ghost.findOne({ _id: ghostId });
  if (!ghost) {
    throw new NotFoundError(`No ghost with the id ${ghostId} found.`);
  }
  await ghost.remove();
  res.status(StatusCodes.OK).json({ msg: "ghost removed" });
};

const uploadImage = async (req, res) => {
  if (!req.files) {
    throw new BadRequestError("No file uploaded");
  }
  const ghostImage = req.files.image;
  if (!ghostImage.mimetype.startsWith("image")) {
    throw new BadRequestError("Please upload an image");
  }
  const maxSize = 1024 * 1024;
  if (ghostImage.size > maxSize) {
    throw new BadRequestError("The image is too big!!");
  }
  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );
  await ghostImage.mv(imagePath);
  res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` });
};

export {
  createGhost,
  getSingleGhost,
  getAllGhosts,
  updateGhost,
  deleteGhost,
  uploadImage,
};
