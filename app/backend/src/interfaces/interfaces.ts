export interface ILogin {
  email: string;
  password: string;
}

export interface IUser extends ILogin {
  id?: number;
  role: string;
}

export interface IToken {
  id: number;
  email: string,
  role: string;
  iat?: number
}
