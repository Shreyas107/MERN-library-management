const { errorResponse } = require("../utils/apiResponse");
const { verifyToken } = require("../utils/token");

const checkAuthentication = (request, response, next) => {
  const skipUrls = ["/user/register", "/user/login", "/book/all"];

  if (skipUrls.includes(request.path)) {
    return next();
  }

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).send(errorResponse("Token is required!"));
  }
  try {
    const token = authHeader.split(" ")[1];

    const payload = verifyToken(token);

    request.user = {
      userId: payload.userId,
      role: payload.role,
    };

    next();
  } catch (error) {
    console.log("error", error);
    return response.status(401).send(errorResponse("Invalid Token!"));
  }
};

const authorizeRoles = (...allowedRoles) => {
  return (request, response, next) => {
    if (!request.user || !allowedRoles.includes(request.user.role)) {
      return response.status(401).send(errorResponse("Unauthorized Access!"));
    }
    next();
  };
};

module.exports = {
  checkAuthentication,
  authorizeRoles,
};
