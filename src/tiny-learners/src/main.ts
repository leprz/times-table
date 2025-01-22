import { bootstrapApplication } from '@angular/platform-browser';
import { tinyLearnersAppConfig } from './app/tiny-learners-app.config';
import { TinyLearnersAppComponent } from './app/tiny-learners-app.component';

bootstrapApplication(TinyLearnersAppComponent, tinyLearnersAppConfig).catch(
  (err) => console.error(err),
);
