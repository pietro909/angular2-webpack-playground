import {
    Component,
    Injectable,
    bind,
    OnInit,
    ElementRef,
    EventEmitter,
    Inject
} from '@angular/core';
import {SearchResult} from "./search-result.model.ts";
import {Observable} from "rxjs";
import {YouTubeService} from "./youtube.service.ts";

@Component({
    outputs: ['textChange'],
    selector: 'search-box',
    template: `
    <input type="text" class="form-control" placeholder="Search" autofocus>
    `
})

export class SearchBox implements OnInit {

    textChange: EventEmitter<string> = new EventEmitter<string>();

    constructor(private el: ElementRef) {}

    ngOnInit(): void {
        Observable.fromEvent(this.el.nativeElement, 'keyup')
            .map((e: any) => e.target.value)
            .filter((text: string) => text.length > 2)
            .debounceTime(250)
            .subscribe((text: string) => this.textChange.next(text));
    }

}


