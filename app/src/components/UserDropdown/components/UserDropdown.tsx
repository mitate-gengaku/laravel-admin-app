import { DropdownMenu } from "@radix-ui/themes";
import { HiArrowRightOnRectangle } from "react-icons/hi2";

import { Props } from "../types/type";

const UserDropdown = (props: Props) => {
  const { user, onLogout } = props;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button>{user?.name}</button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="w-40">
        <DropdownMenu.Item
          className="flex cursor-pointer items-center justify-start gap-2 hover:bg-gray-100"
          onClick={onLogout}
        >
          <HiArrowRightOnRectangle className="size-4" />
          <p>Logout</p>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default UserDropdown;
