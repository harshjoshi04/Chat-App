export interface AuthType {
  name?: string;
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  image: string;
  platFormName?: string;
  platFormId?: string;
  createdAt: string;
  status?: string;
}
