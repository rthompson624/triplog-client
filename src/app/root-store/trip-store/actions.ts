import { Action } from '@ngrx/store';
import { Trip } from '../../core/models/trip.model';
import { Multiple } from '../../core/models/multiple.model';

export enum ActionTypes {
  LOAD_MANY = 'Trips Load Request',
  LOAD_MANY_SUCCESS = 'Trips Load Success',
  LOAD_ONE = 'Trip Load Request',
  LOAD_ONE_SUCCESS = 'Trip Load Success',
  DELETE = 'Trip Delete Request',
  DELETE_SUCCESS = 'Trip Delete Success',
  UPDATE = 'Trip Update Request',
  UPDATE_SUCCESS = 'Trip Update Success',
  CREATE = 'Trip Create Request',
  CREATE_SUCCESS = 'Trip Create Success',
  FAILURE = 'Trip Failure'
}

export class LoadManyAction implements Action {
  readonly type = ActionTypes.LOAD_MANY;
  constructor(public payload: { pageIndex: number }) {}
}

export class LoadManySuccessAction implements Action {
  readonly type = ActionTypes.LOAD_MANY_SUCCESS;
  constructor(public payload: Multiple<Trip>) {}
}

export class LoadOneAction implements Action {
  readonly type = ActionTypes.LOAD_ONE;
  constructor(public payload: { id: number }) {}
}

export class LoadOneSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_ONE_SUCCESS;
  constructor(public payload: Trip) {}
}

export class DeleteAction implements Action {
  readonly type = ActionTypes.DELETE;
  constructor(public payload: Trip) {}
}

export class DeleteSuccessAction implements Action {
  readonly type = ActionTypes.DELETE_SUCCESS;
  constructor(public payload: Trip) {}
}

export class UpdateAction implements Action {
  readonly type = ActionTypes.UPDATE;
  constructor(public payload: Trip) {}
}

export class UpdateSuccessAction implements Action {
  readonly type = ActionTypes.UPDATE_SUCCESS;
  constructor(public payload: Trip) {}
}

export class CreateAction implements Action {
  readonly type = ActionTypes.CREATE;
  constructor(public payload: Trip) {}
}

export class CreateSuccessAction implements Action {
  readonly type = ActionTypes.CREATE_SUCCESS;
  constructor(public payload: Trip) {}
}

export class FailureAction implements Action {
  readonly type = ActionTypes.FAILURE;
  constructor(public payload: { error: string }) {}
}

export type Actions = 
  LoadManyAction|
  LoadManySuccessAction|
  LoadOneAction|
  LoadOneSuccessAction|
  DeleteAction|
  DeleteSuccessAction|
  UpdateAction|
  UpdateSuccessAction|
  CreateAction|
  CreateSuccessAction|
  FailureAction
;
