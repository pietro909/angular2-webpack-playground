import {
    Component,
    Injectable,
    bind,
    OnInit,
    ElementRef,
    EventEmitter,
    Inject
} from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

const YOUTUBE_API_KEY: string = "XXX_YOUR_KEY_HERE";
const YOUTUBE_API_URL: string = "https://www,googleapis.com/youtube/v3/search";

@Injectable()
export class YouTubeService {

    constructor( public http: Http,
                 @Inject(YOUTUBE_API_KEY) private apiKey: string,
                 @Inject(YOUTUBE_API_URL) private apiUrl: string) {
                 }

    search(query: string): Observable<SearchResult[]> {
        const params: string = [
            `q=${query}`,
            `key=${this.apiKey}`,
            `part=snippet`,
            `type=video`,
            `maxResults=10`
        ].join('&');
        const queryUrl: string = `${this.apiUrl}?${this.params}`;
        return this.http.get(queryUrl)
            .map((reponse: Response) => {
                return (<any>response.json()).items.map(item => {
                    return new SearchResult({
                        id: item.id.videoId,
                        title: item.snippet.title,
                        description: item.snippet.description,
                        thumbnailUrl: item.snippet.thumbnails.high.url
                    });
                });
            });
    }
}

export const youtubeServiceInjectables: Array<any> = [
    bind(YouTubeService).toClass(YouTubeService),
    bind(YOUTUBE_API_KEY).toValue(YOUTUBE_API_KEY),
    bind(YOUTUBE_API_URL).toValue(YOOUTUBE_API_URL)
]
