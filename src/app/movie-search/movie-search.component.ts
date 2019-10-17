import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Movie} from '../../models/movie';
import {MovieService} from '../movie.service';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';


@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit {
  movies$: Observable<Movie[]>;
  private searchedSubject = new Subject<string>();

  constructor(private movieService: MovieService) { }

  search(searchedString: string): void {
    console.log(`searchedString = ${searchedString}`);
    this.searchedSubject.next(searchedString);
  }
  ngOnInit() {
    this.movies$ = this.searchedSubject.pipe(
      debounceTime(300), // wait 300ms after each keystroke before considering the searched string
      distinctUntilChanged(), // ignore new string if same as previous string
      switchMap((searchedString: string) => this.movieService.searchMovies(searchedString))
    );
  }

}
