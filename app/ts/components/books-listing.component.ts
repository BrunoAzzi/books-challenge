import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';

import { searchModelInterface } from '../helpers/search-model-interface';
import { CollapseTitle } from '../directives/collapse-title.directive';

import { _settings } from '../helpers/settings';
import { Api } from '../services/api.service';
import { LocalStorage } from '../services/localStorage.service';
import { Utils } from '../services/utils.service';

@Component({
	templateUrl: _settings.buildPath + 'booksListing.template.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class BooksListing {
    currentPage: number = 1;
    itemsPerPage: number = 12;
    totalItems: number;

	pendingRequest: any;
	loading: Boolean;

	booksData: Observable<Array<Object>>;

	constructor(
		private api: Api,
		private fb: FormBuilder,
		private LS: LocalStorage,
		private router: Router,
		private utils: Utils
	) {
        this.checkLSForData();
	}

	public searchForm = this.fb.group({
		searchQuery: ['', Validators.required]
	})

	private checkLSForData() {
		let searchQuery = this.LS.getValue('searchQuery');

		if (!this.utils.isNullUndefined(searchQuery)) {
			this.searchForm.patchValue({searchQuery: searchQuery});
			this.searchBooks();
		}
	}

	searchBooks() {
        this.getPage(1);

		this.LS.setValue({
			'searchQuery': this.searchForm.controls.searchQuery.value,
		});
	}

    getPage(page) {
        this.loading = true;
        this.booksData = this.api.getData(
				'https://www.googleapis.com/books/v1/volumes?q=' + this.searchForm.controls.searchQuery.value +
				'&startIndex=' + (page - 1) * this.itemsPerPage +
				'&maxResults=' + this.itemsPerPage)
            .do(data => {
                this.totalItems = data.totalItems;
                this.currentPage = page;
                this.loading = false;
            }).map(data => data.items);
    }

	openFavorites() {
		this.router.navigate(['/favorites']);
	}
}
