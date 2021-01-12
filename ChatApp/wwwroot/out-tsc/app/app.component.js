import { __decorate } from "tslib";
import { Component } from '@angular/core';
let AppComponent = class AppComponent {
    constructor(accountService, router) {
        this.accountService = accountService;
        this.router = router;
        this.title = 'chat-app';
        this.accountService.user.subscribe(x => this.user = x);
    }
    logout() {
        this.accountService.logout();
        this.router.navigate(['/login']);
    }
};
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map