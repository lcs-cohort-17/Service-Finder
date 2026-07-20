// backend/middleware/errorHandler.js
import AppError from "../utils/AppError.js";

// Structured exception logging — one consistent shape for every routing
// failure, so logs are easy to search/filter regardless of failure type.
function logException(err, req) {
  console.error(
    JSON.stringify({
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
      method: req.method,
      code: err instanceof AppError ? err.code : "UNHANDLED",
      message: err.message,
    })
  );
}

// Centralized Express error-handling middleware. Any error thrown (or any
// rejected promise from an async route handler, which Express 5 forwards
// here automatically) lands in this one place, so every route in the app
// returns errors in the same { status, error: { code, message } } shape.
// Must be registered LAST in index.js, after all routes.
function errorHandler(err, req, res, next) {
  logException(err, req);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      error: { code: err.code, message: err.message },
    });
  }

  // Anything not thrown as an AppError is an unexpected bug — don't leak
  // internals, but still respond with the standard error shape.
  return res.status(500).json({
    status: "error",
    error: { code: "INTERNAL_ERROR", message: "Something went wrong. Please try again." },
  });
}

export default errorHandler;
