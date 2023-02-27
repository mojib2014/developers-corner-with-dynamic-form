import { Injectable } from "@angular/core";

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";

import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.auth.getToken();

    if (token) {
      console.log(
        "auth interceptor got called and added token================",
        token
      );
      // console.log('header: -----', req.headers.get('jwt'));

      // const authReq = req.clone({
      //   setHeaders: { Authorization: "Bearer " + token },
      // });

      return next.handle(req);
    } else return next.handle(req);
  }
}
