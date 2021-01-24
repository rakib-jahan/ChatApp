import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError as observableThrowError, Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../models/user';
import { Router } from '@angular/router';


@Injectable()
export class AccountService {

    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private _http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    setUserInfo(user: User) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    public get getUserInfo(): User {
        return this.userSubject.value;
    }

    getUserDetail(userEmail: string) {
        return this._http.get<User>(`${window.location.origin}/users/${userEmail}`);
    }

    getAllUsers() {
        return this._http.get<User[]>(`${window.location.origin}/users/allUsers`);
    }

    login(userEmail: string) {
        return this._http.post<User>(`${window.location.origin}/users/authenticate?email=${userEmail}`, {})
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    register(user: User) {
        return this._http.post(`${window.location.origin}/users/register`, user);
    }

    logout() {
        localStorage.removeItem('user');
        this.userSubject.next(null);
    }
}
