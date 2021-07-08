// Showing that you don't need to have apiDoc defined on methodHandlers.
export default {
  get,
  del,
  post,
};

function del(req, res, next) {
  // Showing how to validate responses
  var validationError = res.validateResponse(204, null);

  if (validationError) {
    return next(validationError);
  }

  res.status(204).send("").end();
}
del.apiDoc = {
  description: "Delete users.",
  operationId: "deleteUsers",
  tags: ["users"],
  parameters: [],
  responses: {
    204: {
      description: "Users were successfully deleted.",
      // 204 should not return a body so not defining a schema.  This adds an implicit
      // schema of {"type": "null"}.
    },
  },
};


function get(req, res) {
  res.status(200).json([{ name: "fred" }]);
}
get.apiDoc = {
  description: "Get users.",
  operationId: "getUsers",
  tags: ["users", "list"],
  parameters: [],
  responses: {
    200: {
      description: "Users list",
      schema: {
        type: "array",
      },
    },
  },
};

function post(req, res) {
  res.status(500).json({});
}
// showing that if parameters are empty, express-openapi adds no input middleware.
// response middleware is always added.
post.apiDoc = {
  description: "Create a new user.",
  operationId: "createUser",
  tags: ["users", "creating"],
  parameters: [],
  responses: {
    default: {
      description: "Unexpected error",
      schema: {
        $ref: "#/definitions/Error",
      },
    },
  },
};
