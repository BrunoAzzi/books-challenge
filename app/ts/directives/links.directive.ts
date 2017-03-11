import {Component} from '@angular/core';
import { _settings } from '../helpers/settings';

@Component({
	selector: 'links, [links]',
	inputs: ['url', 'text'],
	templateUrl: _settings.buildPath + '/directives/links.template.html'
})

export class Links {}
