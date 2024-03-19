export interface IUser {
  id: number;
  name: string;
  email: string;
  email_verified_at: Date;
  two_factor_recovery_codes: null;
  two_factor_secret: null;
  created_at: Date;
  updated_at: Date;
}

export interface INotification {
  id: string;
  notifiable_id: number;
  notifiable_type: string;
  read_at: Date | null;
  type: string;
  data: { [key: string]: string };
  created_at: Date;
  updated_at: Date;
}
