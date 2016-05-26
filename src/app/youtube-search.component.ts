import {Component} from "@angular/core";
import {SearchResultComponent} from "./search-result.component";
import {SearchBox} from "./search-box.component";
import {SearchResult} from "./search-result.model";

// const loadingGif: string = ((<any>window).__karma__) ? '' : require('assets/img/loading.gif');

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

    updateResults(results: SearchResult[]): void {
        this.results = results;
    }

}
