import { Injectable } from '@angular/core';

export enum LogLevel {
  Debug,
  Warning,
  Information,
  Critical,
}

@Injectable({
  providedIn: 'root',
})
export class LoggingServiceService {
  private minLoggingLevel: LogLevel = LogLevel.Debug;

  logDebug(message: any) {
    if (this.minLoggingLevel <= 0) {
      console.log(message);
    }
  }

  logWarning(message: any) {
    if (this.minLoggingLevel <= 1) {
      console.log(message);
    }
  }
}
