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

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  pipes: [ ],
  providers: [ ],
  directives: [ RouterActive, YoutubeSearchComponent, ResultsCounter ],
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('./app.css')
  ],
  template: `
    <header>
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <h1 class="pull-left">YouTube search component</h1>
                <results-counter class="pull-right"></results-counter>
            </div>
        </nav>
    </header>    
    <main>
        <youtube-search [store]="store" [results]="results"></youtube-search>
    </main>
  `
})

export class App {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  loading = false;
  name = 'Angular 2 Webpack Starter';
  url = 'https://twitter.com/AngularClass';

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
      console.log(state);
      if (state.location.latitude !== null) {
        const radius = state.radius | 50;
        this.youtube.setLocation({
          latitude: state.location.latitude,
          longitude: state.location.longitude
        }, radius);
      } else {
        this.youtube.unsetLocation();
      }
      this.youtube.searchName(state.text);
    });

    this.youtube.searchResults.subscribe((results: SearchResult[]) => this.results.next(results));

  }


}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
