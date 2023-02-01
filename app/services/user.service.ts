import { Injectable } from '@angular/core';
import { User } from '../models/movie.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private storageService: StorageService) {}

  private _usersData: User[] = [];

  public getById(user: object) {
    console.log('user', user);
    const users: any = localStorage.getItem('user');
  }

  public signup(userCred: User) {
    console.log(userCred);
    if(!userCred.name){
      var users =  localStorage.getItem('users');
      users = JSON.parse(users as string)
      // const user = users.find(user => user.username === userCred.username)
      
    }

    if (!userCred.imgUrl) {
      userCred.imgUrl =
        'http://occ-0-1853-1168.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABY5cwIbM7shRfcXmfQg98cqMqiZZ8sReZnj4y_keCAHeXmG_SoqLD8SXYistPtesdqIjcsGE-tHO8RR92n7NyxZpqcFS80YfbRFz.png?r=229';
    }

    this._usersData.unshift(userCred);
    localStorage.setItem('users', JSON.stringify(this._usersData));

    this._saveLocalUser(userCred);
  }

  public getLoggedinUser() {
    return sessionStorage.getItem('loggedinUser');
  }

  private _saveLocalUser(user: any) {
    user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      imgUrl: user.imgUrl,
    };
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
}
