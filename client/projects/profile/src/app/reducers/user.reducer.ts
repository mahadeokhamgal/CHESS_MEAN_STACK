import { createReducer, on } from '@ngrx/store';
import { setUser } from './user.actions';
import { Rank } from '../model/rank';

export interface User {
  name: string;
  rating: number;
  rank?: Rank;
}

export interface UserState {
  user: User | null;
}

export const initialState: UserState = {
  user: { name: 'Untitled...', rating: 800, rank: Rank.BEGGINER },
};

export const userReducer = createReducer(
  initialState,
  on(setUser, (state, { user }) => ({ ...state, user }))
);
