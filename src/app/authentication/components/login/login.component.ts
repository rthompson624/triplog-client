import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { RootStoreState, AuthenticationStoreActions, AuthenticationStoreSelectors } from '../../../root-store';

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(
    private fb: FormBuilder,
    private store$: Store<RootStoreState.State>
  ) {
  }

  ngOnInit() {
    this.createLoginForm();
    this.isLoading$ = this.store$.select(AuthenticationStoreSelectors.selectIsLoading);
    this.error$ = this.store$.select(AuthenticationStoreSelectors.selectError);
  }

  onSubmit(): void {
    const email = <string>this.loginForm.controls['email'].value;
    const password = <string>this.loginForm.controls['password'].value;
    this.store$.dispatch(new AuthenticationStoreActions.LoginRequestAction({
      email: email,
      password: password
    }));
  }

  private createLoginForm(): void {
    this.loginForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      }
    );
  }

}
