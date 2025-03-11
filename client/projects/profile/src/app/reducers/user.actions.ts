import { createAction, props } from '@ngrx/store';
import { User } from './user.reducer';

export const setUser = createAction(
  '[User] Set User', 
  props<{ user: User }>()
)