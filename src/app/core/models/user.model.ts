export interface User {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  updatedBy?: number;
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
}
