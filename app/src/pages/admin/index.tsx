import { Button, Dialog, Flex, Table, Text } from "@radix-ui/themes";
import { useRouter } from "next/router";
import { useEffect, useMemo, useReducer, useState } from "react";
import { toast } from "sonner";

import { Header } from "@/components/Header";
import { axios } from "@/lib/axios";
import { INotification, IUser } from "@/types/type";

interface IAdminActionState {
  id: string;
  type: string;
  label: string;
}

type ActionType =
  | {
      type: "delete";
      value: string;
    }
  | {
      type: "ban";
      value: string;
    };

const reducer = (state: IAdminActionState, action: ActionType) => {
  switch (action.type) {
    case "delete":
      return {
        ...state,
        id: action.value,
        type: "delete",
        label: "削除",
      };
    case "ban":
      return {
        ...state,
        id: action.value,
        type: "ban",
        label: "利用停止",
      };
    default:
      return {
        ...state,
      };
  }
};

const Admin = () => {
  const [isAdmin, setAdmin] = useState<boolean>(false);
  const [state, dispatch] = useReducer(reducer, {
    id: "",
    type: "",
    label: "",
  });
  const [user, setUser] = useState<IUser | null>(null);
  const [users, setUsers] = useState<
    | {
        user: IUser;
        role: string[];
      }[]
    | null
  >(null);
  const [isLoading, setLoading] = useState<boolean>(false);
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
        if (status === 200 && role.includes("admin")) {
          setAdmin(true);
          setUser(user);
          setNotifications(notifications);
          setLoading(true);
          return;
        }
        toast.error("あなたにはアクセス権限はありません。");
        router.replace("/");
        return;
      } catch (e) {
        console.error(e);
      }
    })();
  }, [router]);

  useEffect(() => {
    if (isLoading) {
      (async () => {
        try {
          const { data } = await axios.get<
            {
              user: IUser;
              role: string[];
            }[]
          >("/api/users");
          setUsers(data);
        } catch (e) {
          console.error(e);
        }
      })();
    }
  }, [isLoading]);

  const selectedUser = useMemo(() => {
    const user = users?.find(
      ({ user }) => user.id.toString() === state.id,
    )?.user;

    return user;
  }, [users, state.id]);

  const onDeleteUser = async (id: string) => {
    try {
      const { status } = await axios.delete(`/api/users/${id}`);

      if (status === 200) {
        toast.success("ユーザーアカウントの削除に成功しました。");
        router.reload();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onBanUser = async (id: string) => {
    try {
      const { status } = await axios.post(`/api/users/${id}/ban`);

      if (status === 200) {
        toast.success("ユーザーアカウントを利用停止にしました。");
        router.reload();
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (!isLoading) {
    return <>...Loading</>;
  }
  return (
    <Dialog.Root>
      <div>
        <Header user={user} notifications={notifications} isAdmin={isAdmin} />
        <main className="p-6">
          <Table.Root variant="surface" className="mb-8">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>ユーザー名</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Eメール</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {user && (
                <Table.Row>
                  <Table.RowHeaderCell>{user.name}</Table.RowHeaderCell>
                  <Table.Cell>{user.email}</Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Root>

          <h2 className="mb-2 text-2xl">All User</h2>
          <Table.Root variant="surface">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>ユーザー名</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Eメール</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>アクション</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {users &&
                users.map(({ user, role }) => {
                  return (
                    <Table.Row key={user.name}>
                      <Table.RowHeaderCell>{user.name}</Table.RowHeaderCell>
                      <Table.Cell>{user.email}</Table.Cell>
                      <Table.Cell>
                        <Dialog.Trigger>
                          <Flex gap="4" align="center">
                            <Button
                              color="red"
                              className="cursor-pointer bg-red-500 transition hover:bg-red-600"
                              onClick={() =>
                                dispatch({
                                  type: "delete",
                                  value: user.id.toString(),
                                })
                              }
                            >
                              削除
                            </Button>
                            {!role.includes("banned") && (
                              <Button
                                color="red"
                                variant="ghost"
                                className="h-[1.675rem] cursor-pointer transition"
                                onClick={() =>
                                  dispatch({
                                    type: "ban",
                                    value: user.id.toString(),
                                  })
                                }
                              >
                                利用停止
                              </Button>
                            )}
                          </Flex>
                        </Dialog.Trigger>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
            </Table.Body>
          </Table.Root>
          {selectedUser && (
            <Dialog.Content style={{ maxWidth: 450 }}>
              <Dialog.Title>ユーザーアカウントの{state.label}</Dialog.Title>
              <Dialog.Description size="2" mb="4" className="text-gray-600">
                ユーザーアカウントを{state.label}します
              </Dialog.Description>

              <Flex direction="column" gap="3">
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    ユーザー名
                  </Text>
                  <Text as="div" size="2" mb="1" className="text-gray-500">
                    {selectedUser.name}
                  </Text>
                </label>
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Eメール
                  </Text>
                  <Text as="div" size="2" mb="1" className="text-gray-500">
                    {selectedUser.email}
                  </Text>
                </label>
              </Flex>

              <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                  <Button
                    color="gray"
                    className="cursor-pointer bg-gray-400 transition hover:bg-gray-500"
                  >
                    キャンセル
                  </Button>
                </Dialog.Close>
                <Dialog.Close>
                  <Button
                    color="red"
                    className="cursor-pointer bg-red-500 transition hover:bg-red-600"
                    onClick={() =>
                      state.type === "delete"
                        ? onDeleteUser(state.id)
                        : onBanUser(state.id)
                    }
                  >
                    {state.label}
                  </Button>
                </Dialog.Close>
              </Flex>
            </Dialog.Content>
          )}
        </main>
      </div>
    </Dialog.Root>
  );
};

export default Admin;
