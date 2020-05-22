import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  //  it should send the request to that sign up url therefore we will need the httpclient to be injected.
  signup(email: string, password: string) {
    // tslint:disable-next-line:max-line-length
    // This interface we just generated between these angled brackets so that we inform typescript that this post request will yield as a response in which body we find data in this format.
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDpbMNSaO0FaHu31J5JBul6256nHi1jWHA',
      {
        email,
        password,
        returnSecureToken: true
      }
    );
  }
}
