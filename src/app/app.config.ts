import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { CombineLatestAllComponent } from './combine-latest-all/combine-latest-all.component';
import { CombineLatestComponent } from './combine-latest/combine-latest.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter([
      { path: 'combineLatestAll', component: CombineLatestAllComponent },
      {
        path: 'combineLatest',
        component: CombineLatestComponent,
      },
      { path: '', redirectTo: 'combineLatestAll', pathMatch: 'full' },
    ]),
  ],
};
