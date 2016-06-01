import {Component, OnInit} from "angular2/core";
import {LocationData} from "./proximity-selector.component";
import {Observable} from "rxjs/Observable";
import {LocationService} from "./location.service";

export interface LocationInfo extends LocationData {
    radius: number
}

@Component({
    selector: 'describe-location',
    inputs: ['locationData'],
    template: `
    <p *ngIf="location.name">Within {{location.radius}}km from {{location.name}}</p>
    `
})
export class DescribeLocation implements OnInit {

    locationData: Observable<LocationInfo>;

    location: any = {};

    constructor(private locationService: LocationService) {}

    ngOnInit() {
        this.locationData
            .subscribe((locationData: LocationInfo) => {
                if (locationData) {
                    this.location.radius = locationData.radius;
                    this.locationService.searchPlace(locationData)
                } else {
                    this.location = {};
                }
            });
        this.locationService.searchResults
            .subscribe((name) => this.location.name = name);
    }

}
