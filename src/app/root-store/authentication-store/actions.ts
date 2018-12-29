import { Action } from '@ngrx/store';
import { AuthResponse } from '../../core/models/auth-response.model';
import { User } from '../../core/models/user.model';

export enum ActionTypes {
  CREATE_ACCOUNT_REQUEST = '[authentication] Create account',
  CREATE_ACCOUNT_FAILURE = '[authentication] Create account (failure)',
  CREATE_ACCOUNT_SUCCESS = '[authentication] Create account (success)',
  LOGIN_REQUEST = '[authentication] Login',
  LOGIN_FAILURE = '[authentication] Login (failure)',
  LOGIN_SUCCESS = '[authentication] Login (success)',
  LOGOUT_REQUEST = '[authentication] Logout',
  LOGOUT_SUCCESS = '[authentication] Logout (success)',
  RESTORE_AUTHENTICATION_STATE_REQUEST = '[authentication] Restore',
  RESTORE_AUTHENTICATION_STATE_SUCCESS = '[authentication] Restore (success)',
  RESTORE_AUTHENTICATION_STATE_FAILURE = '[authentication] Restore (failure)',
  TOKEN_VALIDATION_SUCCESS = '[authentication] Token validation (success)',
  TOKEN_VALIDATION_FAILURE = '[authentication] Token validation (failure)',
  FAILURE = '[authentication] Failure',
  ROUTE_NAVIGATION = '[authentication] Route navigation'
}

export class CreateAccountRequestAction implements Action {
  readonly type = ActionTypes.CREATE_ACCOUNT_REQUEST;
  constructor(public payload: { email: string; password: string }) {}
}

export class CreateAccountFailureAction implements Action {
  readonly type = ActionTypes.CREATE_ACCOUNT_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class CreateAccountSuccessAction implements Action {
  readonly type = ActionTypes.CREATE_ACCOUNT_SUCCESS;
  constructor(public payload: User) {}
}

export class LoginRequestAction implements Action {
  readonly type = ActionTypes.LOGIN_REQUEST;
  constructor(public payload: { email: string; password: string }) {}
}

export class LoginFailureAction implements Action {
  readonly type = ActionTypes.LOGIN_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class LoginSuccessAction implements Action {
  readonly type = ActionTypes.LOGIN_SUCCESS;
  constructor(public payload: AuthResponse) {}
}

export class LogoutRequestAction implements Action {
  readonly type = ActionTypes.LOGOUT_REQUEST;
  constructor() {}
}

export class LogoutSuccessAction implements Action {
  readonly type = ActionTypes.LOGOUT_SUCCESS;
  constructor() {}
}

export class RestoreAuthenticationStateRequestAction implements Action {
  readonly type = ActionTypes.RESTORE_AUTHENTICATION_STATE_REQUEST;
  constructor() {}
}

export class RestoreAuthenticationStateFailureAction implements Action {
  readonly type = ActionTypes.RESTORE_AUTHENTICATION_STATE_FAILURE;
  constructor() {}
}

export class RestoreAuthenticationStateSuccessAction implements Action {
  readonly type = ActionTypes.RESTORE_AUTHENTICATION_STATE_SUCCESS;
  constructor(public payload: AuthResponse) {}
}

export class TokenValidationSuccessAction implements Action {
  readonly type = ActionTypes.TOKEN_VALIDATION_SUCCESS;
  constructor() {}
}

export class TokenValidationFailureAction implements Action {
  readonly type = ActionTypes.TOKEN_VALIDATION_FAILURE;
  constructor() {}
}

export class RouteNavigationAction implements Action {
  readonly type = ActionTypes.ROUTE_NAVIGATION;
}

export class FailureAction implements Action {
  readonly type = ActionTypes.FAILURE;
  constructor(public payload: { error: string }) {}
}

export type Actions = 
  CreateAccountRequestAction |
  CreateAccountFailureAction |
  CreateAccountSuccessAction |
  LoginRequestAction |
  LoginFailureAction |
  LoginSuccessAction |
  LogoutRequestAction |
  LogoutSuccessAction |
  RestoreAuthenticationStateRequestAction |
  RestoreAuthenticationStateFailureAction |
  RestoreAuthenticationStateSuccessAction |
  TokenValidationSuccessAction |
  TokenValidationFailureAction |
  RouteNavigationAction |
  FailureAction
;