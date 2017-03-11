import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

import { Links } from '../directives/links.directive';
import { GenericInfo } from '../directives/generic-info.directive';
import { Api } from '../services/api.service';
import { _settings } from '../helpers/settings';

@Component({
	// providers: [Api],
	templateUrl: _settings.buildPath + 'bookDetail.template.html'
})

export class BookDetail implements OnInit, OnDestroy {
	bookData: Array<Object>;
	showLoader:Boolean =false
	private sub: any;

	constructor(
		private api: Api,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit() {
		this.showLoader = true;

		this.sub = this.route.params.subscribe(params => {
			let id = params['id'];

			this.api.getData('https://www.googleapis.com/books/v1/volumes/' + id + '?projection=full').subscribe(
				data => this.bookData = data,
				error => console.error('Error: ' + error),
				() => this.showLoader = false
			);
		});
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

	backToSearch() {
		this.router.navigate(['/bookslisting']);
	}
}
