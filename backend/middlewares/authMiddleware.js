const { errorResponse } = require("../utils/apiResponse");
const { verifyToken } = require("../utils/token");

const checkAuthentication = (request, response, next) => {
  const skipUrls = ["/user/register", "/user/login"];

  if (skipUrls.includes(request.url)) {
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

const checkAuthorization = (request, response, next) => {
  if (request.user.role === "admin" || request.user.role === "librarian") {
    return next();
  }

  return response.status(401).send(errorResponse("UnAuthorized Access!"));
};

module.exports = {
  checkAuthentication,
  checkAuthorization,
};
