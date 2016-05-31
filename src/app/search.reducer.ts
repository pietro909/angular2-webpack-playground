import { ActionReducer, Action } from '@ngrx/store';
import {LocationData} from "./youtube-search/proximity-selector.component";

export enum SEARCH_OPTIONS {
    TEXT,
    LOCATION,
    RADIUS
}

export interface CurrentSearch {
    text: string;
    location: LocationData,
    radius: number
}

export const searchReducer: ActionReducer<CurrentSearch> = (state: CurrentSearch, action: Action) => {
    let newState = _.cloneDeep(state);
    switch (action.type) {
        case SEARCH_OPTIONS.TEXT:
                newState.text = action.payload.text;
            break;
        case SEARCH_OPTIONS.LOCATION:
                newState.location.latitude = action.payload.latitude;
                newState.location.longitude = action.payload.longitude;
            break;
        case SEARCH_OPTIONS.RADIUS:
                newState.radius = action.payload.radius;
             break;
        case `@ngrx/store/init`:
            newState = {
                text: null,
                location: {
                    latitude: null,
                    longitude: null
                },
                radius: null
            }
            break;
        default:
            throw new Error(`illegal action type ${action.type}`);
    }
    return newState;
};
