import {
    Component,
    Injectable,
    bind,
    OnInit,
    ElementRef,
    EventEmitter,
    Inject
} from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import * as _ from "lodash";
import {SearchResult} from "./search-result.model.ts";
import {ResultsCounter} from "./results-counter.component";
import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import replace = require("core-js/fn/symbol/replace");
import {LocationData} from "./proximity-selector.component";

// please replace with your own key or my quota will get full
const LOCATION_API_KEY: string = "AIzaSyBVuYIkwA1D05qmi5sursa8MD_R70UG1QY";
const LOCATION_API_URL: string = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
const LOCATION_TEMPLATE = 'location={latitude},{longitude}&locationRadius={radius}km';

@Injectable()
export class LocationService {

    searchResults: BehaviorSubject<string> = new BehaviorSubject<string>('');

    constructor( public http: Http,
                 @Inject(LOCATION_API_KEY) private apiKey: string,
                 @Inject(LOCATION_API_URL) private apiUrl: string) {
                 }

    searchPlace(locationData: LocationData): Observable<string> {
        
            let params:string = [
                `key=${this.apiKey}`,
            ].join('&');

                const locationString = LOCATION_TEMPLATE
                    .replace(/\{latitude\}/g, locationData.latitude)
                    .replace(/\{longitude\}/g, locationData.longitude)
                    .replace(/\{radius\}/g, locationData.radius);
                params += `&${locationString}`;

            this.doSearch(params);

        return this.searchResults;

    }

    private doSearch(params: string): void {
        const queryUrl: string = `${this.apiUrl}?${params}`;
        this.http.get(queryUrl)
            .map((response: Response) => {
                console.log(response);
                // return (<any>response.json()).items.map(item => {
                //    console.log() 
                // });
                return 'name';
            })
            .subscribe((r: string) => this.searchResults.next(r));
    }

}

export const locationServiceInjectables: Array<any> = [
    bind(LocationService).toClass(LocationService),
    bind(LOCATION_API_KEY).toValue(LOCATION_API_KEY),
    bind(LOCATION_API_URL).toValue(LOCATION_API_URL)
]
