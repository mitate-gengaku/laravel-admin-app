import Link from "next/link";
import { useRouter } from "next/router";

import { Props } from "../types/type";

import { Notifications } from "@/components/Notifications";
import { UserDropdown } from "@/components/UserDropdown";
import { axios } from "@/lib/axios";
import { courgette } from "@/lib/fonts";
import cn from "@/utility/cn";

const Header = (props: Props) => {
  const { user, notifications, setID, isAdmin } = props;

  const router = useRouter();

  const onLogout = async () => {
    try {
      await axios.get("/sanctum/csrf-cookie");
      const { status } = await axios.post("/api/logout");
      if (status === 200) {
        router.reload();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const allReadNotification = async () => {
    try {
      const { status } = await axios.post(`/api/notifications/read-all`);

      if (status === 200) {
        router.reload();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <header
      className={cn("h-16 px-6 flex justify-between items-center border-b")}
    >
      <h1>
        <Link
          href={"/"}
          className={cn(courgette.className, "hover:text-gray-700 transition")}
        >
          AdminApp
        </Link>
      </h1>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            {router.asPath === "/admin" ? (
              <Link href={"/"} className="text-sm">
                user mode
              </Link>
            ) : (
              <>
                <Notifications
                  notifications={notifications}
                  allReadNotification={allReadNotification}
                  setID={setID}
                />
                {isAdmin && (
                  <Link href={"/admin"} className="text-sm">
                    Admin
                  </Link>
                )}
                <UserDropdown user={user} onLogout={onLogout} />
              </>
            )}
          </>
        ) : (
          <>
            <Link
              href={"/signup"}
              className={cn(
                "h-10 px-3 flex justify-center items-center text-sm rounded bg-white outline outline-1 outline-gray-400 hover:bg-gray-900 hover:text-gray-100 transition text-gray-600",
              )}
            >
              サインアップ
            </Link>
            <Link
              href={"/login"}
              className={cn(
                "w-24 h-10 px-3 flex justify-center items-center text-sm rounded bg-white text-gray-100 bg-sky-500 hover:bg-sky-600 transition",
              )}
            >
              ログイン
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
