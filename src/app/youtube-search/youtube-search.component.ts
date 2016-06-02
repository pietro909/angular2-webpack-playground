import {Component, EventEmitter, OnInit, Input} from "@angular/core";
import {SearchResultComponent} from "./search-result.component.ts";
import {SearchBox} from "./search-box.component.ts";
import {ListMaxSize} from "../generic/list-max-size.component";
import {ProximitySelector, LocationData} from "../location/proximity-selector.component";
import {DescribeLocation} from "../location/describe-location.component";
import {Subject} from "rxjs/Subject";
import { Store } from '@ngrx/store';
import {CurrentSearch, SEARCH_OPTIONS} from "./search.reducer";
import { Action } from '@ngrx/store';

@Component({
    selector: 'youtube-search',
    directives: [SearchBox, SearchResultComponent, ListMaxSize, ProximitySelector, DescribeLocation],
    inputs: ['store'],
    outputs: [ ],
    template: `
    <div class="col-md-6">
        <div class="input-group input-group-lg">
        <h1></h1>
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

    @Input()
    store: Store<CurrentSearch>;

    setText(text: string) {
        this.store.dispatch({
            type: 'TEXT',
            payload: {
                text: text
            }
        })
    }

    setLocation(locationData: LocationData) {
        let message: Action;
        if (locationData === null) {
            message = {
                type: 'LOCATION',
                payload: {
                    latitude: null,
                    longitude:null
                }
            }
        } else {
            message= {
                type: 'LOCATION',
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
            type: 'RADIUS',
            payload: {
                radius: radius
            }
        });
    }

}
