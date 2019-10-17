import { Component, OnInit, Input } from '@angular/core';
import {Movie} from '../../models/movie';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MovieService } from '../movie.service';
import {take, tap} from 'rxjs/operators';


@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  @Input() movie: Movie;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getMovieFromRoute();
  }

  getMovieFromRoute(): void {
    const  id = +this.route.snapshot.paramMap.get('id'); // dấu + ở trên chuyển string thành number
    console.log(`this.route.snapshot.paramMap = ${JSON.stringify(this.route.snapshot.paramMap)}`);
    // Call service to "get movie from id" ?
    this.movieService.getMovieFromId(id).subscribe(movie => this.movie = movie);
  }

  save(): void {
    this.movieService.updateMovie(this.movie).subscribe( () => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
