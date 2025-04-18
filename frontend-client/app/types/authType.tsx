export interface EmailPayload {
  email: string;
}

export interface RegisterPayload {
  email: string;
  code: string;
  password: string;
  confirm_password: string;
  name: string;
}

export interface LogInPayload {
  email: string;
  password: string;
}

export interface ResetPasswordPayload {
  email: string;
  code: string;
  password: string;
  confirm_password: string;
}

export interface ChangeLoggedInAccountPasswordPayload {
  old_password: string;
  password: string;
  confirm_password: string;
}

export interface UpdateMyProfilePayload {
  name: string;
  bio: string;
  avatar_id: number;
}
