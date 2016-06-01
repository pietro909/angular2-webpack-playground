import {Component, Input, Output, OnInit} from "@angular/core";
import {SearchResult} from "./search-result.model.ts";
import {Observable, BehaviorSubject} from "rxjs/Rx";
import {ListMaxSize} from "./list-max-size.component";

export interface ListSize {
    defaultValue: number;
    min: number;
    max: number;
    step?: number;
}

@Component({
    inputs: ['results', 'listSize'],
    directives: [ListMaxSize],
    selector: 'search-result',
    template: `
    <div class="row">
        <div class="input-group input-group-lg">
           <list-max-size
            [sizes]="listSize"
            (size)="resizeList($event)"></list-max-size>
        </div>
    </div> 
    <div class="row">
        <div *ngFor="let video of videos.slice(0, maxListSize)"
            class="col-sm-6 col-md-3">
            <div class="thumbnail">
                <img src="{{video.thumbnailUrl}}">
                <div class="caption">
                    <h3>{{video.title}}</h3>
                    <p>{{video.description}}</p>
                    <p><a href="{{video.videoUrl}}"
                        class="betn betn-default" role="button">Watch</a></p>
                </div>
            </div>
        </div>
    </div>
    `
})

export class SearchResultComponent implements OnInit {

    @Input()
    results: Observable<SearchResult[]>;

    @Input()
    listSize: ListSize;

    videos: SearchResult[];

    maxListSize: number;

    ngOnInit() {
        this.maxListSize = this.listSize.defaultValue;
        this.results.subscribe((videos: SearchResult[]) => {
            this.videos = videos
        })
    }

    resizeList(size: number) {
        this.maxListSize = size;
    }

}
