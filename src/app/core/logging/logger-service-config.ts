import {LogHandler} from './log-handler';
import {Logger} from './logger';

export type LoggerFactory = (parent: Logger, name: string) => Logger;
export class LoggerServiceConfig {
  rootLoggerHandlers?: LogHandler[];
  defaultLoggerFactory?: LoggerFactory;
  handlersForLogger?: { [name: string]: LogHandler[] | LogHandler };
  loggerFactoryForName?: { [name: string]: LoggerFactory };
}
