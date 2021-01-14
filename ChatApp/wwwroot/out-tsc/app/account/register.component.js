import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
let RegisterComponent = class RegisterComponent {
    constructor(formBuilder, route, router, accountService) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.accountService = accountService;
        this.loading = false;
        this.submitted = false;
        this.isError = false;
        this.isSuccess = false;
        if (this.accountService.getUserInfo) {
            this.router.navigate(['/']);
        }
    }
    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]]
        });
    }
    get f() { return this.registerForm.controls; }
    onSubmit() {
        this.submitted = true;
        if (this.registerForm.invalid) {
            return;
        }
        this.loading = true;
        this.accountService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(data => {
            this.isSuccess = true;
            this.showMsg = 'User created';
            this.loading = false;
            this.showAlert = true;
            //this.router.navigate(['/login'], { relativeTo: this.route });
        }, error => {
            this.isError = true;
            this.showMsg = error.error.message;
            this.loading = false;
            this.showAlert = true;
        });
    }
    onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }
    closeAlert() {
        this.showAlert = !this.showAlert;
    }
};
RegisterComponent = __decorate([
    Component({ templateUrl: 'register.component.html' })
], RegisterComponent);
export { RegisterComponent };
//# sourceMappingURL=register.component.js.map