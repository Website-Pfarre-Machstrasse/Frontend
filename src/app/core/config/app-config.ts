import { Injectable, InjectionToken } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

export interface IConfig {
  apiEndpoint: string;
}

const NULL_CONFIG: IConfig = {
  apiEndpoint: null
};

export const CONFIG: InjectionToken<IConfig> = new InjectionToken<IConfig>('CONFIG', {factory: () => AppConfig.INSTANCE});

@Injectable()
export class AppConfig {
  private static _config: IConfig;
  public static get INSTANCE(): IConfig {
    return AppConfig._config ?? NULL_CONFIG;
  }
  constructor(private _http: HttpClient) {}
  load(): Promise<void> {
    const configFile = document.baseURI+environment.configFile;
    return new Promise<void>((resolve, reject) => {
      this._http.get<IConfig>(configFile).toPromise().then(config => {
        if (config != null) {
          AppConfig._config = config;
          resolve();
        } else {
          reject(`Loaded Config was null`);
        }
      }).catch(reason => {
        reject(`Could not load file '${configFile}': ${JSON.stringify(reason)}`);
      });
    });
  }
}
