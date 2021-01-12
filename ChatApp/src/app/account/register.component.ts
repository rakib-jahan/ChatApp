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

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
  ) {
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
}
