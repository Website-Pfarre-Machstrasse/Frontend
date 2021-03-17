import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoggerServiceConfig} from './logger-service-config';
import {LoggerService} from './logger.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    LoggerService
  ]
})
export class LoggingModule {
  static forRoot(config: LoggerServiceConfig = new LoggerServiceConfig()): ModuleWithProviders<LoggingModule> {
    return {
      ngModule: LoggingModule,
      providers: [
        {
          provide: LoggerServiceConfig,
          useValue: config
        }
      ]
    };
  }
}
