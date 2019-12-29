import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';

export class Authinterceptor implements HttpInterceptor {

    intercept(aRequest: HttpRequest<any>, aHandler: HttpHandler): any {
    const modyfRequest = aRequest.clone({headers: new HttpHeaders().set('Authorization', 'auhorization token')});
    return aHandler.handle(modyfRequest);
  }
}
