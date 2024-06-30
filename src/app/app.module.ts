import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppConfigService } from './core/services/app-config.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { appInitProvide } from './app.initializer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    provideClientHydration(),
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => () => appConfigService.loadAppConfig()
    },
    appInitProvide,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
