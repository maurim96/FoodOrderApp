import { Constants } from './../constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
      private _httpClient: HttpClient
  ) { }
  private order = new BehaviorSubject<any>(null);
  order$ = this.order.asObservable();   

  getOrderByClient(idClient: string) : Observable<any> {
    return this._httpClient.get(Constants.apiRoot + 'order/' + idClient);
  }

  setOrderClient(order) {
    this.order.next(order);
  }

  getAllMenus() : Observable<any> {
    return this._httpClient.get(Constants.apiRoot + 'menu');
  }
  
  getAllLocations() : Observable<any> {
    return this._httpClient.get(Constants.apiRoot + 'location');
  }

  getAllTurns() : Observable<any> {
    return this._httpClient.get(Constants.apiRoot + 'turn');
  }

  getAllGarnishes() : Observable<any> {
    return this._httpClient.get(Constants.apiRoot + 'garnish');
  }
  
  getAllIngredients() : Observable<any> {
    return this._httpClient.get(Constants.apiRoot + 'ingredients');
  }
}
