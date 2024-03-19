import { Button, Dialog, DropdownMenu, ScrollArea } from "@radix-ui/themes";
import { HiOutlineBell } from "react-icons/hi2";

import { Props } from "../types/type";

import cn from "@/utility/cn";

const Notifications = (props: Props) => {
  const { notifications, setID, allReadNotification } = props;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div className="relative size-5 cursor-pointer">
          <HiOutlineBell className="size-5" />
          {notifications && notifications.length > 0 && (
            <div className="absolute -right-1 -top-2 flex size-4 items-center justify-center rounded-full bg-red-500 text-[8px] text-white">
              {notifications.length}
            </div>
          )}
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content side="left" className="w-48">
        <DropdownMenu.Label className="text-sm font-bold text-gray-800">
          運営からのお知らせ
        </DropdownMenu.Label>
        <DropdownMenu.Separator className="my-0 mb-2" />
        <ScrollArea className={cn(notifications?.length && "h-56")}>
          {notifications?.map((notification) => {
            return (
              <Dialog.Trigger
                className="flex w-full cursor-pointer items-center justify-start gap-2 py-2 text-xs hover:bg-gray-50"
                key={notification.id}
              >
                <Button onClick={() => setID!(notification.id)}>
                  {notification.data.title}
                </Button>
              </Dialog.Trigger>
            );
          })}
        </ScrollArea>
        {notifications && notifications.length ? (
          <>
            <DropdownMenu.Separator className="mb-4 mt-2" />
            <DropdownMenu.Item>
              <Button
                variant="soft"
                color="sky"
                className="w-[9.25rem] cursor-pointer bg-sky-500 text-gray-50 hover:bg-sky-600"
                onClick={() => allReadNotification()}
              >
                すべて既読にする
              </Button>
            </DropdownMenu.Item>
          </>
        ) : (
          <DropdownMenu.Label className="text-xs">
            お知らせはありません
          </DropdownMenu.Label>
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default Notifications;
