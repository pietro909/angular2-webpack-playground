import {
    Component,
    Injectable,
    bind,
    OnInit,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    Output
} from '@angular/core';
import {Observable} from "rxjs/Observable";
export interface LocationData {
    latitude: number,
    longitude: number,
    radius: number
}

@Component({
    selector: "proximity-selector",
    outputs: ["locationChange"],
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
            [disabled]="!active"
            [(ngModel)]="currentLocation.radius" (change)="setLocation()"> 
    </div>
    `
})
export class ProximitySelector {

    disabled = true;

    active = false;

    defaultRadius: string;

    @Input()
    currentLocation: LocationData = {
        latitude: null,
        longitude: null,
        radius: 50
    };

    locationChange: EventEmitter<LocationData> = new EventEmitter<LocationData>();

    private getCurrentPosition: () => any;

    constructor(private el: ElementRef) {
        if (typeof navigator.geolocation === "undefined") {
            this.disabled = true;
        } else{
            this.disabled = false;
        }
    }

    turnOnOffLocation($event: any) {
        this.active = $event.target.checked;
        if (this.active) {
            this.setLocation();
        } else {
            this.locationChange.next(null);
        }
    }

    setLocation() {
        navigator.geolocation.getCurrentPosition((position: any) => {
            this.currentLocation.latitude = position.coords.latitude;
            this.currentLocation.longitude = position.coords.longitude;
            this.locationChange.next(this.currentLocation);
        });
    }

}