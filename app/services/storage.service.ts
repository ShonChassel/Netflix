import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  public query(entityType: any, delay = 300) {
    var entities = localStorage.getItem(entityType) || [];
    return new Promise((resolve) => setTimeout(() => resolve(entities), delay));
  }

  public post(entityType: any, newEntity: any, append = true) {
    console.log('entityType', entityType);
    console.log('newEntity', newEntity);
    
    newEntity._id = this._makeId();
    return this.query(entityType).then((entities: any) => {
      append ? entities.unshift(newEntity) : entities.unshift(newEntity);
      this._save(entityType, entities);
      return newEntity;
    });
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

  private _save(entityType: any, entities: any) {
    localStorage.setItem(entityType, JSON.stringify(entities));
  }
}
