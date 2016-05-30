// App
import {youtubeServiceInjectables} from "./youtube-search/youtube.service.ts";
export * from './app.component';
export * from './app.service';

import { AppState } from './app.service';
import {locationServiceInjectables} from "./youtube-search/location.service";

// Application wide providers
export const APP_PROVIDERS = [
  AppState,
  youtubeServiceInjectables,
    locationServiceInjectables
];
