import { IUser } from "@/types/type";

export interface Props {
  user?: IUser | null;
  onLogout?: () => Promise<void>;
}
