import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';
import { Observable} from 'rxjs';
import { of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap} from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private moviesURL = 'http://localhost:3000/movies';

  getMovies(): Observable<Movie[]> {
    // this.messageService.add(`${new Date().toLocaleString()}. Get movie list`);
    // return of(fakeMovies);
    return this.http.get<Movie[]>(this.moviesURL).pipe(
      tap(receivedMovies => console.log(`receivedMovies = ${JSON.stringify(receivedMovies)}`)),
      catchError(error => of([]))
    );
  }

  getMovieFromId(id: number): Observable<Movie> {
    // return of(fakeMovies.find(movie => movie.id === id));
    const url = `${this.moviesURL}/${id}`;
    return this.http.get<Movie>(url).pipe(
      tap(selectedMovie => console.log(`selectedMovies = ${JSON.stringify(selectedMovie)}`)),
      catchError(error => of(new Movie()))
    );
  }

  // PUT: update the movie on the server
  updateMovie(movie: Movie): Observable<any> {
    return this.http.put(`${this.moviesURL}/${movie.id}`, movie, httpOptions).pipe(
      tap(updatedMovie => console.log(`updatedMovie = ${JSON.stringify(updatedMovie)}`)),
      catchError(error => of(new Movie()))
    );
  }

  // POST: add a new movie to the server
  addMovie(newMovie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.moviesURL, newMovie, httpOptions).pipe(
      tap(movie => console.log(`inserted movie = ${JSON.stringify(movie)}`)),
      catchError(error => of(new Movie()))
    );
  }

  // DELETE

  deleteMovie(movieId: number): Observable<Movie> {
    const url = `${this.moviesURL}/${movieId}`;
    return this.http.delete<Movie>(url, httpOptions).pipe(
      tap(_ => console.log(`Deleted movie with id = ${movieId}`)),
      catchError(error => of(null))
    );
  }

  // Search
  searchMovies(search: string): Observable<Movie[]> {
    if (!search.trim()) {
      return of(null);
    }
    return this.http.get<Movie[]>(`${this.moviesURL}?name_like=${search}`).pipe(
      tap(foundedMovies => console.log(`founded movies = ${JSON.stringify(foundedMovies)}`)),
      catchError(error => of(null))
    );
  }
  constructor(
    public messageService: MessageService,
    public http: HttpClient
  ) { }
}
