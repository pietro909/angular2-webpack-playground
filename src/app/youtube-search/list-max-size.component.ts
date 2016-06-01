import {
    Component,
    EventEmitter, Input, Output
} from '@angular/core';

@Component({
    selector: "list-max-size",
    inputs: ["sizes"],
    outputs: ["size"],
    template: `
    <label for="showMax">Max video to show</label>
    <input id="showMax" type="number" 
        min="{{sizes.min}}" max="{{sizes.max}}" value="{{sizes.defaultValue}}" 
        (click)="changeMax($event)">
    `
})
export class ListMaxSize {

    @Input()
    sizes: ListMaxSize;

    // @Output()
    size: EventEmitter<number> = new EventEmitter<number>();

    changeMax($event: any) {
        const value = parseInt($event.target.value, 10);
        this.size.emit(value);
    }

}


