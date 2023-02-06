import { Component, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Movie, MovieFilter } from '../models/movie.model';
import movieJson from '../data/movie.json';
import axios from '../services/axios.service';
import requests from './requests.service';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  private _movieData: Movie[] = [];

  private _movies$ = new BehaviorSubject<Movie[]>([]);
  public movies$ = this._movies$.asObservable();

  private _movieFilter$ = new BehaviorSubject<MovieFilter>({ term: '' });
  public MovieFilter$ = this._movieFilter$.asObservable();

  public query() {
    if (!this._movieData.length) {
      this.getData();
    }

    const filterBy = this._movieFilter$.value;
    let filteredMovies = [] as Movie[];
     filteredMovies = this._movieData
      .flat()
      .filter((obj: Movie) => obj.title === filterBy.term) as Movie[];

    

    if (!filteredMovies.length) {
      filteredMovies = this._movieData;
    }
    
    
    // filteredMovies = [[...filteredMovies]]
    this._movies$.next(filteredMovies);
  }
  
  public getEmptyMovie() {
    return { name: '', age: 0 };
  }

  public remove(MovieId: string) {
    const movies = this._movieData;
    const movieIdx = movies.findIndex((movie) => movie._id === MovieId);
    movies.splice(movieIdx, 1);
    this._movies$.next(movies);
    return of({});
  }

  public getById(movieId: number): Observable<Movie> {
    // console.log('movieId in service', movieId);
    // console.log('this._movieData', this._movieData);
    let res;
    for (let i = 0; i < this._movieData.length; i++) {
      const moviesList = this._movieData[i];
      for (const [key, value] of Object.entries(moviesList)) {
        if (value.id == movieId) {
          res = value;
        }
      }
    }

    // const movie = this._movieData.find((movie) => {
    //   // movie.length;
    //   // return movie.id == movieId;
    // });

    return res ? of({ ...res }) : of();
  }

  public save(movie: Movie) {
    return movie._id ? this._edit(movie) : this._add(movie);
  }

  public setFilter(movieFilter: MovieFilter) {

    this._movieFilter$.next(movieFilter);
    this.query();
  }

  private _add(movie: Movie) {
    movie._id = this._makeId();
    this._movieData.push(movie);
    this._movies$.next(this._movieData);
    return of(movie);
  }

  private _edit(movie: Movie) {
    const movies = this._movieData;
    const movieIdx = movies.findIndex((_movie) => _movie._id === movie._id);
    movies.splice(movieIdx, 1, movie);
    this._movies$.next(movies);
    return of(movie);
  }

  private _makeId(length = 5) {
    var text = '';
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  public getRandomNum(length = 1) {
    var text = '';
    var possible = '0123456789';
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return JSON.parse(text);
  }

  public getRequests() {
    const API_KEY = '818089ca50e2db994d4a5864de664559';
    return {
      fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
      fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
      fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
      fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
      fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
      fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
      fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
      fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
    };
  }

  public getData() {
    for (const [key, value] of Object.entries(this.getRequests())) {
      this.getMovie(value);
    }
  }

  public async getMovie(fetchUrl: string) {
    const request = await axios.get(fetchUrl);
    let movies = request.data.results;
    this._movieData.push(movies);
  }

  getMovieVideo(data: any): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/movie/${data}/videos?api_key=818089ca50e2db994d4a5864de664559&language=en-US`)
  }

  saveMovies(){
  }

}



