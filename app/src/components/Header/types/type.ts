import { INotification, IUser } from "@/types/type";

export interface Props {
  user?: IUser | null;
  notifications?: INotification[] | null;
  setID?: (id: string) => void;
  isAdmin?: boolean;
}
