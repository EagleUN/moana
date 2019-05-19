import verror from "verror";
import { createLogger, format, transports } from "winston";
import config from "./Config";

const { combine, timestamp, label, printf } = format;
const level = config.get("log_level") || "debug";
const disableLog = config.get("DISABLE_LOG") || "false";

const myFormat = printf((info: any) => {
  return `${info.timestamp} [${info.label}][${process.pid}] ${info.level}: ${info.message}\n`;
});

const logger = (tag: any) => {
  const log: any = createLogger({
    format: combine(format.splat(), label({ label: tag }), timestamp(), myFormat),
    level,
    transports: [new transports.Console()],
  });

  log.logError = (message: string, data: any, err: any) => {
    const errorData = {
      data,
      message,
      stacktrace: verror.fullStack(err),
    };
    log.error(`${message} ${JSON.stringify(errorData)}`);
  };

  log.logInfo = (message: string, data: any) => {
    const infoData = {
      data,
      message,
    };
    log.info(`${message} ${JSON.stringify(infoData)}`);
  };

  if (disableLog === "true") {
    log.transports.forEach((t: any) => (t.silent = true));
  }

  return log;
};

export default logger;
