import errorHandler from "errorhandler";
import swaggerTools from "swagger-tools";

import app from "./app";

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
import swaggerDoc from "../swagger.json";

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

// Swagger Docs
// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
  // Swagger Docs
  // swaggerRouter configuration
  const options = {
    swaggerUi: "/swagger.json",
    controllers: "./dist/controllers"
  };
  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

  // Start Express server.
  const server = app.listen(app.get("port"), () => {
    let host = server.address().address;
    host = (host === "::" ? "localhost" : host);
    const port = server.address().port;

    console.log(`  App is running at http://${host}:${port} in ${app.get("env")} mode`);
    console.log("  Press CTRL-C to stop\n");
  });
});
