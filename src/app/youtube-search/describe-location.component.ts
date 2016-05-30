import {Component, OnInit} from "angular2/core";
import {LocationData} from "./proximity-selector.component";
import {Observable} from "rxjs/Observable";
import {LocationService} from "./location.service";



@Component({
    selector: 'describe-location',
    inputs: ['locationData'],
    template: `
    <p *ngIf="location">Within {{location.radius}}km from {{location.name}}</p>
    `
})
export class DescribeLocation implements OnInit {

    locationData: Observable<LocationData>;

    location: any = null;
    
    constructor(private locationService: LocationService) {}

    ngOnInit() {
        this.locationData
            .subscribe((locationData: LocationData) => {
                if (locationData) {
                    console.log(locationData);
                    // call GoogleAPI to detect place and return it
                    // todo: put this in a service
                    // https://maps.googleapis.com/maps/api/place/nearbysearch/output?parameters
                    // this.locationService.searchPlace(locationData)
                    this.location = {
                        radius : locationData.radius
                    }
                } else {
                    this.location = null;
                }
            })
    }

}
