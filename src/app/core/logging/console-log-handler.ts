import {LogHandler} from './log-handler';
import {LogEntry} from './log-entry';
import {Logger} from './logger';
import {LogLevel} from './log-level.enum';

export class ConsoleLogHandler implements LogHandler {
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
