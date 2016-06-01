import {
    Component,
    EventEmitter,
} from '@angular/core';

export interface LocationData {
    latitude: number,
    longitude: number
}

@Component({
    selector: "proximity-selector",
    outputs: ["locationChange", "radiusChange"],
    inputs: ["defaultRadius"],
    template: `
    <div class="input-group">
        <label for="useLocation">Use current location</label>
        <input type="checkbox" 
            [disabled]="disabled"
            (change)="turnOnOffLocation($event)">
    </div>
    <div class="input-group">
        <label for="locationRadius">Radius</label>
        <input type="range" min="1" max="100" value="{{defaultRadius}}"
            [disabled]="!active" (change)="onRadius($event)"> 
    </div>
    `
})
export class ProximitySelector {

    disabled = true;

    active = false;

    defaultRadius: string;

    locationChange: EventEmitter<LocationData> = new EventEmitter<LocationData>();

    radiusChange: EventEmitter<number> = new EventEmitter<number>();

    constructor() {
        this.disabled = typeof navigator.geolocation === "undefined";
    }
    
    turnOnOffLocation($event: any) {
        this.active = $event.target.checked;
        if (this.active) {
            navigator.geolocation.getCurrentPosition((position: any) => {
                this.locationChange.next({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            });
         } else {
            this.locationChange.next(null);
        }
    }

    onRadius($event: any) {
        const radius = parseInt($event.target.value, 10);
        this.radiusChange.next(radius);
    }

}