import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import 'rxjs/add/operator/do';

import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Injectable()
export class HttpErrorResponseInterceptor implements HttpInterceptor {

    constructor(
        public toastController: ToastController
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).do(evt => {
            if (evt instanceof HttpResponse) {
                if (evt.body) {
                }
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                this.presentToast(err.error.msg);
                //Here you can manage errors by their 'Status Code'.
                //Read full list at: https://restfulapi.net/http-status-codes/
                if (err.status == 401) {
                    //Unauthorized
                    //Here is an message example using 'Toastr'. Must install it if choose to implement it.
                    // this.toastr.warningToastr('Acción no permitida', 'Cuidado')
                } else {
                    // this.toastr.errorToastr((err as any).error.message, 'Error');
                }
            }
        })
    }

    async presentToast(message) {
        const toast = await this.toastController.create({
            message: message,
            duration: 2000,
            color: 'primary'
        });
        toast.present();
    }
}