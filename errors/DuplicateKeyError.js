class DuplicateKeyError extends Error {
    constructor(statusCode, success, message) {
      super(message);
      this.name = "DuplicateKeyError";
      this.statusCode = statusCode;
      this.success = success;
    }
  }
  
  module.exports = DuplicateKeyError