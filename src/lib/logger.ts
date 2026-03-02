/**
 * Server-side logging utility for Venom DLS
 * Provides consistent logging with timestamps and log levels
 */

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, unknown>;
}

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

// Set minimum log level from environment or default to "info"
const MIN_LOG_LEVEL: LogLevel =
  (process.env.LOG_LEVEL as LogLevel) ||
  (process.env.NODE_ENV === "production" ? "info" : "debug");

function shouldLog(level: LogLevel): boolean {
  return LOG_LEVELS[level] >= LOG_LEVELS[MIN_LOG_LEVEL];
}

function formatLogEntry(entry: LogEntry): string {
  const base = `[${entry.timestamp}] [${entry.level.toUpperCase()}] ${entry.message}`;
  if (entry.context && Object.keys(entry.context).length > 0) {
    return `${base} ${JSON.stringify(entry.context)}`;
  }
  return base;
}

function createLogEntry(
  level: LogLevel,
  message: string,
  context?: Record<string, unknown>
): LogEntry {
  return {
    timestamp: new Date().toISOString(),
    level,
    message,
    context,
  };
}

export const logger = {
  debug: (message: string, context?: Record<string, unknown>) => {
    if (shouldLog("debug")) {
      const entry = createLogEntry("debug", message, context);
      console.debug(formatLogEntry(entry));
    }
  },

  info: (message: string, context?: Record<string, unknown>) => {
    if (shouldLog("info")) {
      const entry = createLogEntry("info", message, context);
      console.info(formatLogEntry(entry));
    }
  },

  warn: (message: string, context?: Record<string, unknown>) => {
    if (shouldLog("warn")) {
      const entry = createLogEntry("warn", message, context);
      console.warn(formatLogEntry(entry));
    }
  },

  error: (message: string, error?: Error, context?: Record<string, unknown>) => {
    if (shouldLog("error")) {
      const entry = createLogEntry("error", message, {
        ...context,
        errorName: error?.name,
        errorMessage: error?.message,
        stack: error?.stack,
      });
      console.error(formatLogEntry(entry));
    }
  },

  // API route logging helper
  apiRequest: (req: Request, context?: Record<string, unknown>) => {
    const url = new URL(req.url);
    logger.info(`API Request: ${req.method} ${url.pathname}`, {
      method: req.method,
      path: url.pathname,
      query: Object.fromEntries(url.searchParams),
      ...context,
    });
  },

  // API response logging helper
  apiResponse: (
    req: Request,
    statusCode: number,
    durationMs: number,
    context?: Record<string, unknown>
  ) => {
    const url = new URL(req.url);
    const message = `API Response: ${req.method} ${url.pathname} - ${statusCode} (${durationMs}ms)`;
    const logContext = {
      method: req.method,
      path: url.pathname,
      statusCode,
      durationMs,
      ...context,
    };
    
    if (statusCode >= 400) {
      logger.error(message, undefined, logContext);
    } else if (statusCode >= 300) {
      logger.warn(message, logContext);
    } else {
      logger.info(message, logContext);
    }
  },
};

export default logger;
