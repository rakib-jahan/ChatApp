import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
let RegisterComponent = class RegisterComponent {
    constructor(formBuilder, route, router, accountService) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.accountService = accountService;
        this.loading = false;
        this.submitted = false;
        // redirect to home if already logged in
        // if (this.accountService.userValue) {
        //     this.router.navigate(['/']);
        // }
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
        //this.accountService.register(this.form.value)
        //  .pipe(first())
        //  .subscribe(
        //    data => {
        //      this.alertService.success('Registration successful', { keepAfterRouteChange: true });
        //      this.router.navigate(['../login'], { relativeTo: this.route });
        //    },
        //    error => {
        //      this.alertService.error(error);
        //      this.loading = false;
        //    });
    }
    onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }
};
RegisterComponent = __decorate([
    Component({ templateUrl: 'register.component.html' })
], RegisterComponent);
export { RegisterComponent };
//# sourceMappingURL=register.component.js.map