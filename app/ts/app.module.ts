import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { Ng2PaginationModule } from 'ng2-pagination';

import { AppRoutingModule } from './routes';
import { Api } from './services/api.service';
import { LocalStorage } from './services/localStorage.service';
import { Utils } from './services/utils.service';

import { AppHeader } from './components/header.component';
import { App } from './components/app.component';
import { BooksListing } from './components/books-listing.component';
import { BookDetail } from './components/book-detail.component';
import { Favorites } from './components/favorites.component';

import { CollapseTitle } from './directives/collapse-title.directive';
import { FavoriteBox } from './directives/favorite-box.directive';
import { Links } from './directives/links.directive';
import { GenericInfo } from './directives/generic-info.directive';

import { HighlightPipe } from './helpers/highlight.pipe';

@NgModule({
  imports: [ BrowserModule, FormsModule, ReactiveFormsModule, Ng2PaginationModule, AppRoutingModule, HttpModule, JsonpModule ],
  declarations: [ AppHeader, App, BooksListing, BookDetail, CollapseTitle, Favorites, FavoriteBox, HighlightPipe, Links, GenericInfo ],
  providers: [ Api, LocalStorage, Utils, {provide: LocationStrategy, useClass: HashLocationStrategy} ],
  bootstrap: [ App ]
})

export class AppModule { }
