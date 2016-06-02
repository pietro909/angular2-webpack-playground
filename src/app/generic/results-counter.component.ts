import {Component, OnInit, Input} from '@angular/core';
import {Observable} from "rxjs/Rx";

/**
 * Shows a badge with the size of resuls
 */
@Component({
    selector: 'results-counter',
    inputs: [ 'results' ],
    template: `
        <div class="btn-primary" type="button">
            Found <span class="badge">{{unreadMessagesCount}}</span> videos
        </div>
    `
})
export class ResultsCounter implements OnInit {
    
    @Input()
    results: Observable<any[]>;

    unreadMessagesCount: number;

    ngOnInit(): void {
        this.results
            .subscribe((results: any) => this.unreadMessagesCount = results.length);
    }

}
