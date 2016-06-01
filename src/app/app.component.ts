/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { RouteConfig, Router } from '@angular/router-deprecated';

import { AppState } from './app.service';
import { Home } from './home';
import { RouterActive } from './router-active';
import {YoutubeSearchComponent} from "./youtube-search/youtube-search.component.ts";
import {YouTubeService} from "./youtube-search/youtube.service.ts";
import {ResultsCounter} from "./youtube-search/results-counter.component";
import { Action } from '@ngrx/store';
import {CurrentSearch} from "./search.reducer";
import { Store } from '@ngrx/store';
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {SearchResult} from "./youtube-search/search-result.model";
import {stat} from "fs";
import {SearchResultComponent, ListSize} from "./youtube-search/search-result.component";
import {LocationInfo, DescribeLocation} from "./location/describe-location.component";

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  pipes: [ ],
  providers: [ ],
  directives: [ RouterActive, YoutubeSearchComponent, ResultsCounter, SearchResultComponent, DescribeLocation ],
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('./app.css')
  ],
  template: `
    <header>
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <describe-location [locationData]="currentLocation"></describe-location>
                <h1 class="pull-left">YouTube search component</h1>
                <results-counter 
                    [results]="results"
                    class="pull-right"></results-counter>
            </div>
        </nav>
    </header>    
    <main>
        <div class="container">
            <div class="row">
                <youtube-search [store]="store" ></youtube-search>
            </div>
            <div class="row">
                <search-result
                    [results]="results" [listSize]="listSize">
                </search-result>
            </div>
        </div>
    </main>
  `
})

export class App {
  loading = false;
  name = 'Angular 2 Webpack Starter';
  url = 'https://twitter.com/AngularClass';
  
  listSize: ListSize = {
    defaultValue: 20,
    min: 0,
    max: 50
  }
  
  currentLocation: BehaviorSubject<LocationInfo> = new BehaviorSubject<LocationInfo>(null);

  results: BehaviorSubject<SearchResult[]> = new BehaviorSubject<SearchResult[]>([]);
  
  private currentSearch: Observable<CurrentSearch>;

  constructor(
      public youtube: YouTubeService,
      public store: Store<CurrentSearch>) {
    this.currentSearch = this.store.select('currentSearch');

  }

  ngOnInit() {

    // this is the HUB dispatching messages
    this.currentSearch.subscribe((state: CurrentSearch) => {
      if (state.location.latitude !== null) {
        const radius = state.radius || 50;
        this.youtube.setLocation({
          latitude: state.location.latitude,
          longitude: state.location.longitude
        }, radius);
        this.currentLocation.next({
          latitude: state.location.latitude,
          longitude: state.location.longitude,
          radius: radius
        });
      } else {
        this.currentLocation.next(null);
        this.youtube.unsetLocation();
      }
      this.loading = true;
      this.youtube.searchName(state.text);
    });

    this.youtube.searchResults.subscribe((results: SearchResult[]) => {
      this.loading = false;
      this.results.next(results)
    });

  }

}
