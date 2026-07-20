// backend/middleware/errorHandler.js
//
// Centralized error-handling middleware. Every controller in the app
// throws (or passes to next()) instead of formatting its own error
// response — this is the one place that turns an error into JSON.
//
// The four-argument signature (err, req, res, next) is what tells
// Express this is an error handler rather than regular middleware, so
// it MUST be registered last in index.js, after every route.
import AppError from "../utils/AppError.js";

export default function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    // Expected, already-classified error (bad input, upstream service
    // down, timeout, etc.) — safe to send its message straight to the
    // client, using the status/code it was thrown with.
    return res.status(err.statusCode).json({
      status: "error",
      error: { code: err.code, message: err.message },
    });
  }

  // Anything else is a bug we didn't anticipate. Log the real detail
  // server-side for debugging, but never leak internals to the client.
  console.error(
    JSON.stringify({
      timestamp: new Date().toISOString(),
      context: "errorHandler",
      message: err.message,
      stack: err.stack,
    })
  );

  return res.status(500).json({
    status: "error",
    error: {
      code: "INTERNAL_ERROR",
      message: "Something went wrong. Please try again later.",
    },
  });
}