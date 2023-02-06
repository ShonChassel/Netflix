import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieFilter } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'movie-filter',
  templateUrl: './movie-filter.component.html',
  styleUrls: ['./movie-filter.component.scss'],
})
export class MovieFilterComponent implements OnInit, OnDestroy {
  constructor(private movieService: MovieService) {}

  movieFilter!: MovieFilter;
  subscription!: Subscription;

  filterOpen = false

  ngOnInit(): void {
   this.subscription = this.movieService.MovieFilter$.subscribe(movieFilter =>{
      this.movieFilter = movieFilter
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  onSetFilter(){
    this.movieService.setFilter({...this.movieFilter})
    // this.movieService.query();
  }

  openFilter(){
    this.filterOpen = !this.filterOpen
    console.log('this.filterOpen' ,this.filterOpen);
  }

}
