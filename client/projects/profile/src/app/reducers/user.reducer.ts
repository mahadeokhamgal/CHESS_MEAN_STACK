import { createReducer, on } from '@ngrx/store';
import { setUser } from './user.actions';
import { Rank } from '../model/rank';

export interface User {
  name: string;
  rating: number;
  rank?: Rank;
  createdDate: Date,
  access: string
}

export interface UserState {
  user: User | null;
}

export const initialState: UserState = {
  user: { name: 'Untitled...', rating: 800, rank: Rank.BEGGINER, createdDate: new Date(), access: 'chess-player' },
};

export const userReducer = createReducer(
  initialState,
  on(setUser, (state, { user }) => ({ ...state, user }))
);
