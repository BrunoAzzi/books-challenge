import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { LocalStorage } from '../services/localStorage.service';

import { _settings } from '../helpers/settings';
import { Api } from '../services/api.service';

@Component({
	selector: 'favorite-box',
	inputs: ['bookData'],
	// directives: [ROUTER_DIRECTIVES],
	templateUrl: _settings.buildPath + '/directives/favorite-box.template.html'
})

export class FavoriteBox {

	constructor(
		private api: Api,
		private router: Router,
		private LS: LocalStorage
	) {}

	onSelect(bookId: string) {
		this.router.navigate(['/bookdetail', bookId]);
	}

}
