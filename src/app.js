import express from "express";
import config from "config";
import { initialize } from "express-openapi";

export default class App {
  config = config;
  #expressApp;

  // TODO: use bunyan
  log = {
    console: console.log.bind(console),
    info: console.info.bind(console),
    error: console.error.bind(console),
    debug: console.debug.bind(console),
  };

  async setUpHttpServer() {
    return new Promise((resolve, reject) => {
      const expressApp = (this.#expressApp = express());

      expressApp.use(express.json());

      expressApp.listen(config.port, () => {
        this.log.info(`Listening on port ${config.port}`);
        resolve();
      });

      expressApp.on("error", reject);
    });
  }

  async setUpApi() {
    const expressApp = this.#expressApp;

    initialize({
      apiDoc: require("./api-doc.js"),
      app: expressApp,
      // Cannot pass the api-routes path due to the webpack bundling
      paths: [
        { path: "/users", module: require('./api-routes/users') },
        { path: "/apiDocs", module: require('./api-routes/apiDocs') },
      ],
    });

    expressApp.all((error, req, res) => {
      this.log.error(error);

      res.sendStatus(error.status ?? 500);
    });
  }

  async run() {
    await this.setUpHttpServer();
    await this.setUpApi();
  }
}
