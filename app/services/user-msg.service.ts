import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserMsgService {
  constructor() {}

  private _msg$ = new BehaviorSubject<string>('');
  public msg$ = this._msg$.asObservable();

  setMsg(msg: string) {
    this._msg$.next(msg);
    setTimeout(() => {
      this._msg$.next('');
    }, 1500);
  }
}
