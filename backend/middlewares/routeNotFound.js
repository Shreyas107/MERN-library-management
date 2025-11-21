const { errorResponse } = require("../utils/apiResponse");

exports.routeNotFound = (req, res, next) => {
  return res
    .status(404)
    .send(
      errorResponse(
        `The requested URL ${req.method} ${req.originalUrl} was not found.`
      )
    );
};
