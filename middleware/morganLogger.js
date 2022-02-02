import morgan from "morgan";
import log from "../config/logging.js";

const morganLogger = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  {
    stream: { write: (msg) => log.http(msg) },
    skip: () => {
      const env = process.env.NODE_ENV || "development";
      return env !== "development";
    },
  }
);

export default morganLogger;
