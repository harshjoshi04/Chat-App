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

export interface RequestType {
  createdAt: string;
  fromId: number;
  id: number;
  recipient: User | null;
  status: string;
  userId: number;
}

export interface MessageType {
  id: number;
  userId: number;
  fromId: number;
  senderReaction: string;
  receiverReaction: string;
  createdAt: string;
  message: string;
  receiverMessage?: User;
  senderMessage?: User;
}
