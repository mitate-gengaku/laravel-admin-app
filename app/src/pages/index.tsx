import { Button, Dialog, Flex, Text } from "@radix-ui/themes";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import { Header } from "@/components/Header";
import { axios } from "@/lib/axios";
import { INotification, IUser } from "@/types/type";

const Home = () => {
  const [isAdmin, setAdmin] = useState<boolean>(false);
  const [id, setID] = useState<string>("");
  const [user, setUser] = useState<IUser | null>(null);
  const [notifications, setNotifications] = useState<INotification[] | null>(
    null,
  );
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { user, notifications, role },
          status,
        } = await axios.get<{
          user: IUser;
          notifications: INotification[];
          role: string[];
        }>("/api/user");
        if (status === 200) {
          setUser(user);
          setNotifications(notifications);
          if (role.includes("admin")) {
            setAdmin(true);
          }
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const targetNotification = useMemo(() => {
    const target = notifications?.find(
      (notification) => notification.id === id,
    );

    return target;
  }, [id, notifications]);

  const readNotification = async (id: string) => {
    try {
      const { status } = await axios.post(`/api/notifications/${id}/read`);
      if (status === 200) {
        router.reload();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Dialog.Root>
      <div>
        <Header
          user={user}
          notifications={notifications}
          setID={setID}
          isAdmin={isAdmin}
        />
        <main>
          <Dialog.Content style={{ maxWidth: 450 }}>
            <Dialog.Title>
              {targetNotification ? targetNotification.data.title : ""}
            </Dialog.Title>
            <Dialog.Description size="2" mb="4">
              {targetNotification ? targetNotification.id : ""}
            </Dialog.Description>
            <Flex direction="column" gap="3">
              <Text as="div" size="2" mb="1">
                {targetNotification ? targetNotification.data.content : ""}
              </Text>
            </Flex>

            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close>
                <Button
                  variant="soft"
                  color="gray"
                  className="cursor-pointer bg-gray-400 text-gray-50 hover:bg-gray-500"
                >
                  キャンセル
                </Button>
              </Dialog.Close>
              <Dialog.Close>
                <Button
                  variant="soft"
                  color="sky"
                  className="cursor-pointer bg-sky-500 text-gray-50 hover:bg-sky-600"
                  onClick={() => readNotification(id)}
                >
                  既読
                </Button>
              </Dialog.Close>
            </Flex>
          </Dialog.Content>
        </main>
      </div>
    </Dialog.Root>
  );
};

export default Home;
