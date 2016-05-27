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
        <label for="useLocation">Use current location</label>
        <input type="checkbox" (change)="setLocation($event)">
        <label for="locationRadius">Radius</label>
        <input type="range" min="1" max="100" value="{{defaultRadius}}" (change)="onLocationChange($event)">
    `
})
export class ProximitySelector {

    disabled = false;

    locationChange: EventEmitter<LocationData> = new EventEmitter<LocationData>();
    
    defaultRadius: string;

    private getCurrentPosition: () => any;
    
    private currentLocation: LocationData;

    constructor(private el: ElementRef) {
        if (typeof navigator.geolocation === "undefined") {
            this.disabled = true;
        }
    }

    setLocation($event: any) {
        if ($event.target.checked) {
            navigator.geolocation.getCurrentPosition((position: any) => {
                const radius = this.currentLocation && this.currentLocation.radius || this.defaultRadius;
                this.locationChange.next({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    radius: radius
                })
            })
        }
    }

    onLocationChange($event: any) {
        console.log($event.target.value);
    }

}