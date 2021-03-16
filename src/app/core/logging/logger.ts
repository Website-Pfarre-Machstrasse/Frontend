/* eslint-disable @typescript-eslint/no-explicit-any */
import {LogLevel} from './log-level.enum';
import {LogHandler} from './log-handler';
import {LogEntry} from './log-entry';

export interface Logger {
  getName(): string;

  getLevel(): LogLevel;

  setLevel(level: LogLevel): void;

  addHandler(handler: LogHandler): void;

  removeHandler(handler: LogHandler): void;

  debug(message: string, ...params: any[]): void;

  info(message: string, ...params: any[]): void;

  warn(message: string, ...params: any[]): void;

  error(message: string, ...params: any[]): void;

  error(error: Error): void;

  error(message: string, error: Error): void;

  fatal(error: Error): void;

  fatal(message: string, error: Error): void;

  fatal(message: string, ...params: any[]): void;

  log(level: LogLevel, message: string, params?: any[], data?: any): void;

  writeLog(entry: LogEntry): void;
}

export abstract class AbstractLogger implements Logger {
  protected _handlers: LogHandler[] = [];
  protected readonly _parent: Logger;
  private _level: LogLevel;
  private readonly _name: string;

  protected constructor(parent: Logger, name: string) {
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
  error(message: string | Error, ...params: (any)[]): void {
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
  fatal(message: string | Error, ...params: (any)[]): void {
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
    return (this.getLevel() <= level && level !== LogLevel.OFF) || this.getLevel() === LogLevel.ALL;
  }

  abstract writeLog(entry: LogEntry): void;
}
