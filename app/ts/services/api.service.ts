import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Api {
	constructor(private http: Http) { }

	getData(url: string) {
		return this.http.get(url).map(response => {
			return response.json()
		});
	}
}
