import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class Randominterceptor implements HttpInterceptor {

    intercept(aRequest: HttpRequest<any>, aHandler: HttpHandler): any {
    console.log('data zapytania: ', new Date());
    console.log('adres: ', aRequest.url);
    return aHandler.handle(aRequest);
  }
}
