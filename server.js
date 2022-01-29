import "dotenv/config";
import app from "./app.js";
import { createServer } from "http";
import log from "./config/logging.js";

const server = createServer(app);

const port = process.env.PORT || 3001;

server.listen(port, () => {
  log.info(`The server is up and listening on port ${port}`);
});
