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
  private currentOrder: any;

  createOrder(order: any): Observable<any> {
    return this._httpClient.post(Constants.apiRoot + 'order', order);
  }

  updateOrder(order: any): Observable<any> {
    return this._httpClient.put(Constants.apiRoot + 'order/' + order.user, order);
  }

  setOrderClient(order) {
    this.currentOrder = order;
    this.order.next(order);
  }

  hasOrder() {
    return !this.currentOrder.msg;
  }

  getOrderByClient(idClient: string): Observable<any> {
    return this._httpClient.get(Constants.apiRoot + 'order/' + idClient);
  }

  getAllMenus(): Observable<any> {
    return this._httpClient.get(Constants.apiRoot + 'menu');
  }

  getAllLocations(): Observable<any> {
    return this._httpClient.get(Constants.apiRoot + 'location');
  }

  getAllTurns(): Observable<any> {
    return this._httpClient.get(Constants.apiRoot + 'turn');
  }

  getAllGarnishes(): Observable<any> {
    return this._httpClient.get(Constants.apiRoot + 'garnish');
  }

  getAllIngredients(): Observable<any> {
    return this._httpClient.get(Constants.apiRoot + 'ingredients');
  }
}
