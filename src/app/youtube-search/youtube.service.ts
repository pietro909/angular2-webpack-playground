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
import {ResultsCounter} from "../generic/results-counter.component";
import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import replace = require("core-js/fn/symbol/replace");
import {LocationData} from "../location/proximity-selector.component";

// please replace with your own key or my quota will get full!
const YOUTUBE_API_KEY: string = "AIzaSyDOfT_BO81aEZScosfTYMruJobmpjqNeEk";
const YOUTUBE_API_URL: string = "https://www.googleapis.com/youtube/v3/search";
const LOCATION_TEMPLATE = 'location={latitude},{longitude}&locationRadius={radius}km';

@Injectable()
export class YouTubeService {

    searchResults: BehaviorSubject<SearchResult[]> = new BehaviorSubject<SearchResult[]>([]);

    private maxResults = 50;
    private currentSearchName: string;
    private currentSearchLocation: LocationData;
    private currentSearchRadius: number;

    constructor( public http: Http,
                 @Inject(YOUTUBE_API_KEY) private apiKey: string,
                 @Inject(YOUTUBE_API_URL) private apiUrl: string) {
                 }

    searchName(name: string): Observable<SearchResult[]> {
        if (_.isString(name) && name.length > 2) {
            this.currentSearchName = name;
            let params:string = [
                `q=${name}`,
                `key=${this.apiKey}`,
                `part=snippet`,
                `type=video`,
                `maxResults=${this.maxResults}`
            ].join('&');

            if (this.currentSearchLocation) {
                const locationString = LOCATION_TEMPLATE
                    .replace(/\{latitude\}/g, this.currentSearchLocation.latitude.toString())
                    .replace(/\{longitude\}/g, this.currentSearchLocation.longitude.toString())
                    .replace(/\{radius\}/g, this.currentSearchRadius.toString());
                params += `&${locationString}`;
            }

            this.doSearch(params);
        }

        return this.searchResults;

    }

    setLocation(location: LocationData, radius: number): Observable<SearchResult[]> {
        this.currentSearchLocation = location;
        this.currentSearchRadius = radius;
        return this.searchResults;
    }

    unsetLocation(): Observable<SearchResult[]> {
        this.currentSearchLocation = null;
        return this.searchResults;
    }

    private doSearch(params: string): void {
        const queryUrl: string = `${this.apiUrl}?${params}`;
        this.http.get(queryUrl)
            .map((response: Response) => {
                console.log(response);
                return (<any>response.json()).items.map(item => {
                    return new SearchResult({
                        id: item.id.videoId,
                        title: item.snippet.title,
                        description: item.snippet.description,
                        thumbnailUrl: item.snippet.thumbnails.high.url
                    });
                });
            })
            .subscribe(this.onSearchEnd.bind(this));
    }

    private onSearchEnd(searchResults: SearchResult[]) {
        this.searchResults.next(searchResults);
    }
}

export const youtubeServiceInjectables: Array<any> = [
    bind(YouTubeService).toClass(YouTubeService),
    bind(YOUTUBE_API_KEY).toValue(YOUTUBE_API_KEY),
    bind(YOUTUBE_API_URL).toValue(YOUTUBE_API_URL)
]
