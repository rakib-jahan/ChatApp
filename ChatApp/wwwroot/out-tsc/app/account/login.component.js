import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
let LoginComponent = class LoginComponent {
    constructor(formBuilder, route, router, accountService) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.accountService = accountService;
        this.loading = false;
        this.submitted = false;
        this.isError = false;
        this.showAlert = false;
        if (this.accountService.getUserInfo) {
            this.router.navigate(['/']);
        }
    }
    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            userEmail: ['', [Validators.required, Validators.email]]
        });
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }
    onSubmit() {
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
        this.accountService.login(this.f.userEmail.value)
            .pipe(first())
            .subscribe(data => {
            this.router.navigate([this.returnUrl]);
            this.showAlert = true;
        }, error => {
            this.isError = true;
            this.errorMsg = error.error.message;
            this.loading = false;
            this.showAlert = true;
        });
    }
    onKeyUpEvent(event) {
        this.isError = false;
        this.errorMsg = '';
    }
};
LoginComponent = __decorate([
    Component({ templateUrl: 'login.component.html' })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map