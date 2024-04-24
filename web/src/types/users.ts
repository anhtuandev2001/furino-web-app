export interface UserProp {
  userId: number | null;
  name: string;
  email: string;
  password: string;
  role: {
    roleId: number | null;
    name: string;
  };
  status: boolean;
  token: string;
}
