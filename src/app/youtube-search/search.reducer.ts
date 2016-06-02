import { ActionReducer, Action } from '@ngrx/store';
import {LocationData} from "../location/proximity-selector.component";
import * as _ from 'lodash';

export enum SEARCH_OPTIONS {
    TEXT,
    LOCATION,
    RADIUS
}

export type SearchOptions = 'TEXT' | 'LOCATION' | 'RADIUS';

export interface CurrentSearch {
    text: string;
    location: LocationData,
    radius: number
}

export const searchReducer: ActionReducer<CurrentSearch> = (state: CurrentSearch, action: Action) => {
    let newState = _.cloneDeep(state);
    switch (action.type) {
        case 'TEXT':
                newState.text = action.payload.text;
            break;
        case 'LOCATION':
                newState.location.latitude = action.payload.latitude;
                newState.location.longitude = action.payload.longitude;
            break;
        case 'RADIUS':
                console.log(`change radius to ${action.payload.radius}`);
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
            };
            break;
        default:
            throw new Error(`illegal action type ${action.type}`);
    }
    return newState;
};
