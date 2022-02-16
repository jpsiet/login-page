import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, Observable, of, throwError } from "rxjs";
import { LocalLoginValidationService } from "../services/local-login-validation.service";

@Injectable()
export class FakeLoginInterceptor implements HttpInterceptor {
  // default employes json path

  constructor(private http: HttpClient, private loginValidationService: LocalLoginValidationService) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.handleRequests(req, next);
  }
  /**
   * Handle request's and support with mock data.
   * @param req
   * @param next
   */
  handleRequests(req: HttpRequest<any>, next: HttpHandler): any {
    const { url, method } = req;
    if (url.endsWith("/login") && method === "POST") {
      if (this.loginValidationService.validateUser(req.body)) {
        // delay just to test loading logic
        return of(new HttpResponse({ status: 200, statusText: "success", body: "success" })).pipe(delay(500));
      } else {
        return throwError(() => {
          return new HttpErrorResponse({ status: 400, error: { message: this.loginValidationService.getErrormsg } });
        }
        );
      }
    }
    // if there is not any matches return default request.
    return next.handle(req);
  }
  /**
   * Get Employee unique uuid from url.
   * @param url
   */

}


/**
 * Mock backend provider definition for app.module.ts provider.
 */
export const fakeLoginProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeLoginInterceptor,
  multi: true,
};
