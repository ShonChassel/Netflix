import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
@Component({
  selector: 'movie-preview',
  templateUrl: './movie-preview.component.html',
  styleUrls: ['./movie-preview.component.scss'],
})
export class MoviePreviewComponent implements OnInit {

  @Input() movie!: Movie;
  @Input() boolean!: boolean;
  @Output() onRemove = new EventEmitter <string>()

  ngOnInit(): void {
    console.log(this.boolean);
    
  }
  
  onRemoveMovie(ev: MouseEvent){
    ev.stopPropagation
    this.onRemove.emit(this.movie._id)
  }

  
}
