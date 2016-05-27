import {
    Component,
    Injectable,
    bind,
    OnInit,
    ElementRef,
    EventEmitter,
    Inject
} from '@angular/core';
import {Observable} from "rxjs/Observable";

@Component({
    selector: "list-max-size",
    inputs: ["defaultSize"],
    outputs: ["size"],
    template: `
    <label for="showMax">Max video to show</label>
    <input id="showMax" type="number" min="0" max="50" value="{{defaultSize}}" >
    `
})
export class ListMaxSize implements OnInit {
    
    size: EventEmitter<number> = new EventEmitter<number>();
    
    constructor(private el: ElementRef) {}
    
    ngOnInit() {
        Observable.fromEvent(this.el.nativeElement, "change")
            .map(($event: any) => $event.target.value)
            .subscribe((limit: number) => this.size.next(limit));
    }
}


