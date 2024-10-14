import { useEffect, useState } from "react";
import Link from "next/link";
import ClickOutside from "@/components/ClickOutside";
import { pusherClient } from "@/lib/pusher";
import { Notification } from "@prisma/client";
import axios from "axios";
import { Bell } from "lucide-react";

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const getNotification = async () => {
    const { data }: { data: Notification[] } =
      await axios.get("/api/notifications");

    setNotifications(data);
  };

  useEffect(() => {
    pusherClient.subscribe("notifications");

    pusherClient.bind("new-notification", async () => {
      await getNotification();
      setNotifying(true);
    });

    return () => {
      pusherClient.unsubscribe("notifications");
    };
  }, []);

  useEffect(() => {
    getNotification();
  }, []);

  return (
    <ClickOutside
      onClick={() => {
        setNotifying(false);
      }}
      className="relative"
    >
      <li>
        <button
          onClick={() => {
            setNotifying(false);
            setDropdownOpen(!dropdownOpen);
          }}
          className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
        >
          <span
            className={`absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1 ${
              notifying === false ? "hidden" : "inline"
            }`}
          >
            <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
          </span>

          <Bell size={16} />
        </button>

        {dropdownOpen && (
          <div
            className={`absolute -right-27 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80`}
          >
            <div className="px-4.5 py-3">
              <h5 className="text-sm font-medium text-bodydark2">
                Notification
              </h5>
            </div>

            <ul className="flex h-auto flex-col overflow-y-auto">
              {notifications.map((notification) => (
                <li key={notification.id}>
                  <Link
                    className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                    href={`${notification.link}`}
                  >
                    <p className="text-sm">
                      <span className="text-black dark:text-white">
                        {notification.title}
                      </span>{" "}
                      {notification.description}
                    </p>

                    <p className="text-xs">
                      {notification.createdAt.toString()}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </li>
    </ClickOutside>
  );
};

export default DropdownNotification;
