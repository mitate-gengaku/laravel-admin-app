import { INotification } from "@/types/type";

export interface Props {
  notifications?: INotification[] | null;
  setID?: (id: string) => void;
  allReadNotification: () => Promise<void>;
}
