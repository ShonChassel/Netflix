import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';
import { UserMsgService } from 'src/app/services/user-msg.service';

@Component({
  selector: 'movie-index',
  templateUrl: './movie-index.component.html',
  styleUrls: ['./movie-index.component.scss'],
})
export class MovieIndexComponent implements OnInit, OnDestroy {
  constructor(
    private movieService: MovieService,
    private userMsgService: UserMsgService
  ) {}

  moviesData!: Movie[];
  moviesTitles!: string[];
  movies$!: Observable<Movie[]>;
  boolean!: boolean[];

  subscription!: Subscription;

  ngOnInit(): void {
    this.boolean = this.getBoolean();
    this.moviesTitles = this.getTitle();
    this.movieService.query();
    this.movieService.movies$.subscribe((movies: Movie[]) => {
      this.moviesData = movies;
    });

    // this.onAddData();
  }

  onAddData() {}
  getBoolean() {
    return [ false, false,true, false, false, false, false, false];
  }

  getTitle() {
    return [
      'NETFLIX ORIGINALS',
      'Trending Now',
      'Top Rated',
      'Action Movies',
      'Comedy Movies',
      'Harrow Movies',
      'Romance Movies',
      'Documentaries',
    ];
  }

  onRemoveMovie(movieId: string) {
    this.movieService.remove(movieId);
    this.userMsgService.setMsg(`movie (${movieId}) remove`);
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }
}
