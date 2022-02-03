import winston, { createLogger, format, transports } from "winston";
const { timestamp, errors, printf } = format;

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

const logFormat = format.combine(
  timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
  errors({ stack: true })
);

const log = createLogger({
  level: "http",
  format: logFormat,
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
  log.add(new transports.Console());
}

export default log;
