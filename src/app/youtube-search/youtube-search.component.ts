import {Component, EventEmitter, OnInit} from "@angular/core";
import {SearchResultComponent} from "./search-result.component.ts";
import {SearchBox} from "./search-box.component.ts";
import {SearchResult} from "./search-result.model.ts";
import {YouTubeService} from "./youtube.service";
import {ListMaxSize} from "./list-max-size.component";
import {ProximitySelector, LocationData} from "./proximity-selector.component";
import {DescribeLocation} from "./describe-location.component";
import {Subject} from "rxjs/Subject";
import { Store } from '@ngrx/store';
import {CurrentSearch, SEARCH_OPTIONS} from "../search.reducer";
import { Action } from '@ngrx/store';
import {Observable} from "rxjs/Observable";

// const loadingGif: string = ((<any>window).__karma__) ? '' : require('assets/img/loading.gif');

const DEFAULT_VIDEO = 20;

@Component({
    selector: 'youtube-search',
    directives: [SearchBox, SearchResultComponent, ListMaxSize, ProximitySelector, DescribeLocation],
    inputs: ['store', 'results'],
    outputs: [ ],
    template: `
    <div class="container">
    
    <!-- todo: remove from here -->
        <describe-location [locationData]="currentLocation"></describe-location>

        <div class="row">
            <div class="col-md-6">
                <div class="input-group input-group-lg">
                    <search-box
                        (loading)="loading = $event"
                        (textChange)="setText($event)"></search-box>
                </div>
                <div class="input-group input-group-lg">
                   <list-max-size
                    [defaultSize]="${DEFAULT_VIDEO}"
                    (size)="resizeList($event)"></list-max-size>
                </div>
            </div>
            <div class="col-md-6">
                <div class="input-group input-group-lg">
                    <proximity-selector
                        (locationChange)="setLocation($event)"
                        (radiusChange)="setRadius($event)"
                        [defaultRadius]="50"></proximity-selector>
                </div>
            </div>
        </div>

        <div class="row">
            <search-result
                *ngFor="let video of videos"
                [result]="video">
            </search-result>
        </div>

    </div>
    `
})

export class YoutubeSearchComponent implements OnInit {

    currentLocation: Subject<LocationData> = new Subject<LocationData>();

    store: Store<CurrentSearch>

    videos: SearchResult[];

    results: Observable<SearchResult[]>;

    private maxSize = DEFAULT_VIDEO;

    ngOnInit() {
        this.results.subscribe((videos) => this.videos = videos);
    }

    updateResults(results: SearchResult[]): void {
        // this.results = results.slice(0, this.maxSize);
    }

    resizeList(maxSize: number): void {
        this.maxSize = maxSize;
        // this.results = this.youtube.searchResults.getValue().slice(0, this.maxSize);
    }

    setText(text: string) {
        this.store.dispatch({
            type: SEARCH_OPTIONS.TEXT,
            payload: {
                text: text
            }
        })
    }

    setLocation(locationData: LocationData) {
        // this.currentLocation.next(locationData);
        let message: Action;
        if (locationData === null) {
            message = {
                type: SEARCH_OPTIONS.LOCATION,
                payload: {
                    latitude: null,
                    longitude:null 
                }
            }
        } else {
            message= {
                type: SEARCH_OPTIONS.LOCATION,
                payload: {
                    latitude: locationData.latitude,
                    longitude: locationData.longitude
                }
            }
        }
        this.store.dispatch(message);
    }

    setRadius(radius: number) {
        this.store.dispatch({
            type: SEARCH_OPTIONS.RADIUS,
            payload: {
                radius: radius
            }
        });
    }

}
