// backend/utils/AppError.js

// A thrown error carrying everything the centralized error handler needs
// to build a consistent response: an HTTP status, a machine-readable code,
// and a human-readable message.
class AppError extends Error {
  constructor(statusCode, code, message) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.name = "AppError";
  }
}

export default AppError;
