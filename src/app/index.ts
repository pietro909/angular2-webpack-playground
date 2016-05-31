import { provideStore } from '@ngrx/store';

// App
import {youtubeServiceInjectables} from "./youtube-search/youtube.service.ts";
export * from './app.component';
export * from './app.service';

import { AppState } from './app.service';
import {locationServiceInjectables} from "./youtube-search/location.service";
import {searchReducer} from "./search.reducer";

// Application wide providers
export const APP_PROVIDERS = [
  AppState,
  youtubeServiceInjectables,
    locationServiceInjectables,
    provideStore({currentSearch: searchReducer})
];
