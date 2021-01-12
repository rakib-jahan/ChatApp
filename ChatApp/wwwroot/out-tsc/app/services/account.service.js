import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
let AccountService = class AccountService {
    constructor(router, _http) {
        this.router = router;
        this._http = _http;
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }
    setUserInfo(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }
    get getUserInfo() {
        return this.userSubject.value;
    }
    getUserDetail(userEmail) {
        return this._http.get(`${window.location.origin}/users/${userEmail}`);
    }
    login(userEmail) {
        return this._http.post(`${window.location.origin}/users/authenticate?userEmail=${userEmail}`, {})
            .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
            return user;
        }));
    }
    register(user) {
        return this._http.post(`${window.location.origin}/users/register`, user);
    }
    logout() {
        localStorage.removeItem('user');
        this.userSubject.next(null);
    }
};
AccountService = __decorate([
    Injectable()
], AccountService);
export { AccountService };
//# sourceMappingURL=account.service.js.map