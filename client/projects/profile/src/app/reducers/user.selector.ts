import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';
import { ACCESS } from '../enums/access';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(
  selectUserState,
  (state: UserState) => state.user
);

export const selectAuthState = createFeatureSelector<UserState>('user');

export const selectIsAdmin = createSelector(
  selectAuthState,
  (state: UserState) => state.user?.access == ACCESS.ADMIN
)

export const selectIsChessUser = createSelector(
  selectAuthState,
  (state: UserState) => state.user?.access == ACCESS.CHESS_PLAYER || state.user?.access == ACCESS.ADMIN
)