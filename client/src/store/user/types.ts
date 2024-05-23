import { UserProp } from '../../types/users';

export interface UserInitialState {
  user: UserState;
  status: {
    login: 'idle' | 'loading' | 'succeeded' | 'failed';
    register: 'idle' | 'loading' | 'succeeded' | 'failed';
  };
}

export interface UserState {
  data: UserProp;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
}
