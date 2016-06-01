import {Component, EventEmitter, OnInit} from "@angular/core";
import {SearchResultComponent} from "./search-result.component.ts";
import {SearchBox} from "./search-box.component.ts";
import {SearchResult} from "./search-result.model.ts";
import {YouTubeService} from "./youtube.service";
import {ListMaxSize} from "./list-max-size.component";
import {ProximitySelector, LocationData} from "../location/proximity-selector.component";
import {DescribeLocation} from "../location/describe-location.component";
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
    inputs: ['store'],
    outputs: [ ],
    template: `
    <div class="col-md-6">
        <div class="input-group input-group-lg">
            <search-box
                (loading)="loading = $event"
                (textChange)="setText($event)"></search-box>
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
    `
})

export class YoutubeSearchComponent {

    currentLocation: Subject<LocationData> = new Subject<LocationData>();

    store: Store<CurrentSearch>

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
