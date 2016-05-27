import {Component} from "@angular/core";
import {SearchResultComponent} from "./search-result.component.ts";
import {SearchBox} from "./search-box.component.ts";
import {SearchResult} from "./search-result.model.ts";
import {YouTubeService} from "./youtube.service";

// const loadingGif: string = ((<any>window).__karma__) ? '' : require('assets/img/loading.gif');

const DEFAULT_VIDEO = 20;

@Component({
    selector: 'youtube-search',
    directives: [SearchBox, SearchResultComponent],
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
                    (laoding)="loading = $event"
                    (results)="updateResults($event)"
                    ></search-box>
            </div>
            <div class="input-group input-group-lg col-md-12">
                <label for="showMax">Max video to show</label>
                <input id="showMax" type="number" min="0" max="50" value="${DEFAULT_VIDEO}" (change)="resizeList($event)">
            </div>
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

    resizeList($event: MouseEvent): void {
        this.maxSize = $event.srcElement.value;
        this.results = this.youtube.searchResults.getValue().slice(0, this.maxSize);
    }

}
