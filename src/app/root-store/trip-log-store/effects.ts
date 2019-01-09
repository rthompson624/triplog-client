import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom, concatMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { TripLogService } from '../../core/services/trip-log.service';
import * as featureActions from './actions';
import { RootStoreState } from '../../root-store';

@Injectable()
export class TripLogStoreEffects {
  constructor(
    private router: Router,
    private dataService: TripLogService,
    private actions$: Actions,
    private store$: Store<RootStoreState.State>
  ) {}

  @Effect()
  loadManyEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.LoadManyAction>(
      featureActions.ActionTypes.LOAD_MANY
    ),
    withLatestFrom(this.store$),
    switchMap(([action, store]) => {
      let pageIndex = action.payload.pageIndex;
      // If page index is null use what the store has
      if (pageIndex === null) {
        if (store.triplog.page.skip) {
          pageIndex = store.triplog.page.skip / store.triplog.page.limit;
        } else {
          pageIndex = 0;
        }
      }
      return this.dataService.getMany(pageIndex, action.payload.tripId).pipe(
        map(response =>
          new featureActions.LoadManySuccessAction(response)
        ),
        catchError(error =>
          observableOf(new featureActions.FailureAction({ error: this.formatError(error) }))
        )
      )
    })
  );
  
  @Effect()
  loadOneEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.LoadOneAction>(
      featureActions.ActionTypes.LOAD_ONE
    ),
    switchMap(action =>
      this.dataService.getOne(action.payload.id).pipe(
        map(response =>
          new featureActions.LoadOneSuccessAction(response)
        ),
        catchError(error =>
          observableOf(new featureActions.FailureAction({ error: this.formatError(error) }))
        )
      )
    )
  );

  @Effect()
  deleteEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.DeleteAction>(
      featureActions.ActionTypes.DELETE
    ),
    concatMap(action =>
      this.dataService.delete(action.payload).pipe(
        map(() =>
          new featureActions.DeleteSuccessAction(action.payload)
        ),
        catchError(error =>
          observableOf(new featureActions.FailureAction({ error: this.formatError(error) }))
        )
      )
    )
  );

  @Effect()
  updateEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.UpdateAction>(
      featureActions.ActionTypes.UPDATE
    ),
    concatMap(action =>
      this.dataService.update(action.payload).pipe(
        map(response =>
          new featureActions.UpdateSuccessAction(response)
        ),
        catchError(error =>
          observableOf(new featureActions.FailureAction({ error: this.formatError(error) }))
        )
      )
    )
  );

  @Effect()
  createEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.CreateAction>(
      featureActions.ActionTypes.CREATE
    ),
    withLatestFrom(this.store$),
    concatMap(([action, store])  => {
      action.payload.userId = store.authentication.user.id;
      return this.dataService.create(action.payload).pipe(
        map(response =>
          new featureActions.CreateSuccessAction(response)
        ),
        catchError(error =>
          observableOf(new featureActions.FailureAction({ error: this.formatError(error) }))
        )
      )
    })
  );

  @Effect({dispatch: false})
  failureEffect$ = this.actions$.pipe(
    ofType<featureActions.FailureAction>(
      featureActions.ActionTypes.FAILURE
    ),
    tap(action => {
      switch (action.payload.error) {
        case 'jwt expired':
          this.router.navigate(['/', 'authentication', 'login']);
          break;
        default:
      }
    })
  );

  private formatError(error: any): string {
    if (error.error && error.error.message) {
      return error.error.message;
    }
    if (error.error) return error.error.toString();
    if (error) return error.toString();
  }

}