import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService } from '../services/account.service';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {

    loading = false;
    submitted = false;
    registerForm: FormGroup;
    isError = false;
    showMsg: string;
    isSuccess = false;
    showAlert: boolean;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
    ) {
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
            .subscribe(
                data => {
                    this.isSuccess = true;
                    this.showMsg = 'User created';
                    this.loading = false;
                    this.showAlert = true;
                    //this.router.navigate(['/login'], { relativeTo: this.route });
                },
                error => {
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
}
