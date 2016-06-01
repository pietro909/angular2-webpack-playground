import {
    Injectable,
    bind,
    Inject
} from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import replace = require("core-js/fn/symbol/replace");
import {LocationData} from "./proximity-selector.component";
const LOCATION_API_URL: string = "http://maps.googleapis.com/maps/api/geocode/json?";
const LOCATION_TEMPLATE = 'latlng={latitude},{longitude}';

@Injectable()
export class LocationService {

    searchResults: BehaviorSubject<string> = new BehaviorSubject<string>('');

    constructor( public http: Http,
                 @Inject(LOCATION_API_URL) private apiUrl: string) {
    }

    searchPlace(locationData: LocationData): Observable<string> {
        const locationString = LOCATION_TEMPLATE
            .replace(/\{latitude\}/g, locationData.latitude.toString())
            .replace(/\{longitude\}/g, locationData.longitude.toString());
        const params = `&${locationString}`;
        this.doSearch(params);
        return this.searchResults;
    }

    private doSearch(params: string): void {
        const queryUrl: string = `${this.apiUrl}?${params}`;
        this.http.get(queryUrl)
            .map((response: Response) => {
                const place = (<any>response.json()).results[0];
                if (place) {
                    return place.formatted_address;
                } else {
                    return "unknown";
                }
            })
            .subscribe((r: string) => this.searchResults.next(r));
    }

}

export const locationServiceInjectables: Array<any> = [
    bind(LocationService).toClass(LocationService),
    bind(LOCATION_API_URL).toValue(LOCATION_API_URL)
]
