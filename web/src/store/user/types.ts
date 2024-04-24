import { UserProp } from '../../types/users';

export interface UserInitialState {
  user: UserState;
}

export interface UserState {
  data: UserProp;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
}
