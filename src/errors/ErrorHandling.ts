import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  if (error instanceof Error) {
    return response.status(400).json({ message: error.message });
  }
  console.log(error);
  return response.status(500).json({ message: "Internal server error" });
};

export default errorHandler;
