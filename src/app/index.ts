import { provideStore } from '@ngrx/store';

// App
import {youtubeServiceInjectables} from "./youtube-search/youtube.service.ts";
export * from './app.component';
export * from './app.service';

import { AppState } from './app.service';
import {locationServiceInjectables} from "./location/location.service";
import {searchReducer} from "./youtube-search/search.reducer";

// Application wide providers
export const APP_PROVIDERS = [
  AppState,
  youtubeServiceInjectables,
    locationServiceInjectables,
    provideStore({currentSearch: searchReducer})
];
