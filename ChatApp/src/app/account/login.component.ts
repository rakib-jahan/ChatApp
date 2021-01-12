import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService } from '../services/account.service';


@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  isError = false;
  returnUrl: string;
  errorMsg: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) {
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
      .subscribe(
        data => {          
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.isError = true;
          this.errorMsg = error.error.message;
          this.loading = false;
        });
  }

  onKeyUpEvent(event: any) {
    this.isError = false;
    this.errorMsg = '';
  }
}
