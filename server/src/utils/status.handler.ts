const statusHandler = {
  ok: { code: 200, message: "OK" },
  created: { code: 201, message: "Created" },
  noContent: { code: 204, message: "No Content" },
  notFound: { code: 404, message: "Not Found" },
  conflict: { code: 409, message: "Conflict" },
  badRequest: { code: 400, message: "Bad Request" },
  unauthorized: { code: 401, message: "Unauthorized" },
  internalServerError: { code: 500, message: "Internal Server Error" },
};

export default statusHandler;
