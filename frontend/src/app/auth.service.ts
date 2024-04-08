import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface User {
  _id: string;
  username: string;
}

export interface AuthResponse {
  user: User;
  token: string; 
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private apollo: Apollo) {}

  login(usernameOrEmail: string, password: string): Observable<AuthResponse> {
    const LOGIN_QUERY = gql`
      query Login($usernameOrEmail: String!, $password: String!) {
        login(usernameOrEmail: $usernameOrEmail, password: $password) {
          _id
          username
          password
        }
      }
    `;
  
    return this.apollo.watchQuery<{ login: AuthResponse | null }>({
      query: LOGIN_QUERY,
      variables: {
        usernameOrEmail,
        password
      },
      fetchPolicy: 'network-only' 
    }).valueChanges.pipe(
      map(response => {
        if (response.data && response.data.login) {
          return response.data.login;
        } else {
          throw new Error('Login data is not available');
        }
      })
    );
  }
}