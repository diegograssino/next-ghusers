import pino from "pino";

import { LogContext } from "@/types";
// TODO Add proper log support

const config = {
  serverUrl: process.env.REACT_APP_API_PATH || "http://localhost:3000",
  env: process.env.NODE_ENV,
  publicUrl: process.env.PUBLIC_URL,
};

const pinoConfig: pino.LoggerOptions = {
  level: process.env.PINO_LOG_LEVEL || "info",
  browser: {
    asObject: true,
  },
};

if (
  config.serverUrl &&
  typeof window !== "undefined" &&
  navigator &&
  process.env.NODE_ENV === "production"
) {
  pinoConfig.browser = {
    ...pinoConfig.browser,
    transmit: {
      level: "error",
      send: (level: pino.Level, logEvent: pino.LogEvent) => {
        const msg = logEvent.messages[0];

        const headers = {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
          type: "application/json",
        };
        const blob = new Blob([JSON.stringify({ msg, level })], headers);
        navigator.sendBeacon(`${config.serverUrl}/log`, blob);
      },
    },
  };
}

const logger = pino(pinoConfig);

export const log = {
  info: (message: string, context?: LogContext) =>
    logger.info(context, message),
  warn: (message: string, context?: LogContext) =>
    logger.warn(context, message),
  error: (message: string, error?: Error | LogContext) =>
    logger.error(error, message),
  debug: (message: string, context?: LogContext) =>
    logger.debug(context, message),
  trace: (message: string, context?: LogContext) =>
    logger.trace(context, message),
};

export const logInfo = (msg: string | Record<string, unknown>) =>
  logger.info(msg);

export default logger;
