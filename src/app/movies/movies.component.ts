import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { fakeMovies } from '../fake-movies';
import {MovieService} from '../movie.service';
import {Observable} from 'rxjs';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  constructor(private movieService: MovieService, private messageService: MessageService) {

  }


  movies: Movie[];

  getMoviesFromService(): void {
    this.movieService.getMovies().subscribe(updatedMovies => {
        this.movies = updatedMovies;
        console.log(`this.movies = ${JSON.stringify(this.movies)}`);
      }
    );
  }
  // add new movie
  add(name: string, releaseYear: number) {
    name = name.trim();
    if (Number.isNaN(Number(releaseYear)) || !name || Number(releaseYear) === 0 ) {
      alert('Name must not be blank, Realease Year must be a number');
      return;
    }
    const newMovie: Movie = new Movie();
    newMovie.name = name;
    newMovie.releaseYear = releaseYear;
    this.movieService.addMovie(newMovie).subscribe(insertedMovie => {
        this.movies.push(insertedMovie);
      });
  }

  delete(movieId: number): void {
    this.movieService.deleteMovie(movieId).subscribe(_ => {
      this.movies = this.movies.filter(eachMovie => eachMovie.id !== movieId);
    });
  }

  ngOnInit() {
    this.getMoviesFromService();
  }
}
