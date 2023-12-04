import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { LoaderService } from 'src/app/components/loader/loader.service';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    public loaderService: LoaderService,
    private authService: AuthService
  ) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loaderService.show();
    if (req.url.includes(environment.API)) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${this.authService.returnToken()}` }
      });
    }

    return next.handle(req).pipe(finalize(() => this.loaderService.hide()));
  }
  
}
