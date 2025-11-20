const successResponse = (data, key = "message") => {
  return {
    status: "success",
    [key]: data,
  };
};

const errorResponse = (error) => {
  return {
    status: "error",
    error,
  };
};

module.exports = {
  successResponse,
  errorResponse,
};
