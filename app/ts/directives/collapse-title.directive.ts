import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { LocalStorage } from '../services/localStorage.service';

import { _settings } from '../helpers/settings';
import { Utils } from '../services/utils.service';

@Component({
	selector: 'collapse-title, [collapse-title]',
	inputs: ['imageLinks', 'volumeInfo', 'saleInfo', 'bookId'],
	// directives: [ROUTER_DIRECTIVES],
	templateUrl: _settings.buildPath + '/directives/collapse-title.template.html'
})

export class CollapseTitle {
	bookId: string;
	isVisible: Boolean;
	searchQuery: string;
	favorites: Array<string> = [];
	isFavorite: string = "";

	constructor(
		private router: Router,
		private LS: LocalStorage,
		private utils: Utils
	) {
		this.checkLSForData();
		this.isVisible = true;
	}

	ngOnInit() {
		this.checkFavorite(this.bookId);
	}

	toggleSection() {
		this.isVisible = !this.isVisible;
	}

	onSelect(bookId: string) {
		this.router.navigate(['/bookdetail', bookId]);
	}

	private checkLSForData() {
		let favorites = JSON.parse(this.LS.getValue('favorites'));
		let searchQuery = this.LS.getValue('searchQuery');

		console.log(favorites)

		if (!this.utils.isNullUndefined(favorites)) {
			this.utils.log('ls value obtained: ', favorites);
			this.favorites = favorites;
		}

		if (!this.utils.isNullUndefined(searchQuery)) {
			this.utils.log('ls value obtained: ', searchQuery);
			this.searchQuery = searchQuery;
		}
	}

	checkFavorite(bookId: string) {
		if (this.favorites.indexOf(bookId) > -1) {
			this.isFavorite = "is-favorite";
			console.log(bookId + "is a fucking favorite");
		}
	}

	toggleFavorites(bookId: string) {
		this.checkLSForData();
		if (!(this.favorites.indexOf(bookId) > -1)) {
			this.favorites.push(bookId);
			this.isFavorite = "is-favorite";
		} else {
			this.favorites.splice( this.favorites.indexOf(bookId), 1 );
			this.isFavorite = "";
		}
		this.LS.setValue({
			'favorites': JSON.stringify(this.favorites)
		});
	}

}
