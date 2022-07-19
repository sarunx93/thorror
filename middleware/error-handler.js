import { StatusCodes } from "http-status-codes";
const errorHandlerMiddleware = (err, req, res, next) => {
  const defaultError = {
    msg: err.message || "Something went wrong, please try again",
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };
  if (err.name === "ValidationError") {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
  }
  if (err.code === 11000) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.msg = `${Object.keys(err.keyValue)} field must be unique`;
  }
  res.status(defaultError.statusCode).json({ msg: defaultError.msg });
  // console.log(err);
  // res.status(500).json({ err });
};
export default errorHandlerMiddleware;
