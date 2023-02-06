import { Injectable } from '@angular/core';
import { Movie, User } from '../models/movie.model';
import { StorageService } from './storage.service';
import usersJson from '../data/users.json';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private storageService: StorageService) {}

  private _usersData: User[] = usersJson;

  public login(userCred: User) {
    let users: User[] = [];
    let usersData = localStorage.getItem('users');

    if (!usersData) {
      localStorage.setItem('users', JSON.stringify(this._usersData));
      usersData = localStorage.getItem('users');
    }

    if (typeof usersData === 'string') {
      users = JSON.parse(usersData);
    }

    const user = users.find((user) => user.password === userCred.password);
    this._saveLoggedInUser(user);
    return user;
  }

  public signup(userCred: User) {
    let user = this._setUser(userCred);
    this._usersData.push(user);
    localStorage.setItem('users', JSON.stringify(this._usersData));
  }

  private _setUser(user: any) {
    user = {
      _id: this._makeId(),
      name: user.name,
      email: user.email,
      wishlist: [],
      password: user.password,
      imgUrl:
        'https://res.cloudinary.com/dirvusyaz/image/upload/v1675602598/user_afazxl.png',
    };

    this._saveLoggedInUser(user)
    return user;
  }

  private _saveLoggedInUser(user: any) {
    sessionStorage.setItem('loggedinUser', JSON.stringify(user));
    return user;
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

  public logout() {
    sessionStorage.removeItem('loggedinUser');
  }

  public getLoggedinUser() {
    return sessionStorage.getItem('loggedinUser');
  }

  public addToWishlist(movie: Movie) {
    let loggedinUser: any = this.getLoggedinUser();

    if (typeof loggedinUser === 'string') {
      loggedinUser = JSON.parse(loggedinUser);
    }


    loggedinUser.wishlist.push(movie);
    this._saveLoggedInUser(loggedinUser)
  }
}
