export default {
  get,
};

function get(req, res) {
  if (req.query.type === "apiDoc") {
    return res.json(req.apiDoc);
  }
  return res.json(req.operationDoc);
}
get.apiDoc = {
  operationId: "getApiDoc",
  description: "Returns the requested apiDoc",
  parameters: [
    {
      description: "The type of apiDoc to return.",
      in: "query",
      name: "type",
      type: "string",
      enum: ["apiDoc", "operationDoc"],
    },
  ],
  responses: {
    200: {
      description: "The requested apiDoc.",
      schema: {
        type: "object",
      },
    },
    default: {
      description: "The requested apiDoc.",
    },
  },
};
