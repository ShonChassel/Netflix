import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';
import axios from '../../services/axios.service';

@Component({
  selector: 'top-ten',
  templateUrl: './top-ten.component.html',
  styleUrls: ['./top-ten.component.scss'],
})
export class TopTenComponent implements OnInit {
  constructor(private movieService: MovieService) {}

  // @Input() movies!: Movie | null;
  movies!: Movie[];
  imgsTopTen = this.getImgs();
  // movies$!: Observable<Movie[]>;

  ngOnInit(): void {
    this.movieToDisplay();
  }
  getImgs() {
    return [
      'https://res.cloudinary.com/dirvusyaz/image/upload/v1674832752/Netflix-0_gzjfmz.svg',
      'https://res.cloudinary.com/dirvusyaz/image/upload/v1674832752/Netflix-1_elz36g.svg',
      'https://res.cloudinary.com/dirvusyaz/image/upload/v1674832752/Netflix-2_hi8ufk.svg',
      'https://res.cloudinary.com/dirvusyaz/image/upload/v1674832752/Netflix-3_c4typd.svg',
      'https://res.cloudinary.com/dirvusyaz/image/upload/v1674835477/Netflix-10_kggk5g.svg',
      'https://res.cloudinary.com/dirvusyaz/image/upload/v1674834941/Netflix-4_qrqsmc.svg',
      'https://res.cloudinary.com/dirvusyaz/image/upload/v1674832752/Netflix-5_wzk7yv.svg',
      'https://res.cloudinary.com/dirvusyaz/image/upload/v1674832753/Netflix-6_nh0gyt.svg',
      'https://res.cloudinary.com/dirvusyaz/image/upload/v1674832753/Netflix-7_vcvwki.svg',
    ];
  }
  
  async movieToDisplay() {
    const request = await axios.get(
      '/movie/popular?api_key=818089ca50e2db994d4a5864de664559&language=en-US'
    );
    this.movies = request.data.results.splice(0, 9);
    // this.movies = request.data.results;
    console.log(this.movies);
  }
}
