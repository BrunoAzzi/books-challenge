import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorage } from '../services/localStorage.service';

import { Links } from '../directives/links.directive';
import { GenericInfo } from '../directives/generic-info.directive';
import { Api } from '../services/api.service';
import { _settings } from '../helpers/settings';
import { Utils } from '../services/utils.service';

@Component({
	// providers: [Api],
	templateUrl: _settings.buildPath + 'favorites.template.html'
})

export class Favorites {

	favorites: Array<string> = [];
	favoritesData: Array<Object> = [];

	constructor(
		private api: Api,
		private LS: LocalStorage,
		private utils: Utils,
		private route: ActivatedRoute,
		private router: Router,
	) {
		this.checkLSForData();

		for ( let bookId of this.favorites) {
			this.api.getData('https://www.googleapis.com/books/v1/volumes/' + bookId + '?projection=full').subscribe(
					data => {
						this.favoritesData.push(data);
					},
					error => console.error('Error: ' + error)
				);
		}
	}

	private checkLSForData() {
		let favorites = JSON.parse(this.LS.getValue('favorites'));

		if (!this.utils.isNullUndefined(favorites)) {
			this.favorites = favorites;
		}
	}

	backToSearch() {
		this.router.navigate(['/bookslisting']);
	}
}
