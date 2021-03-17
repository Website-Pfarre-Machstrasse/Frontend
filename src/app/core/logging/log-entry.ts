/* eslint-disable @typescript-eslint/no-explicit-any */
import {LogLevel} from './log-level.enum';

export class LogEntry {
  readonly timestamp: number;
  readonly message: string;
  readonly level: LogLevel;
  readonly data: any;

  constructor(level: LogLevel, message: string, data: any = null, timestamp: number = Date.now()) {
    this.timestamp = timestamp;
    this.message = message;
    this.level = level;
    this.data = data;
  }
}
