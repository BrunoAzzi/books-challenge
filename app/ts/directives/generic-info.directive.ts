import {Component} from '@angular/core';
import { _settings } from '../helpers/settings';

@Component({
	selector: 'book-info, [book-info]',
	inputs: ['data', 'text'],
	templateUrl: _settings.buildPath + '/directives/generic-info.template.html'
})

export class GenericInfo { }
