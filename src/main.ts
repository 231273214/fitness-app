import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { addIcons } from 'ionicons';
import { home, checkmark, close } from 'ionicons/icons';

addIcons({
  home,
  checkmark,
  close
});


bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));