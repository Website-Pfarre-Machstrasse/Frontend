import { TestBed } from '@angular/core/testing';

import { LoggerService } from './logger.service';
import {LogHandler} from './log-handler';
import {LogEntry} from './log-entry';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have root logger', () => {
    expect(service.getRootLogger()).toBeTruthy();
  });
  it('should create logger', () => {
    const logger1 = service.getLogger('test');
    expect(logger1).toBeTruthy();
    expect(logger1.getName()).toBe('test');
  });

  it('should log', () => {
    const logger = service.getLogger('test');
    const logs = [];
    class MockLogHandler implements LogHandler {
      handle(entry: LogEntry): void {
        logs.push(entry);
      }
    }
    logger.addHandler(new MockLogHandler());
    logger.debug('test message');
    logger.info('test message');
    logger.warn('test message');
    logger.error('test message');
    logger.fatal('test message');
    expect(logs.length).toBe(5);
  });
});
