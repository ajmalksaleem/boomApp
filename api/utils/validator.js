import { errorHandler } from "./error.js";

export const validateUsername = (username, next) => {
    if (username.length < 5 || username.length > 20) {
      throw next(errorHandler(400, "Username must be between 5 and 20 characters"));
    }
    if (username.includes(" ")) {
      throw next(errorHandler(400, "Username cannot contain spaces"));
    }
    if (username !== username.toLowerCase()) {
      throw next(errorHandler(400, "Username must be in lowercase"));
    }
    if (!username.match(/^[a-zA-Z0-9]+$/)) {
      throw next(errorHandler(400, "Username must contain only letters and numbers"));
    }
  };