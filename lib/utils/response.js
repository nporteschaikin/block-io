var log = require('./../log');

exports.unauthorized = function (response) {
  return response.status(400).end();
}

exports.onCompletion = function (response) {
  return function (error, result) {
    if (error) {
      return response.status(500).json(error);
    }
    return response.json(result);
  }
}
