import {Component, OnInit} from '@angular/core';
import {YouTubeService} from './youtube.service';
import {SearchResult} from "./search-result.model";

@Component({
    selector: 'results-counter',
    template: `
    <nav class="navbar navbar-default">
    <div class="container-fluid">
        <p class="navbar-text navbar-right">
            <button class="btn-primary" type="button">
                Found <span class="badge">{{unreadMessagesCount}}</span> videos
            </button>
        </p>
    </div>
    </nav>
    `
})
export class ResultsCounter implements OnInit {

    unreadMessagesCount: number;

    constructor(public youtube: YouTubeService) {
    }

    ngOnInit(): void {
        this.youtube.searchResults
            .subscribe((results: SearchResult[]) => {
                // results.map((r:SearchResult) => console.log(r.id));
                this.unreadMessagesCount = results.length;
            });
    }
}
