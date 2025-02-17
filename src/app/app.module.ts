import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AuthInterceptor } from './login/auth.interceptor';
import { HostInterceptor } from './shared/host.interceptor';
import { LoadingOverlayComponent } from './loading-overlay/loading-overlay.component';
import { LoadInterceptor } from './loading-overlay/load.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { NotificationInterceptor } from './notification/notification.interceptor';
import { TelemetryInterceptor } from './telemetry/telemetry.interceptor';

@NgModule({ declarations: [AppComponent, ErrorPageComponent, LoadingOverlayComponent],
    bootstrap: [AppComponent], imports: [BrowserAnimationsModule, AppRoutingModule, ToastrModule.forRoot()], providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: HostInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: LoadInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: NotificationInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: TelemetryInterceptor, multi: true },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule {}
