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
