import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { UserService } from 'src/app/services/user.service';
import { Movie } from 'src/app/models/movie.model';
import { Observable, lastValueFrom, Subscription, switchMap } from 'rxjs';
import axios from '../../services/axios.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  constructor(
    private movieService: MovieService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    public sanitizer: DomSanitizer
  ) {}

  getMovieVideoResult: any;
  @Input() movie!: Movie;

  url: string = 'https://www.themoviedb.org/video/play?key=BRb4U99OU80';
  urlSafe!: SafeResourceUrl;
  // movie!: Movie;
  // movieDb!: Observable<Movie[]>;

  subscription!: Subscription;

  async ngOnInit(): Promise<void> {
    this.subscription = this.route.params.subscribe(async (params) => {
      const movieId = params['id'];
      this.getVideo(movieId);

      if (!movieId) {
        this.movieToDisplay();
        return;
      }

      this.movieService.getById(movieId).subscribe((movie) => {
        this.movie = movie;
      });
      // let movie = await lastValueFrom(this.movieService.getById(movieId));
    });
  }

  async movieToDisplay() {
    let randomNum: number = this.movieService.getRandomNum();

    const request = await axios.get(
      '/trending/all/week?api_key=818089ca50e2db994d4a5864de664559&language=en-US'
    );
    this.movie = request.data.results[randomNum];
    this.getVideo(this.movie.id);
  }

  onBack() {
    this.router.navigateByUrl('/');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  truncate(string: any, num: number) {
    return string?.length > num ? string.substring(0, num - 1) + '...' : string;
  }

  video() {
    let i = document.querySelector('.trailer_iframe');
  }

  getVideo(id: any) {
    this.movieService.getMovieVideo(id).subscribe((result) => {
      result.results.forEach((element: any) => {
        this.getMovieVideoResult = `https://www.themoviedb.org/video/play?key=${element.key}`;
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.getMovieVideoResult
        );

        // if (element.type == 'Trailer') {
        //   this.getMovieVideoResult = element.key;
        // }
      });
    });
  }

  addToList(movie: Movie) {
    console.log(movie);
    this.userService.addToWishlist(movie)
  }
}
