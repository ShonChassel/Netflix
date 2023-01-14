import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/models/movie.model';
import { Observable, lastValueFrom, Subscription, switchMap } from 'rxjs';
import axios from '../../services/axios.service';

@Component({
  selector: 'movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // movie!: Movie;
  @Input() movie!: Movie | null;
    // movieDb!: Observable<Movie[]>;

  subscription!: Subscription;

  async ngOnInit(): Promise<void> {

    
    this.subscription = this.route.params.subscribe(async (params) => {
      const movieId = params['id'];
      
      if(!movieId){
        this.movieToDisplay();
        return
      }

       this.movieService.getById(movieId).subscribe((movie)=> {
        this.movie = movie;

      })
      // let movie = await lastValueFrom(this.movieService.getById(movieId));

    });
  }
  async movieToDisplay() {
    let randomNum: number = this.movieService.getRandomNum();

    const request = await axios.get(
      '/trending/all/week?api_key=818089ca50e2db994d4a5864de664559&language=en-US'
    );
    this.movie = request.data.results[randomNum];
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
}
