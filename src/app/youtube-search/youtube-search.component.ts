import {Component} from "@angular/core";
import {SearchResultComponent} from "./search-result.component.ts";
import {SearchBox} from "./search-box.component.ts";
import {SearchResult} from "./search-result.model.ts";
import {YouTubeService} from "./youtube.service";
import {ListMaxSize} from "./list-max-size.component";
import {ProximitySelector, LocationData} from "./proximity-selector.component";

// const loadingGif: string = ((<any>window).__karma__) ? '' : require('assets/img/loading.gif');

const DEFAULT_VIDEO = 20;

@Component({
    selector: 'youtube-search',
    directives: [SearchBox, SearchResultComponent, ListMaxSize, ProximitySelector],
    template: `
    <div class="container">
        <div class="page-header">
            <h1>YouTube search
                <img
                    style="float: right;"
                    *ngIf="loading" />
                    <!--src={loadingGif}" />-->
            </h1>
        </div>
        <div class="row">
            <div class="input-group input-group-lg col-md-12">
                <search-box
                    (loading)="loading = $event"
                    (results)="updateResults($event)"
                    ></search-box>
            </div>
            <div class="input-group input-group-lg col-md-12">
               <list-max-size
                [defaultSize]="${DEFAULT_VIDEO}"
                (size)="resizeList($event)"></list-max-size>
            </div>
            <div class="input-group input-group-lg col-md-12">
                <proximity-selector
                    (locationChange)="setLocation($event)"
                    [defaultRadius]="50"></proximity-selector>
        </div>
        <div class="row">
            <search-result
                *ngFor="let result of results"
                [result]="result">
            </search-result>
        </div>
    </div>
    `
})

export class YoutubeSearchComponent {

    results: SearchResult[];

    private maxSize = DEFAULT_VIDEO;

    constructor(private youtube: YouTubeService) {}

    updateResults(results: SearchResult[]): void {
        this.results = results.slice(0, this.maxSize);
    }

    resizeList(maxSize: number): void {
        this.maxSize = maxSize;
        this.results = this.youtube.searchResults.getValue().slice(0, this.maxSize);
    }

    setLocation(locationData: LocationData) {
        console.log(locationData);
        this.youtube.searchLocation(locationData);
    }

}
