import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { headerInterface } from '../helpers/header-interface';
import { _settings } from '../helpers/settings';
import { LocalStorage } from '../services/localStorage.service';
import { Utils } from '../services/utils.service';

@Component({
	selector: 'app-header',
	providers: [LocalStorage, Utils],
	templateUrl: _settings.buildPath + 'header.template.html'
})

export class AppHeader {
	imgUrl: string;
	headerItems: headerInterface[] = [];

	constructor(
		private router: Router,
		private LS: LocalStorage,
		private utils: Utils
	) {
		this.headerItems = [
			{
				'name': 'resetBtn',
				'clickFunc': 'resetApp',
				'text': 'Reset app',
				'showBtn': true
			}, {
			'name': 'backBtn',
			'clickFunc': 'goBack',
			'text': 'Go back',
			'showBtn': false
		}];

		router.events.subscribe((event) => {
			if(event.constructor.name === 'NavigationEnd') {
				this.onRouteChange(event.url);
			}
		});
	}

	onRouteChange(val: string) {
		this.utils.log('headerChange: ', val);

		let routeName = val.match(/\/(.*?)\//);

		if(routeName) {
			switch (routeName[0]) {
				case '/bookdetail/':
					for (var key in this.headerItems) {
						if (this.headerItems[key].name === 'backBtn') {
							this.headerItems[key].showBtn = true;
						}
					}
					break;

				default:
					for (var key in this.headerItems) {
						if (this.headerItems[key].name === 'backBtn') {
							this.headerItems[key].showBtn = false;
						}
					}
					break;
			}
		} else {
			for (var key in this.headerItems) {
				if (this.headerItems[key].name === 'backBtn') {
					this.headerItems[key].showBtn = false;
				}
			}
		}
	}

	headerFunc($event: Event, funcName: string) {
		this.utils.log('headerFunc: ', funcName);
		this[funcName]($event);
	}

	goBack($event: Event) {
		this.utils.log('goBack');
		this.router.navigate(['/bookslisting']);
	}

	resetApp($event: Event) {
		this.utils.log('resetApp');
		this.LS.resetStorage();
		this.router.navigate(['/bookslisting']);
	}
}
