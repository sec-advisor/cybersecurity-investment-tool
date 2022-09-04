import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';

import { User } from '../../../../libs/api-interfaces';
import { httpOptions } from '../../constants/http-options.constants';
import { publicAPIUrl } from '../../constants/public-api-url';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(
    private http: HttpClient,
  ) { }

  signUp(username: string, password: string): Observable<User> {
    return this.http
      .post<User>(
        `${publicAPIUrl}/users/signup`,
        { username, password },
        httpOptions
      )
      .pipe(
        catchError((err) =>
          of({} as User).pipe(
            tap(() => console.error(err.error.message))
          )
        )
      );
  }

  login(username: string, password: string): Observable<User> {
    return this.http
      .post<User>(
        `${publicAPIUrl}/users/login`,
        { username, password },
        httpOptions
      );
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${publicAPIUrl}/users/logout`, undefined, httpOptions);
  }

  isActive(): Observable<boolean> {
    return this.http.get<boolean>(`${publicAPIUrl}/users/is-active`, httpOptions);
  }

}
