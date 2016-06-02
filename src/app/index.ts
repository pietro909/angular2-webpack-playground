import { provideStore } from '@ngrx/store';

// App
import {youtubeServiceInjectables} from "./youtube-search/youtube.service.ts";
export * from './app.component';

import {locationServiceInjectables} from "./location/location.service";
import {searchReducer} from "./youtube-search/search.reducer";

// Application wide providers
export const APP_PROVIDERS = [
	youtubeServiceInjectables,
	locationServiceInjectables,
	provideStore({currentSearch: searchReducer})
];
