import { APP_INITIALIZER } from '@angular/core';
// import { UserSessionService } from './core/services/user-session.service';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from './core/types/app-config.type';
import { AppConfigService } from './core/services/app-config.service';

const appInit = (
  http: HttpClient,
  appConfigService: AppConfigService
) => {
  return (): Promise<boolean> => {
    return new Promise((resolve) => {
      http
        .get('/assets/config/app-setting.json')
        .pipe(
          tap(async (config) => {
            appConfigService.AppSetting = config as AppConfig;
          })
        )
        .subscribe({
          complete: () => {
            resolve(true);
          },
          error: () => {
            resolve(true);
          },
        });
    });
  };
};

export const appInitProvide = {
  deps: [
    HttpClient,
    AppConfigService
  ],
  provide: APP_INITIALIZER,
  useFactory: appInit,
  multi: true,
};
