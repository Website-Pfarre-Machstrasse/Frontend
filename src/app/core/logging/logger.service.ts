/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/member-ordering */
import {Injectable} from '@angular/core';
import {AbstractLogger, Logger} from './logger';
import {LogEntry} from './log-entry';
import {LogHandler} from './log-handler';
import {LoggerFactory, LoggerServiceConfig} from './logger-service-config';
import {ConsoleLogHandler} from './console-log-handler';


class LoggerImpl extends AbstractLogger {
  constructor(parent: Logger, name: string) {
    super(parent, name);
  }

  writeLog(entry: LogEntry): void {
    if (!this.canLog(entry.level)) {
      return;
    }
    if (this._handlers.length > 0) {
      for (const handler of this._handlers) {
        handler.handle(entry, this);
      }
    }
    this._parent.writeLog(entry);
  }
}

class RootLogger extends AbstractLogger {
  constructor() {
    super(null, 'root');
  }

  writeLog(entry: LogEntry): void {
    if (!this.canLog(entry.level)) {
      return;
    }
    for (const handler of this._handlers) {
      handler.handle(entry, this);
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  private static readonly DEFAULT_LOGGER_FACTORY = (parent, name) => new LoggerImpl(parent, name);
  // eslint-disable-next-line @typescript-eslint/naming-convention
  private static readonly DEFAULT_ROOT_LOGGER_HANDLERS = [new ConsoleLogHandler()];

  private readonly _rootLogger: Logger;
  private readonly _loggers: {[name: string]: Logger};
  private readonly _handlerForName: { [name: string]: LogHandler[] | LogHandler };
  private readonly _loggerFactoryForName: { [name: string]: LoggerFactory };
  private readonly _loggerFactory: LoggerFactory;

  constructor({rootLoggerHandlers, defaultLoggerFactory, handlersForLogger, loggerFactoryForName}: LoggerServiceConfig) {
    this._rootLogger = new RootLogger();
    this._loggers = {root: this._rootLogger};
    for (const logHandler of rootLoggerHandlers ?? LoggerService.DEFAULT_ROOT_LOGGER_HANDLERS) {
      this._rootLogger.addHandler(logHandler);
    }
    this._handlerForName = handlersForLogger ?? {};
    this._loggerFactoryForName = loggerFactoryForName ?? {};
    this._loggerFactory = defaultLoggerFactory ?? LoggerService.DEFAULT_LOGGER_FACTORY;
  }

  public getLogger(name: string): Logger {
    if (!(name in this._loggers)) {
      let loggerFactory;
      if (name in this._loggerFactoryForName) {
        loggerFactory = this._loggerFactoryForName[name] ?? this._loggerFactory;
      } else {
        loggerFactory = this._loggerFactory;
      }
      this._loggers[name] = loggerFactory(this.getRootLogger(), name);
    }
    const logger = this._loggers[name];
    if (this._handlerForName && name in this._handlerForName) {
      if (Array.isArray(this._handlerForName[name])) {
        for (const handler of this._handlerForName[name] as LogHandler[]) {
          logger.addHandler(handler);
        }
      } else {
        logger.addHandler(this._handlerForName[name] as LogHandler);
      }
      delete this._handlerForName[name];
    }
    return logger;
  }

  public getRootLogger(): Logger {
    return this._rootLogger;
  }
}
