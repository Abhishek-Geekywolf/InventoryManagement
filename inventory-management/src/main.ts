import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ToastrModule } from 'ngx-toastr';
import { importProvidersFrom } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { environment } from './environments/environment.development';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

 


importProvidersFrom(BrowserModule, MatProgressSpinnerModule,
  ToastrModule.forRoot({
    preventDuplicates: true,
    resetTimeoutOnDuplicate: true
}))

