import {Component} from "@angular/core";

@Component({
    outputs: ['loading', 'results'],
    selector: 'search-box',
    template: `
    <input type="text" class="fomr-control" placeholder="Search" autofocus>
    `
})

export class SearchBox implements OnInit {

    loading: EventEmitter<boolean> = new EventEmitter<boolean>();

    results: EventEmitter<SearchResults[]> = new EventEmitter<SearchResult[]>();

    constructor(public youtube: YuouTubeService,
                private el: ElementRef) {
                }

    ngOnInit(): void {
        Observable.fromEvent(this.el.nativeElement, 'keyup')
            .map((e: any) => e.target.value)
            .filter((text: string) => text.length > 2)
            .debounceTime(250)
            .do(() => this.loading.next(true))
            .map((query: string) => this.youtube.search(query))
            .switch()
            .subscribe(
                (results: SearchResults[]) => {
                    this.loading.next(false);
                    this.results.next(results);
                },
                (error: any) => {
                    console.log(error);
                    this.loading.next(false);
                },
                () => {
                    this.loading.next(false);
                }
            );
    }

}


