module.exports = (error, req, res, next) => {
  if (error.name === "DuplicateKeyError") {
    return res.status(error.statusCode).json({
      success: error.success,
      message: error.message,
    });
  } else {
    return res.status(error.statusCode).json({
      success: error.success,
      message: error.message,
    });
  }
};
