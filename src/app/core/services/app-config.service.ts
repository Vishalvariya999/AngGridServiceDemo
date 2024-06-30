import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../types/app-config.type';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private appConfig!: AppConfig;
  private readonly http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
    this.loadAppConfig();
  }

  get ApiBaseUrl(): string {
    return environment.ApiBaseUrl;
  }

  get AppSetting(): AppConfig {
    return this.appConfig;
  }

  set AppSetting(config: AppConfig) {
    this.appConfig = config;
  }

  public loadAppConfig() {
    return this.http
      .get<AppConfig>('/assets/config/app-setting.json')
      .toPromise()
      .then((config: any) => {
        if (config) {
          this.appConfig = config;
          console.log('this.appConfig', this.appConfig);
        }
      });
  }
}
