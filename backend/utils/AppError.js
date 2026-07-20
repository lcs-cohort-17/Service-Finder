// backend/utils/AppError.js
//
// A thrown AppError carries everything the centralized error handler
// needs to build a consistent response — no controller has to format
// its own error JSON anymore. Controllers just `throw new AppError(...)`
// and the errorHandler middleware (registered last in index.js) takes
// it from there.
//
// `isOperational` distinguishes errors we anticipated and handled on
// purpose (bad input, an upstream service being down, a timeout) from
// genuine bugs. The error handler treats the two differently: an
// AppError's message is safe to send straight to the client, while an
// unexpected error's real message is logged but hidden from the
// response.
class AppError extends Error {
  constructor(message, statusCode, code) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;