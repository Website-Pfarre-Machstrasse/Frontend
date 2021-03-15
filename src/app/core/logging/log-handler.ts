import {LogEntry} from './log-entry';
import {Logger} from './logger';

export interface LogHandler {
  handle(entry: LogEntry, logger: Logger): void;
}
