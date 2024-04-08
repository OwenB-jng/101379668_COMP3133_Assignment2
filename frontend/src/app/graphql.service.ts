import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GET_ALL_EMPLOYEES } from './graphql/queries';

@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  constructor(private apollo: Apollo) {}

  getAllEmployees(): Observable<any[]> {
    return this.apollo
      .watchQuery({
        query: GET_ALL_EMPLOYEES,
      })
      .valueChanges.pipe(
        map((result: any) => result?.data?.getAllEmployees)
      );
  }

  signup(username: string, email: string, password: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation Signup($username: String!, $email: String!, $password: String!) {
          signup(username: $username, email: $email, password: $password) {
            username
            email
            password
          }
        }
      `,
      variables: {
        username: username,
        email: email,
        password: password,
      },
    });
  }


  updateEmployee(employeeId: string, updateData: { first_name: string; last_name: string; email: string; gender: string; salary: number }) {
    return this.apollo.mutate({
      mutation: gql`
        mutation UpdateEmployee($id: ID!, $input: EmployeeInput!) {
          updateEmployee(id: $id, input: $input) {
            _id
            first_name
            last_name
            email
            gender
            salary
          }
        }
      `,
      variables: {
        id: employeeId,
        input: {
          first_name: updateData.first_name,
          last_name: updateData.last_name,
          email: updateData.email,
          gender: updateData.gender,
          salary: updateData.salary,
        },
      },
    });
  }


  addEmployee(employeeInput: { first_name: string; last_name: string; email: string; gender: string; salary: number }) {
    return this.apollo.mutate({
      mutation: gql`
        mutation AddEmployee($input: EmployeeInput!) {
          addEmployee(input: $input) {
            _id
            first_name
            last_name
            email
            gender
            salary
          }
        }
      `,
      variables: {
        input: employeeInput,
      },
    });
  }

  deleteEmployee(employeeId: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation DeleteEmployee($id: ID!) {
          deleteEmployee(id: $id) {
            _id 
          }
        }
      `,
      variables: {
        id: employeeId,
      },
    });
  }
  

  login(usernameOrEmail: string, password: string): Observable<any> {
    const LOGIN_QUERY = gql`
      query Login($usernameOrEmail: String!, $password: String!) {
        login(usernameOrEmail: $usernameOrEmail, password: $password) {
          id
          username
          # Add other fields you want to retrieve here, using correct comment syntax
        }
      }
    `;

    return this.apollo
      .query({
        query: LOGIN_QUERY,
        variables: {
          usernameOrEmail,
          password,
        },
      })
      .pipe(
        map((result: any) => result?.data?.login)
      );
  }
}
