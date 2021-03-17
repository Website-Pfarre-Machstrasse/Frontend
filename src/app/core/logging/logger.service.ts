/* eslint-disable @typescript-eslint/no-explicit-any */
import {Injectable} from '@angular/core';
import {Logger} from './logger';
import {LogLevel} from './log-level.enum';
import {LogEntry} from './log-entry';
import {LogHandler} from './log-handler';


const COLOR_MAP = {};
COLOR_MAP[LogLevel.ALL] = 'white';
COLOR_MAP[LogLevel.DEBUG] = 'light-blue';
COLOR_MAP[LogLevel.INFO] = 'white';
COLOR_MAP[LogLevel.WARN] = 'dark-yellow';
COLOR_MAP[LogLevel.ERROR] = 'red';
COLOR_MAP[LogLevel.FATAL] = 'dark-red';
COLOR_MAP[LogLevel.OFF] = 'black';



class LoggerImpl implements Logger {
  protected _handlers: LogHandler[] = [];
  private readonly _parent: Logger;
  private readonly _name: string;
  private _level: LogLevel;

  constructor(parent: Logger, name: string) {
    this._parent = parent;
    this._name = name;
    this._level = parent?.getLevel() ?? LogLevel.ALL;
  }

  setLevel(level: LogLevel): void {
    this._level = level;
  }

  getLevel(): LogLevel {
    return this._level;
  }

  getName(): string {
    return this._name;
  }

  addHandler(handler: LogHandler): void {
    if (this._handlers.includes(handler)) {
      return;
    }
    this._handlers.push(handler);
  }

  removeHandler(handler: LogHandler): void {
    if (!this._handlers.includes(handler)) {
      return;
    }
    this._handlers = this._handlers.filter(value => value !== handler);
  }

  debug(message: string, ...params: any[]): void {
    this.log(LogLevel.DEBUG, message, params);
  }

  info(message: string, ...params: any[]): void {
    this.log(LogLevel.INFO, message, params);
  }

  warn(message: string, ...params: any[]): void {
    this.log(LogLevel.WARN, message, params);
  }

  error(message: string, ...params: any[]): void;
  error(error: Error): void;
  error(message: string, error: Error): void;
  error(message: string | Error, ...params: (any)[]) {
    if (typeof message === 'string') {
      if (params.length > 0) {
        if (params[0] instanceof Error) {
          this.log(LogLevel.ERROR, message, params.slice(1), params[0]);
        } else {
          this.log(LogLevel.ERROR, message, params);
        }
      } else {
        this.log(LogLevel.ERROR, message);
      }
    } else {
      this.log(LogLevel.ERROR, message.message);
    }
  }

  fatal(error: Error): void;
  fatal(message: string, error: Error): void;
  fatal(message: string, ...params: any[]): void;
  fatal(message: string | Error, ...params: (any)[]) {
    if (typeof message === 'string') {
      if (params.length > 0) {
        if (params[0] instanceof Error) {
          this.log(LogLevel.FATAL, message, params.slice(1), params[0]);
        } else {
          this.log(LogLevel.FATAL, message, params);
        }
      } else {
        this.log(LogLevel.FATAL, message);
      }
    } else {
      this.log(LogLevel.FATAL, message.message);
    }
  }

  log(level: LogLevel, message: string, params: any[] = [], data: any = null): void {
    if (params.length > 0) {
      message = message.format(...params);
    }
    this.writeLog(new LogEntry(level, message, data));
  }

  canLog(level: LogLevel): boolean {
    return (this._level <= level && level !== LogLevel.OFF) || this._level === LogLevel.ALL;
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

class ConsoleLogHandler implements LogHandler {
  private _format: string;

  constructor(format: string = '[{timestamp.toISOString()}] [{logger.getName()}] [{level}] - {message}') {
    this._format = format;
  }

  handle(entry: LogEntry, logger: Logger): void {
    let message = this._format.format({
      timestamp: new Date(entry.timestamp),
      logger,
      level: LogLevel[entry.level],
      message: entry.message
    });
    if (entry.data) {
      message += `\n${JSON.stringify(entry.data)}`;
    }
    switch (entry.level){
      case LogLevel.DEBUG:
        console.debug(message);
        break;
      case LogLevel.INFO:
        console.info(message);
        break;
      case LogLevel.WARN:
        console.warn(message);
        break;
      case LogLevel.ERROR:
        console.error(message);
        break;
      case LogLevel.FATAL:
        console.error(message);
        break;
      default:
        console.log(message);
        break;
    }
  }
}

class RootLogger extends LoggerImpl {
  public static readonly INSTANCE: RootLogger = new RootLogger();

  private constructor() {
    super(null, 'root');
    this.addHandler(new ConsoleLogHandler());
  }

  getName(): string {
    return 'root';
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
  private _rootLogger: Logger = RootLogger.INSTANCE;
  private _loggers: {[name: string]: Logger} = {root: this._rootLogger};

  public getLogger(name: string): Logger {
    if (!(name in this._loggers)) {
      this._loggers[name] = new LoggerImpl(this._rootLogger, name);
    }
    return this._loggers[name];
  }

  public getRootLogger(): Logger {
    return this._rootLogger;
  }
}
