import {Component} from "@angular/core";

@Component({
    selector: 'youtube-search',
    directives: [SearchBox, SearchResultComponent].
    template: `
    <div class="container">
        <div class="page-header">
            <h1>YouTube search
                <img
                    style="float: right;"
                    *ngIf="loading"
                    src="${loadingGif}" />
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
    </div>
    `
})

export class YoutubeSearchComponent {

    results: SearchResult[];

    updateResults(results: SearchResult[]): void {
        this.results = results;
    }

}
