import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
// import axios from '../../services/axios.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  constructor(private movieService: MovieService) {}

  @Input() movies!: any;
  // @Input() fetchUrl!: string;
  @Input() title!: string;
  @Input() boolean!: boolean;
  @Output() onRemove = new EventEmitter<string>();

  ngOnInit(): void {
    console.log('movies', this.movies);

    //   this.movieService.query()
    //   this.getMovies()
  }

  async getMovies() {
    // const request = await axios.get(this.fetchUrl);
    // this.movies = request.data.results
    // this.movieService.addMovieToArray(this.movies)
  }
}
