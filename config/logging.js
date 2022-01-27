import { createLogger, format, transports } from "winston";
const { json, timestamp, errors, simple, colorize } = format;

const log = createLogger({
  level: "http",
  format: format.combine(json(), timestamp(), errors({ stack: true })),
  transports: [
    //
    // - Write to all logs with level `info` and below to `quick-start-combined.log`.
    // - Write all logs error (and below) to `quick-start-error.log`.
    //
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "combined.log" }),
  ],
});

//
// If we're not in production then **ALSO** log to the `console`
// with the colorized simple format.
//
if (process.env.NODE_ENV !== "production") {
  log.add(
    new transports.Console({
      format: format.combine(colorize(), simple(), errors({ stack: true })),
    })
  );
}

export default log;
