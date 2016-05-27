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
import {SearchResult} from "./search-result.model.ts";
import {ResultsCounter} from "./results-counter.component";
import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import replace = require("core-js/fn/symbol/replace");
import {LocationData} from "./proximity-selector.component";

const YOUTUBE_API_KEY: string = "AIzaSyDOfT_BO81aEZScosfTYMruJobmpjqNeEk";
const YOUTUBE_API_URL: string = "https://www.googleapis.com/youtube/v3/search";
const LOCATION_TEMPLATE = 'location={latitude},{longitude}&locationRadius={radius}km';

@Injectable()
export class YouTubeService {

    searchResults: BehaviorSubject<SearchResult[]> = new BehaviorSubject<SearchResult[]>([]);

    private maxResults = 50;
    private currentSearchName: string;
    private currentSearchLocation: LocationData;

    constructor( public http: Http,
                 @Inject(YOUTUBE_API_KEY) private apiKey: string,
                 @Inject(YOUTUBE_API_URL) private apiUrl: string) {
                 }

    searchName(name: string): Observable<SearchResult[]> {
        this.currentSearchName = name;
        let params: string = [
            `q=${name}`,
            `key=${this.apiKey}`,
            `part=snippet`,
            `type=video`,
            `maxResults=${this.maxResults}`
        ].join('&');
        
        if (this.currentSearchLocation) {
            const locationString = LOCATION_TEMPLATE
                .replace(/\{latitude\}/g, this.currentSearchLocation.latitude)
                .replace(/\{longitude\}/g, this.currentSearchLocation.longitude)
                .replace(/\{radius\}/g, this.currentSearchLocation.radius);
            params += `&${locationString}`;
        }
        
        this.doSearch(params);

        return this.searchResults;

    }
    
    searchLocation(location: LocationData): Observable<SearchResult[]> {
        console.log(location);
        this.currentSearchLocation = location;
        this.searchName(this.currentSearchName);
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
