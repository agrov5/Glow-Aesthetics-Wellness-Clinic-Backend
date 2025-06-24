import { Request, Response, NextFunction } from "express";

const VALID_USERNAME = process.env.USERNAME;
const VALID_PASSWORD = process.env.PASSWORD;

// Middleware for Basic Auth
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): any | void => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return res
      .status(401)
      .json({ message: "Missing or invalid Authorization header" });
  }

  // Decode base64 credentials
  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "ascii"
  );
  const [username, password] = credentials.split(":");

  // Validate credentials
  if (username === VALID_USERNAME && password === VALID_PASSWORD) {
    next(); // Authorized
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
